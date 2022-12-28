const htmlLoginPassword = (login, password) => `
    <h1>Здравствуйте, ваш пароль для входа на сайт Е-димдим</h1>
    <p>${login}</p>
    <p>${password}</p>
`
const htmlRePassword = (login, password) => `
    <h1>Здравствуйте, ваш новый пароль для входа на сайт Е-димдим</h1>
    <p>${login}</p>
    <p>${password}</p>
`

const htmlNewOrder = () => `
    <h1>Здравствуйте, у ваc новый заказ на сайт Е-димдим</h1>
    <a href="https://edimdim.ru/moderator/orders">К заказам</a>
`

const htmlRequest = (phone, name) => `
    <h1>Новая заявка для подключения ресторана</h1>
    <p>${phone}</p>
    <p>${name}</p>
`

module.exports = {
    htmlLoginPassword,
    htmlNewOrder,
    htmlRePassword,
    htmlRequest
}