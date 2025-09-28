import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { Dayjs } from "dayjs";

interface CustomDateTimePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disablePast?: boolean;
  fullWidth?: boolean;
}

const CustomDateTimePicker = ({
  label,
  value,
  onChange,
  error = false,
  helperText,
  required = false,
  disablePast = false,
  fullWidth = true,
}: CustomDateTimePickerProps) => {
  return (
    <DateTimePicker
      label={label}
      value={value}
      onChange={onChange}
      format="DD/MM/YYYY HH:mm"
      disablePast={disablePast}
      slotProps={{
        textField: {
          fullWidth,
          required,
          error,
          helperText,
          sx: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          },
        },
      }}
    />
  );
};

export default CustomDateTimePicker;