// src/components/UserList.js
"use client";

import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { signOut } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import EditProfileModal from "@/components/users/EditProfileModal";

const headCells = [
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "country", label: "Country" },
  { id: "state", label: "State" },
  { id: "city", label: "City" },
];

function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");
  const [filter, setFilter] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    // const users = fetch
    //call api here
    const res = await axios.get("api/users");
    setUsersList(res.data.data);
  };
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredUsers = usersList.filter((user) => {
    return (
      user.username.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.country.toLowerCase().includes(filter.toLowerCase()) ||
      user.state.toLowerCase().includes(filter.toLowerCase()) ||
      user.city.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`api/users/${userId}`);
      const updatedUsers = usersList.filter((user) => user._id !== userId);
      setUsersList(updatedUsers);
    } catch (err) {
      console.log("🚀 ~ file: page.js:138 ~ deleteUser ~ err:", err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const updateUser = async () => {
    try {
      await axios.put(`api/users/${selectedUser._id}`, selectedUser);
      const updatedUsersList = usersList.map((user) => {
        if (user._id === selectedUser._id) {
          return selectedUser;
        }
        return user;
      });
      setUsersList(updatedUsersList);
      setSelectedUser({});
      handleClose();
    } catch (error) {}
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <TextField
          className="mb-3"
          label="Filter Users"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={() => signOut()} className="cursor-pointer">
          <span>Logout</span>
        </button>
      </div>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.state}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>
                      <button onClick={() => openModal(user)}>
                        <EditIcon className="text-gray-500" />
                      </button>{" "}
                      {/* Add your edit user logic here */}
                      <button onClick={() => deleteUser(user._id)}>
                        <DeleteIcon className="text-rose-700" />
                      </button>{" "}
                      {/* Add your delete user logic here */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <EditProfileModal
          open={open}
          handleClose={handleClose}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          updateUser={updateUser}
        />
      )}
    </div>
  );
}

export default UserList;
