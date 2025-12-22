import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Stack,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import { data as memberData } from "../member-page/data";
import { Member } from "../member-page/types";

const statusChip = (status: string) => {
  const colors: Record<string, { bg: string; color: string }> = {
    Active: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
    Pending: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
    Expired: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
  };
  const style = colors[status] || colors.Active;
  return <Chip label={status} size="small" sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700 }} />;
};

const AttendancePage = () => {
  const members = useMemo<Member[]>(() => memberData, []);
  const [present, setPresent] = useState<Record<number, boolean>>({});
  const [enrolled, setEnrolled] = useState<Record<number, boolean>>({});
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggle = (id: number) => {
    if (!enrolled[id]) return;
    setPresent((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markAll = (value: boolean) => {
    const next: Record<number, boolean> = {};
    members.forEach((m) => {
      if (enrolled[m.id]) next[m.id] = value;
    });
    setPresent(next);
  };

  const presentCount = Object.values(present).filter(Boolean).length;

  const enrollFace = (id: number) => {
    setEnrolled((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <Box sx={{ color: "#f5f5f5", backgroundColor: "#0a0a0f", minHeight: "95vh", py: 4 }}>
      <Box sx={{ maxWidth: 1320, mx: "auto", px: { xs: 2, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#ff6835" }}>
              Attendance
            </Typography>
            <Typography variant="body2" sx={{ color: "#c7ced9" }}>
              Mark daily check-ins for members. This uses local state only.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={() => markAll(true)} sx={{ borderColor: "#22c55e", color: "#22c55e" }}>
              Mark all present
            </Button>
            <Button variant="outlined" onClick={() => markAll(false)} sx={{ borderColor: "#ef4444", color: "#ef4444" }}>
              Clear all
            </Button>
          </Stack>
        </Stack>

        <Paper
          sx={{
            backgroundColor: "transparent",
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
            overflow: "hidden",
            maxHeight: 720,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <Typography sx={{ fontWeight: 700, color: "#e2e8f0" }}>Today</Typography>
            <Chip label={`Present: ${presentCount}/${members.length}`} size="small" sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e", fontWeight: 700 }} />
          </Box>

          {isMobile ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 1.25 }}>
              {members.map((m) => (
                <Box
                  key={m.id}
                  sx={{
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.08)",
                    bgcolor: "rgba(0,0,0,0.25)",
                    p: 1.25,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.28)",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography sx={{ color: "#e2e8f0", fontWeight: 700 }}>{m.name}</Typography>
                    <Chip label={m.plan} size="small" sx={{ bgcolor: "rgba(255,255,255,0.08)", color: "#e2e8f0" }} />
                  </Stack>
                  <Stack spacing={0.5}>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      Phone: {m.phone}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      Join: {m.joinDate} • Due: {m.dueDate}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      Status: <Chip size="small" label={m.status} sx={{ ml: 0.5, ...statusChip(m.status).props?.sx }} />
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                      {enrolled[m.id] ? (
                        <>
                          <Chip
                            label="Face added"
                            size="small"
                            sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e", fontWeight: 700 }}
                          />
                          {present[m.id] ? (
                            <Chip
                              label="Present"
                              size="small"
                              sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e", fontWeight: 700 }}
                            />
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => toggle(m.id)}
                              sx={{
                                backgroundColor: "#22c55e",
                                color: "#0b1510",
                                textTransform: "none",
                                fontWeight: 700,
                                px: 1.5,
                                py: 0.4,
                                "&:hover": { backgroundColor: "#1da768" },
                              }}
                            >
                              Mark present
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => enrollFace(m.id)}
                          sx={{
                            borderColor: "#94a3b8",
                            color: "#94a3b8",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 1.5,
                            py: 0.4,
                          }}
                        >
                          Add face
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ overflowY: "auto", overflowX: "auto" }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#94a3b8" }}>Face ID</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Attendance</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Name</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Phone</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Plan</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Join Date</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Due Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((m) => (
                    <TableRow key={m.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}>
                      <TableCell>
                        {enrolled[m.id] ? (
                          <Chip
                            label="Face added"
                            size="small"
                            sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e", fontWeight: 700 }}
                          />
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => enrollFace(m.id)}
                            sx={{
                              borderColor: "#94a3b8",
                              color: "#94a3b8",
                              textTransform: "none",
                              fontWeight: 600,
                              px: 1.5,
                              py: 0.5,
                            }}
                          >
                            Add face
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        {enrolled[m.id] ? (
                          present[m.id] ? (
                            <Chip
                              label="Present"
                              size="small"
                              sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e", fontWeight: 700 }}
                            />
                          ) : (
                            <Stack direction="row" spacing={1}>
                              <Chip
                                label="Not marked"
                                size="small"
                                sx={{ bgcolor: "rgba(148,163,184,0.15)", color: "#94a3b8", fontWeight: 700 }}
                              />
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => toggle(m.id)}
                                sx={{
                                  backgroundColor: "#22c55e",
                                  color: "#0b1510",
                                  textTransform: "none",
                                  fontWeight: 700,
                                  px: 1.5,
                                  py: 0.5,
                                  "&:hover": { backgroundColor: "#1da768" },
                                }}
                              >
                                Mark present
                              </Button>
                            </Stack>
                          )
                        ) : (
                          <Chip
                            label="Enroll face"
                            size="small"
                            sx={{ bgcolor: "rgba(239,68,68,0.15)", color: "#ef4444", fontWeight: 700 }}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ color: "#e2e8f0", fontWeight: 600 }}>{m.name}</TableCell>
                      <TableCell sx={{ color: "#cbd5e1" }}>{m.phone}</TableCell>
                      <TableCell sx={{ color: "#cbd5e1" }}>{m.plan}</TableCell>
                      <TableCell>{statusChip(m.status)}</TableCell>
                      <TableCell sx={{ color: "#cbd5e1" }}>{m.joinDate}</TableCell>
                      <TableCell sx={{ color: "#cbd5e1" }}>{m.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AttendancePage;

