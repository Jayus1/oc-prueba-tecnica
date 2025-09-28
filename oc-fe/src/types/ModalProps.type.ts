export type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    fullWidth?: boolean;
};