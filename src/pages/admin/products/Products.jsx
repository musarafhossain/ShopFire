// pages/admin/Products.jsx
import React, { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Button, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import CommonTable from '../../../components/CommonTable';
import ProductModal from '../../../components/modals/ProductModal';
import useProductsCollection from "@/hooks/useProductsCollection";
import toast from "react-hot-toast";
import { useTheme } from "@/context/ThemeContext";
import LazyImage from '@/components/LazyImage'

const Products = () => {
  //state
  const [editedProduct, setEditedProduct] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  //hooks
  const { products, error, addProduct, updateProduct, deleteProduct } = useProductsCollection();
  const { isDarkMode } = useTheme();

  //modal handle functions
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    setEditedProduct({});
  };

  //products columns
  const productColumns = [
    { field: "id", headerName: "ProductID", width: 200 },
    { field: "name", headerName: "Product", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
          <LazyImage
            src={params.row.images?.[0]}
            alt="Product"
            className='w-[80px] h-[80px] object-cover rounded-lg'
          />
        </div>
      ),
    },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "price", headerName: "Price", width: 120, type: "number" },
    { field: "mrp", headerName: "MRP", width: 120, type: "number" },
    { field: "stock", headerName: "Stock", width: 120, type: "number" },
    { field: "category", headerName: "Category", width: 150 },
    { field: "rating", headerName: "Rating", width: 120, type: "number" },
    {
      field: "sizes",
      headerName: "Sizes",
      width: 200,
      renderCell: (params) => (
        <div className="flex flex-wrap gap-3 overflow-scroll h-full items-center no-scrollbar">
          {params.row.sizes?.length > 0 ? (
            params.row.sizes.map((item, index) => (
              <span key={index} className="text-lg rounded-md">
                {item.size}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No sizes</p>
          )}
        </div>
      ),
    },
    {
      field: "productDetails",
      headerName: "Product Details",
      width: 250,
      renderCell: (params) => (
        <div className="flex flex-col h-full gap-1 scroll-smooth overflow-auto relative py-2 no-scrollbar">
          {params.row.productDetails?.length > 0 ? (
            params.row.productDetails.map((detail, index) => (
              <p key={index} className="text-sm">
                <strong>{detail.key}:</strong> {detail.value}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No details</p>
          )}
        </div>
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
            onClick={async () => {
              let selectedProduct = products.find(product => product.id === params.row.id);
              if (!selectedProduct) {
                toast.error("Product not found");
                return;
              }
              setEditedProduct(selectedProduct); // Set the correct product
              openModal();
              //console.log("Editing Product:", selectedProduct);
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={async () => await deleteProduct(params.row.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      ),
    }
  ];

  const onDeleteSelected = async (productIds) => {
    productIds.forEach(async (productId) => {
      if (productId) await deleteProduct(productId);
    });
  }

  const handleSaveProduct = async (product) => {
    if (!product.name || !product.brand || !product.price || !product.mrp || !product.stock || !product.category || !product.rating || !product.images || product.images.length === 0) {
      toast.error("All fields are required, including images.", {
        style: {
          background: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#333",
        },
      });
      return;
    }
    try {
      if (editedProduct?.id) {
        // Updating an existing product
        await updateProduct(editedProduct.id, product);
        //console.log("Updated product", product);
      } else {
        // Adding a new product
        await addProduct(product);
        //console.log("Added product", product);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      closeModal();
    }
  };

  return (
    <AdminLayout className='flex flex-col gap-5 w-full'>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manage Products</h1>
        <Button variant="contained" startIcon={<Add />} onClick={() => {
          setEditedProduct({});
          openModal();
        }}>
          Add Product
        </Button>
      </div>
      <CommonTable
        emptyMessage="No products found"
        data={products}
        customColumns={productColumns}
        onDeleteSelected={onDeleteSelected}
      />
      <ProductModal
        isOpen={isOpenModal}
        openModal={openModal}
        closeModal={closeModal}
        product={editedProduct}
        handleSaveProduct={handleSaveProduct}
      />
    </AdminLayout>
  );
};

export default Products;