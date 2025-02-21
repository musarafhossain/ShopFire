// pages/admin/Users.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommonTable from '@/components/CommonTable';
import DeleteModal from '../../../components/modals/DeleteModal';
import UserModal from '../../../components/modals/UserModal';

const Users = () => {
  const [users, setUsers] = useState(
    Array.from({ length: 150 }, (_, i) => {
      const roles = ['Admin', 'User', 'Manager'];
      const date = new Date(2023, 0, 1 + i);
      return {
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: roles[i % roles.length],
        createdAt: date.toISOString().split('T')[0],
      };
    })
  ); // Users State
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);  // Delete Modal State
  const [isOpenUserModal, setOpenUserModal] = useState(false);      // User Modal State
  const [selectedUser, setSelectedUser] = useState(null);           // Selected User State

  //------------------------ Delete Modal Functions ------------------------------
  const openDeleteModal = () => setOpenDeleteModal(true);
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedUser(null);
  }
  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    closeDeleteModal();
  };
  const handleDeleteSelected = (selectedIds) => {
    setUsers(users.filter(user => !selectedIds.includes(user.id)));
  };

  //---------------------- Add/Update Modal Functions ----------------------------
  const openUserModal = () => setOpenUserModal(true);
  const closeUserModal = () => {
    setOpenUserModal(false);
    setSelectedUser(null);
  }
  const handleSaveUser = (user) => {
    if (selectedUser) {
      // Editing an existing user
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
    } else {
      // Adding a new user
      const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = { ...user, id: newId, createdAt: new Date().toISOString().split('T')[0] };
      setUsers([...users, newUser]);
    }
    closeUserModal();
  };

  //---------------------------- Table Columns -----------------------------------
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
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedUser(params.row);
              openUserModal();
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedUser(params.row);
              openDeleteModal();
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  //----------------------------- Title Update -----------------------------------
  useEffect(() => {
    document.title = 'Users | Admin Panel';
  }, []);

  //----------------------------------- UI ---------------------------------------
  return (
    <>
      <AdminLayout className='flex flex-col gap-5 w-full'>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">User Management</h1>
          <Button variant="contained" startIcon={<Add />} onClick={openUserModal}>
            Add User
          </Button>
        </div>
        <CommonTable 
          data={users} 
          customColumns={userColumns} 
          onDeleteSelected={handleDeleteSelected}
          emptyMessage="No users found"
        />
      </AdminLayout>

      <DeleteModal
        title='Confirm Delete'
        message={`Are you sure you want to delete user ${selectedUser?.name}?`}
        handleDelete={handleDeleteUser}
        isOpenDeleteModal={isOpenDeleteModal}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
      />

      <UserModal
        isOpen={isOpenUserModal}
        closeModal={closeUserModal}
        openModal={openUserModal}
        editingUser={selectedUser}
        handleSaveUser={handleSaveUser}
      />
    </>
  );
};

export default Users;