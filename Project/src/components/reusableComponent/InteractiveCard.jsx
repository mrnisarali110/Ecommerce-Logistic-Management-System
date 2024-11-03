import React from "react";
import { Card, CardContent, Typography, Switch, Box, CardActions, Button } from "@mui/material";

const InteractiveCard = ({ 
  title, 
  subtitle, 
  isActive, 
  onToggle, 
  actionText, 
  onActionClick, 
  children 
}) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography style={{ marginBottom: 8 }} color="text.secondary">
          {subtitle}
        </Typography>
        {/* Show active switch only if `isActive` and `onToggle` are provided */}
        {typeof isActive !== 'undefined' && onToggle && (
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2">Active:</Typography>
            <Switch checked={isActive} onChange={onToggle} />
          </Box>
        )}
        {/* Render additional content */}
        {children && <Box style={{ marginTop: 8 }}>{children}</Box>}
      </CardContent>
      {/* Show action button only if `onActionClick` is provided */}
      {onActionClick && (
        <CardActions>
          <Button size="small" onClick={onActionClick}>
            {actionText}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default InteractiveCard;
