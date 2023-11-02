import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

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
