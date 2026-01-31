import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Box,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CancelIcon from '@mui/icons-material/Cancel'

const PaymentCancelledDialog = ({
    open,
    onSwitchToCOD,
    onCancelOrder,
    isLoading
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    padding: '8px',
                }
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.warning.light,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <WarningAmberIcon
                            sx={{
                                fontSize: 36,
                                color: theme.palette.warning.main
                            }}
                        />
                    </Box>
                </Box>
                <Typography variant="h5" fontWeight="600">
                    {t('Payment Cancelled')}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {t('Your online payment was cancelled or could not be completed. Would you like to continue with a different payment method?')}
                </Typography>
            </DialogContent>
            <DialogActions sx={{
                flexDirection: 'column',
                gap: 1.5,
                px: 3,
                pb: 3
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={onSwitchToCOD}
                    disabled={isLoading}
                    startIcon={<AttachMoneyIcon />}
                    sx={{
                        borderRadius: '8px',
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '16px',
                    }}
                >
                    {t('Switch to Cash on Delivery')}
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    size="large"
                    onClick={onCancelOrder}
                    disabled={isLoading}
                    startIcon={<CancelIcon />}
                    sx={{
                        borderRadius: '8px',
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '16px',
                    }}
                >
                    {t('Cancel Order')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PaymentCancelledDialog
