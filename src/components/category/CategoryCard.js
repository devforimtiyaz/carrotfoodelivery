import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { CatagoriCardPaper, CatagoriImg } from './Catagori.style'

const CategoryCard = ({ categoryImage, name, id, reduxImage }) => {
    const image = `${reduxImage}/${categoryImage}`
    return (
        <Box>
            <Box
                sx={{
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                }}
            >
                <CatagoriCardPaper elevation={0}>
                    <CatagoriImg>
                        <img src={image} alt="category" />
                    </CatagoriImg>
                    <Stack sx={{ textAlign: 'center' }}>
                        <Typography variant="h4">{name}</Typography>
                        <Typography variant="h6">(25 Items)</Typography>
                    </Stack>
                </CatagoriCardPaper>
            </Box>
        </Box>
    )
}

export default CategoryCard
