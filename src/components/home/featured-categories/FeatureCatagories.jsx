import React, { memo, useRef, useState } from 'react'
import { Grid, Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'

import FeaturedCategoryCard from '../../featured-category-item/FeaturedCategoryCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CustomShimmerCategories from '../../CustomShimmer/CustomShimmerCategories'
import { useRouter } from 'next/router'
import { CustomViewAll } from '@/styled-components/CustomStyles.style'
import useScrollSticky from '../Search-filter-tag/useScrollSticky'
import Card from '@mui/material/Card'
import CustomContainer from '../../container'
import { HandleNext, HandlePrev } from '@/components/CustomSliderIcon'

const FeatureCatagories = () => {
    return null
}

export default memo(FeatureCatagories)
