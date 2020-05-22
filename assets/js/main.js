$(document).ready(() => {

    let navbarTogglerOne = $("#toggler--1");
    let navbarTogglerTwo = $("#toggler--2");
    let navbarTogglerThree = $("#toggler--3");

    $(document).on("scroll", () => {

        if ($(document).scrollTop() > $("#stats--section").offset().top - 200) {
            countStatUp($("#sites--produced > .stats--number"));
            countStatUp($("#clients--satisfied > .stats--number"));
            countStatUp($("#websites--live > .stats--number"));
        }

        if ($(document).scrollTop() > $("#work--section").offset().top - 200) {
            $(".work--item").eq(0).attr("id", "animate--work-1");
            $(".work--item").eq(1).attr("id", "animate--work-2")
        }
        
        if ($(document).scrollTop() > $("#service--section").offset().top - 200) {            
            $(".service--item").eq(0).attr("id", "animate--service-1");
            $(".service--item").eq(1).attr("id", "animate--service-2");
            $(".service--item").eq(2).attr("id", "animate--service-3");
        }

        if ($(document).scrollTop() > $("#contact--section").offset().top -  200) {
            setTimeout(function() {
                displayPlaceholder($("#form--name"), "John Doe");
                displayPlaceholder($("#form--email"), "johndoe@mail.com");
                displayPlaceholder($("#form--message"), "Hi Conner, I'm looking for a new website..");
            }, 259);
        }
    });

    //displayPlaceholder($("#form--email"), "johndoe@live.com");

    $("#contact--form").on("submit", (e) => {

        e.preventDefault();

        let nameVal = $("#form--name").val();
        let emailVal = $("#form--email").val();
        let messageVal = $("#form--message").val();
        let websiteVal = $("#website").val();

        $.ajax({

            "url" : "/assets/php/contact.php",
            "method" : "POST",
            "data" : {
                name : nameVal,
                email : emailVal,
                message : messageVal,
                website : websiteVal
            },
            success : function(res) {
                
                if (res === "1") {
                    //success
                    $("#form--msg-status").text("Email sent successfully");
                } else {
                    $("#form--msg-status").html("Error sending email. Send it over to <b>enquiry@connermurphy.net</b>");
                    console.log(res);
                }

                $("#contact--form")[0].reset();

                setTimeout(function() {
                    $("#form--msg-status").text("");
                }, 4000);

            },
            error : function(err) {
                console.log(err)
            }
        });
    });

    $("#header--content-icon").on("click", function() {
        smoothScroll($("#work--section"));
    });

    $(".nav-link").on("click", function() {

        let navText = $(this).text().toLowerCase().trim();
        switch(navText) {

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

        let countStatInterval = setInterval(function() {

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
            "scrollTop" : sectionOffset
        }, 1000);

    }
    
    function displayPlaceholder(element, placeholderText) {


        let placeholderInterval = setInterval(function() {
            if ($(element).attr("placeholder") !== placeholderText) {
                $(element).attr("placeholder", $(element).attr("placeholder") + placeholderText.charAt(parseInt($(element).attr("placeholder-val"))))
                $(element).attr("placeholder-val", parseInt($(element).attr("placeholder-val")) + 1);
                          
            } else {
                clearInterval(placeholderInterval);
            }
            

        }, 175);

    } 

});