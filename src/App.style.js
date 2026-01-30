import { styled } from '@mui/material'

export const WrapperForApp = styled('div', {
    shouldForwardProp: (prop) => prop !== 'pathname',
})(({ theme, pathname }) => ({
    direction: theme.direction,
    backgroundColor: pathname !== '/maintenance' && theme.palette.neutral[1800],
}))
