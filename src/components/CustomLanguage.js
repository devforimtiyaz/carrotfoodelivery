import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ListItemIcon, MenuItem, Stack, Typography, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import i18n from 'i18next'
import cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSettings } from '@/contexts/use-settings'
import {
    setCountryCode,
    setCountryFlag,
    setLanguage,
} from '@/redux/slices/languageChange'
import { CustomColouredTypography } from '@/styled-components/CustomStyles.style'
import { isRTLLanguage, languageValue } from '@/utils/customFunctions'
import { CustomToaster } from './custom-toaster/CustomToaster'
import { LefRightBorderBox, TopBarButton } from './navbar/Navbar.style'
import { languageLists } from './navbar/second-navbar/custom-language/languageLists'
import { StyledMenu } from './navbar/top-navbar/TopNav.style'
const CustomLanguage = ({ formMobileMenu, language, isMobile }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null)
    const { countryFlag } = useSelector((state) => state.languageChange)
    let location = undefined
    if (typeof window !== 'undefined') {
        location = localStorage.getItem('location')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatch(
                setLanguage(localStorage.getItem('language') || i18n.language)
            )
        }
    }, [language])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    let languageDirection = undefined
    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getValues = (settings) => ({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme,
    })
    const { settings, saveSettings } = useSettings()
    const [values, setValues] = useState(getValues(settings))
    useEffect(() => {
        setValues(getValues(settings))
    }, [settings])
    const open = Boolean(anchorEl)
    const handleLanguage = (ln) => {
        dispatch(setLanguage(ln?.languageCode))
        dispatch(setCountryCode(ln?.countryCode))
        dispatch(setCountryFlag(ln?.countryFlag))

        localStorage.setItem('language', ln?.languageCode)
        cookie.set('languageSetting', ln?.languageCode)

        localStorage.setItem(
            'direction',
            isRTLLanguage(ln?.languageCode) ? 'rtl' : 'ltr'
        )
        saveSettings({
            ...values,
            direction: isRTLLanguage(ln?.languageCode) ? 'rtl' : 'ltr',
        })

        CustomToaster('success', 'Language Changed Successfully')

        window.location.reload()
    }
    const arrowColor = theme.palette.neutral[500]

    return null
}

CustomLanguage.propTypes = {}

export default CustomLanguage
