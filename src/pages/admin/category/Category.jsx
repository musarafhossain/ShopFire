import React, { useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CategoryModal from '@/components/modals/CategoryModal';
import CommonTable from '@/components/CommonTable';

const Category = () => {
    const [isOpenCategoryModal, setOpenCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]); // Categories state

    //---------------------- Add/Update Modal Functions ----------------------------
    const openCategoryModal = () => setOpenCategoryModal(true);
    const closeCategoryModal = () => {
        setOpenCategoryModal(false);
        setSelectedCategory(null);
    }

    const handleSaveCategory = (category) => {
        if (category.id) {
            // Update existing category
            setCategories(prevCategories =>
                prevCategories.map(cat => (cat.id === category.id ? category : cat))
            );
        } else {
            // Add new category with unique ID
            setCategories(prevCategories => [...prevCategories, { ...category, id: Date.now().toString() }]);
        }
        closeCategoryModal();
    };

    // Define columns for the MUI DataTable
    const categoryColumns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Category Name", flex: 2, width: 200 },
        {
            field: "image",
            headerName: "Image",
            flex: 1,
            width: 120,
            renderCell: (params) => (
                <div className='h-full flex items-center'>
                    <img src={params.value} alt="Category" className="w-20 h-20 object-cover rounded-md" />
                </div>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            renderCell: (params) => (
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border 
                        ${params.value === "Active" ? "border-green-500/40 text-green-500" : "border-red-500/40 text-red-500"}
                    `}
                >
                    {params.value}
                </span>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <div className="flex gap-2 justify-center h-full items-center">
                    <IconButton
                        color="primary"
                        onClick={() => setSelectedCategory(params.row) || openCategoryModal()}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteCategory(params.row.id)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </div>
            ),
        },
    ];

    const handleDeleteCategory = (id) => {
        setCategories(prevCategories => prevCategories.filter(cat => cat.id !== id));
    };

    return (
        <>
            <AdminLayout className='flex flex-col gap-5 w-full'>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Manage Category</h1>
                    <Button variant="contained" startIcon={<Add />} onClick={openCategoryModal}>
                        Add Category
                    </Button>
                </div>
                <CommonTable
                    data={categories}
                    customColumns={categoryColumns}
                    onDeleteSelected={() => { }}
                    emptyMessage="No Category found"
                />
            </AdminLayout>

            <CategoryModal
                isOpen={isOpenCategoryModal}
                closeModal={closeCategoryModal}
                openModal={openCategoryModal}
                editingCategory={selectedCategory}
                handleSaveCategory={handleSaveCategory}
            />
        </>
    )
}

export default Category;
