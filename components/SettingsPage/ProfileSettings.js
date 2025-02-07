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

const ProfileSettings = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    photoUrl: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const { data: session, update } = useSession();
  const [newPassword, setNewPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const currentUser = session?.user;
    if (currentUser) {
      setUser({
        displayName: currentUser.name || "",
        email: currentUser.email || "",
        photoUrl: currentUser.photo || "",
      });
      setPhotoPreview(currentUser.photo || "");
    }
  }, [session]);

  // API calls
  const handleProfileUpdate = async () => {
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoUrl: photoPreview,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      await update({ name: user.displayName, email: user.email });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      toast.success("Password updated successfully!");
      setPasswordModalOpen(false);
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password.");
    }
  };

  const handleEmailVerification = async () => {
    try {
      setIsPending(true);
      const resp = await fetch("/api/send-code", {
        method: "POST",
        body: JSON.stringify({ email: newEmail }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();

      if (data.success) {
        toast.success("Verification email sent. Please check your inbox.");
        setEmailModalOpen(false);
        setOtpModalOpen(true);
      } else {
        toast.error("Failed to send verification email.");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email.");
    } finally {
      setIsPending(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsPending(true);
      const response = await fetch("/api/verify-code", {
        method: "POST",
        body: JSON.stringify({ email: newEmail, code: otpCode }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!data.success) {
        toast.error("Invalid OTP or failed to update email.");
      }

      await handleProfileUpdate();
      setOtpModalOpen(false);
      toast.success("Email updated successfully.");
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Failed to update email.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        maxWidth: 700,
        mx: "auto",
        p: 4,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            className="border-2 border-secondary"
            src={photoPreview}
            sx={{ width: 100, height: 100 }}
          />
          <IconButton
            className="absolute -top-8 right-1 rounded-full"
            component="label"
            onClick={() =>
              toast.error(
                "This feature is not available due to low cost for storage 😥, send me money 💰"
              )
            }
          >
            <PhotoCamera />
          </IconButton>
        </Box>
      </Box>
      <TextField
        label="Display Name"
        value={user.displayName}
        onChange={(e) => setUser({ ...user, displayName: e.target.value })}
        fullWidth
        margin="normal"
        sx={custom_styling.secondaryTextField}
      />
      <TextField
        label="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        fullWidth
        margin="normal"
        sx={custom_styling.secondaryTextField}
      />
      <Button
        sx={custom_styling.primaryButton}
        onClick={handleProfileUpdate}
        fullWidth
      >
        Save Changes
      </Button>

      <Box mt={4}>
        <Button
          sx={custom_styling.secondaryButton}
          onClick={() => setPasswordModalOpen(true)}
          fullWidth
        >
          Change Password
        </Button>
      </Box>
      <Box mt={4}>
        <Button
          sx={custom_styling.secondaryButton}
          onClick={() => setEmailModalOpen(true)}
          fullWidth
        >
          Change Email
        </Button>
      </Box>

      {/* Password Modal */}
      <Modal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 5,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <TextField
            sx={custom_styling.secondaryTextField}
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            sx={custom_styling.primaryButton}
            onClick={handlePasswordChange}
            fullWidth
          >
            Update Password
          </Button>
        </Box>
      </Modal>

      {/* Email Modal */}
      <Modal open={emailModalOpen} onClose={() => setEmailModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 5,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Change Email
          </Typography>
          <TextField
            label="Current Email"
            type="email"
            value={session?.user?.email}
            fullWidth
            margin="normal"
            disabled={true}
            sx={custom_styling.secondaryTextField}
          />
          <TextField
            sx={custom_styling.secondaryTextField}
            label="New Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            disabled={isPending}
            sx={custom_styling.primaryButton}
            onClick={handleEmailVerification}
            fullWidth
          >
            {isPending ? (
              <CircularProgress
                size={18}
                style={{ color: CUSTOM_COLORS.WHITE }}
              />
            ) : (
              "Verify Email"
            )}
          </Button>
        </Box>
      </Modal>

      {/* OTP Modal */}
      <Modal open={otpModalOpen} onClose={() => setOtpModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 5,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Verify OTP
          </Typography>
          <TextField
            sx={custom_styling.secondaryTextField}
            label="OTP Code"
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            disabled={isPending}
            sx={custom_styling.primaryButton}
            onClick={handleVerifyCode}
            fullWidth
          >
            {isPending ? (
              <CircularProgress
                size={18}
                style={{ color: CUSTOM_COLORS.WHITE }}
              />
            ) : (
              "Confirm Email Update"
            )}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileSettings;
