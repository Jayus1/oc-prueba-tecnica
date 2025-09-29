import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { TipoCuidado } from "../shared/tipoCuidado.enum";

interface TipoCuidadoSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  label?: string;
}

const TipoCuidadoSelect = ({
  value,
  onChange,
  error = false,
  helperText,
  required = false,
  fullWidth = true,
  label = "Tipo de Cuidado",
}: TipoCuidadoSelectProps) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      >
        <MenuItem value={TipoCuidado.RIEGO}>🚿 Riego</MenuItem>
        <MenuItem value={TipoCuidado.FERTILIZACION}>🌱 Fertilización</MenuItem>
        <MenuItem value={TipoCuidado.PODA}>✂️ Poda</MenuItem>
        <MenuItem value={TipoCuidado.LUZ}>☀️ Luz</MenuItem>
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TipoCuidadoSelect;
