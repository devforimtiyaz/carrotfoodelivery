import { alpha, Stack, Grid, IconButton, styled } from '@mui/material'

export const CustomIconButton = styled(IconButton)(
    ({ theme, nextbutton, color }) => ({
        borderRadius: '50%',
        color:
            nextbutton === 'true'
                ? theme.palette.neutral[100]
                : theme.palette.neutral[1000],
        background:
            nextbutton === 'true'
                ? alpha(theme.palette.primary.main, 0.5)
                : theme.palette.neutral[1400],
        width: '30px',
        height: '30px',
        '&:hover': {
            background:
                nextbutton === 'true'
                    ? theme.palette.primary.main
                    : theme.palette.neutral[300],
        },
    })
)

export const CustomSideOverLay = styled(Stack)(
    ({ theme, left, right, isdisabled }) => ({
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '69px',
            height: '100%',
            background: `linear-gradient(270deg, ${theme.palette.neutral[1000]} 0%, rgba(255, 255, 255, 0.00) 100%)`,
            opacity: isdisabled ? '0' : '.23',
            left: left,
            right: right,
            top: '.2%',
            borderRadius: '0px 4px 4px 0px',
        },
    })
)
export const CustomGridWithBgColor = styled(Grid)(
    ({ theme, foodsize, padding, newSection }) => ({
        background:
            foodsize > 0 && newSection
                ? theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, #1a1c24 0%, #1f2233 25%, #252a3d 50%, #1f2233 75%, #1a1c24 100%)`
                    : `linear-gradient(135deg, #f8f9fc 0%, #f0f4ff 25%, #e8efff 50%, #f0f4ff 75%, #f8f9fc 100%)`
                : `${theme.palette.sectionBg}`,
        padding: foodsize > 0 && (padding || '28px 0px 28px 28px'),
        borderRadius: '20px',
        position: 'relative',
        boxShadow: foodsize > 0 && newSection
            ? theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                : '0 4px 20px rgba(0, 0, 0, 0.06)'
            : 'none',
        border: foodsize > 0 && newSection
            ? theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.06)'
                : '1px solid rgba(0, 0, 0, 0.04)'
            : 'none',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
            boxShadow: foodsize > 0 && newSection
                ? theme.palette.mode === 'dark'
                    ? '0 6px 28px rgba(0, 0, 0, 0.4)'
                    : '0 6px 28px rgba(0, 0, 0, 0.09)'
                : 'none',
        },
        [theme.breakpoints.down('sm')]: {
            padding: foodsize > 0 && '12px 0px 16px 12px',
            borderRadius: '16px',
        },
    })
)
