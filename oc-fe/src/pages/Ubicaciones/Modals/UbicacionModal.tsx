import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Modal from "../../../components/Modal";
import type { UbicacionPostDto } from "../../../dtos/ubicacionPost.dto";
import type { UbicacionType } from "../../../types/ubicacion.type";
import { ubicacionesService } from "../../../services/ubicaciones.services";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .required("El nombre es requerido"),
  descripcion: Yup.string().max(
    500,
    "La descripción no puede tener más de 500 caracteres"
  ),
});

interface UbicacionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  ubicacion?: UbicacionType | null;
}

const UbicacionModal = ({
  open,
  onClose,
  onSuccess,
  ubicacion,
}: UbicacionModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!ubicacion;

  const initialValues: UbicacionPostDto = {
    nombre: ubicacion?.nombre || "",
    descripcion: ubicacion?.descripcion || "",
  };

  const handleSubmit = async (values: UbicacionPostDto, { resetForm }: any) => {
    try {
      setIsSubmitting(true);

      if (isEditing) {
        await ubicacionesService.updateUbicacion(ubicacion!.id, values);
        Swal.fire({
          title: "¡Actualizada!",
          text: "La ubicación ha sido actualizada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await ubicacionesService.createUbicacion(values);
        Swal.fire({
          title: "¡Creada!",
          text: "La ubicación ha sido creada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        resetForm();
      }

      onClose();
      onSuccess?.();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo ${
          isEditing ? "actualizar" : "crear"
        } la ubicación. Por favor, inténta de nuevo.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
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
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty, resetForm }) => (
        <Modal
          open={open}
          onClose={() => handleClose(resetForm)}
          title={isEditing ? "Editar Ubicación" : "Crear Nueva Ubicación"}
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

              <Field name="descripcion">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    error={touched.descripcion && !!errors.descripcion}
                    helperText={touched.descripcion && errors.descripcion}
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Descripción opcional de la ubicación..."
                  />
                )}
              </Field>

              <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                <Button onClick={() => handleClose(resetForm)} color="secondary">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !isValid || (!dirty && !isEditing)}
                >
                  {isSubmitting
                    ? isEditing
                      ? "Actualizando..."
                      : "Creando..."
                    : isEditing
                    ? "Actualizar Ubicación"
                    : "Crear Ubicación"}
                </Button>
              </Box>
            </Box>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default UbicacionModal;
