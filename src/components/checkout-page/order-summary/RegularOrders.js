import React from 'react'
import { Grid, Stack, Typography, IconButton, Button } from '@mui/material'
import {
    OrderFoodAmount,
    OrderFoodName,
    OrderFoodSubtitle,
} from '../CheckOut.style'
import { getAmount, getSelectedAddOn } from '@/utils/customFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import Skeleton from '@mui/material/Skeleton'
import CustomImageContainer from '../../CustomImageContainer'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import VisibleVariations from '../../floating-cart/VisibleVariations'
import { handleTotalAmountWithAddonsFF } from '@/utils/customFunctions'
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
import { getCartItemDisplayName } from '@/utils/customFunctions'

const RegularOrders = ({ orderType }) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { cartList } = useSelector((state) => state.cart)
    const { global } = useSelector((state) => state.globalSettings)
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
    const handleRemove = (item) => {
        dispatch(removeProduct(item))
    }

    const handleIncrement = (item) => {
        if (item?.maximum_cart_quantity) {
            if (item?.maximum_cart_quantity <= item?.quantity) {
                toast.error(t('Out of Stock'))
            }
        }
        const quantity = item?.quantity + 1
        const price = item?.totalPrice / item?.quantity
        const totalPrice = price * quantity
        dispatch(incrementProductQty({ ...item, quantity, totalPrice }))
    }

    const handleDecrement = (item) => {
        const quantity = item?.quantity - 1
        const price = item?.totalPrice / item?.quantity
        const totalPrice = price * quantity
        dispatch(decrementProductQty({ ...item, quantity, totalPrice }))
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
                        <Stack position="relative">
                            <CustomImageContainer
                                height="90px"
                                width="90px"
                                src={item.image_full_url}
                                loading="lazy"
                                borderRadius="10px"
                                objectFit="cover"
                            />
                            <Stack
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',

                                    background: (theme) =>
                                        theme.palette.primary.overLay,
                                    opacity: '0.6',
                                    padding: '10px',
                                    height: '30%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottomRightRadius: '10px',
                                    borderBottomLeftRadius: '10px',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color={theme.palette.neutral[100]}
                                >
                                    {item?.veg === 0 ? t('non-veg') : t('veg')}
                                </Typography>
                            </Stack>
                        </Stack>
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
