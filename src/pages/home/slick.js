setTimeout(function () {
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1
                }
            },
            ,
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1365,
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
}, 1000);