import { useState, useEffect } from "react";
import type { PlantasType } from "../../types/Plantas.type";
import { plantasService } from "../../services/plantas.services";
import { cuidadosService } from "../../services/cuidados.services";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "../../utils/formatDate.util";
import { formatTipoCuidado } from "../../utils/tipoCuidado.util";
import Swal from "sweetalert2";

const PlantsDetailsPage = () => {
  const { id } = useParams();

  const [planta, setPlanta] = useState<PlantasType | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigate();

  const fetchPlanta = async () => {
    if (!id) {
      setError("ID de planta no válido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const plantaData = await plantasService.getPlantaById(parseInt(id));
      setPlanta(plantaData);
    } catch (error) {
      console.error("Error fetching planta:", error);
      setError("Error al cargar la planta");

      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la información de la planta. Por favor, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCuidado = async (cuidadoId: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este cuidado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await cuidadosService.deleteCuidado(cuidadoId);
        await fetchPlanta();

        Swal.fire({
          title: '¡Eliminado!',
          text: 'El cuidado ha sido eliminado correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el cuidado. Por favor, inténta de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  useEffect(() => {
    fetchPlanta();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography variant="h6">Cargando planta...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!planta) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography variant="h6">Planta no encontrada</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={4} p={3}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h3" color="primary" fontWeight="bold">
            {planta.nombre}
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight="medium"
              >
                Especie:
              </Typography>
              <Typography variant="h6" color="text.primary">
                {planta.especie}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight="medium"
              >
                Ubicación:
              </Typography>
              <Typography variant="h6" color="text.primary">
                {planta.ubicacion}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" color="primary" fontWeight="bold">
            Cuidados
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigation(`/plants/${id}/care`)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Agregar Cuidado
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          elevation={1}
          sx={{ borderRadius: 2, overflow: "hidden" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                >
                  Tipo
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                >
                  Fecha Inicio
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                >
                  Fecha Fin
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                >
                  Notas
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planta.cuidados.length > 0 ? (
                planta.cuidados.map((cuidado) => (
                  <TableRow
                    key={cuidado.id}
                    sx={{
                      "&:hover": { backgroundColor: "grey.50" },
                      "&:nth-of-type(odd)": { backgroundColor: "grey.25" },
                    }}
                  >
                    <TableCell sx={{ fontWeight: "medium" }}>
                      {formatTipoCuidado(cuidado.tipo)}
                    </TableCell>
                    <TableCell>{formatDate(cuidado.fechaInicio)}</TableCell>
                    <TableCell>{formatDate(cuidado.fechaFin)}</TableCell>
                    <TableCell>{cuidado.notas}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => navigation(`/plants/${id}/care/${cuidado.id}`)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.light",
                              color: "white",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteCuidado(cuidado.id)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "error.light",
                              color: "white",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ py: 4, color: "text.secondary", fontSize: "1.1rem" }}
                  >
                    No hay cuidados registrados para esta planta
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PlantsDetailsPage;
