import React from 'react'
import { Button, Stack, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CustomPaperCard } from '../custom-cards/CustomCards.style'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { setClearCart } from '@/redux/slices/cart'
import { useMutation } from 'react-query'
import { OrderApi } from '@/hooks/react-query/config/orderApi'
import { toast } from 'react-hot-toast'
import { onErrorResponse } from '../ErrorResponse'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CancelIcon from '@mui/icons-material/Cancel'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { useTheme } from '@mui/material/styles'

const CheckoutFailedCard = ({ id }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const theme = useTheme()

    const handleOrderFail = () => {
        dispatch(setClearCart())
        Router.push('/home')
    }

    const { mutate: paymentMethodUpdateMutation, isLoading: orderLoading } =
        useMutation(
            'order-payment-method-update',
            OrderApi.FailedPaymentMethodUpdate
        )

    const handleOnSuccess = () => {
        const handleSuccess = (response) => {
            toast.success(response.data.message)
            dispatch(setClearCart())
            Router.push('/home')
        }
        const formData = {
            order_id: id,
            _method: 'put',
        }
        paymentMethodUpdateMutation(formData, {
            onSuccess: handleSuccess,
            onError: onErrorResponse,
        })
    }

    return (
        <CustomPaperCard>
            <Stack
                width="100%"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                py={2}
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
                <Typography variant="h6" fontWeight="600" textAlign="center">
                    {t('Payment Cancelled')}
                </Typography>
                <Typography color="text.secondary" textAlign="center">
                    {t('Your online payment was cancelled or could not be completed. Would you like to continue with a different payment method?')}
                </Typography>
                <Stack spacing={1.5} width="100%">
                    <Button
                        loading={orderLoading}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={handleOnSuccess}
                        startIcon={<AttachMoneyIcon />}
                        sx={{
                            borderRadius: '8px',
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        {t('Switch to Cash On Delivery')}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        size="large"
                        onClick={handleOrderFail}
                        startIcon={<CancelIcon />}
                        sx={{
                            borderRadius: '8px',
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        {t('Cancel Order')}
                    </Button>
                </Stack>
            </Stack>
        </CustomPaperCard>
    )
}

CheckoutFailedCard.propTypes = {}

export default CheckoutFailedCard

