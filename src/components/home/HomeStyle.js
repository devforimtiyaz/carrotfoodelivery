import { styled } from '@mui/material/styles'
import { Box, Card, Typography, Stack } from '@mui/material'
import map from '../../assets/images/map.png'

export const LeftArrowStyle = styled(Box)(
    ({ theme, languageDirection, left, isdisabled }) => ({
        zIndex: 999,
        top: '42%',
        position: 'absolute',
        display: isdisabled && 'none',
        left: `${languageDirection === 'rtl' ? '2%' : left}`,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    })
)
export const RightArrowStyle = styled(Box)(
    ({ theme, languageDirection, right, isdisabled }) => ({
        zIndex: 999,
        position: 'absolute',
        top: '42%',
        right: `${languageDirection === 'rtl' ? '2%' : right}`,
        display: isdisabled && 'none',

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    })
)

export const HomeTitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: '800',
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
}))
export const HomeTextTypography = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '22px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '140px',

    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },
}))
export const PopularRestaurantCard = styled(Card)(({ theme }) => ({
    margin: '20px 0',
    padding: '30px',
    boxShadow: `${theme.palette.mode === 'light' &&
        '0px 0px 2px rgba(239, 120, 34, 0.1),0px 6px 12px rgba(239, 120, 34, 0.08)'
        }`,
    borderRadius: '10px',
    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('sm')]: {
        padding: '7px',
        margin: '0px 0',
    },
}))
export const FoodDetailModalStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '469px',
    width: '100%',
    borderRadius: '5px',
    boxShadow: 24,
    border: 'none',

    color: `${theme.palette.mode === 'dark' && '#fff'}`,
    [theme.breakpoints.down('md')]: {
        width: '85%',
    },
    [theme.breakpoints.down('xs')]: {
        width: '85%',
    },
}))

export const CustomSpinner = styled(Stack)(({ theme, color }) => ({
    position: 'relative',
    width: '10px',
    height: '10px',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'transparent',
    boxShadow:
        '0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 0 rgba(152, 128, 255, 0)',
    animation: 'dots-pin 1.5s infinite linear',
    '@Keyframes dots-pin': {
        '0%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '100%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '12.5%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 0 ${color}, 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '25%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 ${color}, 12.727926px 12.727926px 0 0 ${color}, 0 18px 0 0 ${color}, -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '37.5%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 0 ${color}, 0 18px 0 0 ${color}, -12.727926px 12.727926px 0 0 ${color}, -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '50%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 ${color}, -12.727926px 12.727926px 0 0 ${color}, -18px 0 0 0 ${color}, -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0)`,
        },
        '62.5%': {
            boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 0 ${color}, -18px 0 0 0 ${color}, -12.727926px -12.727926px 0 0 ${color}`,
        },
        '75%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 ${color}, -12.727926px -12.727926px 0 0 ${color}`,
        },
        '87.5%': {
            boxShadow: `0 -18px 0 0 ${color}, 12.727926px -12.727926px 0 0 ${color}, 18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.727926px -12.727926px 0 0 ${color}`,
        },
    },
}))

export const MapSetionWrapper = styled(Stack)(({ theme }) => ({
    backgroundImage: `url(${map.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.18)',
    },
    [theme.breakpoints.down('sm')]: {
        height: '340px',
        borderRadius: '16px',
    },
    '.map-overly': {
        height: '425px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.65) 0%, rgba(30, 30, 30, 0.55) 100%)',
        backdropFilter: 'blur(4px)',
        gap: '40px',
        padding: '24px',
        [theme.breakpoints.down('sm')]: {
            height: '340px',
            gap: '30px',
            borderRadius: '16px',
        },
    },
}))
export const VisitAgainWrapper = styled(Stack)(({ theme }) => ({
    borderRadius: '20px',
    alignItems: 'center',
    paddingBlock: '32px',
    gap: '28px',
    background: theme.palette.mode === 'dark'
        ? 'linear-gradient(145deg, rgba(40, 40, 45, 0.95) 0%, rgba(30, 30, 35, 0.98) 100%)'
        : 'linear-gradient(145deg, #FFF8F2 0%, #FFF5EB 50%, #FFF0E3 100%)',
    border: theme.palette.mode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.08)'
        : '1px solid rgba(255, 140, 0, 0.12)',
    boxShadow: theme.palette.mode === 'dark'
        ? '0 4px 24px rgba(0, 0, 0, 0.25)'
        : '0 4px 24px rgba(255, 140, 0, 0.08)',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    '&:hover': {
        boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.35)'
            : '0 8px 32px rgba(255, 140, 0, 0.12)',
    },
    '& .slick-dots': {
        position: 'absolute !important',
        bottom: '-35px !important',
        display: 'block',
        width: '100% !important',
        padding: 0,
        margin: 0,
        textAlign: 'center !important',
        '& li button:before': {
            color: theme.palette.primary.main,
            opacity: 0.4,
        },
        '& li.slick-active button:before': {
            opacity: 1,
        },
    },
    [theme.breakpoints.down('sm')]: {
        paddingBlock: '20px',
        gap: '16px',
        borderRadius: '16px',
    },
    '& .slick-track': {
        gap: '24px',
    },
}))
