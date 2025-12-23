import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useMemo, useState } from "react";

type Entry = {
  id: number;
  exercise: string;
  weightKg: number;
  reps: number;
  date: string;
  note?: string;
};

const initialData: Entry[] = [
  {
    id: 1,
    exercise: "Bench Press",
    weightKg: 80,
    reps: 5,
    date: "2025-01-15",
    note: "Felt solid, next +2.5kg",
  },
  {
    id: 2,
    exercise: "Squat",
    weightKg: 110,
    reps: 5,
    date: "2025-01-14",
  },
];

const ExerciseLogPage = () => {
  const [entries, setEntries] = useState<Entry[]>(initialData);
  const [form, setForm] = useState({
    exercise: "",
    weightKg: "",
    reps: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  const bestByExercise = useMemo(() => {
    const map = new Map<string, Entry>();
    entries.forEach((e) => {
      const existing = map.get(e.exercise);
      if (!existing || e.weightKg > existing.weightKg) {
        map.set(e.exercise, e);
      }
    });
    return Array.from(map.values());
  }, [entries]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (!form.exercise || !form.weightKg || !form.reps) return;
    const newEntry: Entry = {
      id: Date.now(),
      exercise: form.exercise,
      weightKg: Number(form.weightKg),
      reps: Number(form.reps),
      date: form.date,
      note: form.note,
    };
    setEntries((prev) => [newEntry, ...prev]);
    setForm((prev) => ({ ...prev, exercise: "", weightKg: "", reps: "", note: "" }));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#ff6835", mb: 3 }}
      >
        Exercise Log / PRs
      </Typography>

      <Card
        sx={{
          background: "#16161d",
          border: "1px solid #272737",
          mb: 3,
        }}
      >
        <CardContent>
          <Typography sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
            Add Record
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Exercise"
                fullWidth
                value={form.exercise}
                onChange={(e) => handleChange("exercise", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Weight (kg)"
                fullWidth
                type="number"
                value={form.weightKg}
                onChange={(e) => handleChange("weightKg", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Reps"
                fullWidth
                type="number"
                value={form.reps}
                onChange={(e) => handleChange("reps", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Date"
                fullWidth
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                InputLabelProps={{ shrink: true, sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Note"
                fullWidth
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAdd}
                sx={{
                  backgroundColor: "#ff6835",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  py: 1.2,
                  "&:hover": { backgroundColor: "#e35a2d" },
                }}
              >
                Save Record
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "#16161d",
              border: "1px solid #272737",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
                Recent Records
              </Typography>
              <Divider sx={{ borderColor: "#272737", mb: 2 }} />
              {entries.length === 0 ? (
                <Typography sx={{ color: "#aaa" }}>No records yet.</Typography>
              ) : (
                entries.slice(0, 10).map((entry) => (
                  <Box
                    key={entry.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#fff",
                      py: 1,
                      borderBottom: "1px solid #272737",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>
                        {entry.exercise}
                      </Typography>
                      <Typography sx={{ color: "#aaa", fontSize: 13 }}>
                        {entry.date}
                      </Typography>
                      {entry.note && (
                        <Typography sx={{ color: "#999", fontSize: 13 }}>
                          {entry.note}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {entry.weightKg} kg
                      </Typography>
                      <Typography sx={{ color: "#aaa", fontSize: 13 }}>
                        {entry.reps} reps
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "#16161d",
              border: "1px solid #272737",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
                Best PR by Exercise
              </Typography>
              <Divider sx={{ borderColor: "#272737", mb: 2 }} />
              {bestByExercise.length === 0 ? (
                <Typography sx={{ color: "#aaa" }}>No PRs yet.</Typography>
              ) : (
                bestByExercise.map((entry) => (
                  <Box
                    key={entry.exercise}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#fff",
                      py: 1,
                      borderBottom: "1px solid #272737",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700 }}>
                      {entry.exercise}
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {entry.weightKg} kg
                    </Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExerciseLogPage;

