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

function SmoothScroll(target, speed, smooth) {
    if (target == document)
        target = (document.documentElement || document.body.parentNode || document.body) // cross browser support for document scrolling
    var moving = false
    var pos = target.scrollTop
    target.addEventListener('mousewheel', scrolled, false)
    target.addEventListener('DOMMouseScroll', scrolled, false)

    function scrolled(e) {
        e.preventDefault(); // disable default scrolling

        var delta = normalizeWheelDelta(e)

        pos += -delta * speed
        pos = Math.max(0, Math.min(pos, target.scrollHeight - target.clientHeight)) // limit scrolling

        if (!moving) update()
    }

    function normalizeWheelDelta(e) {
        if (e.detail) {
            if (e.wheelDelta)
                return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
            else
                return -e.detail / 3 // Firefox
        } else
            return e.wheelDelta / 120 // IE,Safari,Chrome
    }

    function update() {
        moving = true
        var delta = (pos - target.scrollTop) / smooth
        target.scrollTop += delta
        if (Math.abs(delta) > 0.5)
            requestFrame(update)
        else
            moving = false
    }

    var requestFrame = function () { // requestAnimationFrame cross browser
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (func) {
                window.setTimeout(func, 1000 / 50);
            }
        );
    }()
}

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

    var buf_section = -1;

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
        scrollSpeed: 1500,
        // touchScroll: false,
        // scrollbars: false,
        before: function (i, panels) {
            var ref = panels[i].attr("data-section-name");
            $(".swap .active").removeClass("active");
            $(".swap").find("a[href=\"#" + ref + "\"]").addClass("active");
            $('meta[name=theme-color]').attr("content", panels[i].css("background-color"));
            
            var prev_i;
            if (i - buf_section > 0) {
                if (i > 0) {
                    prev_i = i-1;
                }
            } else {
                if (i < 5) {
                    prev_i = i+1;
                }
            }
            buf_section = i;

            var effectIn = 'bounceIn';
            var effectOut = 'fadeOut';
            if (i == 0) {
                effectIn += 'Up';
            } else if (i == 1) {
                effectIn += 'Left';
            } else if (i == 2) {
                effectIn += 'Down';
            } else if (i == 3) {
                effectIn += 'Right';
            } else if (i == 4) {
                effectIn += 'Up';
            } else {
                effectIn += 'Left';
            }

            if (prev_i == 0) {
                effectOut += 'Down';
            } else if (prev_i == 1) {
                effectOut += 'Left';
            } else if (prev_i == 2) {
                effectOut += 'Up';
            } else if (prev_i == 3) {
                effectOut += 'Right';
            } else if (prev_i == 4) {
                effectOut += 'Down';
            } else {
                effectOut += 'Left';
            }
            panels[prev_i].children().animateCss(effectOut);
            panels[i].children().animateCss(effectIn);
        },
        after: function (i, panels) {
            panels[i].find("button").animateCss("swing");
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