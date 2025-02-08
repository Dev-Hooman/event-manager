"use client";
import React, { useEffect, useState } from "react";
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
import { CancelOutlined } from "@mui/icons-material";
import { custom_styling } from "@/theme/mui-theme";
import { CUSTOM_COLORS } from "@/theme/colors";

const UserForm = ({
  userData = {},
  onSubmit,
  loading = false,
  roles = ["vendor", "user"],
  isUpdate = false,
}) => {
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(userData.role || "");

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setRole(userData.role || "");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || (!isUpdate && !password) || !role) {
      alert("Please fill all required fields!");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Phone number must be exactly 10 digits!");
      return;
    }

    if (!isUpdate && password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    const userData = { name, email, phone, role };
    if (!isUpdate) userData.password = password;

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
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10); // Only digits, max 10
                  setPhone(val);
                }}
                fullWidth
                required
                sx={custom_styling.secondaryTextField}
                helperText="Phone number must be 10 digits"
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

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required={!isUpdate}
            sx={custom_styling.secondaryTextField}
            helperText="At least 8 characters (1 letter & 1 number)"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={custom_styling.primaryButton}
            className="-mb-4"
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isUpdate ? (
              "Update User"
            ) : (
              "Create User"
            )}
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
      </Paper>
    </div>
  );
};

export default UserForm;
