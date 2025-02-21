import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Button, Chip } from '@mui/material';
import CommonTable from '../../../components/CommonTable';

const Orders = () => {
  const [orders] = useState(
    Array.from({ length: 50 }, (_, idx) => ({
      id: idx + 1,
      customer: `Customer ${idx + 1}`,
      total: parseFloat((Math.random() * 500).toFixed(2)),
      status: Math.random() > 0.5 ? 'Pending' : 'Completed',
      date: new Date(Date.now() - idx * 86400000).toISOString().split('T')[0],
    }))
  );

  const orderColumns = [
    { field: 'id', headerName: 'OrderID', width: 150 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'total', headerName: 'Total', width: 120, type: 'number' },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value}
          color={params.value === 'Completed' ? 'success' : 'warning'}
          variant="outlined"
        />
      )
    },
    { field: 'date', headerName: 'Date', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => console.log('Accept', params.row.id)}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => console.log('Decline', params.row.id)}
          >
            Decline
          </Button>
        </div>
      ),
    },
  ];

  //----------------------------- Title Update -----------------------------------
  useEffect(() => {
    document.title = 'Orders | Admin Panel';
  }, []);

  return (
    <AdminLayout className='flex flex-col gap-5 w-full'>
      <h1 className="text-xl font-semibold">Order Management</h1>
      <CommonTable type="orders" data={orders} customColumns={orderColumns} />
    </AdminLayout>
  );
};

export default Orders;