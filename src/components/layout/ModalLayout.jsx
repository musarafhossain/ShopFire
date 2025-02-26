import React, { useEffect } from 'react';
import { Modal, Box, Grow } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

const ModalLayout = ({ children, isOpenModal, openModal, closeModal }) => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        if (isOpenModal) openModal();
    }, [isOpenModal]);

    const handleClose = () => {
        setTimeout(closeModal, 0);
    };

    return (
        <Modal
            open={isOpenModal}
            onClose={handleClose}
            closeAfterTransition
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Grow in={isOpenModal}>
                <Box sx={{
                    width: '95%',
                    maxWidth: '700px',
                    maxHeight: '95%',
                    bgcolor: isDarkMode ? '#1e1e1e' : 'background.paper',
                    color: isDarkMode ? '#fff' : 'text.primary',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 2,
                }}>
                    {children}
                </Box>
            </Grow>
        </Modal>
    );
};

export default ModalLayout;
