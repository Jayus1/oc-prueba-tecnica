import type { PaginationMeta } from "./PaginatedResponse.interface";

export default interface UsePaginationProps {
    currentPage: number;
    pageSize: number;
    paginationMeta: PaginationMeta | null;
    setCurrentPage: (page: number) => void;
    setPaginationMeta: (meta: PaginationMeta) => void;
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}