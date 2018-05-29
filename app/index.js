var app = {
    init: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('DOMContentLoaded', this.onPageReady());
    },
    onPageReady: function() {
        var headerTop = $("header").offset().top;
        var courseTop = $(".course-container").offset().top;
        var surroundingTop = $(".surrounding-container").offset().top;
        var periodTop = $(".period-container").offset().top;
        var mapTop = $(".map-container").offset().top;
        var footerTop = $("footer").offset().top;

        window.addEventListener("scroll", function() {
            var scrollTop = document.documentElement.scrollTop;
            if((scrollTop + 100) >= courseTop && (scrollTop + 100) < surroundingTop) {
                $(".navbar").find(".navbar-nav li").removeClass("active");
                $(".navbar").find(".navbar-nav .course-li").addClass("active");
            } else if((scrollTop + 100) >= surroundingTop && (scrollTop + 100) < periodTop) {
                $(".navbar").find(".navbar-nav li").removeClass("active");
                $(".navbar").find(".navbar-nav .surrounding-li").addClass("active");
            } else if((scrollTop + 100) >= periodTop && (scrollTop + 100) < mapTop) {
                $(".navbar").find(".navbar-nav li").removeClass("active");
                $(".navbar").find(".navbar-nav .period-li").addClass("active");
            } else if((scrollTop + 100) >= mapTop && (scrollTop + 100) < footerTop) {
                $(".navbar").find(".navbar-nav li").removeClass("active");
                $(".navbar").find(".navbar-nav .map-li").addClass("active");
            } else if((scrollTop + 100) >= footerTop) {
                $(".navbar").find(".navbar-nav li").removeClass("active");
                $(".navbar").find(".navbar-nav .contact-li").addClass("active");
            }

            if(scrollTop >= 100) {
                $(".navbar").css("box-shadow", "0px 3px 15px rgba(150,150,150,0.3)");
            } else {
                $(".navbar").css("box-shadow", "0px 3px 15px rgba(150,150,150,0)");
            }
        });

        $(".navbar").find(".navbar-nav li a").click(function(e) {
            e.preventDefault();

            var target = this.hash;

            $("html, body").stop().animate({
                scrollTop: $(target).offset().top
            }, 900, "swing", function() {
                window.location.hash = target;
            });
        });
    }
};

// $(document).ready(function() {
//     var headerTop = $("header").offset().top;
//     var courseTop = $(".course-container").offset().top;
//     var surroundingTop = $(".surrounding-container").offset().top;
//     var periodTop = $(".period-container").offset().top;
//     var mapTop = $(".map-container").offset().top;
//     var footerTop = $("footer").offset().top;
//
//     window.onscroll = function() {
//         var scrollTop = document.body.scrollTop;
//         if((scrollTop + 100) >= courseTop && (scrollTop + 100) < surroundingTop) {
//             $(".navbar").find(".navbar-nav li").removeClass("active");
//             $(".navbar").find(".navbar-nav .course-li").addClass("active");
//         } else if((scrollTop + 100) >= surroundingTop && (scrollTop + 100) < periodTop) {
//             $(".navbar").find(".navbar-nav li").removeClass("active");
//             $(".navbar").find(".navbar-nav .surrounding-li").addClass("active");
//         } else if((scrollTop + 100) >= periodTop && (scrollTop + 100) < mapTop) {
//             $(".navbar").find(".navbar-nav li").removeClass("active");
//             $(".navbar").find(".navbar-nav .period-li").addClass("active");
//         } else if((scrollTop + 100) >= mapTop && (scrollTop + 100) < footerTop) {
//             $(".navbar").find(".navbar-nav li").removeClass("active");
//             $(".navbar").find(".navbar-nav .map-li").addClass("active");
//         } else if((scrollTop + 100) >= footerTop) {
//             $(".navbar").find(".navbar-nav li").removeClass("active");
//             $(".navbar").find(".navbar-nav .contact-li").addClass("active");
//         }
//
//         if(scrollTop >= 100) {
//             $(".navbar").css("box-shadow", "0px 3px 15px rgba(150,150,150,0.3)");
//         } else {
//             $(".navbar").css("box-shadow", "0px 3px 15px rgba(150,150,150,0)");
//         }
//     };
//
//     $(".navbar").find(".navbar-nav li a").click(function(e) {
//         e.preventDefault();
//
//         var target = this.hash;
//
//         $("html, body").stop().animate({
//             scrollTop: $(target).offset().top
//         }, 900, "swing", function() {
//             window.location.hash = target;
//         });
//     });
// });
