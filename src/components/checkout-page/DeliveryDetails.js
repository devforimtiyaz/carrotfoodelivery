import React, { useRef } from 'react'
import { DeliveryCaption, DeliveryTitle } from './CheckOut.style'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import DeliveryAddress from './DeliveryAddress'
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
} from '@/styled-components/CustomStyles.style'
import OrderType from './order-type'
import AdditionalAddresses from './AdditionalAddresses'

import CheckoutSelectedAddressGuest from './guest-user/CheckoutSelectedAddressGuest'
import { getToken } from './functions/getGuestUserId'
const DeliveryDetails = (props) => {
    const {
        global,
        restaurantData,
        setOrderType,
        orderType,
        setAddress,
        address,
        subscriptionStates,
        subscriptionDispatch,
        page,
        additionalInformationStates,
        additionalInformationDispatch,
        setDeliveryTip,
        setPaymenMethod,
        setPaymentMethodDetails,
        setUsePartialPayment,
        setSwitchToWallet,
        token,
    } = props
    const { t } = useTranslation()
    const deliveryAddressRef = useRef(null)

    const handleChange = (e) => {
        if (e.target.value === 'take_away') {
            setDeliveryTip(0)
        }
        setOrderType(e.target.value)
    }

    const handleSavedAddressClick = (event) => {
        if (deliveryAddressRef.current) {
            deliveryAddressRef.current.openPopover(event)
        }
    }

    return (
        <CustomPaperBigCard>
            <CustomStackFullWidth>
                <DeliveryTitle>
                    {global?.cash_on_delivery &&
                        restaurantData?.data?.order_subscription_active &&
                        t('ORDER TYPE &')}{' '}
                    {t('DELIVERY DETAILS')}
                </DeliveryTitle>
                <FormControl>
                    {page !== 'campaign' &&
                        global?.cash_on_delivery &&
                        restaurantData?.data?.order_subscription_active &&
                        getToken() && (
                            <OrderType
                                t={t}
                                subscriptionStates={subscriptionStates}
                                subscriptionDispatch={subscriptionDispatch}
                                setDeliveryTip={setDeliveryTip}
                                setPaymenMethod={setPaymenMethod}
                                setPaymentMethodDetails={
                                    setPaymentMethodDetails
                                }
                                setUsePartialPayment={setUsePartialPayment}
                                setSwitchToWallet={setSwitchToWallet}
                                setOrderType={setOrderType}
                            />
                        )}


                    {restaurantData?.data && (
                        <RadioGroup
                            value={orderType}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => handleChange(e)}
                        >
                            {restaurantData?.data?.delivery &&
                                global?.home_delivery && (
                                    <FormControlLabel
                                        value="delivery"
                                        control={<Radio />}
                                        label={t('Home Delivery')}
                                    />
                                )}
                            {restaurantData?.data?.take_away &&
                                global?.take_away && (
                                    <FormControlLabel
                                        value="take_away"
                                        control={<Radio />}
                                        label={t('Take Away')}
                                    />
                                )}
                            {restaurantData?.data?.is_dine_in_active &&
                                global?.dine_in_order_option ? (
                                <FormControlLabel
                                    value="dine_in"
                                    control={<Radio />}
                                    label={t('Dine In')}
                                />
                            ) : (
                                ''
                            )}
                        </RadioGroup>
                    )}
                </FormControl>
                {!token && orderType !== 'dine_in' ? (
                    <CheckoutSelectedAddressGuest
                        address={address}
                        orderType={orderType}
                    />
                ) : (
                    <>
                        {orderType &&
                            orderType !== 'dine_in' &&
                            orderType !== 'take_away' && (
                                <DeliveryAddress
                                    ref={deliveryAddressRef}
                                    setAddress={setAddress}
                                    address={address}
                                    additionalInformationDispatch={
                                        additionalInformationDispatch
                                    }
                                    restaurantId={restaurantData?.data?.zone_id}
                                    token={token}
                                    hideSavedOption={getToken()}
                                />
                            )}
                    </>
                )}

                {getToken() && (
                    <Box sx={{ mt: 2 }}>
                        <AdditionalAddresses
                            orderType={orderType}
                            t={t}
                            additionalInformationStates={
                                additionalInformationStates
                            }
                            additionalInformationDispatch={
                                additionalInformationDispatch
                            }
                            onSavedAddressClick={handleSavedAddressClick}
                        />
                    </Box>
                )}
            </CustomStackFullWidth>
        </CustomPaperBigCard>
    )
}

DeliveryDetails.propTypes = {}

export default React.memo(DeliveryDetails)
