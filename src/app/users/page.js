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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const headCells = [
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "country", label: "Country" },
  { id: "state", label: "State" },
  { id: "city", label: "City" },
];

const limit = 2;

function UserList() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");
  const [usersList, setUsersList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
    // getC
  }, []);

  const getUsers = async () => {
    //call api here
    try {
      const cachePage = localStorage.getItem("page") || page;
      const cacheSort = localStorage.getItem("sortBy") || "username";
      const cacheSearch = localStorage.getItem("search") || "";
      setPage(cachePage);
      setSearch(cacheSearch);
      const res = await axios.get(
        `api/users?page=${cachePage}&limit=${limit}&search=${cacheSearch}&sortBy=${cacheSort}`
      );
      setUsersList(res.data.data.users);
      setCount(res.data.data.count);
    } catch (err) {
      console.log("🚀 ~ file: page.js:89 ~ getUsers ~ err:", err);
      toast.error(err);
    }
  };
  const handleRequestSort = async (property) => {
    const res = await axios.get(
      `api/users?page=${page}&limit=${limit}&${search}&sortBy=${property}`
    );
    setUsersList(res.data.data.users);
    setCount(res.data.data.count);
    localStorage.setItem("sortBy", property);
  };

  const handleChangePage = async (event, newPage) => {
    const res = await axios.get(
      `api/users?page=${newPage + 1}&limit=${limit}&${search}`
    );
    setUsersList(res.data.data.users);
    setCount(res.data.data.count);
    setPage(newPage + 1);
    localStorage.setItem("page", newPage + 1);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`api/users/${userId}`);
      const updatedUsers = usersList.filter((user) => user._id !== userId);
      setUsersList(updatedUsers);
      toast.success("User Deleted");
    } catch (err) {
      console.log("🚀 ~ file: page.js:138 ~ deleteUser ~ err:", err);
      toast.error(err);
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
      toast.success("User Updated");
    } catch (error) {}
  };

  const searchUsers = async (searchText) => {
    setSearch(searchText);
    const res = await axios.get(
      `api/users?page=${page}&limit=${limit}&search=${searchText}`
    );
    setUsersList(res.data.data.users);
    setCount(res.data.data.count);
    localStorage.setItem("search", searchText);
  };

  const handleLogout = () => {
    localStorage.clear();
    signOut();
  };

  return (
    <>
      <ToastContainer />
      <div className="p-10">
        <div className="flex justify-between items-center">
          <TextField
            className="mb-3"
            label="Filter Users"
            value={search}
            onChange={(e) => searchUsers(e.target.value)}
          />
          <button onClick={() => handleLogout()} className="cursor-pointer">
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
                {usersList.map((user) => (
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
            rowsPerPageOptions={[]}
            rowsPerPage={limit}
            component="div"
            count={count}
            page={page - 1}
            onPageChange={handleChangePage}
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
    </>
  );
}

export default UserList;
