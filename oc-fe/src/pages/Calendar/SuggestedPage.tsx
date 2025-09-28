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
  FormHelperText,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import SearchIcon from "@mui/icons-material/Search";
import { calendarService } from "../../services/calendar.services";
import { plantasService } from "../../services/plantas.services";
import type { CalendarSuggestionDto } from "../../DTO/CalendarSuggestionDTO";
import type { PlantasType } from "../../types/Plantas.type";
import { TipoCuidado } from "../../shared/TipoCuidado.enum";
import { formatDate } from "../../utils/formatDate.util";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import dayjs from "dayjs";

dayjs.locale("es");

// Schema de validación con Yup
const validationSchema = Yup.object({
  planta: Yup.string().required("Debe seleccionar una planta"),
  fechaInicio: Yup.date()
    .required("La fecha de inicio es requerida")
    .typeError("Fecha de inicio inválida"),
  fechaFin: Yup.date()
    .required("La fecha de fin es requerida")
    .typeError("Fecha de fin inválida")
    .min(
      Yup.ref("fechaInicio"),
      "La fecha de fin debe ser posterior a la fecha de inicio"
    ),
  tipo: Yup.string().required("Debe seleccionar un tipo de cuidado"),
  frecuenciaDias: Yup.number()
    .min(1, "La frecuencia debe ser al menos 1 día")
    .max(365, "La frecuencia no puede ser mayor a 365 días")
    .integer("La frecuencia debe ser un número entero")
    .typeError("La frecuencia debe ser un número válido"),
});

const SuggestedPage = () => {
  const [suggestedDates, setSuggestedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [plantas, setPlantas] = useState<PlantasType[]>([]);
  const [loadingPlantas, setLoadingPlantas] = useState(false);

  const initialValues = {
    planta: "",
    fechaInicio: null,
    fechaFin: null,
    tipo: "",
    frecuenciaDias: 1,
  };

  const fetchPlantas = async () => {
    setLoadingPlantas(true);
    try {
      const response = await plantasService.getAllPlantas({
        page: 1,
        limit: 1000,
      });
      setPlantas(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al cargar las plantas. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoadingPlantas(false);
    }
  };

  useEffect(() => {
    fetchPlantas();
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setSuggestedDates([]);

    try {
      const suggestionData: CalendarSuggestionDto = {
        idPlanta: parseInt(values.planta),
        fechaInicio: values.fechaInicio.format("YYYY-MM-DD"),
        fechaFin: values.fechaFin.format("YYYY-MM-DD"),
        tipo: values.tipo,
        frecuenciaDias: values.frecuenciaDias,
      };

      const response = await calendarService.getSuggestions(suggestionData);
      setSuggestedDates(response);

      if (response.length === 0) {
        Swal.fire({
          title: "Sin sugerencias",
          text: "No se encontraron fechas sugeridas para los criterios seleccionados.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al obtener las sugerencias. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Container maxWidth="md" sx={{ px: 4 }}>
        <Paper
          elevation={3}
          sx={{ borderRadius: 3, overflow: "hidden", mb: 4 }}
        >
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form>
                  <Box sx={{ mb: 3 }}>
                    <Field name="planta">
                      {({ field }: FieldProps) => (
                        <FormControl
                          fullWidth
                          error={touched.planta && !!errors.planta}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        >
                          <InputLabel>Seleccionar Planta</InputLabel>
                          <Select
                            {...field}
                            label="Seleccionar Planta"
                            disabled={loadingPlantas}
                          >
                            {loadingPlantas ? (
                              <MenuItem disabled>
                                <Typography variant="body2">
                                  Cargando plantas...
                                </Typography>
                              </MenuItem>
                            ) : plantas.length === 0 ? (
                              <MenuItem disabled>
                                <Typography variant="body2">
                                  No hay plantas registradas
                                </Typography>
                              </MenuItem>
                            ) : (
                              plantas.map((planta) => (
                                <MenuItem
                                  key={planta.id}
                                  value={planta.id.toString()}
                                >
                                  🌱 {planta.nombre} - {planta.especie}
                                </MenuItem>
                              ))
                            )}
                          </Select>
                          {touched.planta && errors.planta && (
                            <FormHelperText>{errors.planta}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </Field>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 3,
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <DateTimePicker
                      label="Fecha de Inicio"
                      value={values.fechaInicio}
                      onChange={(newValue) =>
                        setFieldValue("fechaInicio", newValue)
                      }
                      format="DD/MM/YYYY HH:mm"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: touched.fechaInicio && !!errors.fechaInicio,
                          helperText: touched.fechaInicio && errors.fechaInicio,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />

                    <DateTimePicker
                      label="Fecha de Fin"
                      value={values.fechaFin}
                      onChange={(newValue) =>
                        setFieldValue("fechaFin", newValue)
                      }
                      format="DD/MM/YYYY HH:mm"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: touched.fechaFin && !!errors.fechaFin,
                          helperText: touched.fechaFin && errors.fechaFin,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 3,
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Field name="tipo">
                      {({ field }: FieldProps) => (
                        <FormControl
                          fullWidth
                          error={touched.tipo && !!errors.tipo}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        >
                          <InputLabel>Tipo de Cuidado</InputLabel>
                          <Select {...field} label="Tipo de Cuidado">
                            <MenuItem value={TipoCuidado.RIEGO}>
                              🚿 Riego
                            </MenuItem>
                            <MenuItem value={TipoCuidado.FERTILIZACION}>
                              🌱 Fertilización
                            </MenuItem>
                            <MenuItem value={TipoCuidado.PODA}>
                              ✂️ Poda
                            </MenuItem>
                            <MenuItem value={TipoCuidado.LUZ}>☀️ Luz</MenuItem>
                          </Select>
                          {touched.tipo && errors.tipo && (
                            <FormHelperText>{errors.tipo}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="frecuenciaDias">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          label="Frecuencia (días)"
                          type="number"
                          error={
                            touched.frecuenciaDias && !!errors.frecuenciaDias
                          }
                          helperText={
                            touched.frecuenciaDias && errors.frecuenciaDias
                          }
                          required
                          fullWidth
                          inputProps={{ min: 1, max: 365 }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    </Field>
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
                </Form>
              )}
            </Formik>
          </CardContent>
        </Paper>

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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Se encontraron {suggestedDates.length} fechas sugeridas:
                </Typography>
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
                    <Typography variant="body1" fontWeight="medium" sx={{ mb: 0.5 }}>
                      📅 {formatDate(date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fecha recomendada para realizar el cuidado
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
    </LocalizationProvider>
  );
};

export default SuggestedPage;
