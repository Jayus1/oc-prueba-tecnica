import { Box, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}

const PageHeader = ({ title, subtitle, icon }: PageHeaderProps) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
        color: "white",
        p: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {icon && `${icon} `}{title}
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.9 }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;