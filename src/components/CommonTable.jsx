import { useTheme } from '../context/ThemeContext';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material';

const CommonTable = ({ data, type, customColumns }) => {
  const { isDarkMode } = useTheme();

  // Default columns configuration
  const columnDefinitions = {
    users: [
      { field: 'id', headerName: 'USER ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'email', headerName: 'Email', width: 250 },
      { field: 'role', headerName: 'Role', width: 150 },
      { field: 'createdAt', headerName: 'Joined', width: 180 },
    ],
    products: [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Product', width: 250 },
      { field: 'price', headerName: 'Price', width: 120, type: 'number' },
      { field: 'stock', headerName: 'Stock', width: 120, type: 'number' },
      { field: 'category', headerName: 'Category', width: 150 },
    ],
    orders: [
      { field: 'id', headerName: 'Order ID', width: 150 },
      { field: 'customer', headerName: 'Customer', width: 200 },
      { field: 'total', headerName: 'Total', width: 120, type: 'number' },
      { field: 'status', headerName: 'Status', width: 150 },
      { field: 'date', headerName: 'Date', width: 180 },
    ],
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        paper: isDarkMode ? '#1a1a1a' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
        secondary: isDarkMode ? '#b0b0b0' : '#666666',
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderColor: isDarkMode ? '#404040' : '#e0e0e0',
          },
          cell: {
            borderBottomColor: isDarkMode ? '#404040' : '#e0e0e0',
          },
          columnHeader: {
            backgroundColor: isDarkMode 
              ? darken('#1a1a1a', 0.2) 
              : lighten('#f5f5f5', 0.5),
          },
        },
      },
    },
  });

  const columns = customColumns || columnDefinitions[type];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection={true}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              flexDirection: 'row-reverse',
              gap: 1,
              padding: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: '600',
            },
            '& .MuiDataGrid-cell': {
              '&:focus': {
                outline: 'none',
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default CommonTable;

