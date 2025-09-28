import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  CardContent,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router";
import { cuidadosService } from "../../services/cuidados.services";
import type { CuidadosPostDto } from "../../DTO/CuidadosPostDTO";
import { TipoCuidado } from "../../shared/TipoCuidado.enum";
import type { CuidadosType } from "../../types/Cuidados.type";
import { validateFertilizacionAndPoda } from "../../utils/validateSameTime";
import { validateRiegoTime } from "../../utils/validateRiegoTime";

const CareForm = () => {
  const navigate = useNavigate();
  const { plantId, id } = useParams();

  const [formData, setFormData] = useState({
    tipo: "",
    fechaInicio: "",
    fechaFin: "",
    notas: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [existingCuidados, setExistingCuidados] = useState<CuidadosType[]>([]);
  const isEditing = !!id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const fetchCuidadoData = async () => {
    if (!id) return;

    setLoadingData(true);
    try {
      const cuidadoData = await cuidadosService.getCuidadoById(parseInt(id));
      setFormData({
        tipo: cuidadoData.tipo,
        fechaInicio: new Date(cuidadoData.fechaInicio)
          .toISOString()
          .split("T")[0],
        fechaFin: cuidadoData.fechaFin
          ? new Date(cuidadoData.fechaFin).toISOString().split("T")[0]
          : "",
        notas: cuidadoData.notas || "",
      });
    } catch (error) {
      console.error("Error fetching cuidado:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchExistingCuidados = async () => {
    if (!plantId) return;

    try {
      const response = await cuidadosService.getAllCuidados();
      const plantaCuidados = response.filter(
        (cuidado) => cuidado.idPlanta === parseInt(plantId)
      );
      setExistingCuidados(plantaCuidados);
    } catch (error) {
      console.error("Error fetching existing cuidados:", error);
    }
  };

  useEffect(() => {
    if (plantId) {
      fetchExistingCuidados();
    }
    if (id) {
      fetchCuidadoData();
    }
  }, [id, plantId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.tipo.trim()) {
      newErrors.tipo = "El tipo de cuidado es requerido";
    }
    if (!formData.fechaInicio) {
      newErrors.fechaInicio = "La fecha de inicio es requerida";
    }
    if (!formData.fechaFin) {
      newErrors.fechaFin = "La fecha de fin es requerida";
    }
    if (
      formData.fechaInicio &&
      formData.fechaFin &&
      new Date(formData.fechaInicio) > new Date(formData.fechaFin)
    ) {
      newErrors.fechaFin =
        "La fecha de fin debe ser posterior a la fecha de inicio";
    }

    if (formData.tipo && formData.fechaInicio && plantId) {
      const fechaInicio = new Date(formData.fechaInicio);
      const idPlantaNum = parseInt(plantId);

      const cuidadosParaValidar = existingCuidados.filter((c) =>
        isEditing ? c.id !== parseInt(id!) : true
      );

      if (
        !validateRiegoTime(
          formData.tipo,
          fechaInicio,
          idPlantaNum,
          cuidadosParaValidar
        )
      ) {
        newErrors.fechaInicio =
          "No se puede regar la planta dentro de las 24 horas posteriores a una fertilización";
      }

      if (
        !validateFertilizacionAndPoda(
          formData.tipo,
          fechaInicio,
          idPlantaNum,
          cuidadosParaValidar
        )
      ) {
        newErrors.fechaInicio =
          "No se puede registrar una poda o fertilización en la misma planta el mismo día";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!plantId) {
      console.error("Plant ID is required");
      return;
    }

    setLoading(true);
    try {
      const cuidadoData: CuidadosPostDto = {
        tipo: formData.tipo,
        fechaInicio: new Date(formData.fechaInicio),
        fechaFin: new Date(formData.fechaFin),
        notas: formData.notas,
        idPlanta: parseInt(plantId),
      };

      if (isEditing) {
        await cuidadosService.updateCuidado(parseInt(id!), cuidadoData);
      } else {
        await cuidadosService.createCuidado(cuidadoData);
      }

      navigate(`/plants/${plantId}`, {
        replace: true,
      });
    } catch (error) {
      console.error("Error saving care:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
            color: "white",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {isEditing ? "✏️ Editar Cuidado" : "🌱 Agregar Nuevo Cuidado"}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {isEditing
              ? "Modifica los datos del cuidado"
              : "Registra un nuevo cuidado para tu planta"}
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {loadingData ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <Typography variant="h6">
                Cargando datos del cuidado...
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <FormControl
                  fullWidth
                  error={!!errors.tipo}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <InputLabel>Tipo de Cuidado</InputLabel>
                  <Select
                    name="tipo"
                    value={formData.tipo}
                    label="Tipo de Cuidado"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={TipoCuidado.RIEGO}>🚿 Riego</MenuItem>
                    <MenuItem value={TipoCuidado.FERTILIZACION}>
                      🌱 Fertilización
                    </MenuItem>
                    <MenuItem value={TipoCuidado.PODA}>✂️ Poda</MenuItem>
                    <MenuItem value={TipoCuidado.LUZ}>☀️ Luz</MenuItem>
                  </Select>
                  {errors.tipo && (
                    <FormHelperText>{errors.tipo}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 3,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <TextField
                  name="fechaInicio"
                  label="Fecha de Inicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  error={!!errors.fechaInicio}
                  helperText={errors.fechaInicio}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  name="fechaFin"
                  label="Fecha de Fin"
                  type="date"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  error={!!errors.fechaFin}
                  helperText={errors.fechaFin}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  name="notas"
                  label="Notas adicionales"
                  value={formData.notas}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Describe detalles específicos del cuidado..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box
                display="flex"
                justifyContent="flex-end"
                gap={2}
                sx={{ mt: 3 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    borderColor: "grey.400",
                    color: "grey.700",
                    "&:hover": {
                      borderColor: "grey.600",
                      backgroundColor: "grey.50",
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    bgcolor: "#4caf50",
                    "&:hover": {
                      bgcolor: "#388e3c",
                    },
                  }}
                >
                  {loading
                    ? isEditing
                      ? "Actualizando..."
                      : "Guardando..."
                    : isEditing
                    ? "Actualizar Cuidado"
                    : "Guardar Cuidado"}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Paper>
    </Container>
  );
};

export default CareForm;
