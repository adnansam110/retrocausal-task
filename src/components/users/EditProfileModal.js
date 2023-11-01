import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function EditProfileModal({
  open,
  handleClose,
  selectedUser,
  setSelectedUser,
  updateUser,
}) {
  const { username, state, city, country } = selectedUser;
  const handleSave = () => {
    // You can perform your save or update logic here
    updateUser();
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleOpen}>
        Edit Profile
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-3">
            Make changes to your profile:
          </DialogContentText>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, username: e.target.value })
            }
          />
          <br />
          <br />
          <span>Country</span>
          <Select
            fullWidth
            value={country}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, country: e.target.value })
            }
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </Select>
          <br />
          <br />
          <span>State</span>
          <Select
            fullWidth
            value={state}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, state: e.target.value })
            }
          >
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="California">California</MenuItem>
            <MenuItem value="Texas">Texas</MenuItem>
          </Select>
          <br />
          <br />
          <span>City</span>
          <Select
            fullWidth
            value={city}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, city: e.target.value })
            }
          >
            <MenuItem value="New York City">New York City</MenuItem>
            <MenuItem value="Buffalo">Buffalo</MenuItem>
            <MenuItem value="Albany">Albany</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfileModal;
