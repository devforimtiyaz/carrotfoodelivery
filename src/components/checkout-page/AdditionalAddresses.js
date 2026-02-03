import React from 'react'
import {
    CustomStackFullWidth,
    CustomTextField,
} from '@/styled-components/CustomStyles.style'
import {
    Grid,
    Typography,
    Stack,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Switch,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ACTIONS } from './states/additionalInformationStates'
import { useTheme } from '@mui/styles'

const FLOOR_CHARGE_PER_FLOOR = 3

const AdditionalAddresses = (props) => {
    const {
        t,
        additionalInformationStates,
        additionalInformationDispatch,
        orderType,
        onSavedAddressClick,
    } = props
    const theme = useTheme()

    // Generate floor options 1-20
    const floorOptions = Array.from({ length: 20 }, (_, i) => i + 1)

    // Calculate floor charges
    const floorCharges =
        additionalInformationStates.floor &&
            additionalInformationStates.workingLift !== 'yes'
            ? parseInt(additionalInformationStates.floor) * FLOOR_CHARGE_PER_FLOOR
            : 0

    // Don't render for take_away or dine_in orders
    if (orderType === 'take_away' || orderType === 'dine_in') {
        return null
    }

    return (
        <CustomStackFullWidth>
            <Accordion defaultExpanded={false}
                sx={{
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: '8px !important',
                    '&:before': {
                        display: 'none',
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
                        borderRadius: '8px',
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" pr={2}>
                        <Typography fontSize="14px" fontWeight="600">
                            {t('Delivery Details')}
                        </Typography>
                        {(additionalInformationStates.streetNumber || additionalInformationStates.houseNumber) && (
                            <Typography fontSize="12px" color="text.secondary" sx={{ ml: 2, display: { xs: 'none', sm: 'block' } }}>
                                {`${t('Street')}: ${additionalInformationStates.streetNumber || '-'}, ${t('House')}: ${additionalInformationStates.houseNumber || '-'}`}
                            </Typography>
                        )}
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '16px', borderTop: `1px solid ${theme.palette.divider}` }}>
                    {/* Header with Saved Address option */}
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        mb={2}
                    >
                        {onSavedAddressClick && (
                            <Typography
                                fontSize="12px"
                                color="primary"
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                                onClick={onSavedAddressClick}
                            >
                                {t('Saved Address')}
                            </Typography>
                        )}
                    </Stack>

                    <Grid container spacing={2}>
                        {/* Street Number */}
                        <Grid item xs={12}>
                            <CustomTextField
                                label={t('Street number')}
                                value={additionalInformationStates.streetNumber}
                                fullWidth
                                size="small"
                                onChange={(e) =>
                                    additionalInformationDispatch({
                                        type: ACTIONS.setStreetNumber,
                                        payload: e.target.value,
                                    })
                                }
                            />
                        </Grid>

                        {/* House Number and Floor in same row */}
                        <Grid item xs={6}>
                            <CustomTextField
                                label={t('House number')}
                                value={additionalInformationStates.houseNumber}
                                fullWidth
                                size="small"
                                onChange={(e) =>
                                    additionalInformationDispatch({
                                        type: ACTIONS.setHouseNumber,
                                        payload: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="floor-select-label">{t('Floor')}</InputLabel>
                                <Select
                                    labelId="floor-select-label"
                                    id="floor-select"
                                    value={additionalInformationStates.floor || ''}
                                    label={t('Floor')}
                                    onChange={(e) =>
                                        additionalInformationDispatch({
                                            type: ACTIONS.setFloor,
                                            payload: e.target.value,
                                        })
                                    }

                                    disabled={additionalInformationStates.workingLift === 'yes'}
                                >
                                    <MenuItem value="">
                                        <em>{t('Select Floor')}</em>
                                    </MenuItem>
                                    {floorOptions.map((floor) => (
                                        <MenuItem key={floor} value={floor.toString()}>
                                            {floor}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Working Lift Toggle */}
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: `1px solid ${theme.palette.divider}`,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.grey[900]
                                            : theme.palette.grey[50],
                                }}
                            >
                                <Typography
                                    fontSize="14px"
                                    fontWeight="500"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? '#fff'
                                                : 'inherit',
                                    }}
                                >
                                    {t('Working Lift')}
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Typography
                                        fontSize="12px"
                                        color={
                                            additionalInformationStates.workingLift ===
                                                'no'
                                                ? 'primary'
                                                : 'text.secondary'
                                        }
                                    >
                                        {t('No')}
                                    </Typography>
                                    <Switch
                                        checked={
                                            additionalInformationStates.workingLift ===
                                            'yes'
                                        }
                                        onChange={(e) =>
                                            additionalInformationDispatch({
                                                type: ACTIONS.setWorkingLift,
                                                payload: e.target.checked
                                                    ? 'yes'
                                                    : 'no',
                                            })
                                        }
                                        color="primary"
                                        size="small"
                                    />
                                    <Typography
                                        fontSize="12px"
                                        color={
                                            additionalInformationStates.workingLift ===
                                                'yes'
                                                ? 'primary'
                                                : 'text.secondary'
                                        }
                                    >
                                        {t('Yes')}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </CustomStackFullWidth >
    )
}

AdditionalAddresses.propTypes = {}

export default AdditionalAddresses



