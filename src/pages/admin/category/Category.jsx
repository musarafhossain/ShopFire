import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CategoryModal from '@/components/modals/CategoryModal';
import CommonTable from '@/components/CommonTable';
import useCategoryCollection from '@/hooks/useCategoryCollection';
import LazyImage from '@/components/LazyImage';
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";

const Category = () => {
    const [isOpenCategoryModal, setOpenCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { categories, error, addCategory, updateCategory, deleteCategory } = useCategoryCollection();
    const { isDarkMode } = useTheme();

    //---------------------- Add/Update Modal Functions ----------------------------
    const openCategoryModal = () => setOpenCategoryModal(true);
    const closeCategoryModal = () => {
        setOpenCategoryModal(false);
        setSelectedCategory(null);
    };

    const handleSaveCategory = async (category) => {
        if (!category.name || !category.status || !category.image) {
            toast.error(`All fields are required.`, {
                style: {
                    background: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                },
            });
            return;
        }
        if (category.id) {
            await updateCategory(category);
        } else {
            await addCategory(category);
        }
        closeCategoryModal();
    };

    // Define columns for the MUI DataTable
    const categoryColumns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 1 },
        { field: "name", headerName: "Category Name", flex: 2, minWidth: 200 },
        {
            field: "image",
            headerName: "Image",
            width: 120,
            renderCell: (params) => (
                <div className='h-full flex items-center'>
                    <LazyImage src={params.value} alt="Category" className="w-20 h-20 object-cover rounded-md" />
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
                        onClick={() => {
                            setSelectedCategory(params.row);
                            openCategoryModal();
                        }}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={async () => await deleteCategory(params.row.id)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </div>
            ),
        },
    ];

    const onDeleteSelected = async (categoryIds) => {
        categoryIds.forEach(async categoryId => {
            if (categoryId) await deleteCategory(categoryId);
        });
    }

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
                    onDeleteSelected={onDeleteSelected}
                    emptyMessage="No Category found"
                />
            </AdminLayout>

            <CategoryModal
                isOpen={isOpenCategoryModal}
                closeModal={closeCategoryModal}
                openModal={openCategoryModal}
                category={selectedCategory}
                handleSaveCategory={handleSaveCategory}
            />
        </>
    );
};

export default Category;
