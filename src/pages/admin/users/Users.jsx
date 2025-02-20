// pages/admin/Users.jsx
import React, { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommonTable from '../../../components/CommonTable';

const Users = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', createdAt: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', createdAt: '2023-02-20' },
  ]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (userId) => {
    // Delete logic here
    setDeleteDialogOpen(false);
  };

  const userColumns = [
    { field: 'id', headerName: 'User ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'createdAt', headerName: 'Joined', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconButton color="primary" onClick={() => console.log('Edit', params.row.id)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            color="error"
            onClick={() => {
              setSelectedUser(params.row);
              setDeleteDialogOpen(true);
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">User Management</h1>
          <Button variant="contained" startIcon={<Add />}>
            Add User
          </Button>
        </div>
      }
    >
      <CommonTable type="users" data={users} customColumns={userColumns} />
      
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium">Confirm Delete</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete user {selectedUser?.name}?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteUser(selectedUser.id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;