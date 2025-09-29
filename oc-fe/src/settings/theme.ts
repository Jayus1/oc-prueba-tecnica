import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4caf50",   // verde hoja
            light: "#81c784",  // verde claro
            dark: "#388e3c",   // verde oscuro
            contrastText: "#ffffff", // texto blanco
        },
        secondary: {
            main: "#8bc34a",   // verde lima
            light: "#aed581",  // verde lima claro
            dark: "#689f38",   // verde lima oscuro
            contrastText: "#ffffff", // texto blanco
        },
        success: {
            main: "#2e7d32",   // verde bosque
            contrastText: "#ffffff", // texto blanco
        },
        info: {
            main: "#66bb6a",   // verde menta
            contrastText: "#ffffff", // texto blanco
        },
        error: {
            main: "#d32f2f",   // rojo para botones de eliminar
            contrastText: "#ffffff", // texto blanco
        },
        background: {
            default: "#f1f8e9", // fondo verde muy claro
            paper: "#ffffff",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        transform: 'translateY(-1px)',
                    },
                },
                contained: {
                    color: '#ffffff',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '& fieldset': {
                            borderColor: '#c8e6c9',
                        },
                        '&:hover fieldset': {
                            borderColor: '#4caf50',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#388e3c',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#388e3c',
                        '&.Mui-focused': {
                            color: '#2e7d32',
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;