import { Box, Button, TextField, Typography } from "@mui/material";
import type { PlantasType } from "../../types/Plantas.type";
import { useState, useEffect } from "react";
import PlantCard from "../../components/PlantCard";
import CreatePlantModal from "./Modals/CreatePlantModal";
import { plantasService } from "../../services/plantas.services";
import { useDebounce } from "../../hooks/useDebounce";

const ListPlantPage = () => {
  const [plantas, setPlantas] = useState<PlantasType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchPlantas = async () => {
    try {
      setLoading(true);
      const data = await plantasService.getAllPlantas(
        debouncedSearch === "" ? undefined : debouncedSearch
      );

      setPlantas(data);
    } catch (error) {
      console.error("Error fetching plantas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    fetchPlantas();
  }, [debouncedSearch]);

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
          plantas.map((item, __) => (
            <PlantCard
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              especie={item.especie}
              ubicacion={item.ubicacion}
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

      <CreatePlantModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};
export default ListPlantPage;
