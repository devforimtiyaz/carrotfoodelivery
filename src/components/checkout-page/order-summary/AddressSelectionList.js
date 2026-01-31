import React from 'react'
import List from '@mui/material/List'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import ListItemText from '@mui/material/ListItemText'
import { alpha, ListItemButton, Typography, Stack } from '@mui/material'
import Radio from '@mui/material/Radio'
import CustomAlert from '../../alert/CustomAlert'
import CustomCheckOutShimmer from '../../CustomShimmerForCheckout/CustomCheckOutShimmer'
import { useTheme } from '@mui/material/styles'
import CustomImageContainer from '@/components/CustomImageContainer'
import noAddress from '../assets/no-address.png'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, ListItemIcon } from '@mui/material'
import { useMutation } from 'react-query'
import { AddressApi } from '@/hooks/react-query/config/addressApi'
import { toast } from 'react-hot-toast'
import { onErrorResponse } from '../../ErrorResponse'

const AddressSelectionList = (props) => {
    const theme = useTheme()
    const {
        renderOnNavbar,
        selectedAddress,
        data,
        allAddress,
        handleLatLng,
        t,
        address,
        isRefetching,
        additionalInformationDispatch,
    } = props
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [menuAddress, setMenuAddress] = React.useState(null)
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

    const handleMenuOpen = (event, address) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
        setMenuAddress(address)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setMenuAddress(null)
    }

    const { mutate: deleteAddressMutation, isLoading: isDeleting } = useMutation(
        'delete-address',
        AddressApi.deleteAddress,
        {
            onSuccess: (response) => {
                toast.success(response?.data?.message)
                handleMenuClose()
                setOpenDeleteDialog(false)
                props.refetch?.()
            },
            onError: (error) => {
                onErrorResponse(error)
                setOpenDeleteDialog(false)
            },
        }
    )

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true)
        setAnchorEl(null) // Close menu but keep menuAddress for dialog
    }

    const handleConfirmDelete = () => {
        if (menuAddress?.id) {
            deleteAddressMutation(menuAddress.id)
        }
    }

    const handleEditClick = () => {
        handleMenuClose()
        props.handleEdit?.(menuAddress)
    }

    const handleClick = (adres) => {
        handleLatLng(adres)
    }

    return (
        <CustomStackFullWidth minWidth="300px">
            <SimpleBar style={{ maxHeight: 300, width: '100%' }}>
                <List
                    sx={{
                        width: '100%',
                        marginTop: '.3rem',
                        paddingRight: '15px',
                    }}
                >
                    {data &&
                        allAddress?.length > 0 &&
                        allAddress?.map((adres, index, array) => (
                            <React.Fragment key={adres.id}>
                                <ListItemButton
                                    onClick={() => handleClick(adres)}
                                    alignItems="flex-start"
                                    sx={{
                                        padding: '10px',
                                        border: '1px solid',
                                        borderColor: (theme) =>
                                            theme.palette.neutral[200],
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        marginBottom:
                                            index !== array.length - 1
                                                ? '1rem'
                                                : undefined,
                                        width: '100%',
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.2
                                            ),
                                        },
                                    }}
                                    selected={adres.id === selectedAddress?.id}
                                >
                                    <CustomStackFullWidth
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Radio
                                            checked={
                                                adres.id === selectedAddress?.id
                                            }
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        />
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    textTransform="capitalize"
                                                    fontSize="14px"
                                                    fontWeight="500"
                                                >
                                                    {t(adres.address_type)}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    noWrap
                                                    fontSize="12px"
                                                    maxWidth="285px"
                                                    color={
                                                        theme.palette
                                                            .neutral[400]
                                                    }
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                    }}
                                                >
                                                    {adres.address}
                                                </Typography>
                                            }
                                        />
                                        <IconButton
                                            aria-label="more"
                                            aria-controls="long-menu"
                                            aria-haspopup="true"
                                            onClick={(e) => handleMenuOpen(e, adres)}
                                            size="small"
                                        >
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </CustomStackFullWidth>
                                </ListItemButton>
                            </React.Fragment>
                        ))}

                    {renderOnNavbar === 'true' ? (
                        <>
                            {!isRefetching && allAddress?.length === 0 && (
                                <CustomAlert
                                    type="info"
                                    text={t(
                                        'No saved addresses found to select.'
                                    )}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {!isRefetching && allAddress?.length === 0 && (
                                <CustomStackFullWidth
                                    spacing={3}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <CustomImageContainer
                                        width="120px"
                                        height="117px"
                                        objectFit="contain"
                                        src={noAddress.src}
                                    />
                                    <Stack
                                        maxWidth="206px"
                                        width="100%"
                                        alignItems="center"
                                    >
                                        <Typography
                                            fontSize="1rem"
                                            fontWeight="600"
                                        >
                                            {t('Oops!')}
                                        </Typography>
                                        <Typography
                                            fontSize="12px"
                                            color={theme.palette.neutral[400]}
                                        >
                                            {t(
                                                'You don’t have any saved address yet. please save address to continue'
                                            )}
                                        </Typography>
                                    </Stack>
                                </CustomStackFullWidth>
                            )}
                        </>
                    )}

                    {!data && <CustomCheckOutShimmer />}
                </List>
            </SimpleBar>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleEditClick}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t('Edit')} />
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={t('Delete')} />
                </MenuItem>
            </Menu>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('Delete Address?')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('Are you sure you want to delete this address?')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        {t('Cancel')}
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        {t('Delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </CustomStackFullWidth >
    )
}

AddressSelectionList.propTypes = {}

export default AddressSelectionList
