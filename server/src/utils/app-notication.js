const OneSignal = require('onesignal-node')

const oneSignalClient = new OneSignal.Client(
    'c2baad38-4e30-4003-bb65-fb2d7d1f3ea0',
    'ZjIwOWE3MjUtNDIyZC00Y2EyLTkwMDctZWU2OGM4YjMxZWNj'
)

const sendNotificationToManyApp = async ({ message, pushIds = [] }) => {
    await oneSignalClient.createNotification({
        contents: {
            en: message,
            ru: message
        },
        include_player_ids: pushIds
    })
}

module.exports = { sendNotificationToManyApp }
