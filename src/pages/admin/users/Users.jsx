// pages/admin/Users.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommonTable from '@/components/CommonTable';
import DeleteModal from '@/components/modals/DeleteModal';
import UserModal from '@/components/modals/UserModal';
import useUsersCollection from "@/hooks/useUsersCollection";

const Users = () => {
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);  // Delete Modal State
  const [isOpenUserModal, setOpenUserModal] = useState(false);      // User Modal State
  const [selectedUser, setSelectedUser] = useState(null);           // Selected User State
  const { users, error, addUser, updateUser, deleteUser } = useUsersCollection();

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
    { field: "id", headerName: "User ID", minWidth: 200 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 250 },
    { field: "phoneNumber", headerName: "Phone", minWidth: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "role", headerName: "Role", width: 120 },

    // Convert Timestamp to Readable Date
    /* {
      field: "createdAt",
      headerName: "Joined",
      minWidth: 180,
      valueGetter: (params) => {
        const timestamp = params.row.createdAt;
        return timestamp?.seconds ? new Date(timestamp.seconds * 1000).toLocaleString() : "N/A";
      },
    }, */

    // Display Profile Picture
    {
      field: "photoURL",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "/default-avatar.png"}
          alt="User Avatar"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
      ),
    },

    // Display Address as a Readable String
    {
      field: "address",
      headerName: "Address",
      flex: 2,
      minWidth: 250,
      valueGetter: (params) => {
        const addresses = params?.row?.addresses || [];
        return addresses.length > 0
          ? `${addresses[0].address}, ${addresses[0].city}, ${addresses[0].state} - ${addresses[0].pincode}`
          : "No Address";
      },
    },

    // Wishlist & Coupons Count
    { field: "wishlist", headerName: "Wishlist Items", width: 140, valueGetter: (params) => params?.row?.wishlist?.length || 0 },
    { field: "coupons", headerName: "Coupons", width: 100, valueGetter: (params) => params?.row?.coupons?.length || 0 },

    // Actions (Edit & Delete)
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
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