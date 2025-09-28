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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PageHeader from "../../components/PageHeader";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import PrimaryButton from "../../components/PrimaryButton";
import TipoCuidadoSelect from "../../components/TipoCuidadoSelect";
import { useNavigate, useParams } from "react-router";
import { cuidadosService } from "../../services/cuidados.services";
import type { CuidadosPostDto } from "../../DTO/CuidadosPostDTO";
import { TipoCuidado } from "../../shared/TipoCuidado.enum";
import type { CuidadosType } from "../../types/Cuidados.type";
import { validateFertilizacionAndPoda } from "../../utils/validateSameTime";
import { validateRiegoTime } from "../../utils/validateRiegoTime";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import dayjs, { type Dayjs } from "dayjs";

dayjs.locale("es");

const validationSchema = Yup.object({
  tipo: Yup.string().required("El tipo de cuidado es requerido"),
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
  notas: Yup.string().max(
    500,
    "Las notas no pueden tener más de 500 caracteres"
  ),
});

const CareForm = () => {
  const navigate = useNavigate();
  const { plantId, id } = useParams();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [existingCuidados, setExistingCuidados] = useState<CuidadosType[]>([]);
  const [initialValues, setInitialValues] = useState<{
    tipo: string;
    fechaInicio: Dayjs | null;
    fechaFin: Dayjs | null;
    notas: string;
  }>({
    tipo: "",
    fechaInicio: null,
    fechaFin: null,
    notas: "",
  });

  const isEditing = !!id;

  const fetchCuidadoData = async () => {
    if (!id) return;

    setLoadingData(true);
    try {
      const cuidadoData = await cuidadosService.getCuidadoById(parseInt(id));
      const newInitialValues = {
        tipo: cuidadoData.tipo,
        fechaInicio: dayjs(cuidadoData.fechaInicio),
        fechaFin: cuidadoData.fechaFin ? dayjs(cuidadoData.fechaFin) : null,
        notas: cuidadoData.notas || "",
      };
      setInitialValues(newInitialValues);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar la información del cuidado. Por favor, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const fetchExistingCuidados = async () => {
    if (!plantId) return;

    try {
      const response = await cuidadosService.getCuidadosByPlantId(
        Number(plantId)
      );

      setExistingCuidados(response);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los cuidados existentes.",
        icon: "error",
        confirmButtonText: "OK",
      });
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

  const validateBusinessRules = (values: any) => {
    const errors: any = {};

    if (values.tipo && values.fechaInicio && plantId) {
      const fechaInicio = values.fechaInicio.toDate();
      const idPlantaNum = parseInt(plantId);

      const cuidadosParaValidar = existingCuidados.filter((c) =>
        isEditing ? c.id !== parseInt(id!) : true
      );

      if (
        !validateRiegoTime(
          values.tipo,
          fechaInicio,
          idPlantaNum,
          cuidadosParaValidar
        )
      ) {
        errors.fechaInicio =
          "No se puede regar la planta dentro de las 24 horas posteriores a una fertilización";
      }

      if (
        !validateFertilizacionAndPoda(
          values.tipo,
          fechaInicio,
          idPlantaNum,
          cuidadosParaValidar
        )
      ) {
        errors.fechaInicio =
          "No se puede registrar una poda o fertilización en la misma planta el mismo día";
      }
    }

    return errors;
  };

  const handleSubmit = async (values: any) => {
    if (!plantId) {
      Swal.fire({
        title: "Error",
        text: "ID de planta requerido.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const businessErrors = validateBusinessRules(values);

    if (Object.keys(businessErrors).length > 0) {
      Swal.fire({
        title: "Error de Validación",
        text: Object.values(businessErrors)[0] as string,
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    setLoading(true);
    try {
      const cuidadoData: CuidadosPostDto = {
        tipo: values.tipo,
        fechaInicio: values.fechaInicio.toDate(),
        fechaFin: values.fechaFin.toDate(),
        notas: values.notas,
        idPlanta: parseInt(plantId),
      };

      if (isEditing) {
        await cuidadosService.updateCuidado(parseInt(id!), cuidadoData);
        Swal.fire({
          title: "¡Actualizado!",
          text: "El cuidado ha sido actualizado correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await cuidadosService.createCuidado(cuidadoData);
        Swal.fire({
          title: "¡Creado!",
          text: "El cuidado ha sido creado correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      navigate(`/plants/${plantId}`, {
        replace: true,
      });
    } catch (error: any) {
      Swal.fire({
        title: error.response.data.message ? "Cuidado no valido" : "Error",
        text:
          error.response.data.message ??
          `No se pudo ${
            isEditing ? "actualizar" : "crear"
          } el cuidado. Por favor, inténta de nuevo.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <PageHeader
            title={isEditing ? "Editar Cuidado" : "Agregar Nuevo Cuidado"}
            subtitle={
              isEditing
                ? "Modifica los datos del cuidado"
                : "Registra un nuevo cuidado para tu planta"
            }
            icon={isEditing ? "✏️" : "🌱"}
          />

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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
                validateOnBlur={false}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form>
                    <Box sx={{ mb: 3 }}>
                      <Field name="tipo">
                        {({ field }: FieldProps) => (
                          <TipoCuidadoSelect
                            value={field.value}
                            onChange={(value) => setFieldValue("tipo", value)}
                            error={touched.tipo && !!errors.tipo}
                            helperText={touched.tipo && errors.tipo ? errors.tipo : undefined}
                            required
                          />
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
                      <CustomDateTimePicker
                        label="Fecha de Inicio"
                        value={values.fechaInicio}
                        onChange={(newValue) =>
                          setFieldValue("fechaInicio", newValue)
                        }
                        error={touched.fechaInicio && !!errors.fechaInicio}
                        helperText={touched.fechaInicio && errors.fechaInicio ? errors.fechaInicio : undefined}
                        required
                        disablePast={!isEditing}
                      />

                      <CustomDateTimePicker
                        label="Fecha de Fin"
                        value={values.fechaFin}
                        onChange={(newValue) =>
                          setFieldValue("fechaFin", newValue)
                        }
                        error={touched.fechaFin && !!errors.fechaFin}
                        helperText={touched.fechaFin && errors.fechaFin ? errors.fechaFin : undefined}
                        required
                        disablePast={!isEditing}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Field name="notas">
                        {({ field }: FieldProps) => (
                          <TextField
                            {...field}
                            label="Notas adicionales"
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Describe detalles específicos del cuidado..."
                            error={touched.notas && !!errors.notas}
                            helperText={touched.notas && errors.notas ? errors.notas : undefined}
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
                      <PrimaryButton
                        type="submit"
                        startIcon={<SaveIcon />}
                        disabled={loading}
                      >
                        {loading
                          ? isEditing
                            ? "Actualizando..."
                            : "Guardando..."
                          : isEditing
                          ? "Actualizar Cuidado"
                          : "Guardar Cuidado"}
                      </PrimaryButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            )}
          </CardContent>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default CareForm;
