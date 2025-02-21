import React from 'react'
import ModalLayout from '../layout/ModalLayout'
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

const DeleteModal = ({ title, message, handleDelete, handleCancleDelete,isOpenDeleteModal, openDeleteModal, closeDeleteModal}) => {
    const { isDarkMode } = useTheme();
    return (
        <ModalLayout isOpenModal={isOpenDeleteModal} openModal={openDeleteModal} closeModal={closeDeleteModal}>
            <Typography id="delete-modal-title" variant="h6" component="h2" sx={{ color: isDarkMode ? '#fff' : 'text.primary' }}>
                {title}
            </Typography>
            <Typography id="delete-modal-description" sx={{ mt: 2, color: isDarkMode ? '#fff' : 'text.primary' }}>
                {message}
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={handleCancleDelete}>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </Box>
        </ModalLayout>
    )
}

export default DeleteModal