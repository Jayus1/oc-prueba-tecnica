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
import type { EspecieType } from "../../types/especie.type";
import type { PaginatedResponse } from "../../interfaces/paginatedResponse.interface";
import { especiesService } from "../../services/especies.services";
import { usePagination } from "../../hooks/usePagination";
import EspecieModal from "./Modals/EspecieModal";
import PageHeader from "../../components/PageHeader";
import PrimaryButton from "../../components/PrimaryButton";
import Swal from "sweetalert2";

const EspeciesPage = () => {
  const [especies, setEspecies] = useState<EspecieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEspecie, setSelectedEspecie] = useState<EspecieType | null>(
    null
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { currentPage, paginationMeta, setPaginationMeta, handlePageChange } = usePagination(10);

  const fetchEspecies = async () => {
    try {
      setLoading(true);
      const response: PaginatedResponse<EspecieType> = await especiesService.getAllEspecies(currentPage);
      setEspecies(response.data);
      setPaginationMeta(response.meta);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las especies. Por favor, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEspecies();
  }, [refreshTrigger, currentPage]);

  const handleOpenCreateModal = () => {
    setSelectedEspecie(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (especie: EspecieType) => {
    setSelectedEspecie(especie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEspecie(null);
  };

  const handleModalSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDelete = async (especie: EspecieType) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar la especie "${especie.nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await especiesService.deleteEspecie(especie.id);
        Swal.fire({
          title: "¡Eliminada!",
          text: "La especie ha sido eliminada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la especie. Por favor, intenta de nuevo.",
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
          title="Gestión de Especies"
          subtitle="Administra las especies disponibles para tus plantas"
          icon="🌺"
        />

        <Box sx={{ p: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" color="text.secondary">
              {loading
                ? "Cargando..."
                : `${paginationMeta?.total || 0} especies registradas`}
            </Typography>
            <PrimaryButton
              startIcon={<AddIcon />}
              onClick={handleOpenCreateModal}
            >
              Nueva Especie
            </PrimaryButton>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                Cargando especies...
              </Typography>
            </Box>
          ) : especies.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay especies registradas
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Crea tu primera especie para clasificar mejor tus plantas
              </Typography>
              <PrimaryButton
                startIcon={<AddIcon />}
                onClick={handleOpenCreateModal}
              >
                Crear Primera Especie
              </PrimaryButton>
            </Box>
          ) : (
            <Stack spacing={2}>
              {especies.map((especie) => (
                <Card
                  key={especie.id}
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
                          🌺 {especie.nombre}
                        </Typography>
                        {especie.nombreCientifico && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={1}
                            sx={{ fontStyle: "italic" }}
                          >
                            {especie.nombreCientifico}
                          </Typography>
                        )}
                        {especie.descripcion && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={1}
                          >
                            {especie.descripcion}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          Creada: {formatDate(especie.createdAt)}
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditModal(especie)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(especie)}
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

          {!loading && especies.length > 0 && (paginationMeta?.totalPages || 0) > 1 && (
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

      <EspecieModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        especie={selectedEspecie}
      />
    </Container>
  );
};

export default EspeciesPage;
