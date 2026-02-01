import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from '@/styled-components/CustomStyles.style'
import { Box, alpha } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import CustomContainer from '../container'

const FooterBottom = () => {
    const { global } = useSelector((state) => state.globalSettings)
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: '100%',
                marginTop: '8px',
                borderTop: '1px solid',
                borderColor: alpha('#ffffff', 0.08),
                background: 'linear-gradient(180deg, rgba(255,130,0,0.03) 0%, transparent 100%)',
            }}
        >
            <CustomContainer>
                <CustomStackFullWidth
                    py="1.25rem"
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                >
                    <CustomColouredTypography
                        fontSize={{ xs: '12px', sm: '14px' }}
                        sx={{
                            fontWeight: 400,
                            letterSpacing: '0.5px',
                        }}
                        color={alpha('#ffffff', 0.6)}
                    >
                        <Box
                            component="span"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 500,
                            }}
                        >
                            {global?.business_name || 'CarrotFooDelivery'}
                        </Box>
                        {' '} &#169; {t('All rights reserved.')}
                    </CustomColouredTypography>
                </CustomStackFullWidth>
            </CustomContainer>
        </Box>
    )
}

FooterBottom.propTypes = {}

export default FooterBottom

