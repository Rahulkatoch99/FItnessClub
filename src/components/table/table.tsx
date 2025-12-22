import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TablePagination,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

interface DynamicTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

export default function DataTable<T extends object>({
  data,
  columns,
}: DynamicTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const isMobile = useMediaQuery("(max-width:600px)");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = table
    .getRowModel()
    .rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (isMobile) {
    return (
      <Paper sx={{ borderRadius: 2, overflow: "hidden", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}>
          {paginatedRows.length > 0 ? (
            paginatedRows.map((row) => (
              <Box
                key={row.id}
                sx={{
                  borderRadius: 2,
                  border: "1px solid #222",
                  bgcolor: "#0f1724",
                  p: 1.25,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.28)",
                }}
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <Box
                    key={cell.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 1.5,
                      py: 0.4,
                    }}
                  >
                    {(() => {
                      const headerContext = { column: cell.column, table } as any;
                      return (
                        <Typography
                          variant="body2"
                          sx={{ color: "#94a3b8", minWidth: 110, fontWeight: 600 }}
                        >
                          {flexRender(cell.column.columnDef.header, headerContext)}
                        </Typography>
                      );
                    })()}
                    <Typography
                      variant="body2"
                      sx={{ color: "#e2e8f0", textAlign: "right", flex: 1 }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", textAlign: "center", py: 2 }}
            >
              No Records Found
            </Typography>
          )}
        </Box>

        <Divider sx={{ borderColor: "#1f2937" }} />

        <Box sx={{ display: "flex", justifyContent: "center", px: 1 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 30]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ borderRadius: 2, overflow: "hidden", width: "100%" }}>
      {/* Scrollable Table */}
      <TableContainer
        sx={{
          minHeight: { xs: "auto", md: 640 },
          maxHeight: { xs: "auto", md: 640 },
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table
          sx={{
            minWidth: { xs: 520, sm: 720, md: 960 },
            width: "100%",
            tableLayout: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      color: "#F7F7F7",
                      fontSize: { xs: 12.5, md: 14 },
                      fontWeight: 600,
                      borderRight: "1px solid #263238",
                      py: { xs: 0.9, md: 1.5 },
                      backgroundColor: "#1d2a30", // keep dark header
                      position: "sticky", // sticky header
                      top: 0,
                      zIndex: 2, // above table rows
                      whiteSpace: "nowrap",
                      wordBreak: "normal",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:hover": { bgcolor: "#F3F5F6" },
                    transition: "0.15s",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        fontSize: { xs: 12.5, md: 14 },
                        py: { xs: 0.9, md: 1.2 },
                        whiteSpace: "nowrap",
                        wordBreak: "normal",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  align="center"
                  sx={{ py: 4 }}
                >
                  No Records Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
}
