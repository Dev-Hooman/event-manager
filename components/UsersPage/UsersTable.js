"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Button,
  Typography,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  TablePagination,
  TextField,
  DialogContentText,
} from "@mui/material";
import { Visibility, Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { custom_styling } from "@/theme/mui-theme";
import { CUSTOM_COLORS } from "@/theme/colors";
import { getAllUsers, removeUser } from "@/api/services/userService";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    userId: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const allUsers = await getAllUsers();

      setUsers(allUsers.users);
      setFilteredUsers(allUsers.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = async () => {
    const { userId } = confirmDialog;
    const token = session?.user.token;

    try {
      const resp = await removeUser(userId, token);

      if (resp.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );

        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user._id != userId)
        );
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setConfirmDialog({ open: false, userId: null });
    }
  };

  const handleEditUser = (user) => {
    // setSelectedUser(user);
    router.push(`/dashboard/update-user/${user._id}`);
  };

  const handleCreateUser = () => {
    router.push("/dashboard/create-user");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Button onClick={handleCreateUser} sx={custom_styling.primaryButton}>
          Create Users
        </Button>
      </div>

      <div className="mb-4">
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={custom_styling.secondaryTextField}
        />
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Phone Number</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Role</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton
                        color="primary"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit User">
                      <IconButton
                        color="primary"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton
                        color="error"
                        onClick={() =>
                          setConfirmDialog({
                            open: true,
                            userId: user._id,
                          })
                        }
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {selectedUser && (
        <Dialog
          open={Boolean(selectedUser)}
          onClose={() => setSelectedUser(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedUser.name}</DialogTitle>
          <DialogContent className="flex flex-col justify-center items-center">
            {selectedUser.photoUrl ? (
              <Image
                className="border border-secondary rounded-full"
                src={selectedUser.photoUrl}
                alt={selectedUser.name}
                width={150}
                height={150}
                style={{
                  borderRadius: "50%",
                  marginBottom: "16px",
                }}
              />
            ) : (
              <Typography>No Photo Available</Typography>
            )}
            <DialogContentText>
              <strong>Email:</strong> {selectedUser.email}
            </DialogContentText>
            <DialogContentText>
              <strong>Phone:</strong> {selectedUser.phone}
            </DialogContentText>
            <DialogContentText>
              <strong>Role:</strong> {selectedUser.role}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setSelectedUser(null)}
              sx={custom_styling.secondaryButton}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, userId: null })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action is permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={custom_styling.secondaryButton}
            onClick={() => setConfirmDialog({ open: false, userId: null })}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            sx={custom_styling.primaryButton}
            onClick={handleDeleteUser}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersTable;
