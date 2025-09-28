import { Button } from "@mui/material";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  variant?: "contained" | "outlined";
}

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  size = "large",
  fullWidth = false,
  variant = "contained",
}: PrimaryButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        px: 4,
        bgcolor: variant === "contained" ? "#4caf50" : "transparent",
        borderColor: variant === "outlined" ? "#4caf50" : "transparent",
        color: variant === "outlined" ? "#4caf50" : "white",
        "&:hover": {
          bgcolor: variant === "contained" ? "#388e3c" : "rgba(76, 175, 80, 0.04)",
          borderColor: variant === "outlined" ? "#388e3c" : "transparent",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;