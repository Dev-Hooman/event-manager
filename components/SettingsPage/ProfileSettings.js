"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Modal,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useSession } from "next-auth/react";
import { custom_styling } from "@/theme/mui-theme";
import toast from "react-hot-toast";
import { CUSTOM_COLORS } from "@/theme/colors";
import { updateProfile } from "@/api/services/userService";

const ProfileSettings = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    photoUrl: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser({
        displayName: session.user.name || "",
        email: session.user.email || "",
        photoUrl: session.user.photoUrl || "",
      });
      setPhotoPreview(session.user.photoUrl || "");
    }
  }, [session]);

  const handleProfileUpdate = async () => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append("name", user.displayName);
      formData.append("email", user.email);
      if (selectedPhoto) {
        formData.append("image", selectedPhoto);
      }
      if (newPassword) {
        formData.append("password", newPassword);
      }

      const response = await updateProfile(formData, session.user.token);
      console.log(response);
      await update({ name: user.displayName, email: user.email , photoUrl: response.updatedUser.photoUrl });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box sx={{ marginTop: 4, maxWidth: 700, mx: "auto", p: 4, borderRadius: 2, bgcolor: "background.paper" }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar src={photoPreview} sx={{ width: 100, height: 100 }} />
          <IconButton className="absolute -top-8 right-1 rounded-full" component="label">
            <PhotoCamera />
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </IconButton>
        </Box>
      </Box>
      
      <TextField label="Display Name" value={user.displayName} onChange={(e) => setUser({ ...user, displayName: e.target.value })} fullWidth margin="normal" sx={custom_styling.secondaryTextField} />
      <TextField label="Email" value={user.email} fullWidth margin="normal" sx={custom_styling.secondaryTextField} disabled />

      <Button sx={custom_styling.primaryButton} onClick={handleProfileUpdate} fullWidth disabled={isUpdating}>
        {isUpdating ? <CircularProgress size={18} style={{ color: CUSTOM_COLORS.WHITE }} /> : "Save Changes"}
      </Button>

      <Box mt={4}>
        <Button sx={custom_styling.secondaryButton} onClick={() => setPasswordModalOpen(true)} fullWidth>
          Change Password
        </Button>
      </Box>

      {/* Password Modal */}
      <Modal open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", borderRadius: 2, p: 4, boxShadow: 5 }}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <TextField sx={custom_styling.secondaryTextField} label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} fullWidth margin="normal" />
          <Button sx={custom_styling.primaryButton} onClick={handleProfileUpdate} fullWidth>
            {isUpdating ? <CircularProgress size={18} style={{ color: CUSTOM_COLORS.WHITE }} /> : "Update Password"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileSettings;
