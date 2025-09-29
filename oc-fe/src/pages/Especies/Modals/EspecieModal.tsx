import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Modal from "../../../components/Modal";
import type { EspeciePostDto } from "../../../dtos/especiePost.dto";
import type { EspecieType } from "../../../types/especie.type";
import { especiesService } from "../../../services/especies.services";
import { Formik, Form, Field } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .required("El nombre es requerido"),
  nombreCientifico: Yup.string().max(
    150,
    "El nombre científico no puede tener más de 150 caracteres"
  ),
  descripcion: Yup.string().max(
    500,
    "La descripción no puede tener más de 500 caracteres"
  ),
});

interface EspecieModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  especie?: EspecieType | null;
}

const EspecieModal = ({
  open,
  onClose,
  onSuccess,
  especie,
}: EspecieModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!especie;

  const initialValues: EspeciePostDto = {
    nombre: especie?.nombre || "",
    nombreCientifico: especie?.nombreCientifico || "",
    descripcion: especie?.descripcion || "",
  };

  const handleSubmit = async (values: EspeciePostDto, { resetForm }: any) => {
    try {
      setIsSubmitting(true);

      if (isEditing) {
        await especiesService.updateEspecie(especie!.id, values);
        Swal.fire({
          title: "¡Actualizada!",
          text: "La especie ha sido actualizada correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await especiesService.createEspecie(values);
        Swal.fire({
          title: "¡Creada!",
          text: "La especie ha sido creada correctamente.",
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
        } la especie. Por favor, inténta de nuevo.`,
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
          title={isEditing ? "Editar Especie" : "Crear Nueva Especie"}
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

              <Field name="nombreCientifico">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    label="Nombre Científico"
                    error={
                      touched.nombreCientifico && !!errors.nombreCientifico
                    }
                    helperText={
                      touched.nombreCientifico && errors.nombreCientifico
                    }
                    fullWidth
                    placeholder="Ej: Rosa gallica..."
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
                    placeholder="Descripción opcional de la especie..."
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
                    ? "Actualizar Especie"
                    : "Crear Especie"}
                </Button>
              </Box>
            </Box>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default EspecieModal;
