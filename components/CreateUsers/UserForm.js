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
import ImageDetailsModal from "@/components/core/ImageDetailsModal";

const UserForm = ({
  userData = {},
  onSubmit,
  loading = false,
  roles = ['vendor', 'user'],
  isUpdate = false,
}) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [role, setRole] = useState(userData.role || "");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (userData.image) {
      setFile({
        url: userData.image,
        name: userData.image,
      });
    }
  }, [userData]);

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
    if (!file || !name || !email || !phone || !role) {
      alert("Please fill all the fields!");
      return;
    }

    const userData = {
      name,
      email,
      phone,
      role,
      image: file,
    };

    await onSubmit(userData);
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
          {isUpdate ? "Update User" : "Create User"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
              >
                {roles.map((roleOption) => (
                  <MenuItem key={roleOption} value={roleOption}>
                    {roleOption}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<UploadFile />}
            disabled={loading}
            sx={custom_styling.primaryButton}
            className="-mb-4"
          >
            {loading ? <CircularProgress size={24} /> : isUpdate ? "Update User" : "Create User"}
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => window.history.back()}
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

export default UserForm;
