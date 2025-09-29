import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Card,
  CardContent,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import type { UbicacionType } from "../../types/ubicacion.type";
import type { PaginatedResponse } from "../../interfaces/paginatedResponse.interface";
import { ubicacionesService } from "../../services/ubicaciones.services";
import { usePagination } from "../../hooks/usePagination";
import UbicacionModal from "./Modals/UbicacionModal";
import PageHeader from "../../components/PageHeader";
import PrimaryButton from "../../components/PrimaryButton";
import Swal from "sweetalert2";

const UbicacionesPage = () => {
  const [ubicaciones, setUbicaciones] = useState<UbicacionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUbicacion, setSelectedUbicacion] =
    useState<UbicacionType | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { currentPage, paginationMeta, setPaginationMeta, handlePageChange } = usePagination(10);

  const fetchUbicaciones = async () => {
    try {
      setLoading(true);
      const response: PaginatedResponse<UbicacionType> =
        await ubicacionesService.getAllUbicaciones(currentPage);
      setUbicaciones(response.data);
      setPaginationMeta(response.meta);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las ubicaciones. Por favor, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUbicaciones();
  }, [refreshTrigger, currentPage]);

  const handleOpenCreateModal = () => {
    setSelectedUbicacion(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ubicacion: UbicacionType) => {
    setSelectedUbicacion(ubicacion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUbicacion(null);
  };

  const handleModalSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDelete = async (ubicacion: UbicacionType) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar la ubicación "${ubicacion.nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await ubicacionesService.deleteUbicacion(ubicacion.id);
        Swal.fire({
          title: "¡Eliminada!",
          text: "La ubicación ha sido eliminada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la ubicación. Por favor, intenta de nuevo.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 4 }}>
        <PageHeader
          title="Gestión de Ubicaciones"
          subtitle="Administra las ubicaciones disponibles para tus plantas"
          icon="📍"
        />

        <Box sx={{ p: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" color="text.secondary">
              {loading ? "Cargando..." : `${paginationMeta?.total || 0} ubicaciones registradas`}
            </Typography>
            <PrimaryButton
              startIcon={<AddIcon />}
              onClick={handleOpenCreateModal}
            >
              Nueva Ubicación
            </PrimaryButton>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                Cargando ubicaciones...
              </Typography>
            </Box>
          ) : ubicaciones.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay ubicaciones registradas
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Crea tu primera ubicación para organizar mejor tus plantas
              </Typography>
              <PrimaryButton
                startIcon={<AddIcon />}
                onClick={handleOpenCreateModal}
              >
                Crear Primera Ubicación
              </PrimaryButton>
            </Box>
          ) : (
            <Stack spacing={2}>
              {ubicaciones.map((ubicacion) => (
                <Card
                  key={ubicacion.id}
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          📍 {ubicacion.nombre}
                        </Typography>
                        {ubicacion.descripcion && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={1}
                          >
                            {ubicacion.descripcion}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          Creada: {formatDate(ubicacion.createdAt)}
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditModal(ubicacion)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(ubicacion)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          {!loading && ubicaciones.length > 0 && (paginationMeta?.totalPages || 0) > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={paginationMeta?.totalPages || 0}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Box>
      </Paper>

      <UbicacionModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        ubicacion={selectedUbicacion}
      />
    </Container>
  );
};

export default UbicacionesPage;
