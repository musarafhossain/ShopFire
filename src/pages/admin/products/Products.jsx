// pages/admin/Products.jsx
import React, { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommonTable from '../../../components/CommonTable';

const Products = () => {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, stock: 15, category: 'Electronics' },
    { id: 2, name: 'T-Shirt', price: 29, stock: 100, category: 'Apparel' },
  ]);

  const productColumns = [
    { field: 'id', headerName: 'Product ID', width: 100 },
    { field: 'name', headerName: 'Product', width: 250 },
    { field: 'price', headerName: 'Price', width: 120, type: 'number' },
    { field: 'stock', headerName: 'Stock', width: 120, type: 'number' },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2">
          <IconButton color="primary" onClick={() => console.log('Edit', params.row.id)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => console.log('Delete', params.row.id)}>
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
          <h1 className="text-xl font-semibold">Product Management</h1>
          <Button variant="contained" startIcon={<Add />}>
            Add Product
          </Button>
        </div>
      }
    >
      <CommonTable type="products" data={products} customColumns={productColumns} />
    </AdminLayout>
  );
};

export default Products;