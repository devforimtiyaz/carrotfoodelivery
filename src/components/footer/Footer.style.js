import { Box, styled } from '@mui/material'
export const StyledFooterBackground = styled(Box)(({ theme, router }) => ({
    width: '100%',
    background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,130,0,0.3), transparent)',
    },
}))
