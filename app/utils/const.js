import { Platform } from 'react-native'

export const COLORS = {
    primary: {
        green: '#24B24E',
        white: '#FFFFFF',
        gray: '#525252',
        black: '#181B18'
    },
    secondary: {
        green: '#D3F4DD',
        white: '#F6F6F6',
        gray: '#E8EBE9',
        yellow: '#F9E31F',
        red: '#F32323',
        softRed: '#FFE8E8',
        strongRed: '#B70606'
    }
}

export const IMAGES = {
    notAuth: require('../assets/not-auth.png'),
    cartEmpty: require('../assets/cart-empty.png'),
    categories: {
        asian: require('../assets/categories/Asian.png'),
        breakfast: require('../assets/categories/Breakfast.png'),
        burger: require('../assets/categories/Burger.png'),
        cutlery: require('../assets/categories/Cutlery.png'),
        delivery: require('../assets/categories/Delivery.png'),
        dessert: require('../assets/categories/Dessert.png'),
        dinner: require('../assets/categories/Dinner.png'),
        fastFood: require('../assets/categories/FastFood.png'),
        fishmeat: require('../assets/categories/Fishmeat.png'),
        home: require('../assets/categories/Home.png'),
        japanese: require('../assets/categories/Japanese.png'),
        kebab: require('../assets/categories/Kebab.png'),
        phone: require('../assets/categories/Phone.png'),
        pizza: require('../assets/categories/Pizza.png'),
        russian: require('../assets/categories/Russian.png'),
        sakha: require('../assets/categories/Sakha.png'),
        salad: require('../assets/categories/Salad.png'),
        shop: require('../assets/categories/Shop.png'),
        sushi: require('../assets/categories/Sushi.png'),
        time: require('../assets/categories/Time.png'),
        uzbek: require('../assets/categories/Uzbek.png'), //Kinat
    },
    home: require("../assets/categories/Home.png"),
    time: require("../assets/categories/Time.png"),
    phone: require("../assets/categories/Phone.png"),
}

export const KITCHENS = [
    {
        name: 'Суши',
        image: IMAGES.categories.sushi,
    },
    {
        name: 'Пицца',
        image: IMAGES.categories.pizza,
    },
    {
        name: 'Бургеры',
        image: IMAGES.categories.burger,
    },
    {
        name: 'Шашлыки',
        image: IMAGES.categories.kebab,
    },
    {
        name: 'Здоровая еда',
        image: IMAGES.categories.salad,
    },
    {
        name: 'Мясо и рыба',
        image: IMAGES.categories.fishmeat,
    },
    {
        name: 'Завтраки',
        image: IMAGES.categories.breakfast,
    },
    {
        name: 'Обеды',
        image: IMAGES.categories.dinner,
    },
    {
        name: 'Азиатская',
        image: IMAGES.categories.asian,
    },
    {
        name: 'Русская',
        image: IMAGES.categories.russian,
    },
    {
        name: 'Якутская',
        image: IMAGES.categories.sakha,
    },
    {
        name: 'Японская',
        image: IMAGES.categories.japanese,
    },
    {
        name: 'Узбекская',
        image: IMAGES.categories.uzbek,
    },
    {
        name: 'Фастфуд',
        image: IMAGES.categories.fastFood,
    },
    {
        name: 'Десерты',
        image: IMAGES.categories.dessert,
    },
]


export const PAYMENT_METHODS = {
    online: 'Оплатить онлайн',
    offline: 'Оплатить при получении',
}