import React, { useEffect, useRef, useState } from 'react'
import FoodCampaign from './food-campaign/FoodCampaign'
import BestReviewedFood from './food-campaign/best-reviewed-foods/BestReviewedFood'
import NearbyPopularFood from './new-popular-food/NearbyPopularFood'
import { styled, Tab, Tabs, Stack } from '@mui/material'
import { t } from 'i18next'
import { foodTabData } from './foodTabData'
import ScrollSpy from 'react-ui-scrollspy'

export const CustomHomeTab = styled(Tabs)(({ theme }) => ({
    color: 'none',
    borderBottom: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
    zIndex: 9,
    paddingTop: '8px',
    paddingBottom: '4px',
    '& .MuiButtonBase-root': {
        paddingInlineEnd: '16px',
        paddingInlineStart: '16px',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: '24px',
        minHeight: '40px',
        textTransform: 'none',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'all 0.25s ease',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.04)',
            color: theme.palette.mode === 'light' ? '#333333' : 'inherit',
        },
        '& .MuiTabScrollButton-root': {
            width: 20,
        },
    },
    '& .MuiTabs-flexContainer': {
        gap: '8px',
    },
    '& .MuiTabScrollButton-root': {
        width: 28,
        borderRadius: '50%',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.04)',
        },
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
}))

const DifferentFoodCompontent = ({
    campaignIsloading,
    isLoading,
    isLoadingNearByPopularRestaurantData,
}) => {
    const [activeSection, setActiveSection] = useState(null)
    const parentScrollContainerRef = useRef(null)
    const [filterType, setFilterType] = useState(false)
    const [shouldUpdateActiveSection, setShouldUpdateActiveSection] =
        useState(true)
    const updateActiveSection = () => {
        const section1 = document.getElementById(foodTabData[0]?.value)
        const section2 = document.getElementById(foodTabData[1]?.value)
        const section3 = document.getElementById(foodTabData[2]?.value)

        if (shouldUpdateActiveSection) {
            if (section3 && window.scrollY + 200 >= section3.offsetTop) {
                setActiveSection(foodTabData[2]?.value)
            } else if (section2 && window.scrollY + 300 >= section2.offsetTop) {
                setActiveSection(foodTabData[1]?.value)
            } else if (section1 && window.scrollY + 300 >= section1.offsetTop) {
                setActiveSection(foodTabData[0]?.value)
            } else {
                setActiveSection(null)
            }
        }
    }
    const handleChange = (event, newValue) => {
        setFilterType(newValue)
        setShouldUpdateActiveSection(false)
    }
    const handleScroll = () => {
        updateActiveSection()
    }

    const scrollToSection = (sectionId) => {
        const target = document.getElementById(sectionId)
        if (target) {
            const headerOffset = 150
            const elementPosition =
                target.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - headerOffset

            window.scroll({
                top: offsetPosition,
                behavior: 'smooth',
            })
            setShouldUpdateActiveSection(true)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const activeTab = activeSection || filterType
    return (
        <Stack marginTop="30px">
            <Stack
                sx={{
                    position: 'sticky',
                    top: { xs: '90px', md: '108px' },
                    zIndex: 9,
                    background: (theme) => theme.palette.neutral[1800],
                }}
            >
                <CustomHomeTab
                    value={filterType}
                    onChange={handleChange}
                    variant="scrollable"
                    allowScrollButtonsMobile
                >
                    {foodTabData?.map((item) => {
                        const isActive = activeTab === item?.value
                        return (
                            <Tab
                                key={item?.id}
                                value={item.value}
                                sx={{
                                    fontWeight: isActive ? '600' : '500',
                                    transition: 'all 0.3s ease',
                                    borderRadius: '24px',
                                    border: 'none',
                                    backgroundColor: isActive
                                        ? (theme) => theme.palette.primary.main
                                        : 'transparent',
                                    color: (theme) => isActive
                                        ? '#fff'
                                        : theme.palette.mode === 'light'
                                            ? '#333333'
                                            : theme.palette.customColor?.six || '#aaa',
                                    boxShadow: isActive
                                        ? '0 4px 12px rgba(255, 130, 0, 0.25)'
                                        : 'none',
                                    '&.Mui-selected': {
                                        color: '#fff',
                                    },
                                    '&:hover': {
                                        backgroundColor: isActive
                                            ? (theme) => theme.palette.primary.main
                                            : (theme) => theme.palette.mode === 'dark'
                                                ? 'rgba(255,255,255,0.08)'
                                                : 'rgba(0,0,0,0.04)',
                                        color: (theme) => isActive
                                            ? '#fff'
                                            : theme.palette.mode === 'light'
                                                ? '#333333'
                                                : theme.palette.primary.main,
                                    },
                                }}
                                label={t(item?.category_name)}
                                onClick={() => scrollToSection(item?.value)}
                                component="p"
                            />
                        )
                    })}
                </CustomHomeTab>
            </Stack>
            <div ref={parentScrollContainerRef}>
                <ScrollSpy>
                    <div id={foodTabData[0]?.value}>
                        <FoodCampaign isLoading={campaignIsloading} />
                    </div>
                    <div id={foodTabData[1]?.value}>
                        <NearbyPopularFood
                            isLoading={isLoadingNearByPopularRestaurantData}
                        />
                    </div>
                    <div id={foodTabData[2]?.value}>
                        <BestReviewedFood isLoading={isLoading} />
                    </div>
                </ScrollSpy>
            </div>
        </Stack>
    )
}

export default DifferentFoodCompontent
