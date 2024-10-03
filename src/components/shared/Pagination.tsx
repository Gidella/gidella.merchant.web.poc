import { PaginatedModel } from '@/models/auth';
import { Box, Button, Typography } from '@mui/material';

interface PaginationProps<T> {
    paginatedData: PaginatedModel<T>;
    onPageChange: (page: number) => void;
}

const Pagination = <T,>({ paginatedData, onPageChange }: PaginationProps<T>) => {
    const { currentPage, totalPages, summary, hasPrevious, hasNext } = paginatedData;

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            {/* Summary */}
            <Typography variant="body2">{summary}</Typography>

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Previous Button */}
                <Button
                    variant="outlined"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                >
                    Prev
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? "contained" : "outlined"}
                        onClick={() => handlePageChange(page)}
                        sx={{ mx: 0.5 }}
                    >
                        {page}
                    </Button>
                ))}

                {/* Next Button */}
                <Button
                    variant="outlined"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNext}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default Pagination;
