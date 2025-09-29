import { useState } from 'react';
import type { PaginationMeta } from '../interfaces/PaginatedResponse.interface';
import type UsePaginationProps from '../interfaces/PaginationHookProps.interface';

export const usePagination = (initialPageSize: number = 10): UsePaginationProps => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(initialPageSize);
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta | null>(null);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return {
        currentPage,
        pageSize,
        paginationMeta,
        setCurrentPage,
        setPaginationMeta,
        handlePageChange
    };
};