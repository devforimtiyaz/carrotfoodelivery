import React, { useEffect, useState } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { PymentTitle } from '../CheckOut.style'
import { useTranslation } from 'react-i18next'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '../../../styled-components/CustomStyles.style'
import CustomImageContainer from '../../CustomImageContainer'
import { useTheme } from '@mui/material/styles'
import CustomDivider from '../../CustomDivider'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CustomModal from '../../custom-modal/CustomModal'
import AllPaymentMethod from '../AllPaymentMethod'
import OfflinePayment from '../assets/OfflinePayment'
import { useDispatch, useSelector } from 'react-redux'
import {
    setOfflineInfoStep,
    setOfflineMethod,
} from '@/redux/slices/OfflinePayment'
import PartialPayment from '../PartialPayment'

import PaymentIcon from '@mui/icons-material/Payment'

const PaymentOptions = (props) => {
    const theme = useTheme()
    const {
        global,
        paymenMethod,
        setPaymenMethod,
        subscriptionStates,
        usePartialPayment,
        selected,
        setSelected,
        paymentMethodDetails,
        setPaymentMethodDetails,
        setSwitchToWallet,
        offlinePaymentOptions,
        handlePartialPayment,
        removePartialPayment,
        walletAmount,
        totalAmount,
        switchToWallet,
        setChangeAmount,
        changeAmount,
        openModal,
        setOpenModal

    } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    // const [openModal, setOpenModal] = useState(false)
    const { offLineWithPartial } = useSelector((state) => state.offlinePayment)
    const [isCheckedOffline, setIsCheckedOffline] = useState(
        selected?.method === 'offline_payment'
    )
    const { offlineInfoStep } = useSelector((state) => state.offlinePayment)
    useEffect(() => {
        if (offlineInfoStep === 2) {
            dispatch(setOfflineInfoStep(1))
        }
    }, [])
    useEffect(() => {
        if (!selected?.method) {
            setIsCheckedOffline(false)
        }
    }, [selected])

    const getPaymentMethod = (item) => {
        setSelected(item)
        setSwitchToWallet(false)
    }

    const handleClick = () => {
        setOpenModal(true)
    }


    // Direct payment selection handlers
    const handleCashOnDelivery = () => {
        const codPayment = {
            name: 'cash_on_delivery',
            image: null,
        }
        setSelected(codPayment)
        setPaymenMethod('cash_on_delivery')
        setPaymentMethodDetails(codPayment)
        setSwitchToWallet(false)
        dispatch(setOfflineInfoStep(0))
        setIsCheckedOffline(false)
    }

    const handleRazorpay = () => {
        // Find Razorpay from digital payment methods
        const razorpayPayment = global?.active_payment_method_list?.find(
            (method) => method?.gateway?.toLowerCase()?.includes('razor')
        )
        if (razorpayPayment) {
            const payment = {
                name: razorpayPayment?.gateway,
                image: razorpayPayment?.gateway_image,
            }
            setSelected(payment)
            setPaymenMethod(razorpayPayment?.gateway)
            setPaymentMethodDetails(payment)
            setSwitchToWallet(false)
            dispatch(setOfflineInfoStep(0))
            setIsCheckedOffline(false)
        }
    }

    const isCODSelected = paymentMethodDetails?.name === 'cash_on_delivery'
    const isRazorpaySelected = paymentMethodDetails?.name?.toLowerCase()?.includes('razor')

    return (
        <CustomPaperBigCard nopadding="true">
            <Grid container>
                <Grid item xs={12} md={12}>
                    <CustomStackFullWidth
                        justifyContent="space-between"
                        direction="row"
                        padding="19px 16px 3px 16px"
                    >
                        <PymentTitle>{t('Payment Options')}</PymentTitle>
                        <BorderColorOutlinedIcon
                            onClick={handleClick}
                            color="primary"
                            style={{ cursor: 'pointer' }}
                        />
                    </CustomStackFullWidth>
                </Grid>
                <CustomDivider />

                {/* Direct Payment Options */}
                <Grid item xs={12} md={12}>
                    <Stack
                        direction="row"
                        spacing={2}
                        padding="16px"
                        justifyContent="center"
                    >
                        <Button
                            variant={isCODSelected ? 'contained' : 'outlined'}
                            onClick={handleCashOnDelivery}
                            startIcon={<Typography fontWeight="600" fontSize="18px">₹</Typography>}
                            sx={{
                                flex: 1,
                                py: 1.5,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: isCODSelected ? 2 : 0,
                                color: (theme) =>
                                    !isCODSelected &&
                                        theme.palette.mode === 'light'
                                        ? 'common.black'
                                        : !isCODSelected
                                            ? 'primary.main'
                                            : 'white',
                                borderColor: (theme) =>
                                    !isCODSelected &&
                                        theme.palette.mode === 'light'
                                        ? 'rgba(0, 0, 0, 0.23)'
                                        : 'primary.main',
                                '&:hover': {
                                    backgroundColor: (theme) =>
                                        isCODSelected
                                            ? theme.palette.primary.dark
                                            : theme.palette.mode === 'light'
                                                ? 'rgba(255, 130, 0, 0.12)'
                                                : 'rgba(255, 130, 0, 0.2)',
                                    borderColor: 'primary.main',
                                    color: (theme) =>
                                        isCODSelected
                                            ? 'white'
                                            : theme.palette.mode === 'light'
                                                ? '#333333'
                                                : theme.palette.primary.main,
                                },
                            }}
                        >
                            {t('Cash on Delivery')}
                        </Button>
                        {global?.active_payment_method_list?.some(
                            (method) => method?.gateway?.toLowerCase()?.includes('razor')
                        ) && (
                                <Button
                                    variant={
                                        isRazorpaySelected
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={handleRazorpay}
                                    startIcon={<PaymentIcon />}
                                    sx={{
                                        flex: 1,
                                        py: 1.5,
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        boxShadow: isRazorpaySelected ? 2 : 0,
                                        color: (theme) =>
                                            !isRazorpaySelected &&
                                                theme.palette.mode === 'light'
                                                ? 'common.black'
                                                : !isRazorpaySelected
                                                    ? 'primary.main'
                                                    : 'white',
                                        borderColor: (theme) =>
                                            !isRazorpaySelected &&
                                                theme.palette.mode === 'light'
                                                ? 'rgba(0, 0, 0, 0.23)'
                                                : 'primary.main',
                                        '&:hover': {
                                            backgroundColor: (theme) =>
                                                isRazorpaySelected
                                                    ? theme.palette.primary.dark
                                                    : theme.palette.mode === 'light'
                                                        ? 'rgba(255, 130, 0, 0.12)'
                                                        : 'rgba(255, 130, 0, 0.2)',
                                            borderColor: 'primary.main',
                                            color: (theme) =>
                                                isRazorpaySelected
                                                    ? 'white'
                                                    : theme.palette.mode === 'light'
                                                        ? '#333333'
                                                        : theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    {t('Razorpay (UPI)')}
                                </Button>
                            )}
                    </Stack>
                </Grid>

                {/* More Payment Options Link */}
                <CustomStackFullWidth
                    direction="row"
                    padding="0 16px 16px 16px"
                    sx={{ cursor: 'pointer' }}
                    onClick={handleClick}
                    justifyContent="center"
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <AddCircleOutlineIcon
                            style={{ width: '18px', height: '18px' }}
                            color="primary"
                        />
                        <Typography
                            fontSize="12px"
                            fontWeight="500"
                            color={theme.palette.primary.main}
                        >
                            {t('More Payment Options')}
                        </Typography>
                    </Stack>
                </CustomStackFullWidth>


            </Grid>
        </CustomPaperBigCard>
    )
}

PaymentOptions.propTypes = {}

export default PaymentOptions

