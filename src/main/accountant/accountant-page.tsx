import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Chip,
  Stack,
  LinearProgress,
  Avatar,
  Container,
  useMediaQuery,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import { data as memberData } from "../member-page/data";
import { Member } from "../member-page/types";

const currency = (value: number) =>
  value.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const AccountantPage = () => {
  const isMdDown = useMediaQuery("(max-width:960px)");

  const activeMembers = memberData.filter((m) => m.status === "Active");
  const pendingMembers = memberData.filter((m) => m.status === "Pending");
  const expiredMembers = memberData.filter((m) => m.status === "Expired");
  const totalMembers = memberData.length;

  const sumFees = (members: Member[]) =>
    members.reduce((acc, curr) => acc + Number(curr.fees || 0), 0);

  const totalActiveFees = sumFees(activeMembers);
  const totalPendingFees = sumFees(pendingMembers);
  const avgActiveFee = activeMembers.length ? totalActiveFees / activeMembers.length : 0;
  const collectionRate =
    (totalActiveFees / Math.max(totalActiveFees + totalPendingFees, 1)) * 100;

  const planTotals = activeMembers.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.plan] = (acc[curr.plan] || 0) + Number(curr.fees || 0);
    return acc;
  }, {});

  const planRows = Object.entries(planTotals).map(([plan, total]) => ({ plan, total }));
  const maxPlanValue = Math.max(...(planRows.map((p) => p.total) as number[]), 1);

  const latestActive = activeMembers.slice(0, 5);

  const cards = [
    {
      label: "Active Members",
      icon: <PeopleIcon />,
      color: "#7c3aed",
      value: activeMembers.length.toString(),
    },
    {
      label: "Active Fees",
      icon: <AccountBalanceWalletIcon />,
      color: "#ff7a45",
      value: currency(totalActiveFees),
    },
    {
      label: "Pending Fees",
      icon: <TrendingUpIcon />,
      color: "#f59e0b",
      value: currency(totalPendingFees),
    },
    {
      label: "Expired Members",
      icon: <PaidIcon />,
      color: "#ef4444",
      value: expiredMembers.length.toString(),
    },
  ];

  const dueSoon = [...pendingMembers]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 6);

  const topPayers = [...activeMembers]
    .sort((a, b) => Number(b.fees || 0) - Number(a.fees || 0))
    .slice(0, 5);

  const cardSx = {
    p: { xs: 1.5, md: 2 },
    bgcolor: "rgba(15,23,36,0.78)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 2,
    boxShadow: "0 12px 28px rgba(0,0,0,0.28)",
    backdropFilter: "blur(10px)",
  } as const;

  return (
    <Box
      sx={{
        color: "#f5f5f5",
        backgroundColor: "#0a0a0f",
        height: "95vh",
        overflowY: "auto",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#ff7a45", mb: 0.5 }}>
            Accountant
          </Typography>
          <Typography variant="body2" sx={{ color: "#c7ced9" }}>
            Revenue health, outstanding fees, and member payment insights.
          </Typography>
        </Box>
        <Chip
          label={`Collection Rate: ${collectionRate.toFixed(0)}%`}
          sx={{
            bgcolor: "rgba(34,197,94,0.15)",
            color: "#22c55e",
            fontWeight: 700,
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        />
      </Box>

      <Grid container spacing={1.5}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Paper
              sx={{
                ...cardSx,
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "#e2e8f0",
              }}
            >
              <Avatar sx={{ bgcolor: card.color, color: "#fff", width: 42, height: 42 }}>
                {card.icon}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase" }}>
                  {card.label}
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>
                  {card.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1.5} sx={{ mt: 1.25, alignItems: "stretch" }}>
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              ...cardSx,
              height: "100%",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography sx={{ fontWeight: 700, color: "#e2e8f0" }}>Active Fees by Plan</Typography>
              <Chip label="Active" size="small" sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e" }} />
            </Stack>
            <Typography variant="body2" sx={{ color: "#a5adba", mb: 2 }}>
              Distribution of active fee collections across membership plans.
            </Typography>

            <Stack spacing={1.5}>
              {planRows.length === 0 && (
                <Typography variant="body2" sx={{ color: "#a5adba" }}>
                  No active members available.
                </Typography>
              )}
              {planRows.map((row) => (
                <Stack key={row.plan} direction="row" alignItems="center" spacing={1.5}>
                  <Typography sx={{ width: 110, color: "#e2e8f0", fontWeight: 600 }}>
                    {row.plan}
                  </Typography>
                  <Box sx={{ flex: 1, bgcolor: "#111827", borderRadius: 1, height: 12 }}>
                    <Box
                      sx={{
                        width: `${(row.total / maxPlanValue) * 100}%`,
                        bgcolor: "#ff7a45",
                        height: "100%",
                        borderRadius: 1,
                        boxShadow: "0 6px 16px rgba(255,122,69,0.3)",
                      }}
                    />
                  </Box>
                  <Typography sx={{ minWidth: 80, textAlign: "right", color: "#cbd5e1" }}>
                    {currency(row.total)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              ...cardSx,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 0.5, color: "#e2e8f0" }}>Collection Progress</Typography>
            <Typography variant="body2" sx={{ color: "#a5adba", mb: 2 }}>
              Active vs pending fees for the current cycle.
            </Typography>

            <Stack spacing={1.5}>
              <Box>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ color: "#e2e8f0" }}>Collected</Typography>
                  <Typography sx={{ color: "#22c55e", fontWeight: 700 }}>
                    {currency(totalActiveFees)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={
                    (totalActiveFees / Math.max(totalActiveFees + totalPendingFees, 1)) * 100
                  }
                  sx={{
                    mt: 1,
                    height: 10,
                    borderRadius: 5,
                    bgcolor: "#111827",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#22c55e" },
                  }}
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ color: "#e2e8f0" }}>Pending</Typography>
                  <Typography sx={{ color: "#f59e0b", fontWeight: 700 }}>
                    {currency(totalPendingFees)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={
                    (totalPendingFees / Math.max(totalActiveFees + totalPendingFees, 1)) * 100
                  }
                  sx={{
                    mt: 1,
                    height: 10,
                    borderRadius: 5,
                    bgcolor: "#111827",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#f59e0b" },
                  }}
                />
              </Box>
            </Stack>

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.08)" }} />

            <Typography sx={{ fontWeight: 700, mb: 1,color: "#e2e8f0" }}>Recent Active Members</Typography>
            <Stack spacing={1.2}>
              {latestActive.map((m) => (
                <Stack
                  key={m.id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    p: 1.25,
                    bgcolor: "#111827",
                    borderRadius: 1.5,
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <Stack spacing={0.25}>
                    <Typography sx={{ fontWeight: 700 }}>{m.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#a5adba" }}>
                      {m.plan} • {m.phone}
                    </Typography>
                  </Stack>
                  <Chip
                    label={currency(Number(m.fees || 0))}
                    sx={{ bgcolor: "rgba(255,122,69,0.15)", color: "#ff7a45", fontWeight: 700 }}
                    size="small"
                  />
                </Stack>
              ))}
              {latestActive.length === 0 && (
                <Typography variant="body2" sx={{ color: "#a5adba" }}>
                  No active members to display.
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Paper
            sx={{
              ...cardSx,
              height: "100%",
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography sx={{ fontWeight: 700,color: "#e2e8f0" }}>Pending / Due Soon</Typography>
              <Chip
                label={`${dueSoon.length} pending`}
                size="small"
                sx={{ bgcolor: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
              />
            </Stack>
            <Typography variant="body2" sx={{ color: "#a5adba", mb: 2 }}>
              Members with payments due soon. Prioritize follow-ups to improve cashflow.
            </Typography>

            <Stack spacing={1.2}>
              {dueSoon.length === 0 && (
                <Typography variant="body2" sx={{ color: "#a5adba" }}>
                  No pending members right now.
                </Typography>
              )}
              {dueSoon.map((m) => (
                <Stack
                  key={m.id}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={0.75}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  sx={{
                    p: 1,
                    bgcolor: "#111827",
                    borderRadius: 1.5,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Stack spacing={0.2}>
                    <Typography sx={{ fontWeight: 700, color: "#e2e8f0" }}>{m.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#a5adba" }}>
                      {m.plan} • Due {m.dueDate}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label="Pending"
                      size="small"
                      sx={{ bgcolor: "rgba(245,158,11,0.15)", color: "#f59e0b", fontWeight: 700 }}
                    />
                    <Chip
                      label={currency(Number(m.fees || 0))}
                      size="small"
                      sx={{ bgcolor: "rgba(255,122,69,0.15)", color: "#ff7a45", fontWeight: 700 }}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper
            sx={{
              ...cardSx,
              height: "100%",
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1, color: "#e2e8f0" }}>At a Glance</Typography>
            <Stack spacing={1.2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Total Members</Typography>
                <Typography sx={{ color: "#e2e8f0", fontWeight: 700 }}>{totalMembers}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Collection Rate</Typography>
                <Typography sx={{ color: "#22c55e", fontWeight: 700 }}>
                  {collectionRate.toFixed(1)}%
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Avg Active Fee</Typography>
                <Typography sx={{ color: "#e2e8f0", fontWeight: 700 }}>
                  {currency(avgActiveFee || 0)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Pending Members</Typography>
                <Typography sx={{ color: "#f59e0b", fontWeight: 700 }}>
                  {pendingMembers.length}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Expired Members</Typography>
                <Typography sx={{ color: "#ef4444", fontWeight: 700 }}>
                  {expiredMembers.length}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Paper
            sx={{
              ...cardSx,
            }}
          >
            <Stack
              direction={isMdDown ? "column" : "row"}
              justifyContent="space-between"
              alignItems={isMdDown ? "flex-start" : "center"}
              spacing={isMdDown ? 1 : 0}
              mb={1.5}
            >
              <Typography sx={{ fontWeight: 700 , color: "#e2e8f0"}}>Top Payers (Active)</Typography>
              <Chip
                label="Highest fees"
                size="small"
                sx={{ bgcolor: "rgba(124,58,237,0.15)", color: "#c084fc" }}
              />
            </Stack>
            <Typography variant="body2" sx={{ color: "#a5adba", mb: 2 }}>
              Members contributing the most in the current active cycle.
            </Typography>

            <Stack spacing={1.2}>
              {topPayers.length === 0 && (
                <Typography variant="body2" sx={{ color: "#a5adba" }}>
                  No active members to display.
                </Typography>
              )}
              {topPayers.map((m) => (
                <Stack
                  key={m.id}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  spacing={0.75}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  sx={{
                    p: 1,
                    bgcolor: "#111827",
                    borderRadius: 1.5,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Stack spacing={0.2}>
                    <Typography sx={{ fontWeight: 700, color: "#e2e8f0" }}>{m.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#a5adba" }}>
                      {m.plan} • {m.phone}
                    </Typography>
                  </Stack>
                  <Chip
                    label={currency(Number(m.fees || 0))}
                    size="small"
                    sx={{ bgcolor: "rgba(124,58,237,0.15)", color: "#c084fc", fontWeight: 700 }}
                  />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper
            sx={{
              ...cardSx,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1 , color: "#e2e8f0"}}>Actions / Reminders</Typography>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Send reminders to pending</Typography>
                <Chip
                  label={`${pendingMembers.length}`}
                  size="small"
                  sx={{ bgcolor: "rgba(245,158,11,0.15)", color: "#f59e0b", fontWeight: 700 }}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Review expired members</Typography>
                <Chip
                  label={`${expiredMembers.length}`}
                  size="small"
                  sx={{ bgcolor: "rgba(239,68,68,0.15)", color: "#ef4444", fontWeight: 700 }}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>High-value member check-ins</Typography>
                <Chip
                  label={`${topPayers.length}`}
                  size="small"
                  sx={{ bgcolor: "rgba(124,58,237,0.15)", color: "#c084fc", fontWeight: 700 }}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: "#a5adba" }}>Collection rate target</Typography>
                <Chip
                  label={`${Math.round(collectionRate)}%`}
                  size="small"
                  sx={{ bgcolor: "rgba(34,197,94,0.15)", color: "#22c55e", fontWeight: 700 }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default AccountantPage;

