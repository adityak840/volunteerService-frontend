import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

const Individual = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/todos/vol?volType=Test');
        const data = await response.json();
        setRowData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: ColDef[] = [
    {
        headerName: "S.No",
        valueGetter: 'node.rowIndex + 1',
        width: 90, 
        sortable: true, 
        filter: false, 
        suppressMenu: true, 
    },
    { headerName: "Task", field: "task", sortable: true, filter: true },
    { headerName: "Description", field: "description", sortable: true, filter: true },
    { headerName: "Organization Type", field: "orgType", sortable: true, filter: true },
    { headerName: "Organization", field: "orgName", sortable: true, filter: true },
    { headerName: "Volunteer Type", field: "volType", sortable: true, filter: true },
    { headerName: "Time", field: "time", sortable: true, filter: true, 
      cellRenderer: (params : ICellRendererParams) => new Date(params.value).toLocaleString() },
  ];

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 400, width: '100%' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination={true}
          domLayout="autoHeight"
        />
      )}
    </div>
  );
};

export default Individual;
