import { useTheme } from '@/context/ThemeContext';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { ThemeProvider, createTheme, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';

const CommonTable = ({ data, customColumns, onDeleteSelected }) => {
  const { isDarkMode } = useTheme();
  const [selectedRows, setSelectedRows] = useState([]);

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
              ? '#1e2939'
              : '#ffffff',
          },
        },
      },
    },
  });

  const CustomToolbar = () => (
    <GridToolbarContainer className={`flex justify-between items-center gap-2 ${isDarkMode ? 'bg-[#1e2939]' : 'bg-[#ffffff]'}`}>
      <GridToolbarQuickFilter />
      {selectedRows.length > 0 && (
        <Button
          variant="contained"
          startIcon={<Delete />}
          onClick={() => onDeleteSelected(selectedRows)}
          sx={{
            backgroundColor: 'transparent',
            color: '#d32f2f',
            '&:hover': {
              boxShadow: 'none',
            },
            boxShadow: 'none',
            textTransform: 'none',
          }}
        >
          Delete ({selectedRows.length})
        </Button>
      )}
    </GridToolbarContainer>
  );

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%' }} className='h-fit'>
        <DataGrid
          rows={data}
          columns={customColumns}
          pageSizeOptions={[10, 25, 50, 75, 100]} 
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 }, 
            },
          }}
          checkboxSelection={true}
          disableRowSelectionOnClick={true}
          onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          slots={{ toolbar: () => <CustomToolbar /> }}
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
            // Remove focus borders for cells
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            // Remove focus borders for cell children (buttons/checkboxes)
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
              boxShadow: 'none',
            },
            // Remove focus ring for checkboxes
            '& .MuiCheckbox-root.Mui-checked': {
              '&:focus': {
                outline: 'none',
                boxShadow: 'none',
              },
            },
            // Remove focus ring for buttons
            '& .MuiButtonBase-root:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default CommonTable;
