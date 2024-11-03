const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const qr = require('qr-image');
const authRoutes = require("./routers/auth.routers");

const Order = require('./schema/order.model');


const User = require('./schema/user'); // User model

const app = express();
const PORT = process.env.PORT || 3001;

// mongoose.connect('mongodb://127.0.0.1:27017')
mongoose.connect('Your_MongoDb Atlas URI') //Add your  mongodb atlas uri for db
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Global Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// APIs Router Register here.
app.use("/auth", authRoutes);

app.get("/testing", (req, res) => {
  res.status(200).json({ message: "Server live" });
});

// User Profile API
app.get("/get-user-profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    const user = await User.findOne({ userId: objectId }).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
});

// PUT request to update the order status
app.put('/auth/update-order-status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { isActive } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { isActive }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

// PUT request to update the user status
app.put('/auth/update-user-status/:userId', async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { isActive }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User status updated', user: updatedUser });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Failed to update user status', error: error.message });
  }
});

// Core business logic
function generateTrackingNumber() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// PDF generation
app.post("/generate-labels", (req, res) => {
  try {
    const orders = req.body;
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const pdfPath = path.join(__dirname, "labels.pdf");
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    orders.forEach((order) => {
      const date = new Date().toLocaleString();
      doc.fontSize(12).text(date, { align: "center" });

      const qrCode = qr.imageSync('https://iqra.edu.pk/', { type: 'png' });
      doc.image(qrCode, doc.page.width - 80 - 50, 50, { fit: [80, 80] });

      doc.fontSize(24).font('Helvetica-Bold').text('ELMS', 50, 140);
      let boxY = 180;
      Object.keys(order).forEach((key) => {
        if (key.toLowerCase() !== "serialno") {
          doc.rect(50, boxY, 500, 25).stroke();
          doc.fontSize(14).font('Helvetica-Bold').text(`${key}: ${order[key]}`, 60, boxY + 10);
          boxY += 25;
        }
      });

      doc.moveDown(2).fontSize(12).font('Helvetica').text("Your order will be delivered by Leopards Courier Services.", { align: "center" });
      doc.moveDown(2).text(`Tracking Number: ${generateTrackingNumber()}`, { align: "center" });
      doc.addPage();
    });

    doc.end();
    res.json({ url: `http://localhost:${PORT}/labels.pdf` });
  } catch (error) {
    console.error("Error generating label:", error);
    res.status(500).json({ error: "Failed to generate label" });
  }
});

// Serve the generated PDF labels
app.get("/labels.pdf", (req, res) => {
  const filePath = path.join(__dirname, "labels.pdf");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
