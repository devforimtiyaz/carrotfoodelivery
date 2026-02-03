import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import {
    setOfflineInfoStep,
    setOfflineWithPartials,
} from '@/redux/slices/OfflinePayment'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { Alert, Grid, Button } from '@mui/material'

const PlaceOrder = (props) => {
    const {
        distanceLoading,
        placeOrder,
        orderLoading,
        offlinePaymentLoading,
        offlineFormRef,
        usePartialPayment,
        page,
        paymentMethodDetails,
        setOpenPaymentModal,
    } = props
    const router = useRouter()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.userToken)
    const { offlineInfoStep } = useSelector((state) => state.offlinePayment)
    const { guestUserInfo } = useSelector((state) => state.guestUserInfo)
    const handleOfflineOrder = () => {
        if (!token && guestUserInfo === null) {
            toast.error(t('The Contact Person Info Is Required.'), {
                position: 'bottom-right',
            })
        } else {
            if (usePartialPayment) {
                dispatch(setOfflineInfoStep(2))
                dispatch(setOfflineWithPartials(true))
                router.push(
                    {
                        pathname: '/checkout',
                        query: { page: page, method: 'offline' },
                    },
                    undefined,
                    { shallow: true }
                )
            } else {
                dispatch(setOfflineInfoStep(2))
                dispatch(setOfflineWithPartials(false))
                router.push(
                    {
                        pathname: '/checkout',
                        query: { page: page, method: 'offline' },
                    },
                    undefined,
                    { shallow: true }
                )
            }
        }
    }
    const offlinePlaceOrder = () => {
        if (offlineFormRef.current) {
            offlineFormRef.current.handleSubmit() // Trigger form submission from Child2
        }
    }

    return (
        <CustomStackFullWidth alignItems="center" spacing={2} marginTop={{ xs: 0, md: '1rem' }}>
            {paymentMethodDetails?.method !== 'offline_payment' ? (
                <>
                    {/* Mobile View: 70/30 Split */}
                    <Grid container spacing={1} sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
                        <Grid item xs={8}>
                            <Alert severity="warning" sx={{ fontSize: '12px', padding: '0px 8px', height: '100%', alignItems: 'center', display: 'flex' }} icon={false}>
                                {t(`Please double check your order and address details. Order Cannot be CANCELLED once accepted by Restaurant.`)}
                            </Alert>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenPaymentModal(true)}
                                sx={{
                                    fontSize: '12px',
                                    padding: '5px',
                                    height: '100%',
                                    width: '100%',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.2'
                                }}
                            >
                                <CustomStackFullWidth alignItems="center" justifyContent="center">
                                    <span style={{ fontWeight: '600' }}>{t('Payment Mode')}</span>
                                    <span style={{ fontSize: '10px' }}>{t('(COD/UPI)')}</span>
                                </CustomStackFullWidth>
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Desktop View: Standard Layout */}
                    <Alert severity="warning" sx={{ mb: 1, fontSize: '13px', display: { xs: 'none', md: 'flex' } }}>
                        {t(
                            `Please double check your order and address details. Order Cannot be CANCELLED once accepted by Restaurant.`
                        )}
                    </Alert>

                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={placeOrder}
                        loading={orderLoading || distanceLoading}
                    >
                        {t('Place Order')}
                    </LoadingButton>
                </>
            ) : (
                <>
                    {offlineInfoStep === 2 ? (
                        <>
                            <Alert
                                severity="warning"
                                sx={{ mb: 1, fontSize: '13px' }}
                            >
                                {t(
                                    `Please double check your order and address details. Order Cannot be CANCELLED once accepted by Restaurant.`
                                )}
                            </Alert>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={offlinePlaceOrder}
                                loading={
                                    orderLoading ||
                                    offlinePaymentLoading ||
                                    distanceLoading
                                }
                            >
                                {t('Place Order')}
                            </LoadingButton>
                        </>
                    ) : (
                        <>
                            {(offlineInfoStep === 1 ||
                                offlineInfoStep === 0) && (
                                    <LoadingButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleOfflineOrder}
                                    >
                                        {t('Confirm Order')}
                                    </LoadingButton>
                                )}
                        </>
                    )}
                </>
            )}
        </CustomStackFullWidth>
    )
}

PlaceOrder.propTypes = {}

export default PlaceOrder
