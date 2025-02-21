// pages/admin/Users.jsx
import React, { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommonTable from '../../../components/CommonTable';
import DeleteModal from '../../../components/modals/DeleteModal';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', createdAt: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', createdAt: '2023-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', createdAt: '2023-03-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Manager', createdAt: '2023-04-05' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'User', createdAt: '2023-05-15' }
  ]);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openDeleteModal = () => {
    setOpenDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  }

  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    closeDeleteModal();
  };

  const handleCancleDeleteUser = () => {
    closeDeleteModal()
  };

  const userColumns = [
    { field: 'id', headerName: 'UserID', minWidth: 120 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'createdAt', headerName: 'Joined', flex: 1, minWidth: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      outline: 'none',
      renderCell: (params) => (
        <div className="flex gap-2 items-center h-full">
          <IconButton color="primary" onClick={() => console.log('Edit', params.row.id)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedUser(params.row);
              setOpenDeleteModal(true);
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminLayout className='flex flex-col gap-5 w-full'>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">User Management</h1>
          <Button variant="contained" startIcon={<Add />}>
            Add User
          </Button>
        </div>
        <CommonTable data={users} customColumns={userColumns} />
      </AdminLayout>

      <DeleteModal
        title='Confirm Delete'
        message={`Are you sure you want to delete user ${selectedUser?.name}?`}
        handleDelete={handleDeleteUser}
        handleCancleDelete={handleCancleDeleteUser}
        isOpenDeleteModal={isOpenDeleteModal}
        openDeleteModal={openDeleteModal}
        closeDeleteModal={closeDeleteModal}
      />
    </>
  );
};

export default Users;