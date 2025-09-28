import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Avatar } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import type { PlantCardType } from "../types/PlantCard.type";
import { useNavigate } from "react-router";

export default function PlantCard({
  id,
  ubicacion: location,
  nombre: name,
  especie: species,
}: PlantCardType) {
  const navigation = useNavigate();

  return (
    <Box sx={{ minWidth: 275, maxWidth: 320 }}>
      <Card
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%)",
          border: "1px solid #c8e6c9",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(76, 175, 80, 0.15)",
            borderColor: "#4caf50",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#4caf50", color: "white" }}>
              <LocalFloristIcon />
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 600, color: "#2e7d32" }}
            >
              {name}
            </Typography>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#388e3c",
              mb: 1,
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
          >
            🌿 {species}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#558b2f",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            📍 {location || "No especificado"}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              navigation(`/plants/${id}`);
            }}
            sx={{
              bgcolor: "#4caf50",
              "&:hover": {
                bgcolor: "#388e3c",
              },
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Ver Detalles
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
