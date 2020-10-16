// Add typewriter js effect  
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    var prev_i;

    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = (function (el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };

                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));

            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function') callback();
            });

            return this;
        },
    });

    $.scrollify({
        section: ".row",
        scrollSpeed: 1000,
        // touchScroll: false,
        // scrollbars: false,
        before: function (i, panels) {
            var ref = panels[i].attr("data-section-name");
            $(".swap .active").removeClass("active");
            $(".swap").find("a[href=\"#" + ref + "\"]").addClass("active");
            $('meta[name=theme-color]').attr("content", panels[i].css("background-color"));

            if (prev_i) {
                var effectOut_list = ['Down', 'Left', 'Up', 'Right', 'Down', 'Left'];
                var effectOut = 'fadeOut' + effectOut_list[prev_i];
                panels[prev_i].children().animateCss(effectOut);
            }

            var effectIn_list = ['Up', 'Up', 'Up', 'Up', 'Up', 'Up',];
            if (prev_i && i - prev_i < 0) {
                var effectIn = 'delay-custom fadeInUp';
            } else {
                var effectIn = 'delay-custom fadeInDown';
            }
            console.log(effectIn);
            panels[i].children('.col').animateCss(effectIn);

            prev_i = i
        },
        after: function (i, panels) {
            panels[i].find(".after_swing").animateCss("swing");
        },
        afterRender: function () {
            var swap = "<ul class=\"swap\">";
            var activeClass = "";
            $(".row").each(function (i) {
                activeClass = "";
                if (i === 0) {
                    activeClass = "active";
                }
                swap += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
            });

            swap += "</ul>";

            $("body").append(swap);
            /*
      
            Tip: The two click events below are the same:
      
            $(".swap a").on("click",function() {
              $.scrollify.move($(this).attr("href"));
            });
      
            */
            $(".swap a").on("click", $.scrollify.move);
            $(".col").animateCss('fadeInRight');
        }
    });
    // SmoothScroll(document, 120, 20);
};

$().ready(function () {
    $('.section1').tubular({ videoId: 'qBAo3-Fc3j0', start: 15})
});
//  where idOfYourVideo is the YouTube ID. })
