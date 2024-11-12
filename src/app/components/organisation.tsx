import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';  // AG Grid Styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // AG Grid Theme
import { ColDef, ICellRendererParams } from 'ag-grid-community'; // Import AG Grid Types

const Organisation = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgName = localStorage.getItem("orgName")
    console.log(orgName)
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/todos/org?orgName=${orgName}`
        );
        const data = await response.json();
        setRowData(data); // Assuming the response is an array of objects
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
    {
      headerName: "Completed",
      field: "completed",
      sortable: true,
      filter: true,
      // Type the params with ICellRendererParams
      cellRenderer: (params: ICellRendererParams) => params.value ? 'Yes' : 'No',
    },
    {
      headerName: "Time",
      field: "time",
      sortable: true,
      filter: true,
      // Type the params with ICellRendererParams
      cellRenderer: (params: ICellRendererParams) => new Date(params.value).toLocaleString(),
    },
    {
      headerName: "Volunteer Name",
      field: "volunteer.volunteerName", // Nested field access
      sortable: true,
      filter: true
    }
  ];

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 400, width: '100%' }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={columns} // Use the correctly typed columnDefs here
          pagination={true}
          domLayout="autoHeight"
        />
      )}
    </div>
  );
};

export default Organisation;
