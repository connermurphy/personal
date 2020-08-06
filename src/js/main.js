$(document).ready(() => {

    let modalData = [
        {
            id: 0,
            title: "A Weekend In Glasgow",
            desc: "Built as part of a team working exercise for college, this prototype website showcased 5 things to do in Glasgow.",
            photos: [
                "./assets/img/work/awig/awig.webp",
                "./assets/img/work/awig/awig_2.webp",
                "./assets/img/work/awig/awig_3.webp"
            ],
            langs: [
                "HTML",
                "CSS",
                "JS"
            ]
        },
        {
            id: 1,
            title: "Jinxx - Portfolio",
            desc: "Commissioned to build a fully functional portfolio website for a social media manager.",
            photos: [
                "./assets/img/work/jinxx/jinxx.webp",
                "./assets/img/work/jinxx/jinxx_2.webp",
                "./assets/img/work/jinxx/jinxx_3.webp",
            ],
            langs: [
                "HTML",
                "CSS / SASS",
                "JS / jQuery",
                "PHP"
            ]
        },
        {
            id: 2,
            title: "Spectral Radio",
            desc: "The landing page plays live music with action buttons and displays some information about the radio station.",
            photos: [
                "./assets/img/work/spectral/spectral.webp",
                "./assets/img/work/spectral/spectral_2.webp",
                "./assets/img/work/spectral/spectral_3.webp"
            ],
            langs: [
                "HTML",
                "CSS / SASS / TailwindCSS",
                "JS / jQuery",
                "PHP",
                "Discord API"
            ]
        },
        {
            id: 3,
            title: "URL Shortener",
            desc: "This demo project was built to test my knowledge of a simple API built using C# / ASP.NET Core.",
            photos: [
                "./assets/img/work/shorten/shorten.webp",
            ],
            langs: [
                "HTML",
                "CSS / SASS / TailwindCSS",
                "C# / ASP.NET Core",
                "MongoDB",
                "Nginx"
            ]
        },        
    ];

    let slick = 0;

    let projectModal = $("#project-modal");

    let navbarTogglerOne = $("#toggler--1");
    let navbarTogglerTwo = $("#toggler--2");
    let navbarTogglerThree = $("#toggler--3");

    $(document).on("scroll", function() {

        if ($("#work--section").visible(true)) {
            $(".work--item").eq(0).addClass("fadeIn").css("animation-delay", ".25s");
            $(".work--item").eq(1).addClass("fadeIn").css("animation-delay", ".5s");
            $(".work--item").eq(2).addClass("fadeIn").css("animation-delay", ".75s");
            $(".work--item").eq(3).addClass("fadeIn").css("animation-delay", "1s");
        }

        if ($("#stats--section").visible(true)) {
            countStatUp($("#sites--produced > .stats--number"));
            countStatUp($("#clients--satisfied > .stats--number"));
            countStatUp($("#websites--live > .stats--number"));
        }

        if ($("#service--section").visible(true)) {
            $(".service--item").eq(0).attr("id", "animate--service-1");
            $(".service--item").eq(1).attr("id", "animate--service-2");
            $(".service--item").eq(2).attr("id", "animate--service-3");
        }

        if ($("#contact--section").visible(true)) {
            setTimeout(function () {
                displayPlaceholder($("#form--name"), "John Doe");
                displayPlaceholder($("#form--email"), "johndoe@mail.com");
                displayPlaceholder($("#form--message"), "Hi Conner, I'm looking for a new website..");
            }, 259);
        }
    });

    function initCarousel() {
        $(".project--carousel").slick({
            dots: true,
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows : false,
            autoplay : true,
            infinite : true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
            ]
        });
    }

    $(".work--item-img").on("click", function () {

        if (slick > 0) {
            $(".project--carousel").slick("unslick");
        }

        let clickedWorkItem = $(".work--item-img").index(this);
        let projectData = modalData[clickedWorkItem];

        $(projectModal).find(".modal-title").text(projectData.title);
        $(projectModal).find(".modal-sub").text(projectData.desc);

        $(projectModal).find(".project--carousel").html("");
        $(projectModal).find(".project--langs").html("");

        for (let i = 0; i < projectData.photos.length; i++) {
            $(projectModal).find(".project--carousel").append(`<img src="${projectData.photos[i]}" class="project--carousel-img" />`)
        }

        for (let i = 0; i < projectData.langs.length; i++) {
            $(projectModal).find(".project--langs").append(`<li class="text-black-50">${projectData.langs[i]}</li>`);
        }

        initCarousel();
        $(projectModal).modal("show");
        slick++;
    });


    $("#contact--form").on("submit", (e) => {

        e.preventDefault();

        let nameVal = $("#form--name").val();
        let emailVal = $("#form--email").val();
        let messageVal = $("#form--message").val();
        let websiteVal = $("#website").val();

        $.ajax({

            "url": "/assets/php/contact.php",
            "method": "POST",
            "data": {
                name: nameVal,
                email: emailVal,
                message: messageVal,
                website: websiteVal,
                grecaptcha: grecaptcha.getResponse()
            },
            success: function (res) {

                if (res === "1") {
                    //success
                    $("#form--msg-status").text("Email sent successfully");
                } else if (res === "2") {

                    $("#form--msg-status").text("Captcha verification failed. Please try again!");

                } else {
                    $("#form--msg-status").html("Error sending email. Send it over to <b>enquiry@connermurphy.net</b>");
                    console.log(res);
                }

                $("#contact--form")[0].reset();

                setTimeout(function () {
                    $("#form--msg-status").text("");
                }, 4000);

            },
            error: function (err) {
                console.log(err)
            }
        });
    });

    $("#header--content-icon").on("click", function () {
        smoothScroll($("#work--section"));
    });

    $(".nav-link").on("click", function () {

        let navText = $(this).text().toLowerCase().trim();
        switch (navText) {

            case "work":
                smoothScroll($("#work--section"));
                break;
            case "service":
                smoothScroll($("#service--section"));
                break;
            case "contact":
                smoothScroll($("#contact--section"));
                break;
        }
    });

    $(".navbar-toggler").on("click", () => {
        if (!$("#collapsed--navbar").hasClass("show")) {

            $(navbarTogglerTwo).css("visibility", "hidden");
            $(navbarTogglerOne).addClass("toggler--rotate-1");
            $(navbarTogglerThree).addClass("toggler--rotate-3");

        } else {

            $(navbarTogglerOne).removeClass("toggler--rotate-1");
            $(navbarTogglerThree).removeClass("toggler--rotate-3");
            $(navbarTogglerTwo).css("visibility", "visible");

        }
    });

    function countStatUp(element) {

        let elementTarget = $(element).attr("data-value");
        let currentValue = $(element).text();

        let countStatInterval = setInterval(function () {

            if (currentValue < elementTarget) {
                ++currentValue;
                $(element).text(currentValue);
            } else {
                clearInterval(countStatInterval);
            }

        }, (elementTarget * 10));

    }

    function smoothScroll(section) {

        let sectionOffset = $(section).offset().top;

        $("html, body").animate({
            "scrollTop": sectionOffset
        }, 1000);

    }

    function displayPlaceholder(element, placeholderText) {


        let placeholderInterval = setInterval(function () {
            if ($(element).attr("placeholder") !== placeholderText) {
                $(element).attr("placeholder", $(element).attr("placeholder") + placeholderText.charAt(parseInt($(element).attr("placeholder-val"))))
                $(element).attr("placeholder-val", parseInt($(element).attr("placeholder-val")) + 1);

            } else {
                clearInterval(placeholderInterval);
            }


        }, 175);

    }

});