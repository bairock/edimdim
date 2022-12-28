const axios = require('axios')
const IMask = require('imask')

const maskedPhone = IMask.createMask({
    mask: '00000000000'
})

const callPhone = async (phone) => {
    const params = new URLSearchParams()
    params.append('domain', 'nikolai10606')
    params.append('access_token', '65885906be1dc5d2e7320cd452e94d31719bbb668a3183f03b2bb76ea8a69c1f')
    params.append('scenario_id', '37896')
    params.append('phone', maskedPhone.resolve(phone))
    params.append('phone_number_id', '5203')
    const { data } = await axios({
        method: 'post',
        url: 'https://kitapi-ru.voximplant.com/api/v3/scenario/runScenario',
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    return data
}

module.exports = {
    callPhone
}