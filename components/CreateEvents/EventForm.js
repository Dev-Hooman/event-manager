"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import {
  UploadFile,
  AddPhotoAlternate,
  CancelOutlined,
} from "@mui/icons-material";
import { custom_styling } from "@/theme/mui-theme";
import { CUSTOM_COLORS } from "@/theme/colors";
import ImageDetailsModal from "./ImageDetailsModal";

const EventForm = ({
  eventData = {},
  onSubmit,
  loading = false,
  categories = ['conference', 'concert', 'exhibition', 'sports', 'workshop'],
  isUpdate = false,
}) => {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(eventData.price || "");
  const [category, setCategory] = useState(eventData.category || "");
  const [title, setTitle] = useState(eventData.title || "");
  const [description, setDescription] = useState(eventData.description || "");
  const [date, setDate] = useState(eventData.date || "");
  const [time, setTime] = useState(eventData.time || "");
  const [location, setLocation] = useState(eventData.location || "");
  const [availableSeats, setAvailableSeats] = useState(eventData.availableSeats || "");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (eventData.image) {
      setFile({
        url: eventData.image,
        name: eventData.image,
      });
    }
  }, [eventData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile({
        file: selectedFile,
        url: URL.createObjectURL(selectedFile),
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !price || !category || !title || !description || !date || !time || !location || !availableSeats) {
      alert("Please fill all the fields!");
      return;
    }

    const eventData = {
      title,
      description,
      date,
      time,
      location,
      category,
      image: file,
      price,
      availableSeats,
    };

    await onSubmit(eventData);
  };

  return (
    <div className="min-h-[calc(100vh)]">
      <Paper
        elevation={3}
        sx={{
          maxWidth: 700,
          margin: "40px auto",
          padding: "24px",
          borderRadius: 4,
        }}
      >
        <Typography
          color={CUSTOM_COLORS.SECONDARY}
          variant="h4"
          align="center"
          gutterBottom
        >
          {isUpdate ? "Update Event" : "Create Event"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Two-column layout for event title and description */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          {/* Two-column layout for event date, time, and location */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Date"
                variant="outlined"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Event Time"
                variant="outlined"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Available Seats"
                variant="outlined"
                type="number"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
              />
            </Grid>
          </Grid>

          {/* File input and image preview */}
          <Button
            variant="contained"
            component="label"
            startIcon={<AddPhotoAlternate />}
            sx={custom_styling.secondaryButton}
          >
            {file ? "Change Image" : "Select Image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {file && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <img
                src={file.url}
                alt="Selected Preview"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={handleOpenModal}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={handleRemoveFile}
                sx={{ padding: "5px 10px", marginTop: 2 }}
              >
                Remove
              </Button>
            </Box>
          )}

          {/* Select price options */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography color={CUSTOM_COLORS.SECONDARY} variant="h6">
              Select Price
            </Typography>

            <Grid container spacing={2}>
              {[75, 120, 150, 299].map((value) => (
                <Grid item xs={6} sm={3} key={value}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setPrice(value)}
                    sx={{
                      border: `2px solid ${CUSTOM_COLORS.SECONDARY}`,
                      backgroundColor:
                        price === value
                          ? CUSTOM_COLORS.SECONDARY
                          : "transparent",
                      color: price === value ? "#fff" : CUSTOM_COLORS.SECONDARY,
                      "&:hover": {
                        backgroundColor:
                          price === value
                            ? CUSTOM_COLORS.SECONDARY
                            : "transparent",
                      },
                    }}
                  >
                    ${value}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <TextField
              label="Custom Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              sx={custom_styling.secondaryTextField}
            />
          </Box>

          {/* Category selection */}
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Category"
            sx={custom_styling.select}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>

          {/* Submit and Cancel buttons */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<UploadFile />}
            disabled={loading}
            sx={custom_styling.primaryButton}
            className="-mb-4"
          >
            {loading ? <CircularProgress size={24} /> : isUpdate ? "Update Event" : "Create Event"}
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => router.push("/dashboard/events")}
            startIcon={<CancelOutlined />}
            disabled={loading}
            sx={custom_styling.secondaryButton}
          >
            Cancel
          </Button>
        </Box>

        <ImageDetailsModal
          open={openModal}
          handleClose={handleCloseModal}
          file={file}
        />
      </Paper>
    </div>
  );
};

export default EventForm;
