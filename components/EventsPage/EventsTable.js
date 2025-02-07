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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Button,
  Typography,
  Tooltip,
  TablePagination,
  TextField,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import Image from "next/image";
import { CUSTOM_COLORS } from "@/theme/colors";
import { useRouter } from "next/navigation";
import { custom_styling } from "@/theme/mui-theme";

const EventsTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const events = await response.json();
        setData(events);
        setFilteredData(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        await fetch(`/api/events/${id}`, { method: "DELETE" }); 
        setData((prevData) => prevData.filter((event) => event._id !== _id));
        setFilteredData((prevData) => prevData.filter((event) => event._id !== _id));
        alert("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete the event.");
      }
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = data.filter(
      (event) =>
        event.title.toLowerCase().includes(value) ||
        event.category.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color={CUSTOM_COLORS.SECONDARY} />
      </div>
    );
  }

  function CreateEventNavigation() {
    router.push("/dashboard/create-event");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <Button
          onClick={CreateEventNavigation}
          sx={custom_styling.primaryButton}
        >
          Create Event
        </Button>
      </div>

      <div className="mb-4">
        <TextField
          label="Search Events"
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
                <Typography fontWeight="bold">Title</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Date</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Time</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Location</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Category</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Price</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Available Seats</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow
                  key={event.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f9f9f9" },
                  }}
                >
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>${event.price}</TableCell>
                  <TableCell>{event.availableSeats}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton
                        color="primary"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Event">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(event.id)}
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedEvent.title}</DialogTitle>
          <DialogContent>
            <Image
              className="object-cover"
              src={selectedEvent.image}
              alt={selectedEvent.title}
              width={700}
              height={500}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <DialogContentText>
              <strong>Description:</strong> {selectedEvent.description}
            </DialogContentText>
            <DialogContentText>
              <strong>Date:</strong> {selectedEvent.date}
            </DialogContentText>
            <DialogContentText>
              <strong>Time:</strong> {selectedEvent.time}
            </DialogContentText>
            <DialogContentText>
              <strong>Location:</strong> {selectedEvent.location}
            </DialogContentText>
            <DialogContentText>
              <strong>Category:</strong> {selectedEvent.category}
            </DialogContentText>
            <DialogContentText>
              <strong>Price:</strong> ${selectedEvent.price}
            </DialogContentText>
            <DialogContentText>
              <strong>Available Seats:</strong> {selectedEvent.availableSeats}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setSelectedEvent(null)}
              sx={custom_styling.secondaryButton}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default EventsTable;
