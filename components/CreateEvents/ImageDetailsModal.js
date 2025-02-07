import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
} from "@mui/material";

const ImageDetailsModal = ({ open, handleClose, file }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Image Details</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={file?.url}
            alt="Selected Image"
            style={{
              width: "100%",
              maxWidth: "600px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <Typography variant="body1" color="textSecondary">
            <strong>File Name:</strong> {file?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>File Size:</strong> {Math.round(file?.size / 1024)} KB
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Mime Type:</strong> {file?.type}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageDetailsModal;
