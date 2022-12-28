const axios = require('axios')
const FormData = require('form-data')
const { v4 } = require('uuid')

const createPayment = async (amount, paymentId, uuid = v4()) => {
    const { data } = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
        TerminalKey: process.env.TERMINAL_KEY,
        Amount: amount * 100,
        OrderId: uuid,
        PayType: 'O',
        Shops: [
            {
                ShopCode: paymentId,
                Amount: amount * 100,
                Name: `Заказ № ${uuid}`
            }
        ]
    })
    return data
}

// const authorizedPayment = async (amount, paymentId) => {
//     const { data } = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
//         TerminalKey: process.env.TERMINAL_KEY,
//     })
//     return data
// }

const getTokenForRegisterBilling = async () => {
    const formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('username', 'edimdimMP')
    formData.append('password', 'TbGKHv4grm')

    const { data: { access_token } } = await axios.post('https://sm-register.tinkoff.ru/oauth/token', formData, {
        auth: {
            username: 'partner',
            password: 'partner'
        },
        headers: formData.getHeaders()
    })

    if (!access_token) throw new Error('getTokenForRegisterBilling error')

    return access_token
}

const registerBilling = async (token, data) => {
    try {
        const { data: { shopCode, errors } } = await axios.post('https://sm-register.tinkoff.ru/register', data, {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (errors) {
            console.log(errors)
        }

        if (!shopCode) throw new Error('registerBilling error')

        // {
        //     billingDescriptor: 'test_tochka', // Название магазина в СМС и на страницепроверки 3DS на иностранном языке
        //     fullName: 'Общество с ограниченной ответственностью «Компания»', // Полное наименование организации
        //     name: 'ООО «Компания»', // Сокращенное наименование организации
        //     inn: '3333333333', // ИНН
        //     kpp: '333333333', // КПП
        //     ogrn: '333333333333', // ОГРН
        //     smz: false, // Признак «Самозанятый»
        //     addresses: [ // Адреса организации
        //         {
        //             type: 'legal', //Тип адреса организации: legal - юридический actual - фактический post - почтовый other - прочий
        //             zip: '108809', // Почтовый индекс
        //             country: 'RUS', //Трехбуквенный код страны по ISO
        //             city: 'Москва', // Город или населенный пункт
        //             street: 'Маяковского, 3',
        //         },
        //         {
        //             type: 'actual', //Тип адреса организации: legal - юридический actual - фактический post - почтовый other - прочий
        //             zip: '108809', // Почтовый индекс
        //             country: 'RUS', // Трехбуквенный код страны по ISO
        //             city: 'Москва', // Город или населенный пункт
        //             street: 'Маяковского, 5' // Адрес улица, дом, корпус, квартира, офис
        //         }
        //     ],
        //     email: '333@mail.ru', // Электронный адрес организации
        //     ceo: { // Сведения о руководителе
        //         firstName: 'Иван', // Имя
        //         lastName: 'Иванов', // Фамилия
        //         middleName: 'Иванович', // Отчество
        //         birthDate: '1980-03-03', // Дата рождения
        //         phone: '+79853333333', // Контактный телефон
        //         country: 'RUS' // Страна гражданства по ISO
        //     },
        //     siteUrl: 'http://yandex.ru/', // Адрес интернет сайта
        //     bankAccount: { // Реквизиты партнера агрегатора для перечисления
        //         account: '40702810838170023076', // Расчетный счет
        //         bankName: 'ПАО «Сбербанк России»', // Наименование банка
        //         bik: '044525225', // БИК
        //         details: 'Перевод средств. Дата ${date}. Сумма комиссии ${rub} руб. ${kop} коп., НДС не облагается.', // Назначение платежа
        //         tax: 7 // Отчисления в пользу маркетплейса Отчисления в пользу маркетплейса
        //     }
        // }

        return shopCode
    } catch (error) {
        console.log(error.response.data.errors)
    }
}

module.exports = {
    createPayment,
    getTokenForRegisterBilling,
    registerBilling
}
