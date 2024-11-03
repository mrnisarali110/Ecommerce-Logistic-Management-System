import numpy as np
import pandas as pd
import re
import torch
import random
import torch.nn as nn
from transformers import DistilBertTokenizer, DistilBertModel
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Load the dataset
def load_dataset(file_path):
    df = pd.read_csv(file_path, encoding='latin1')
    questions = df['Question'].tolist()
    answers = df['Answer'].tolist()
    return questions, answers

questions, answers = load_dataset('chatbotai.csv')
max_seq_len = 55

# Define the model architecture
class DistilBERT_Arch(nn.Module):
    def __init__(self, distilbert):
        super(DistilBERT_Arch, self).__init__()
        self.distilbert = distilbert
        self.dropout = nn.Dropout(0.1)
        self.fc1 = nn.Linear(768, len(answers))
    
    def forward(self, sent_id, attention_mask):
        cls_hs = self.distilbert(sent_id, attention_mask=attention_mask)[0][:, 0]
        x = self.dropout(cls_hs)
        output = self.fc1(x)
        return output

# Load the DistilBERT model and tokenizer
distilbert = DistilBertModel.from_pretrained('distilbert-base-uncased')
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the saved model
model_path = "trained_model.pth"
model = DistilBERT_Arch(distilbert)
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.to(device)
model.eval()

# Function to get prediction
def get_prediction(input_str):
    input_str = re.sub(r'[^a-zA-Z\s]+', '', input_str)
    tokens_test_data = tokenizer(
        [input_str],
        max_length=max_seq_len,
        padding='max_length',
        truncation=True,
        return_token_type_ids=False
    )
    test_seq = torch.tensor(tokens_test_data['input_ids']).to(device)
    test_mask = torch.tensor(tokens_test_data['attention_mask']).to(device)
    
    with torch.no_grad():
        preds = model(test_seq, attention_mask=test_mask)
        preds = torch.softmax(preds, dim=1)
        pred_idx = torch.argmax(preds, dim=1).item()
    
    return answers[pred_idx]

# Create Flask app
app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    user_input = request.json['message']
    response = get_prediction(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)