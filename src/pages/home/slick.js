$('.categorias-main').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                infinite: true,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                infinite: true,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 7,
                infinite: true,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});
