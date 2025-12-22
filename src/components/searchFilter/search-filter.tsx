// components/SearchInput.tsx
import { TextField } from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: number | string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  width = 300,
}: SearchInputProps) => {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        width: width,
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ced4da",
          },
          "&:hover fieldset": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
            borderWidth: 1.5,
          },
        },
        "& .MuiInputBase-input": {
          padding: "8px 12px",
          fontSize: "14px",
        },
      }}
    />
  );
};

export default SearchInput;
