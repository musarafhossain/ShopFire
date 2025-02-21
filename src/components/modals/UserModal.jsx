import React, { useEffect, useState } from 'react';
import ModalLayout from '../layout/ModalLayout';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

const UserModal = ({ isOpen, closeModal, handleSaveUser, editingUser, openModal }) => {
    const { isDarkMode } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    // Populate fields when editing a user
    useEffect(() => {
        setName(editingUser?.name || '');
        setEmail(editingUser?.email || '');
        setRole(editingUser?.role || '');
    }, [editingUser]);

    const handleSubmit = () => {
        handleSaveUser({ name, email, role, id: editingUser?.id, createdAt: editingUser?.createdAt });
    };

    return (
        <ModalLayout isOpenModal={isOpen} closeModal={closeModal} openModal={openModal}>
            <Box 
                sx={{
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                    padding: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2" sx={{ color: isDarkMode ? '#fff' : 'text.primary' }}>
                    {editingUser ? 'Edit User' : 'Add User'}
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            style: { color: isDarkMode ? '#bbb' : '#333' },
                        }}
                        InputProps={{
                            style: {
                                color: isDarkMode ? '#fff' : '#000',
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                            },
                        }}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            style: { color: isDarkMode ? '#bbb' : '#333' },
                        }}
                        InputProps={{
                            style: {
                                color: isDarkMode ? '#fff' : '#000',
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                            },
                        }}
                    />
                    <TextField
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            style: { color: isDarkMode ? '#bbb' : '#333' },
                        }}
                        InputProps={{
                            style: {
                                color: isDarkMode ? '#fff' : '#000',
                                backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                            },
                        }}
                    />
                </Box>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={closeModal}
                        sx={{
                            borderColor: isDarkMode ? '#888' : 'inherit',
                            color: isDarkMode ? '#bbb' : 'inherit',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: isDarkMode ? '#1976d2' : '#1976d2',
                            '&:hover': {
                                backgroundColor: isDarkMode ? '#1565c0' : '#115293',
                            },
                        }}
                    >
                        {editingUser ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </ModalLayout>
    );
};

export default UserModal;
