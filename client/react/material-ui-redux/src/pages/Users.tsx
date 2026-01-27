import { api } from '../shared/api/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'username', headerName: 'username', flex: 1 },
  { field: 'email', headerName: 'email', flex: 1 },
];

export function Users() {
  const { data: users, isLoading, refetch } = api.useGetUsersQuery();

  return (
    <div>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          paginationMode="client"
          loading={isLoading}
          columns={columns}
          rows={users || []}
        />
      </div>
    </div>
  );
}
