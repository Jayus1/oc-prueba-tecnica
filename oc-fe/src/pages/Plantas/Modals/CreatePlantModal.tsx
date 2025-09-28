import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Modal from "../../../components/Modal";
import type { PlantasPostDto } from "../../../DTO/PlantasPostDTO";
import { plantasService } from "../../../services/plantas.services";
import { useNavigate } from "react-router";
import type { CreatePlantModalProps } from "../../../types/CreatePlantModalProps.type";

const CreatePlantModal = ({ open, onClose }: CreatePlantModalProps) => {
  const [formData, setFormData] = useState<PlantasPostDto>({
    nombre: "",
    especie: "",
    ubicacion: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isCreating, setIsCreating] = useState(false);
  const navigation = useNavigate();

  const handleCreatePlant = async (plantData: PlantasPostDto) => {
    try {
      setIsCreating(true);
      await plantasService.createPlanta(plantData);
      onClose();
    } catch (error) {
      console.error("Error creating plant:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange =
    (field: keyof PlantasPostDto) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });

      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: "",
        });
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    if (!formData.especie.trim()) {
      newErrors.especie = "La especie es requerida";
    }
    if (!formData.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleCreatePlant(formData);
      navigation(0);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      nombre: "",
      especie: "",
      ubicacion: "",
    });
    setErrors({});
    onClose();
  };

  const actions = (
    <Box display="flex" gap={2}>
      <Button onClick={handleClose} color="secondary">
        Cancelar
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        disabled={isCreating}
      >
        {isCreating ? "Creando..." : "Crear Planta"}
      </Button>
    </Box>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Crear Nueva Planta"
      actions={actions}
      maxWidth="sm"
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Nombre"
          value={formData.nombre}
          onChange={handleInputChange("nombre")}
          error={!!errors.nombre}
          helperText={errors.nombre}
          fullWidth
          required
        />

        <TextField
          label="Especie"
          value={formData.especie}
          onChange={handleInputChange("especie")}
          error={!!errors.especie}
          helperText={errors.especie}
          fullWidth
          required
        />

        <TextField
          label="Ubicación"
          value={formData.ubicacion}
          onChange={handleInputChange("ubicacion")}
          error={!!errors.ubicacion}
          helperText={errors.ubicacion}
          fullWidth
          required
        />
      </Box>
    </Modal>
  );
};

export default CreatePlantModal;
