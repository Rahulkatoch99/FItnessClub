import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Chip,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

type PlanItem = {
  id: number;
  day: string; // ISO date string
  category: string;
  exercise: string;
  sets: number;
  reps: number;
  weightKg?: number;
  note?: string;
};

const muscleGroups = [
  "Chest",
  "Back",
  "Shoulder",
  "Triceps",
  "Biceps",
  "Legs",
  "Core",
];
const dayOptions: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WorkoutPlanPage = () => {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [form, setForm] = useState({
    day: new Date().toISOString().slice(0, 10),
    category: "Chest",
    exercise: "",
    sets: "",
    reps: "",
    weightKg: "",
    note: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (!form.exercise || !form.sets || !form.reps || !form.category) return;
    const item: PlanItem = {
      id: Date.now(),
      day: form.day,
      category: form.category,
      exercise: form.exercise,
      sets: Number(form.sets),
      reps: Number(form.reps),
      weightKg: form.weightKg ? Number(form.weightKg) : undefined,
      note: form.note,
    };
    setPlan((prev) => [item, ...prev]);
    setForm((prev) => ({ ...prev, exercise: "", sets: "", reps: "", weightKg: "", note: "" }));
  };

  const handleDelete = (id: number) => {
    setPlan((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#ff6835", mb: 3 }}
      >
        Workout Plan
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
            Add Exercise to Plan
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      sx: { bgcolor: "#16161d", color: "#e35a2d" },
                    },
                  },
                }}
                label="Day"
                fullWidth
                value={form.day}
                onChange={(e) => handleChange("day", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{
                  input: { color: "#e35a2d" },
                  "& .MuiSelect-select": { color: "#e35a2d" },
                  "& .MuiSvgIcon-root": { color: "#e35a2d" },
                }}
              >
                {dayOptions.map((d) => (
                  <MenuItem key={d} value={d} sx={{ color: "#e35a2d" }}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: { bgcolor: "#16161d", color: "#e35a2d" },
                    },
                  },
                }}
                label="Muscle Group"
                fullWidth
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{
                  input: { color: "#e35a2d" },
                  "& .MuiSelect-select": { color: "#e35a2d" },
                  "& .MuiSvgIcon-root": { color: "#e35a2d" },
                }}
              >
                {muscleGroups.map((m) => (
                  <MenuItem key={m} value={m} sx={{ color: "#e35a2d" }}>
                    {m}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Workout (e.g., Bench Press, Lat Pulldown)"
                fullWidth
                value={form.exercise}
                onChange={(e) => handleChange("exercise", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label="Sets"
                fullWidth
                type="number"
                value={form.sets}
                onChange={(e) => handleChange("sets", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
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
                label="Weight (kg, optional)"
                fullWidth
                type="number"
                value={form.weightKg}
                onChange={(e) => handleChange("weightKg", e.target.value)}
                InputLabelProps={{ sx: { color: "#aaa" } }}
                sx={{ input: { color: "#fff" } }}
              />
            </Grid>
            <Grid item xs={12}>
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
                Add to Plan
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card
        sx={{
          background: "#16161d",
          border: "1px solid #272737",
        }}
      >
        <CardContent>
          <Typography sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
            Your Plan
          </Typography>
          <Divider sx={{ borderColor: "#272737", mb: 2 }} />
          {plan.length === 0 ? (
            <Typography sx={{ color: "#aaa" }}>No exercises added yet.</Typography>
          ) : (
            plan.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#fff",
                  py: 1.2,
                  borderBottom: "1px solid #272737",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <Chip label={item.day} sx={{ bgcolor: "#ff6835", color: "#fff" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{item.exercise}</Typography>
                    <Typography sx={{ color: "#aaa", fontSize: 13 }}>
                      {item.category} • {item.sets} x {item.reps}
                      {item.weightKg ? ` @ ${item.weightKg} kg` : ""} {item.note ? ` • ${item.note}` : ""}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDelete(item.id)}
                  sx={{
                    color: "#ff3e3e",
                    borderColor: "#ff3e3e",
                    textTransform: "none",
                    "&:hover": { borderColor: "#d62929", color: "#d62929" },
                  }}
                >
                  Remove
                </Button>
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkoutPlanPage;

