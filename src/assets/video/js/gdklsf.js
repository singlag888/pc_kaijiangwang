var bgsound = document.getElementById("bgsound"), kaisound = document.getElementById("kaisound"), kaiing = bgsound,
    ifopen = !1, interInt = !1;

var addint = null;
var fillTime = null;


export function init(){
    bgsound = document.getElementById("bgsound"), kaisound = document.getElementById("kaisound"), kaiing = bgsound;
    $("#btnsound").on("click", function () {
        $(this).hasClass("off") ? (kaiing.play(), $(this).removeClass("off")) : (kaiing.pause(), $(this).addClass("off"))
    });
    $(".kaiBtn").click(function () {
        if (moveIn) return !1;
        moveIn = !0, $(".video_box .middle_box li").show();
        var e = $(".result_box>ul").html();
        moveBall(), setTimeout(function () {
            var e = createArr();
            addresulthtml(e)
        }, 3e3), setTimeout(function () {
            $(".video_box .middle_box li").css("transition", "all 10ms")
        }, 5e3), setTimeout(function () {
            clearInterval(initf), setTimeout(function () {
                ballStatic(), setTimeout(function () {
                    $(".video_box .middle_box li").show(), $(".result_box>ul").html(e), $(".video_box .middle_box li").css("transition", "0"), moveIn = !1
                }, 4e3)
            }, 500)
        }, 6e3)
    })
}


export function createNum(e, n) {
    var t = n - e, u = Math.random();
    return e + Math.round(u * t)
};
export function createArr() {
    for (var e = [], n = 0; n < 8; n++) {
        var t = createNum(1, 20);
        if (0 != n) for (var u = 0, i = e.length - 1; u < e.length; u++) {
            if (t == e[u]) {
                n--;
                break
            }
            if (u == i) {
                e.push(t);
                break
            }
        } else e.push(t)
    }
    return e
};
export function createtwoArr() {
    for (var e = [], n = [], t = 0; t < 20; t++) (n = []).push(createNum(253, 255), createNum(55, 274)), e.push(n);
    return e
};
export function soundrevsion() {
    $("#btnsound").hasClass("off") || (kaiing.pause(), kaiing.play())
};
export function ballStatic() {
    clearInterval(initf), kaiing.pause(), kaiing = bgsound, soundrevsion();
    for (var e = createtwoArr(), n = $(".move_ballUl>li"), t = 0; t < n.length; t++) $(n[t]).css({
        top: e[t][0] + "px",
        left: e[t][1] + "px",
        "z-index": createNum(0, 20)
    })
};
var initf, moveIn = !1, inttime = 10;
export function moveBall() {
    bgsound = document.getElementById("bgsound"), kaisound = document.getElementById("kaisound"), kaiing = bgsound;
    $(".video_box .middle_box li").show(), clearInterval(initf), kaiing.pause(), kaiing = kaisound, soundrevsion(), $(".result_box>ul").html("");
    var e = $(".move_ballUl>li");
    moveIn = !0, initf = setInterval(function () {
        for (var n = 0; n < e.length; n++) $(function () {
            var t = e[n];
            setTimeout(function () {
                var e = createNum(0, 256), n = createNum(0, 325);
                e < 10 ? n = createNum(55, 255) : e < 15 && e > 10 ? n = createNum(45, 300) : e < 20 && e > 10 ? n = createNum(35, 295) : e < 25 && e > 15 ? n = createNum(30, 300) : e < 30 && e > 20 ? n = createNum(25, 305) : e < 45 && e > 30 ? n = createNum(20, 315) : e < 55 && e > 45 ? n = createNum(15, 320) : e < 70 && e > 55 ? n = createNum(10, 325) : e < 90 && e > 70 ? n = createNum(5, 325) : e < 110 && e > 90 ? n = createNum(0, 325) : e < 130 && e > 110 ? n = createNum(5, 325) : e < 150 && e > 130 ? n = createNum(10, 325) : e < 165 && e > 150 ? n = createNum(15, 325) : e < 175 && e > 165 ? n = createNum(20, 325) : e < 190 && e > 175 ? n = createNum(25, 315) : e < 200 && e > 190 ? n = createNum(35, 310) : e < 210 && e > 200 ? n = createNum(45, 300) : e < 220 && e > 200 ? n = createNum(55, 290) : e > 220 && (n = createNum(30, 290)), $(t).css({
                    top: e + "px",
                    left: n + "px",
                    "z-index": createNum(0, 20)
                })
            }, createNum(100, 500))
        })
    }, inttime)
};
export function addresulthtml(e, n) {
    var t = e.length, u = "", i = 0, l = "blue";
    if ($(".result_box>ul").html(""), interInt) return clearInterval(addint), !1;
    addint = setInterval(function () {
        interInt = !0, l = 19 == e[i] || 20 == e[i] ? "red" : "blue", $("." + e[i]).hide(), e[i] < 10 ? e[i] = "0" + e[i] : e[i];
        var a = "<li class='ball small " + l + "'>" + e[i] + "</li>";
        n && (u += a), $(".result_box>ul").append(a), ++i >= t && (interInt = !1, clearInterval(addint)), setTimeout(function () {
            $(".small").removeClass("small")
        }, 100), n && 8 == i && $("#rethtml").html(u)
    }, 300)
};
export function Trueresult(e) {
    addresulthtml(e, !0), setTimeout(function () {
        $(".video_box .middle_box li").css("transition", "all 10ms"), clearInterval(initf), setTimeout(function () {
            ballStatic(), $(".video_box .middle_box li").css("transition", "0"), moveIn = !1
        }, 500)
    }, 1e3)
};
var timer;
export function cutTime(e) {
    null != timer && clearInterval(timer);
    var e = e;
    timer = setInterval(function () {
        if (e >= 1) {
            e -= 1;
            var n = Math.floor(e / 3600), t = Math.floor(e / 60 % 60), u = Math.floor(e % 60), i = "";
            if (i = (n < 10 ? "0" + n : n) + ":", i = i + "" + (t < 10 ? "0" + t : t) + ":" + (u < 10 ? "0" + u : u), $(".Time_box").text(i), e < 10) {
                var l = $(".linelist").find("li");
                $(l).eq(e).addClass("redli")
            }
        } else clearInterval(timer), $(".Time_box").hide(), $(".opening").show(), moveBall()
    }, 1e3)
};
export function clearTime() {
    clearInterval(timer)
};
export function getSecond(e) {
    var n = e.split(":"), t = n[0], u = n[1], i = n[2];
    return 3600 * (t = t < 10 ? t.substring(t.length - 1, t.length) : t) + 60 * (u = u < 10 ? u.substring(u.length - 1, u.length) : u) + 1 * (i = i < 10 ? i.substring(i.length - 1, i.length) : i)
};
export function fillHtml(e, n, t, u, i) {
    bgsound = document.getElementById("bgsound"), kaisound = document.getElementById("kaisound"), kaiing = bgsound;
    if (void 0 != i) {
        (clearInterval(addint), clearTimeout(fillTime));
        $(".result_box>ul").html("");
        $(".Time_box").show();
        $(".opening").hide();
        $("#nextIssue").html(n);
        $("#nextOpTime").html(t);
        $("#thisIss").html(e);
        cutTime(u);
        ballStatic();
        if (void 0 != i) {
            for (var l = "blue", a = "", o = 0; o < i.length; o++) {
                l = 19 == i[o] || 20 == i[o] ? "red" : "blue";
                i[o] < 10 ? i[o] = "0" + i[o] : i[o];
                a += "<li class='ball " + l + "'>" + i[o] + "</li>";
            }
            $("#rethtml").html(a);
            $(".result_box>ul").html(a);
        }
    }
};
export function onPcFillHtml(e, n, t, u) {
    if ($(".Time_box").hide(), $(".opening").show(), $("#nextIssue").html(n), $("#nextOpTime").html(t), $("#thisIss").html(e), void 0 != u) {
        for (var i = "blue", l = "", a = 0; a < u.length; a++) i = 19 == u[a] || 20 == u[a] ? "red" : "blue", u[a] < 10 ? u[a] = "0" + u[a] : u[a], l += "<li class='ball " + i + "'>" + u[a] + "</li>";
        $("#rethtml").html(l), $(".result_box>ul").html(l)
    }
};
export function stateSound() {
    bgsound.play(), kaisound.play(), bgsound.pause(), kaisound.pause()
};

