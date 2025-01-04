import React, { useState, useEffect } from "react";

const PaginatedTable = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        alert("Error Fetching Data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const currentRecords = records.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const canGoToPrev = currentPage > 1;
  const canGoToNext = currentPage < totalPages;

  return (
    <div>
      <h2>Employee Data Table</h2>
      <table style={{ width: "100%" }}>
        <thead style={{ backgroundColor: "#38ba61", color: "white" }}>
          <tr>
            <th style={{ padding: "8px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr
              key={record.id}
              style={{
                borderBottom: "1px solid gray", // Border applied to the entire row
              }}
            >
              <td style={{ padding: "8px", textAlign: "left" }}>{record.id}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{record.name}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{record.email}</td>
              <td style={{ padding: "8px", textAlign: "left" }}>{record.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!canGoToPrev}
          style={{
            padding: "8px",
            color: "white",
            marginRight: "5px",
            backgroundColor: "#38ba61",
            borderRadius: "10px",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        <span
          style={{
            marginRight: "5px",
            color: "white",
            backgroundColor: "#38ba61",
            borderRadius: "10px",
            border: "none",
            padding: "16px 16px",
          }}
        >
          {currentPage}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!canGoToNext}
          style={{
            padding: "8px",
            color: "white",
            marginRight: "5px",
            backgroundColor: "#38ba61",
            borderRadius: "10px",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
