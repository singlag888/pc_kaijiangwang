var cqncinterval, ifsound = !0, ifopen = !1, bgsound, kaisound, opacityinterval, kaijiarr = [];
var timerr;

export function init() {
    ifopen = 1;
    bgsound = document.getElementById("bgsound"),
        kaisound = document.getElementById("emptsound"),
        ifopen && ifsound && (bgsound.play(),
            kaisound.play()),
        $(".soundsIcon").click(function (e) {
            e.preventDefault(),
                $(this).hasClass("on") ? ($(this).removeClass("on").addClass("off"),
                    ifsound = !1,
                    kaisound.pause(),
                    bgsound.pause()) : ($(this).removeClass("off").addClass("on"),
                        ifsound = !0,
                        ifopen = !0,
                        bgsound.play(),
                        kaisound.play())
        }),
        $(".startBtn").click(function (e) {
            if (void 0 != cqncinterval)
                return 555 == cqncinterval ? $("#mnkai_text").text("即将开奖，禁止模拟").show() : $("#mnkai_text").text("开奖中，禁止模拟").show(),
                    void setTimeout(function () {
                        $("#mnkai_text").hide()
                    }, 1e3);
            e.preventDefault(),
                eachrun(),
                setTimeout(function () {
                    clearInterval(cqncinterval),
                        stopanimate(createArr())
                }, 6e3)
        })
}

export function stopAll(){
    clearInterval(timerr);
    clearInterval(opacityinterval);
}

export function stopanimate(e, n) {
    if (void 0 == e) {
        cqncinterval = void 0;
        ifopen = !1;
        kaisound.pause();
        void bgsound.pause();
    }
    clearInterval(cqncinterval),
        setTimeout(function () {
            go(e, n),
                changesound(!1)
        }, 400)
}

export function createNum(e, n) {
    var t = Math.random() * (n - e)
        , i = Math.round(t + e);
    return i = Math.max(Math.min(i, n), e)
}
export function opacityintervalFunc() {
    clearInterval(opacityinterval);
    for (var e = [], n = 0; n < 20; n++)
        e[n] = $(".numCircle>ul>li:eq(" + n + ")");
    n = 0;
    opacityinterval = setInterval(function () {
        if (20 == n && (n = 0),
            void 0 == e[n])
            return !1;
        -1 == e[n].attr("class").indexOf("rollActive_") ? (e[n].addClass("rollActive_" + (n + 1)).css("opacity", "0.5"),
            setTimeout(function () {
                -1 != e[n].attr("class").indexOf("rollActive_" + (n + 1)) && e[n].removeClass("rollActive_" + (n + 1)).css("opacity", "1"),
                    n++
            }, 350)) : (e[n].animate({
                opacity: "0.5"
            }, "50"),
                setTimeout(function () {
                    e[n].animate({
                        opacity: "1"
                    }, "50"),
                        n++
                }, 350))
    }, 400)
}

export function createArr() {
    for (var e = [], n = 0; n < 8; n++) {
        var t = createNum(1, 20);
        if (0 != n)
            for (var i = 0, o = e.length - 1; i < e.length; i++) {
                if (t == e[i]) {
                    n--;
                    break
                }
                if (i == o) {
                    e.push(t);
                    break
                }
            }
        else
            e.push(t)
    }
    return e
}
export function sum(e, n) {
    var t = $(".sum>span").text()
        , i = $(".danxu").text()
        , o = $(".daxiao").text()
        , a = $(".weixiao").text()
        , c = $(".numlist").html();
    if (statusFun(void 0, e, void 0, !1),
        void 0 == n)
        setTimeout(function () {
            $(".numlist").html(c),
                $(".sum>span").text(t),
                $(".danxu").text(i),
                $(".daxiao").text(o),
                $(".weixiao").text(a),
                cqncinterval = void 0
        }, 8e3)
}

export function go(e, n) {
    if (window.clearInterval(opacityinterval),
        $.each(kaijiarr, function (e, n) {
            $(".numCircle>ul>li:eq(" + (kaijiarr[e] - 1) + ")").removeClass("rollActive_" + kaijiarr[e])
        }),
        changesound(!0),
        void 0 == e)
        var t = !1
            , e = createArr();
    else
        t = !0;
    if ($.each(e, function (n, t) {
        $(".numCircle>ul>li:eq(" + (e[n] - 1) + ")").addClass("rollActive_" + e[n])
    }),
        t) {
        if (void 0 != n) {
            kaijiarr = e,
                sethistoryNum(e),
                cutTime(n);
            i = !0
        } else
            var i = void 0;
        sum(e, i);
        o = setTimeout(function () {
            clearTimeout(o);
            for (var e = 0; e <= 19; e++)
                $(".numCircle>ul>li:eq(" + e + ")").removeClass("rollActive_" + (e + 1));
            setTimeout(function () {
                $.each(kaijiarr, function (e, n) {
                    $(".numCircle>ul>li:eq(" + (kaijiarr[e] - 1) + ")").addClass("rollActive_" + kaijiarr[e])
                }),
                    cqncinterval = void 0,
                    opacityintervalFunc()
            }, 500)
        }, 8e3)
    } else
        var o = setTimeout(function () {
            clearTimeout(o),
                $.each(e, function (n, t) {
                    $(".numCircle>ul>li:eq(" + (e[n] - 1) + ")").removeClass("rollActive_" + e[n])
                })
        }, 200)
}
export function sethistoryNum(e) {
    kaijiarr = e,
        $(".codeNow").text($(".nowIssue>span").text());
    var n = $(".kaiNum>ul>li");
    n.removeClass();
    for (var t = 0; t < e.length; t++)
        n[t].setAttribute("class", "history_" + e[t])
}

export function eachrun(e) {
    void 0 != e && ($(".nowIssue>span").text(1 * $(".nowIssue>span").text() + 1),
        $(".numlist").html(""),
        $(".sum>span").text(""),
        $(".longhu>span").text("")),
        cqncinterval = setInterval(function () {
            go()
        }, 210)
}

export function soundstatus() {
    document.getElementById("bgsound").play(),
        document.getElementById("kaisound").play(),
        document.getElementById("bgsound").pause(),
        document.getElementById("kaisound").pause()
}


export function cutTime(e) {
    clearInterval(timerr),
        null != timerr && clearInterval(timerr);
    var e = e;
    timerr = setInterval(function () {
        if (e >= 1) {
            e -= 1;
            var n = Math.floor(e / 3600)
                , t = Math.floor(e / 60 % 60)
                , i = Math.floor(e % 60)
                , o = "";
            o = (o = (n < 10 ? "0" + n : n) + ":") + "" + (t < 10 ? "0" + t : t) + ":" + (i < 10 ? "0" + i : i),
                $(".timeing").text(o),
                e < 20 && (cqncinterval = 555)
        } else
            changesound(!0),
                cqncinterval = void 0,
                clearInterval(timerr),
                eachrun(1)
    }, 1e3)
}

export function changesound(e) {
    e ? (bgsound.pause(),
        kaisound = document.getElementById("kaisound"),
        bgsound = document.getElementById("emptsound"),
        ifopen && ifsound && kaisound.play()) : (kaisound.pause(),
            kaisound = document.getElementById("emptsound"),
            bgsound = document.getElementById("bgsound"),
            setTimeout(function () {
                ifopen && ifsound && bgsound.play()
            }, 8e3))
}

export function statusFun(e, n, t, i) {
    if (clearInterval(opacityinterval),
        ifopen && ifsound && (bgsound.play(),
            kaisound.play()),
        void 0 != e) {
        $(".nowIssue>span").text(e),
            kaijiarr = n;
        for (var o = 0; o <= 19; o++)
            $(".numCircle>ul>li:eq(" + o + ")").removeClass("rollActive_" + (o + 1));
        for (l = 0; l < n.length; l++)
            $(".numCircle>ul>li:eq(" + (n[l] - 1) + ")").addClass("rollActive_" + n[l])
    }
    i && (sethistoryNum(n),
        $(".codeNow").text(e),
        setTimeout(function () {
            opacityintervalFunc()
        }, 1e3));
    var a = 0
        , c = ""
        , u = ""
        , r = ""
        , s = ""
        , weixiao = "",
        html = "";
    for (var l = 0; l < n.length; l++) {
        a += 1 * n[l];
        var d = "";
        d = n[l] <= 9 ? "0" + n[l] : n[l],
            html += "<li>" + d + "</li>"
    }
    u = (r = 1 * (s = a.toString())[s.length - 1]) % 2 == 0 ? "双" : "单",
        r <= 4 ? (c = "小",
            weixiao = "尾小") : weixiao = "尾大",
        c = s > 84 ? "大" : 84 == s ? "和" : "小",
        $(".numlist").html(html),
        $(".sum>span").text(a),
        $(".danxu").text(u),
        $(".daxiao").text(c),
        $(".weixiao").text(weixiao),
        void 0 != t && cutTime(t)
}
;
