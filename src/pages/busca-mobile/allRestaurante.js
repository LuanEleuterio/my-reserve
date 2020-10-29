const listaRestaurantes = [
    {
        name: "Habibs",
        category: "Árabe",
        img_url: "../../img/bar-1846137_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 5,
        operationHour: "09:00am - 22:30pm",
        description: "Habibs é uma excelente estabelecimento de comida arabe!"
    }/*,
    {
        name: "Madero",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 9,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },

    {
        name: "Chuletinha Restaurante e Cia Talentos",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 2,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    },
    {
        name: "Mc Donalds",
        category: "Hamburger",
        img_url: "../../img/buffet-1946541_1920.jpg",
        location: "Rua Voluntários da Patria, 1550",
        totalPessoas: 4,
        operationHour: "09:00am - 22:30pm",
        description: "Madero é uma excelente estabelecimento de comida arabe!"
    }

*/
]
