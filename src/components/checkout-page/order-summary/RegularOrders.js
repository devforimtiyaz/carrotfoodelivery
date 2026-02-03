import React from 'react'
import { Grid, Stack, Typography, IconButton, Button } from '@mui/material'
import {
    OrderFoodAmount,
    OrderFoodName,
    OrderFoodSubtitle,
} from '../CheckOut.style'
import {
    getAmount,
    getSelectedAddOn,
    getConvertDiscount,
    getTotalVariationsPrice,
    calculateItemBasePrice,
    handleTotalAmountWithAddonsFF,
} from '@/utils/customFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import Skeleton from '@mui/material/Skeleton'
import CustomImageContainer from '../../CustomImageContainer'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import VisibleVariations from '../../floating-cart/VisibleVariations'
import {
    removeProduct,
    incrementProductQty,
    decrementProductQty,
} from '@/redux/slices/cart'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { toast } from 'react-hot-toast'
import useDeleteCartItem from '../../../hooks/react-query/add-cart/useDeleteCartItem'
import useCartItemUpdate from '../../../hooks/react-query/add-cart/useCartItemUpdate'
import { getGuestId } from '../functions/getGuestUserId'
import { onErrorResponse } from '../../ErrorResponse'
import { getSelectedAddons } from '../../navbar/second-navbar/SecondNavbar'
import { getItemDataForAddToCart } from '../../floating-cart/helperFunction'

const RegularOrders = ({ orderType }) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { cartList } = useSelector((state) => state.cart)
    const { global } = useSelector((state) => state.globalSettings)
    const { mutate: itemRemove, isLoading: removeIsLoading } = useDeleteCartItem()
    const { mutate: updateMutate, isLoading: updatedLoading } = useCartItemUpdate()
    const guestId = getGuestId()

    let currencySymbol
    let currencySymbolDirection
    let digitAfterDecimalPoint
    if (global) {
        currencySymbol = global.currency_symbol
        currencySymbolDirection = global.currency_symbol_direction
        digitAfterDecimalPoint = global.digit_after_decimal_point
    }
    const languageDirection = localStorage.getItem('direction')

    const router = useRouter()

    const handleSuccess = (item) => {
        dispatch(removeProduct(item))
    }

    const handleRemove = (item) => {
        const cartIdAndGuestId = {
            cart_id: item?.cartItemId,
            guestId: getGuestId(),
        }
        itemRemove(cartIdAndGuestId, {
            onSuccess: () => handleSuccess(item),
            onError: onErrorResponse,
        })
    }

    const cartUpdateHandleSuccess = (res, cartItem) => {
        if (res) {
            res?.forEach((item) => {
                if (cartItem?.cartItemId === item?.id) {
                    const product = {
                        ...item?.item,
                        cartItemId: item?.id,
                        totalPrice: item?.price,
                        quantity: item?.quantity,
                        variations: item?.item?.variations,
                        selectedAddons: getSelectedAddons(item?.item?.addons),
                        itemBasePrice: getConvertDiscount(
                            item?.item?.discount,
                            item?.item?.discount_type,
                            calculateItemBasePrice(
                                item,
                                item?.item?.variations
                            ),
                            item?.item?.restaurant_discount
                        ),
                    }

                    dispatch(incrementProductQty(product))
                }
            })
        }
    }

    const cartUpdateHandleSuccessDecrement = (res, cartItem) => {
        if (res) {
            res?.forEach((item) => {
                if (cartItem?.cartItemId === item?.id) {
                    const product = {
                        ...item?.item,
                        cartItemId: item?.id,
                        totalPrice: item?.price,
                        quantity: item?.quantity,
                        variations: item?.item?.variations,
                        selectedAddons: getSelectedAddons(item?.item?.addons),
                        itemBasePrice: getConvertDiscount(
                            item?.item?.discount,
                            item?.item?.discount_type,
                            calculateItemBasePrice(
                                item,
                                item?.item?.variations
                            ),
                            item?.item?.restaurant_discount
                        ),
                    }

                    dispatch(decrementProductQty(product))
                }
            })
        }
    }

    const handleIncrement = (item) => {
        const updateQuantity = item?.quantity + 1
        const totalPrice =
            item?.price + getTotalVariationsPrice(item?.variations)
        const getPriceAfterDiscount = getConvertDiscount(
            item?.discount,
            item?.discount_type,
            totalPrice,
            item?.restaurant_discount
        )
        const productPrice = getPriceAfterDiscount * updateQuantity
        const itemObject = getItemDataForAddToCart(
            item,
            updateQuantity,
            productPrice,
            guestId
        )

        if (item?.maximum_cart_quantity) {
            if (item?.maximum_cart_quantity <= item?.quantity) {
                toast.error(t('Out of Stock'))
            } else {
                updateMutate(itemObject, {
                    onSuccess: (res) => cartUpdateHandleSuccess(res, item),
                    onError: onErrorResponse,
                })
            }
        } else {
            updateMutate(itemObject, {
                onSuccess: (res) => cartUpdateHandleSuccess(res, item),
                onError: onErrorResponse,
            })
        }
    }

    const handleDecrement = (item) => {
        const updateQuantity = item?.quantity - 1
        const totalPrice =
            item?.price + getTotalVariationsPrice(item?.variations)
        const getPriceAfterDiscount = getConvertDiscount(
            item?.discount,
            item?.discount_type,
            totalPrice,
            item?.restaurant_discount
        )
        const productPrice = getPriceAfterDiscount * updateQuantity
        const itemObject = getItemDataForAddToCart(
            item,
            updateQuantity,
            productPrice,
            guestId
        )
        updateMutate(itemObject, {
            onSuccess: (res) => cartUpdateHandleSuccessDecrement(res, item),
            onError: (error) => {
                error?.response?.data?.errors?.forEach((items) => {
                    toast.error(items?.message)
                })
            },
        })
    }

    const restaurantId = cartList.length > 0 ? cartList[0].restaurant_id : null

    return (
        <>
            {cartList.length > 0 ? (
                cartList.map((item, index) => (
                    <CustomStackFullWidth
                        key={index}
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mt={index !== 0 && '1rem'}
                    >

                        <Stack
                            paddingRight={languageDirection === 'rtl' && '10px'}
                            flexGrow="1"
                        >
                            <OrderFoodName>{item.name}</OrderFoodName>
                            {item?.variations?.length > 0 && (
                                <VisibleVariations
                                    variations={item?.variations}
                                    t={t}
                                />
                            )}
                            {item?.selectedAddons?.length > 0 && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.5}
                                >
                                    <OrderFoodSubtitle>
                                        {t('Addon')}
                                    </OrderFoodSubtitle>
                                    <OrderFoodSubtitle>:</OrderFoodSubtitle>
                                    <OrderFoodSubtitle>
                                        {getSelectedAddOn(item?.selectedAddons)}
                                    </OrderFoodSubtitle>
                                </Stack>
                            )}
                            <OrderFoodAmount>
                                {getAmount(
                                    handleTotalAmountWithAddonsFF(
                                        item.totalPrice,
                                        item?.selectedAddons
                                    ),
                                    currencySymbolDirection,
                                    currencySymbol,
                                    digitAfterDecimalPoint
                                )}
                            </OrderFoodAmount>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={1}
                                sx={{
                                    border: `1px solid ${theme.palette.neutral[300]}`,
                                    borderRadius: '8px',
                                    padding: '4px 8px',
                                }}
                            >
                                {item?.quantity > 1 ? (
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDecrement(item)}
                                        disabled={updatedLoading}
                                        sx={{
                                            padding: '4px',
                                            color: theme.palette.neutral[400],
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        size="small"
                                        disabled={removeIsLoading}
                                        onClick={() => handleRemove(item)}
                                        sx={{
                                            padding: '4px',
                                            color: theme.palette.error.main,
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <Typography
                                    fontWeight="600"
                                    fontSize="14px"
                                    color={theme.palette.neutral[1000]}
                                >
                                    {item.quantity}
                                </Typography>
                                <IconButton
                                    size="small"
                                    disabled={updatedLoading}
                                    onClick={() => handleIncrement(item)}
                                    sx={{
                                        padding: '4px',
                                        color: theme.palette.neutral[1000],
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Stack>

                    </CustomStackFullWidth>
                ))
            ) : (
                <CustomStackFullWidth
                    direction="row"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Skeleton
                        variant="rectangular"
                        height="90px"
                        width="95px"
                    />
                    <Stack>
                        <Skeleton variant="text" width="50px" />
                        <Skeleton variant="text" width="50px" />
                        <Skeleton variant="text" width="50px" />
                    </Stack>
                </CustomStackFullWidth>
            )}
            <Grid item md={12} xs={12}>
                <Stack
                    width="100%"
                    sx={{
                        mt: '10px',
                        borderBottom: `2px solid ${theme.palette.neutral[300]}`,
                    }}
                ></Stack>
            </Grid>
            {restaurantId && (
                <Grid item md={12} xs={12} mt="1rem" display="flex" justifyContent="center">
                    <Link href={`/restaurant/${restaurantId}`} passHref>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? 'common.black'
                                        : 'primary.main',
                            }}
                        >
                            {t('Add more items')}
                        </Button>
                    </Link>
                </Grid>
            )}
        </>
    )
}

RegularOrders.propTypes = {}

export default RegularOrders
