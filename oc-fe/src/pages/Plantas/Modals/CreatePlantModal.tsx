import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Modal from "../../../components/Modal";
import type { PlantasPostDto } from "../../../DTO/PlantasPostDTO";
import { plantasService } from "../../../services/plantas.services";
import type { CreatePlantModalProps } from "../../../interfaces/CreatePlantModalProps.interface";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es requerido"),
  especie: Yup.string()
    .min(2, "La especie debe tener al menos 2 caracteres")
    .max(50, "La especie no puede tener más de 50 caracteres")
    .required("La especie es requerida"),
  ubicacion: Yup.string()
    .min(2, "La ubicación debe tener al menos 2 caracteres")
    .max(100, "La ubicación no puede tener más de 100 caracteres")
    .required("La ubicación es requerida"),
});

const CreatePlantModal = ({
  open,
  onClose,
  onSuccess,
}: CreatePlantModalProps) => {
  const [isCreating, setIsCreating] = useState(false);

  const initialValues: PlantasPostDto = {
    nombre: "",
    especie: "",
    ubicacion: "",
  };

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

  const handleClose = () => {
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
      {({ errors, touched, isValid, dirty }) => {
        return (
          <Modal
            open={open}
            onClose={handleClose}
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

                <Field name="especie">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Especie"
                      error={touched.especie && !!errors.especie}
                      helperText={touched.especie && errors.especie}
                      fullWidth
                      required
                    />
                  )}
                </Field>

                <Field name="ubicacion">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Ubicación"
                      error={touched.ubicacion && !!errors.ubicacion}
                      helperText={touched.ubicacion && errors.ubicacion}
                      fullWidth
                      required
                    />
                  )}
                </Field>

                <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                  <Button onClick={handleClose} color="secondary">
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
