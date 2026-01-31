import React, { useEffect, useState } from 'react'
import 'firebase/messaging'
import { useStoreFcm } from '@/hooks/react-query/push-notification/usePushNotification'
import { onMessageListener, fetchToken } from '@/firebase'
import { toast } from 'react-hot-toast'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const PushNotificationLayout = ({ children, refetch, pathName }) => {
    const router = useRouter()
    const [notification, setNotification] = useState(null)
    const [fcmToken, setFcmToken] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                fetchToken(setFcmToken).then()
            } else if (Notification.permission === 'default') {
                toast.custom((t) => (
                    <Stack direction="row" spacing={2} p={2} alignItems="center" sx={{
                        background: 'white',
                        borderRadius: 1,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                        <Typography sx={{ color: '#333', fontWeight: 500 }}>Enable notifications?</Typography>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                Notification.requestPermission().then((permission) => {
                                    if (permission === 'granted') {
                                        fetchToken(setFcmToken).then()
                                    }
                                    toast.dismiss(t.id);
                                });
                            }}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' }
                            }}
                        >
                            Enable
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => toast.dismiss(t.id)}
                            sx={{
                                borderColor: '#666',
                                color: '#666',
                                '&:hover': { borderColor: '#333', color: '#333' }
                            }}
                        >
                            No Thanks
                        </Button>
                    </Stack>
                ), { duration: Infinity });
            }
        }
    }, [])
    let token = undefined
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token')
    }

    const { mutate } = useStoreFcm()

    useEffect(() => {
        if (token && fcmToken) {
            mutate(fcmToken)
        }
    }, [fcmToken])

    const clickHandler = () => {
        if (notification.type === 'message') {
            router.push({
                pathname: '/info',
                query: {
                    conversationId: notification?.conversation_id,
                    type: notification.sender_type,
                    chatFrom: 'true',
                    page: 'inbox',
                },
            })
        } else if (notification.type === 'order_status') {
            router.push(
                {
                    pathname: '/info',
                    query: { page: 'order', orderId: notification.order_id },
                },
                undefined,
                { shallow: true }
            )
        }
    }

    useEffect(() => {
        onMessageListener()
            .then((payload) => {
                setNotification(payload.data)
            })
            .catch((err) => toast(err))
        if (notification) {
            if (pathName === 'info' && notification.type === 'message') {
                refetch()
            } else {
                toast(
                    <>
                        <Stack
                            sx={{ cursor: 'pointer' }}
                            onClick={clickHandler}
                        >
                            <Typography>{notification.title}</Typography>
                            <Typography>{notification.body}</Typography>
                        </Stack>
                    </>
                )
            }
        }
    }, [notification])

    return <>{children}</>
}

export default PushNotificationLayout
