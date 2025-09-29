import { Box, Button, TextField, Typography, Pagination } from "@mui/material";
import type { PlantasType } from "../../types/plantas.type";
import { useState, useEffect } from "react";
import PlantCard from "../../components/PlantCard";
import CreatePlantModal from "./Modals/CreatePlantModal";
import { plantasService } from "../../services/plantas.services";
import { useDebounce } from "../../hooks/useDebounce";
import { usePagination } from "../../hooks/usePagination";
import Swal from "sweetalert2";

const ListPlantPage = () => {
  const [plantas, setPlantas] = useState<PlantasType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    currentPage,
    pageSize,
    paginationMeta,
    setCurrentPage,
    setPaginationMeta,
    handlePageChange,
  } = usePagination(10);

  const fetchPlantas = async () => {
    try {
      setLoading(true);
      const response = await plantasService.getAllPlantas({
        page: currentPage,
        limit: pageSize,
        search: debouncedSearch || undefined,
      });

      setPlantas(response.data);
      setPaginationMeta(response.meta);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las plantas. Por favor, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });

      setPlantas([]);
      setPaginationMeta({
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, setCurrentPage]);

  useEffect(() => {
    fetchPlantas();
  }, [currentPage, debouncedSearch, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        columnGap={5}
        width={"100%"}
      >
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Crear Nueva Planta
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        gap={3}
        justifyContent={"center"}
      >
        {plantas.length > 0 &&
          plantas.map((item) => (
            <PlantCard
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              especie={item.especie}
              ubicacion={item.ubicacion}
              onDelete={handleRefresh}
            />
          ))}

        {!loading && plantas.length == 0 && (
          <Typography color="info" fontSize={26}>
            No hay plantas que mostrar
          </Typography>
        )}

        {loading && (
          <Typography color="info" fontSize={26}>
            Cargando plantas...
          </Typography>
        )}
      </Box>

      {paginationMeta && paginationMeta.totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={paginationMeta.totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      <CreatePlantModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleRefresh}
      />
    </Box>
  );
};
export default ListPlantPage;
