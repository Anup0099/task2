import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Tables = () => {
  const [products, setProducts] = useState([]);
  const [columns, setColumns] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("https://s3.amazonaws.com/open-to-cors/assignment.json")
  //     .then((response) => {
  //       const data = response.data.products;
  //       const result = Object.keys(data).map((key) => {
  //         return { id: key, ...data[key] };
  //       });
  //       console.log(result)
  //       const sortedResult = result.sort(
  //         (a, b) => parseInt(b.popularity) - parseInt(a.popularity)
  //       );
  //       setProducts(sortedResult);
  //     });
  // }, []);
  useEffect(() => {
    // how to get from localstorage
    const data = JSON.parse(localStorage.getItem("products"));
    const keys = JSON.parse(localStorage.getItem("key"));
    const show = JSON.parse(localStorage.getItem("show"));

    setColumns(
      show.map((key) => {
        return {
          field: keys[key],
          headerName: keys[key],
          width: 150,

          flex: 1,
        };
      })
    );

    setProducts(data);
  }, []);
  console.log(columns);
  return (
    <Box className="h-screen w-full flex  items-center">
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.ProductId}
      />
    </Box>
  );
};

export default Tables;
