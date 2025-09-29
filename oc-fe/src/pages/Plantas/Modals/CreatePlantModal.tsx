import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Modal from "../../../components/Modal";
import type { PlantasPostDto } from "../../../dtos/plantasPost.dto";
import { plantasService } from "../../../services/plantas.services";

import type { EspecieType } from "../../../types/especie.type";
import type { UbicacionType } from "../../../types/ubicacion.type";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { especiesService } from "../../../services/especies.services";
import { ubicacionesService } from "../../../services/ubicaciones.services";
import type { CreatePlantModalProps } from "../../../interfaces/createPlantModalProps.interface";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es requerido"),
  idEspecie: Yup.string()
    .required("La especie es requerida")
    .typeError("Debe seleccionar una especie"),
  idUbicacion: Yup.string()
    .nullable()
    .typeError("Debe seleccionar una ubicación válida"),
});

const CreatePlantModal = ({
  open,
  onClose,
  onSuccess,
}: CreatePlantModalProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [especies, setEspecies] = useState<EspecieType[]>([]);
  const [ubicaciones, setUbicaciones] = useState<UbicacionType[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const initialValues: PlantasPostDto = {
    nombre: "",
    idEspecie: 0,
    idUbicacion: undefined,
  };

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const [especiesData, ubicacionesData] = await Promise.all([
        especiesService.getEspeciesForSelect(),
        ubicacionesService.getUbicacionesForSelect(),
      ]);
      setEspecies(especiesData);
      setUbicaciones(ubicacionesData);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los datos necesarios.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const handleCreatePlant = async (plantData: PlantasPostDto) => {
    try {
      setIsCreating(true);
      await plantasService.createPlanta(plantData);

      Swal.fire({
        title: "¡Éxito!",
        text: "La planta ha sido creada correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating plant:", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo crear la planta. Por favor, inténta de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = (resetForm?: () => void) => {
    resetForm?.();
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleCreatePlant(values);
        resetForm();
      }}
    >
      {({ errors, touched, isValid, dirty, resetForm }) => {
        return (
          <Modal
            open={open}
            onClose={() => handleClose(resetForm)}
            title="Crear Nueva Planta"
            maxWidth="sm"
          >
            <Form>
              <Box display="flex" flexDirection="column" gap={3}>
                <Field name="nombre">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Nombre"
                      error={touched.nombre && !!errors.nombre}
                      helperText={touched.nombre && errors.nombre}
                      fullWidth
                      required
                    />
                  )}
                </Field>

                <Field name="idEspecie">
                  {({ field }: FieldProps) => (
                    <FormControl
                      fullWidth
                      error={touched.idEspecie && !!errors.idEspecie}
                      required
                    >
                      <InputLabel>Especie</InputLabel>
                      <Select {...field} label="Especie" disabled={loadingData}>
                        {loadingData ? (
                          <MenuItem disabled>Cargando especies...</MenuItem>
                        ) : especies.length === 0 ? (
                          <MenuItem disabled>
                            No hay especies registradas
                          </MenuItem>
                        ) : (
                          especies.map((especie) => (
                            <MenuItem key={especie.id} value={especie.id}>
                              🌺 {especie.nombre}
                              {especie.nombreCientifico &&
                                ` (${especie.nombreCientifico})`}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      {touched.idEspecie && errors.idEspecie && (
                        <FormHelperText>{errors.idEspecie}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>

                <Field name="idUbicacion">
                  {({ field }: FieldProps) => (
                    <FormControl
                      fullWidth
                      error={touched.idUbicacion && !!errors.idUbicacion}
                    >
                      <InputLabel>Ubicación (Opcional)</InputLabel>
                      <Select
                        {...field}
                        label="Ubicación (Opcional)"
                        disabled={loadingData}
                        value={field.value || ""}
                      >
                        <MenuItem value="">
                          <em>Sin ubicación específica</em>
                        </MenuItem>
                        {loadingData ? (
                          <MenuItem disabled>Cargando ubicaciones...</MenuItem>
                        ) : ubicaciones.length === 0 ? (
                          <MenuItem disabled>
                            No hay ubicaciones registradas
                          </MenuItem>
                        ) : (
                          ubicaciones.map((ubicacion) => (
                            <MenuItem key={ubicacion.id} value={ubicacion.id}>
                              📍 {ubicacion.nombre}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      {touched.idUbicacion && errors.idUbicacion && (
                        <FormHelperText>{errors.idUbicacion}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>

                <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                  <Button
                    onClick={() => handleClose(resetForm)}
                    color="secondary"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isCreating || !isValid || !dirty}
                  >
                    {isCreating ? "Creando..." : "Crear Planta"}
                  </Button>
                </Box>
              </Box>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default CreatePlantModal;
