// pages/admin/Products.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommonTable from '../../../components/CommonTable';

const Products = () => {
  const [products, setProducts] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 50,
      stock: Math.floor(Math.random() * 100) + 1,
      category: i % 2 === 0 ? 'Electronics' : 'Apparel',
      brand: i % 2 === 0 ? 'Dell' : 'Nike',
      sku: `SKU${i + 1000}`,
      supplier: i % 2 === 0 ? 'TechSupplier Inc.' : 'FashionTrend',
      description: 'Sample product description.',
      rating: Number((Math.random() * 5).toFixed(1)),
      dateAdded: '2025-02-22',
    }))
  );

  const productColumns = [
    { field: 'id', headerName: 'ProductID', width: 100 },
    { field: 'name', headerName: 'Product', width: 200 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'price', headerName: 'Price', width: 120, type: 'number' },
    { field: 'stock', headerName: 'Stock', width: 120, type: 'number' },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'supplier', headerName: 'Supplier', width: 180 },
    { field: 'rating', headerName: 'Rating', width: 120, type: 'number' },
    { field: 'dateAdded', headerName: 'Date Added', width: 150 },
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


  //----------------------------- Title Update -----------------------------------
  useEffect(() => {
    document.title = 'Products | Admin Panel';
  }, []);

  return (
    <AdminLayout className='flex flex-col gap-5 w-full'>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manage Product</h1>
        <Button variant="contained" startIcon={<Add />}>
          Add Product
        </Button>
      </div>
      <CommonTable type="products" data={products} customColumns={productColumns} />
    </AdminLayout>
  );
};

export default Products;