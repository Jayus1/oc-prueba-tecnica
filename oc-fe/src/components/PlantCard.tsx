import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Avatar } from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PlantCardType } from "../interfaces/PlantCard.interface";
import { useNavigate } from "react-router";
import { plantasService } from "../services/plantas.services";
import Swal from "sweetalert2";

export default function PlantCard({
  id,
  ubicacion: location,
  nombre: name,
  especie: species,
  onDelete,
}: PlantCardType) {
  const navigation = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar la planta "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await plantasService.deletePlanta(id);
        onDelete?.();

        Swal.fire({
          title: "¡Eliminada!",
          text: "La planta ha sido eliminada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting plant:", error);

        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la planta. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

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
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Button
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            size="small"
            sx={{
              color: "#d32f2f",
              "&:hover": {
                bgcolor: "rgba(211, 47, 47, 0.1)",
              },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Borrar
          </Button>
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
