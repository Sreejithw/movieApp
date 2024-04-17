import { Pagination as PaginationButton,Stack,Typography, Button, styled } from "@mui/material";

const StyledPaginationContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledPaginationButton = styled(Button)`
    margin: 30px 2px;
`;
const StyledPaginationText = styled(Typography)`
    margin: 0 20px;
    color: theme.palette.text.secondary
`;

const Pagination = ({currentPage, setPage, totalPages}) => {

    const handlePrev = () => {
        if(currentPage !== 1){
            setPage((prevPage) => prevPage - 1);
        }
    };
    
    const handleNext = () => {
        if(currentPage !== totalPages){
            setPage((prevPage) => prevPage + 1);
        }
    };

    const hadlePagination = (event, page) => {
        setPage(page);
    };

    if (totalPages === 0) return null;

    return (
        <StyledPaginationContainer>
            <StyledPaginationButton onClick={handlePrev} variant="contained" color="secondary" type="button">Prev</StyledPaginationButton>
            <StyledPaginationText variant="h4">{currentPage}</StyledPaginationText>
            <StyledPaginationButton onClick={handleNext} variant="contained" color="secondary" type="button">Next</StyledPaginationButton>
        </StyledPaginationContainer>
        // <Stack spacing={2}>
        //  <PaginationButton onChange={hadlePagination} count={totalPages} />
        // </Stack>
    )
}

export default Pagination