import React, { useEffect, useRef, useState } from 'react'
import { Box, Stack } from '@mui/material'
import TopBanner from './HeadingBannerSection/TopBanner'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CustomContainer from '../container'
import RestaurantCategoryBar from './RestaurantCategoryBar'
import { useGetAllProductsOfARestaurant } from '@/hooks/custom-hooks/useGetAllProductsOfARestaurant'
import { useGetAllCategories } from '@/hooks/custom-hooks/useGetAllCategories'
import CategoriesWiseFood from './CategoriesWiseFood'
import { isAvailable, restaurantDiscountTag } from '@/utils/customFunctions'
import RestaurentDetailsShimmer from './RestaurantShimmer/RestaurentDetailsShimmer'
import { useGetRecommendProducts } from '@/hooks/react-query/config/useGetRecommendProduct'
import { debounce } from 'lodash'
import CustomSearch from '../custom-search/CustomSearch'
import { t } from 'i18next'
import { useRestaurentFoodSearch } from '@/hooks/custom-hooks/useRestaurentFoodSearch'
import { usePopularFoods } from '@/hooks/react-query/restaurants/usePopularFoods'
import { useInView } from 'react-intersection-observer'
import FloatingDiscountTag from '@/components/restaurant-details/FloatingDiscountTag'

const getCombinedCategoriesAndProducts = (
    all_categories,
    all_products,
    restaurantCategoryIds,
    recommendProducts
) => {
    const recommend = {
        id: 1233,
        name: t('Recommend Products'),
        products: recommendProducts?.products,
        isBgColor: true,
    }

    if (!all_products || all_products.length === 0) {
        return []
    }

    // First try: Use categories from API (now fetched with restaurant_id)
    if (all_categories && all_categories.length > 0) {
        const categoryMap = {}
        all_categories.forEach(cat => {
            categoryMap[cat.id] = cat
        })

        const productsByCategory = {}
        all_products.forEach(product => {
            // Get the product's category_id
            const catId = product.category_id || product.category_ids?.[0]?.id
            if (catId && categoryMap[catId]) {
                if (!productsByCategory[catId]) {
                    productsByCategory[catId] = []
                }
                productsByCategory[catId].push(product)
            }
        })

        const categoriesWithProducts = Object.keys(productsByCategory).map(catId => ({
            ...categoryMap[catId],
            products: productsByCategory[catId]
        })).filter(cat => cat.products && cat.products.length > 0)

        if (categoriesWithProducts.length > 0) {
            const result = []
            if (recommendProducts?.products?.length > 0) {
                result.push(recommend)
            }
            // Add "All" category first
            result.push({
                id: 9999,
                name: t('All'),
                products: all_products,
            })
            result.push(...categoriesWithProducts)
            return result
        }
    }

    // Second try: Group by cuisines from products (fallback)
    const productsByCuisine = {}
    const cuisineInfo = {}

    all_products.forEach(product => {
        if (product.cuisines && product.cuisines.length > 0) {
            const cuisine = product.cuisines[0]
            const cuisineId = cuisine.id || cuisine.cuisine_id || cuisine.name
            const cuisineName = cuisine.name || cuisine.cuisine_name

            if (cuisineId && cuisineName) {
                if (!productsByCuisine[cuisineId]) {
                    productsByCuisine[cuisineId] = []
                    cuisineInfo[cuisineId] = { id: cuisineId, name: cuisineName }
                }
                productsByCuisine[cuisineId].push(product)
            }
        }
    })

    const cuisineCategories = Object.keys(productsByCuisine).map(cuisineId => ({
        id: cuisineId,
        name: cuisineInfo[cuisineId].name,
        products: productsByCuisine[cuisineId]
    })).filter(cat => cat.products && cat.products.length > 0)

    if (cuisineCategories.length > 0) {
        const result = []
        if (recommendProducts?.products?.length > 0) {
            result.push(recommend)
        }
        result.push({
            id: 9999,
            name: t('All'),
            products: all_products,
        })
        result.push(...cuisineCategories)
        return result
    }

    // Fallback: Show all items under "All Food Items"
    const defaultCategory = {
        id: 9999,
        name: t('All Food Items'),
        products: all_products,
    }

    if (recommendProducts?.products?.length > 0) {
        return [recommend, defaultCategory]
    } else {
        return [defaultCategory]
    }
}

const RestaurantDetails = ({ restaurantData, configData }) => {
    const [data, setData] = useState([])
    const [allFoods, setAllFoods] = useState([])
    const [page_limit, setPageLimit] = useState(50)
    const [offset, SetOffSet] = useState(1)
    const [selectedId, setSelectedId] = useState(null)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [showComponent, setShowComponent] = useState(true)
    const [checkFilter, setCheckFilter] = useState(false)
    const [filterKey, setFilterKey] = useState({})
    const [searchKey, setSearchKey] = useState('')
    const restaurantId = restaurantData?.id
    const allProducts = useGetAllProductsOfARestaurant(restaurantId)
    const allCategories = useGetAllCategories('', restaurantId)
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const refs = useRef([])
    const restaurantCategoryIds = restaurantData?.category_ids
    const { ref, inView } = useInView()
    const handleOnSuccess = (res) => {
        setAllFoods(res?.data?.products)
    }

    const searchFood = useRestaurentFoodSearch(
        restaurantId,
        searchKey,
        handleOnSuccess
    )
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowComponent(false)
        }, 15000)
        return () => clearTimeout(timer)
    }, [])
    useEffect(() => {
        if (searchKey === '') {
            setAllFoods(allProducts)
        }
    }, [allProducts, searchKey])

    const clickedOnCategoryRef = useRef(false)

    ///RECOMMEND PRODUCTS API
    const {
        data: recommendProducts,
        refetch: refetchRecommend,
        isRefetching,
        isLoading,
    } = useGetRecommendProducts({ restaurantId, page_limit, offset, searchKey })
    const { data: popularProducts, refetch: refetchPopular } = usePopularFoods({
        restaurantId,
        page_limit,
        offset,
        searchKey,
    })
    useEffect(() => {
        if (restaurantId) {
            refetchRecommend()
            refetchPopular()
        }
    }, [restaurantId, searchKey])
    useEffect(() => {
        setSearchKey('')
        setSelectedId(null)
    }, [restaurantId])

    useEffect(() => {
        const combined = getCombinedCategoriesAndProducts(
            allCategories,
            allFoods,
            restaurantCategoryIds,
            recommendProducts
        )

        const hasProducts = combined?.filter(
            (item) => item?.products?.length > 0
        )
        setData(hasProducts)
        setIsFirstRender(false)
    }, [allFoods, allCategories, recommendProducts])

    const handleFocusedSection = debounce((val) => {
        setSelectedId(val?.id)
        if (!isFirstRender) {
            if (!clickedOnCategoryRef.current) {
                setSelectedId(val?.id)
            }
            clickedOnCategoryRef.current = false
        }
    }, 300)
    const handleClick = (val) => {
        //setClickedCategory(val)
        setSelectedId(val)

        clickedOnCategoryRef.current = true
        // setClickedOnCategory(true)
    }

    useEffect(() => {
        if (refs.current.length > 0) {
            if (selectedId) {
                refs.current[selectedId]?.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        }
    }, [selectedId])

    const handleFilter = () => {
        setCheckFilter((prevState) => !prevState)
    }

    useEffect(() => {
        handleFilteredData()
    }, [checkFilter])

    const handleFilteredData = () => {
        const combined = getCombinedCategoriesAndProducts(
            allCategories,
            allFoods,
            restaurantCategoryIds,
            recommendProducts
            // popularProducts
        )

        const filterData = combined?.map((item) => {
            return {
                ...item,
                products: item?.products?.filter((foods) => {
                    const isDiscountMatch = filterKey?.discount
                        ? foods?.discount > 0
                        : true
                    const isNonVegMatch = filterKey?.nonVeg
                        ? foods?.veg === 0
                        : true
                    const isVegMatch = filterKey?.veg ? foods?.veg === 1 : true
                    const isAvailableMatch = filterKey?.currentlyAvailable
                        ? isAvailable(
                            foods?.available_time_starts,
                            foods?.available_time_ends
                        )
                        : true

                    return (
                        isDiscountMatch &&
                        isNonVegMatch &&
                        isVegMatch &&
                        isAvailableMatch
                    )
                }),
            }
        })

        const hasProducts = filterData?.filter(
            (item) => item?.products?.length > 0
        )
        setData(hasProducts)
    }

    const handleSearchResult = async (values) => {
        if (values === '') {
            setSearchKey('')
            //setIsSearch('')
        } else {
            setSearchKey(values)
            //  setIsSearch('search')
        }
    }
    const restaurantDiscount = restaurantDiscountTag(
        restaurantData?.discount,
        restaurantData?.free_delivery
    )

    return (
        <CustomContainer sx={{ mb: { xs: '7px', md: '0' } }}>
            <CustomStackFullWidth
                pb={isSmall ? '1rem' : '3rem'}
                paddingTop={{ xs: '10px', md: '70px' }}
            >
                {restaurantData && <TopBanner details={restaurantData} />}
                <CustomStackFullWidth>
                    {!isFirstRender && (
                        <>
                            <RestaurantCategoryBar
                                handleFilter={handleFilter}
                                filterKey={filterKey}
                                setFilterKey={setFilterKey}
                                data={data}
                                selectedId={selectedId}
                                handleClick={handleClick}
                                isSmall={isSmall}
                                handleSearchResult={handleSearchResult}
                                searchKey={searchKey}
                            />
                            {!isSmall && (
                                <Stack
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.neutral[1800],
                                        position: 'sticky',
                                        zIndex: 998,
                                        maxWidth: '100%',
                                        width: '50%',
                                        alignSelf: 'flex-end',
                                        marginTop: '1.4rem',
                                        top: {
                                            xs: '199px',
                                            sm: '270px',
                                            md: '233px',
                                        },
                                    }}
                                >
                                    <CustomSearch
                                        //key={reRenderSearch}
                                        handleSearchResult={handleSearchResult}
                                        label={t('Search foods')}
                                        //isLoading={isLoadingSearchFood}
                                        searchFrom="restaurantDetails"
                                        selectedValue={searchKey}
                                        backgroundColor={
                                            theme.palette.neutral[200]
                                        }
                                        borderRadius="10px"
                                    />
                                </Stack>
                            )}
                            {data?.map((item, index) => {
                                return (
                                    <Box
                                        sx={{ position: 'relative' }}
                                        key={index}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '-340px',
                                            }}
                                            ref={(el) =>
                                                (refs.current[item?.id] = el)
                                            }
                                        />
                                        <CategoriesWiseFood
                                            disRef={ref}
                                            data={item}
                                            handleFocusedSection={
                                                handleFocusedSection
                                            }
                                            indexNumber={index}
                                            restaurantDiscount={
                                                restaurantDiscount
                                            }
                                            hasFreeDelivery={
                                                restaurantData?.free_delivery
                                            }
                                        />
                                    </Box>
                                )
                            })}
                            {data?.length === 0 && (
                                <RestaurentDetailsShimmer
                                    showComponent={showComponent}
                                />
                            )}
                        </>
                    )}
                    {!inView && restaurantDiscount && (
                        <FloatingDiscountTag
                            resDiscount={restaurantData?.discount}
                            freeDelivery={restaurantData?.free_delivery}
                            restaurantDiscount={restaurantDiscount}
                        />
                    )}
                </CustomStackFullWidth>
            </CustomStackFullWidth>
        </CustomContainer>
    )
}

export default RestaurantDetails
