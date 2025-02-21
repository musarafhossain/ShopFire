import { useTheme } from '../context/ThemeContext';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material';

const CommonTable = ({ data, customColumns }) => {
  const { isDarkMode } = useTheme();

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

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={customColumns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection={true}
          disableRowSelectionOnClick={true}
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

