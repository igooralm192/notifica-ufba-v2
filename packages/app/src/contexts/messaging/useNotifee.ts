// import { useEffect } from 'react'
// import notifee, { Event, EventType, Notification } from '@notifee/react-native'
// import { Platform } from 'react-native'

// export interface NotifeeHookArgs {
//   onTapNotification: (notification: Notification) => Promise<void>
// }

// export interface NotifeeHookReturn {
//   showNotification: (
//     title: string,
//     body: string,
//     data?: Record<string, any>,
//   ) => Promise<void>
// }

// export const useNotifee = ({ onTapNotification }: NotifeeHookArgs) => {
//   const showNotification = async (
//     title: string,
//     body: string,
//     data?: Record<string, any>,
//   ) => {
//     if (Platform.OS !== 'android') return
    
//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     })

//     // Display a notification
//     await notifee.displayNotification({
//       title,
//       body,
//       data,
//       android: {
//         channelId,
//         pressAction: {
//           id: 'default',
//         },
//       },
//     })
//   }

//   useEffect(() => {
//     if (Platform.OS !== 'android') return

//     notifee.requestPermission()

//     // Handle Notifee notifications ON TAP
//     const handleNotifeeNotification = async ({ type, detail }: Event) => {
//       switch (type) {
//         case EventType.PRESS:
//           if (detail.notification) onTapNotification(detail.notification)
//           break
//       }
//     }

//     notifee.onBackgroundEvent(handleNotifeeNotification)
//     return notifee.onForegroundEvent(handleNotifeeNotification)
//   }, [])

//   return { showNotification }
// }
