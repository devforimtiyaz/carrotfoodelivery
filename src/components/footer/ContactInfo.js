import styled from '@emotion/styled'
import ApartmentIcon from '@mui/icons-material/Apartment'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MailIcon from '@mui/icons-material/Mail'
import { Skeleton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useState } from 'react'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import ContactAddressMap from '../help-page/ContactAddressMap'

const ContactInfo = ({ global }) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(null)

    const handleHover = (value) => {
        setHovered(value)
    }

    const handleMouseLeave = () => {
        setHovered(null)
    }
    const handleOpenCloseMap = () => {
        setOpen(!open)
    }

    const contactItemStyle = (isHovered) => ({
        cursor: 'pointer',
        padding: '10px 14px',
        borderRadius: '10px',
        backgroundColor: isHovered ? 'rgba(255,130,0,0.08)' : 'rgba(255,255,255,0.03)',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(255,130,0,0.3)' : 'rgba(255,255,255,0.08)',
        transition: 'all 0.25s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
        },
    })

    const iconStyle = (isHovered) => ({
        color: isHovered ? 'primary.main' : 'rgba(255,255,255,0.6)',
        fontSize: { xs: '18px', md: '20px' },
        transition: 'color 0.25s ease',
    })

    const textStyle = (isHovered) => ({
        color: isHovered ? 'primary.main' : 'rgba(255,255,255,0.85)',
        fontSize: { xs: '13px', md: '14px' },
        fontWeight: 400,
        transition: 'color 0.25s ease',
    })

    if (!global)
        return (
            <>
                <CustomStackFullWidth
                    spacing={1}
                    alignItems={{
                        xs: 'center',
                        sm: 'center',
                        md: 'flex-start',
                    }}
                >
                    <CustomSkelenton width={160} />
                    <CustomSkelenton width={120} />
                    <CustomSkelenton width={140} />
                </CustomStackFullWidth>
            </>
        )
    return (
        <CustomStackFullWidth
            spacing={1.5}
            alignItems={{ xs: 'flex-start', sm: 'flex-start', md: 'flex-start' }}
        >
            <Stack
                onMouseEnter={() => handleHover('address')}
                onMouseLeave={handleMouseLeave}
                onClick={handleOpenCloseMap}
                direction="row"
                spacing={1.5}
                alignItems="flex-start"
                sx={contactItemStyle(hovered === 'address')}
            >
                <ApartmentIcon sx={iconStyle(hovered === 'address')} />
                <Typography sx={textStyle(hovered === 'address')}>
                    {global?.address}
                </Typography>
            </Stack>
            <Link href={`mailto:${global?.email}`} style={{ textDecoration: 'none' }}>
                <Stack
                    onMouseEnter={() => handleHover('mail')}
                    onMouseLeave={handleMouseLeave}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={contactItemStyle(hovered === 'mail')}
                >
                    <MailIcon sx={iconStyle(hovered === 'mail')} />
                    <Typography sx={textStyle(hovered === 'mail')} component="p">
                        {global?.email}
                    </Typography>
                </Stack>
            </Link>
            <Link href={`tel:${global?.phone}`} style={{ textDecoration: 'none' }}>
                <Stack
                    onMouseEnter={() => handleHover('phone')}
                    onMouseLeave={handleMouseLeave}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={contactItemStyle(hovered === 'phone')}
                >
                    <LocalPhoneIcon sx={iconStyle(hovered === 'phone')} />
                    <Typography sx={textStyle(hovered === 'phone')} component="p">
                        {global?.phone}
                    </Typography>
                </Stack>
            </Link>
            <ContactAddressMap global={global} open={open} setOpen={setOpen} />
        </CustomStackFullWidth>
    )
}

export const CustomSkelenton = styled((props) => <Skeleton {...props} />)(
    ({ theme }) => ({
        background: 'rgba(255,255,255,0.1)',
    })
)

export default ContactInfo
