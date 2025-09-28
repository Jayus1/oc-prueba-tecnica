import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  CardContent,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { calendarService } from "../../services/calendar.services";
import { plantasService } from "../../services/plantas.services";
import type { CalendarSuggestionDto } from "../../DTO/CalendarSuggestionDTO";
import type { PlantasType } from "../../types/Plantas.type";
import { TipoCuidado } from "../../shared/TipoCuidado.enum";
import { formatDate } from "../../utils/formatDate.util";

const SuggestedPage = () => {
  const [formData, setFormData] = useState({
    planta: "",
    fechaInicio: "",
    fechaFin: "",
    tipo: "",
  });

  const [suggestedDates, setSuggestedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plantas, setPlantas] = useState<PlantasType[]>([]);
  const [loadingPlantas, setLoadingPlantas] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchPlantas = async () => {
    setLoadingPlantas(true);
    try {
      const response = await plantasService.getAllPlantas();
      setPlantas(response);
    } catch (error) {
      console.error("Error fetching plantas:", error);
      setError("Error al cargar las plantas. Por favor, intenta nuevamente.");
    } finally {
      setLoadingPlantas(false);
    }
  };

  useEffect(() => {
    fetchPlantas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const suggestionData: CalendarSuggestionDto = {
        planta: parseInt(formData.planta),
        fechaInicio: new Date(formData.fechaInicio),
        fechaFin: new Date(formData.fechaFin),
        tipo: formData.tipo,
      };

      const response = await calendarService.getSuggestions(suggestionData);
      setSuggestedDates(response);
    } catch (error) {
      console.error("Error getting suggestions:", error);
      setError(
        "Error al obtener las sugerencias. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ px: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden", mb: 4 }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
            color: "white",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            📅 Sugerencias de Cuidados
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Obtén sugerencias inteligentes para el cuidado de tus plantas
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <FormControl
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                <InputLabel>Seleccionar Planta</InputLabel>
                <Select
                  name="planta"
                  value={formData.planta}
                  label="Seleccionar Planta"
                  onChange={handleSelectChange}
                  disabled={loadingPlantas}
                >
                  {loadingPlantas ? (
                    <MenuItem disabled>
                      <Typography variant="body2">Cargando plantas...</Typography>
                    </MenuItem>
                  ) : plantas.length === 0 ? (
                    <MenuItem disabled>
                      <Typography variant="body2">No hay plantas registradas</Typography>
                    </MenuItem>
                  ) : (
                    plantas.map((planta) => (
                      <MenuItem key={planta.id} value={planta.id.toString()}>
                        🌱 {planta.nombre} - {planta.especie}
                      </MenuItem>
                    ))
                  )}
                </Select>
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
              <FormControl
                fullWidth
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
              </FormControl>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
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
                {loading ? "Generando..." : "Generar Sugerencias"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Paper>

      {error && (
        <Paper
          elevation={2}
          sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "#ffebee" }}
        >
          <Typography variant="body1" color="error" fontWeight="medium">
            ⚠️ {error}
          </Typography>
        </Paper>
      )}

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
            color: "white",
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            🌟 Fechas Sugeridas
          </Typography>
        </Box>
        <Box sx={{ p: 3, minHeight: 200 }}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="150px"
            >
              <Typography variant="h6" color="text.secondary">
                Generando sugerencias...
              </Typography>
            </Box>
          ) : suggestedDates.length > 0 ? (
            <Box>
              {suggestedDates.map((date, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                    "&:last-child": { mb: 0 },
                  }}
                >
                  <Typography variant="body1" fontWeight="medium">
                    📅 {formatDate(date)}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="150px"
            >
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                🔍 Las fechas sugeridas aparecerán aquí después de generar las
                sugerencias
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default SuggestedPage;
