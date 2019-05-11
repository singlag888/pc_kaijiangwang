define(["jquery"], function(t) {
    var e = {
        ssc: {
            num: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            num_len: 10,
            col_td: 8,
            open_len: 5,
            zj_val: 4,
            max: 9,
            da: [5, 6, 7, 8, 9],
            xiao: [0, 1, 2, 3, 4],
            dan: [1, 3, 5, 7, 9],
            shuang: [0, 2, 4, 6, 8],
            zhi: [1, 2, 3, 5, 7],
            he: [0, 4, 6, 8, 9]
        },
        pk10: {
            num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            num_len: 10,
            col_td: 9,
            open_len: 10,
            zj_val: 5,
            max: 10,
            da: [6, 7, 8, 9, 10],
            xiao: [1, 2, 3, 4, 5],
            dan: [1, 3, 5, 7, 9],
            shuang: [2, 4, 6, 8, 10]
        },
        klsf: {
            num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            num_len: 20,
            col_td: 9,
            open_len: 8,
            zj_val: 10,
            max: 20,
            da: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            xiao: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            dan: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
            shuang: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
            dong: [1, 5, 9, 13, 17],
            nan: [2, 6, 10, 14, 18],
            xi: [3, 7, 11, 15, 19],
            bei: [4, 8, 12, 16, 20],
            zhong: [1, 2, 3, 4, 5, 6, 7],
            fa: [8, 9, 10, 11, 12, 13, 14],
            bai: [15, 16, 17, 18, 19, 20]
        }
    };
    return app = {
        czinfo: {
            pk10: t.extend({}, e.pk10),
			klpk10: t.extend({}, e.pk10),
			klft: t.extend({}, e.pk10),
			sgft: t.extend({}, e.pk10),
            speed10: t.extend({}, e.pk10),
            jspk10: t.extend({}, e.pk10),
			mspk10: t.extend({}, e.pk10),
			msft: t.extend({}, e.pk10),
            xyft: t.extend({}, e.pk10),
            jsft: t.extend({}, e.pk10),
            cqssc: t.extend({}, e.ssc),
            msssc: t.extend({}, e.ssc),
            klssc: t.extend({}, e.ssc),
            speed5: t.extend({}, e.ssc),
            jsssc: t.extend({}, e.ssc),
            gdkl10: t.extend({}, e.klsf),
            xync: t.extend({}, e.klsf),
            tjssc: t.extend({}, e.ssc),
            xjssc: t.extend({}, e.ssc),
			xyssc: t.extend({}, e.ssc),
            jsk3: {
                num: [1, 2, 3, 4, 5, 6],
                num_len: 6,
                col_td: 9,
                open_len: 3,
                zj_val: 3,
                max: 6
            }
        },
        reload: !1,
        trend: {
            arr: [],
            category: []
        },
        sort: function(t, e) {
            return t - e
        },
        geturlstr: function(t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)","i")
              , a = window.location.search.substr(1).match(e);
            return null != a ? decodeURIComponent(a[2]) : null
        },
        iframe_dump: function() {
            if (self != top && window.location.href.indexOf("base") < 0) {
                Math.random().toFixed(1) >= .5 && (window.parent.location.href = window.location.href)
            }
        },
        tab: function(e, a, n) {
            t(document).on(n, e, function() {
                t(this).addClass("active").siblings(e).removeClass("active"),
                t(a).eq(t(this).index()).show().siblings(a).hide()
            }),
            t(e).eq(0).trigger(n)
        },
        add_class: function(e, a) {
            t(e).addClass(a)
        },
        shoucang: function() {
            var e = document.title
              , a = window.location.href;
            t(".add_sc").click(function() {
                try {
                    window.external.addFavorite(a, e)
                } catch (t) {
                    try {
                        window.sidebar.addPanel(e, a, "")
                    } catch (t) {
                        alert("加入收藏失败，请使用Ctrl+D进行添加")
                    }
                }
            })
        },
        get_trend: function(e) {
            var a = (new Date).getTime();
            t.ajax({
                url: "/api/recent?code=" + e + "&t=" + a,
                method: "get",
                success: function(t) {
                    if (0 === t.code) {
                        for (var a = 0, n = t.data.length; a < n; a++)
                            app.trend.arr.push({
                                issue: t.data[a].issue,
                                array: t.data[a].array,
                                time: t.data[a].time,
                                y: parseInt(t.data[a].array[0])
                            }),
                            app.trend.category.push(t.data[a].term);
                        app.highcharts({
                            obj: ".trend-box",
                            type: e,
                            max: app.czinfo[e].max,
                            category: app.trend.category,
                            data: app.trend.arr
                        })
                    } else
                        app.loadmark({
                            text: "走势图加载失败，请刷新重试",
                            time: 1100
                        })
                },
                error: function() {
                    app.loadmark({
                        text: "走势图加载失败，请刷新重试",
                        time: 1100
                    })
                }
            })
        },
        highcharts: function(e) {
            require(["highcharts"], function(a) {
                t(e.obj).highcharts({
                    title: {
                        text: null
                    },
                    chart: {
                        type: "spline"
                    },
                    exporting: {
                        enabled: !1
                    },
                    xAxis: {
                        labels: {
                            rotation: 0
                        },
                        gridLineWidth: 1,
                        categories: e.category
                    },
                    yAxis: {
                        minorTickInterval: "auto",
                        title: {
                            text: null
                        },
                        min: 0,
                        max: e.max
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 1,
                            dataLabels: {
                                enabled: !0,
                                style: {
                                    color: "red",
                                    fontSize: "12px"
                                }
                            }
                        }
                    },
                    tooltip: {
                        useHTML: !0,
                        shared: !0,
                        formatter: function() {
                            for (var t = this.points[0].point.index, a = this.points[0].series.data[t], n = "", s = 0, d = a.array.length; s < d; s++)
                                n += '<span class="n' + a.array[s] + '">' + a.array[s] + "</span>";
                            return '<div style="text-align:center;margin-bottom:5px;">第' + a.issue + "期&nbsp;&nbsp;&nbsp;&nbsp;" + a.time.substring(0, 16) + '</div><div class="cai-num ' + e.type + '-num size-32 center">' + n + "</div>"
                        },
                        crosshairs: [{
                            width: 1,
                            color: "red",
                            dashStyle: "shortdot"
                        }, {
                            width: 1,
                            color: "red",
                            dashStyle: "shortdot"
                        }]
                    },
                    legend: {
                        enabled: !1
                    },
                    series: [{
                        data: e.data
                    }]
                })
            })
        },
        reset_active: function(e) {
            var a = "";
            e && "type" == e ? a = t(".btn-filter-type a") : e && "num" == e ? a = t(".btn-filter-num a") : e && "all" == e && (a = t(".btn-filter-num a,.btn-filter-type a")),
            "" != a && a.removeClass("active"),
            t(".history-table .td-num span").removeClass("opacity")
        },
        get_common_nums: function(e) {
            for (var a = {}, n = e.length, s = "", d = 0; d < n; d++)
                for (var r = 0, i = e[d].length; r < i; r++)
                    a[e[d][r]] ? a[e[d][r]]++ : a[e[d][r]] = 1,
                    a[e[d][r]] == n && (s += ".n" + e[d][r] + ",");
            s = s.substring(0, s.length - 1),
            t(s).removeClass("opacity")
        },
        nums_str: function(t, e, a) {
            var n = "";
            if ("dx" == a)
                for (var s = 0, d = e.length; s < d; s++)
                    n += '<span class="n' + e[s] + " n-" + (parseInt(e[s]) > app.czinfo[t].zj_val ? "da" : "xiao") + '" data-num="' + e[s] + '">' + e[s] + "</span>";
            else if ("ds" == a)
                for (var s = 0, d = e.length; s < d; s++)
                    n += '<span class="n' + e[s] + " n-" + (parseInt(e[s]) % 2 == 0 ? "shuang" : "dan") + '" data-num="' + e[s] + '">' + e[s] + "</span>";
            else
                for (var s = 0, d = e.length; s < d; s++)
                    n += '<span class="n' + e[s] + '" data-num="' + e[s] + '">' + e[s] + "</span>";
            return n
        },
        page_lottery_tr: function(t, e) {
            var a = e.newest.array
              , n = ""
              , s = ""
              , d = '<div style="display:block;" class="td-box cai-num size-32 center ' + t + '-num">' + app.nums_str(t, a) + '</div><div class="td-box cai-num size-32 center type-num">' + app.nums_str(t, a, "dx") + '</div><div class="td-box cai-num size-32 center type-num">' + app.nums_str(t, a, "ds") + "</div>";
            return "msft" == t || "mspk10" == t || "pk10" == t || "xyft" == t || "speed10" == t || "jspk10" == t || "jsft" == t ? s = '<td width="55">' + (parseInt(a[0]) + parseInt(a[1])) + '</td><td width="55">' + app.dx(parseInt(a[0]) + parseInt(a[1]), 11, "d") + '</td><td width="55">' + app.ds(parseInt(a[0]) + parseInt(a[1])) + '</td><td width="55">' + app.lh(a[0], a[9]) + '</td><td width="55">' + app.lh(a[1], a[8]) + '</td><td width="55">' + app.lh(a[2], a[7]) + '</td><td width="55">' + app.lh(a[3], a[6]) + '</td><td width="55">' + app.lh(a[4], a[5]) + "</td>" : "msssc" == t || "cqssc" == t || "xjssc" == t || "tjssc" == t || "speed5" == t || "jsssc" == t ? (n = '<div class="td-box cai-num size-32 center type-num zh-num">' + app.nums_str(t, a) + "</div>",
            s = '<td width="55">' + e.newest.sum + '</td><td width="55">' + app.dx(e.newest.sum, 22, "d") + '</td><td width="55">' + app.ds(e.newest.sum) + '</td><td width="55">' + app.shun(a.slice(0, 3)) + '</td><td width="55">' + app.shun(a.slice(1, 4)) + '</td><td width="55">' + app.shun(a.slice(2, 5)) + "</td>") : "jsk3" == t ? (d = '<div class="cai-num size-32 center ' + t + '-num">' + app.nums_str(t, a) + "</div>",
            s = '<td width="90">' + e.newest.sum + '</td><td width="90">' + app.tc(e.newest.sum, a) + '</td><td width="90">' + app.ds(e.newest.sum) + "</td>") : "gd_klsf" != t && "xync" != t || (n = '<div class="td-box cai-num size-32 center type-num fw-num">' + app.nums_str(t, a) + '</div><div class="td-box cai-num size-32 center type-num zfb-num">' + app.nums_str(t, a) + "</div>",
            s = '<td width="60">' + e.newest.sum + '</td><td width="60">' + app.dx(e.newest.sum, 84, "d") + '</td><td width="60">' + app.ds(e.newest.sum, "s") + '</td><td width="60">' + (e.newest.sum % 10 > 4 ? "尾大" : "尾小") + '</td><td width="60">' + app.lh(a[0], a[7]) + '</td><td width="60">' + app.lh(a[1], a[6]) + '</td><td width="60">' + app.lh(a[2], a[5]) + '</td><td width="60">' + app.lh(a[3], a[4]) + "</td>"),
            '<tr class="tr" id="tr-' + e.newest.issue + '"><td>' + e.newest.issue + "&nbsp;&nbsp;" + app.date_format(e.newest.time, "HH:mm:ss") + '</td><td class="td-num td-' + t + '">' + d + n + "</td>" + s + "</tr>"
        },
        drawing: function(e) {
            clearInterval(app.czinfo[e].open_timer);
            var a = app.czinfo[e].open_len
              , n = app.czinfo[e].num_len
              , s = app.czinfo[e].num;
            app.czinfo[e].open_timer = setInterval(function() {
                for (var d = "", r = 0; r < a; r++) {
                    var i = Math.floor(Math.random() * n);
                    d += '<span class="n' + s[i] + '">' + s[i] + "</span>"
                }
                t("#" + e).find(".cai-num").html(d),
                t("#" + e).find(".djs").html("<div class='opening'><i class='iconfont'>&#xe6ed;</i>开奖中···<div>")
            }, 110)
        },
        get_lottery: function(e) {
            app.drawing(e);
            var a = (new Date).getTime();
            t.ajax({
                url: "/api/newest?code=" + e + "&t=" + a,
                method: "get",
                success: function(t) {
                    if (0 === t.code) {
                        var a = t.data
                          , n = a.current - a.newest.issue;
                        app.czinfo[e].ticking = a.ticking,
                        n > 2 || 1 == n || 0 == n || !a.newest.issue ? (app.countdown(e),
                        clearInterval(app.czinfo[e].open_timer),
                        app.lottery_result(e, a)) : (app.plan_draw(e, a),
                        app.get_retry(e),
                        app.reload = !0)
						 try {
                            // 增加对视频的调用
                            if (app.video)
								
                                app.video.gotLotteryData(e, a);
                        }
                        catch (err) {
                            console.log(err)
                        }
                    } else
                        app.get_retry(e)
                }
            })
        },
        get_retry: function(t) {
            clearTimeout(app.czinfo[t].timeout),
            app.czinfo[t].timeout = setTimeout(function() {
                app.get_lottery(t)
            }, 1e3)
        },
        plan_draw: function(e, a) {
            t("#" + e).find(".current,.next").html(a.newest.issue + 1),
            t("#" + e).find(".open").html(a.currentNo),
            t("#" + e).find(".period-leave").html(a.remain)
        },
        countdown: function(e) {
            t("#" + e).find(".djs").html(app.format_time(app.czinfo[e].ticking, "<div class='opening'><i class='iconfont'>&#xe6ed;</i>开奖中···<div>")),
            clearInterval(app.czinfo[e].timer),
            app.czinfo[e].timer = setInterval(function() {
                if (--app.czinfo[e].ticking < 0)
                    return clearInterval(app.czinfo[e].timer),
                    void app.get_lottery(e);
                t("#" + e).find(".djs").html(app.format_time(app.czinfo[e].ticking, "<div class='opening'><i class='iconfont'>&#xe6ed;</i>开奖中···<div>"))
            }, 1e3)
        },
        lottery_result: function(e, a) {
            t("#" + e).find(".current").html(a.newest.issue ? a.newest.issue : a.current),
            t("#" + e).find(".open").html(a.currentNo - 1),
            t("#" + e).find(".period-leave").html(a.remain),
            t("#" + e).find(".next").html(a.current);
            var n = a.newest.array ? app.nums_str(e, a.newest.array) : "等待开奖";
            t("#" + e).find(".cai-num").html(n),
            t("#" + e).find(".summery") && a.summery && t("#" + e).find(".summery td").each(function(e) {
                t(this).html(a.summery[e])
            }),
            t(".trend-box").length > 0 && a.newest.issue && 0 == t("#tr-" + a.newest.issue).length && (app.trend.arr.shift(),
            app.trend.category.shift(),
            app.trend.arr.push({
                issue: a.newest.issue,
                array: a.newest.array,
                time: a.newest.time,
                y: parseInt(a.newest.array[0])
            }),
            app.trend.category.push(a.newest.term),
            app.highcharts({
                obj: ".trend-box",
                type: e,
                max: app.czinfo[e].max,
                category: app.trend.category,
                data: app.trend.arr
            })),
			t(".sm-box").length > 0 && (
				app.get_shuangmian(e)
			),
			t(".cl-box").length > 0 && (
				app.get_changlong(e)
			),
		
            t("#table-" + e).length > 0 && a.newest.issue && 0 == t("#tr-" + a.newest.issue).length && app.is_today(e) && (t("#table-" + e).find("tr:first").after(app.page_lottery_tr(e, a)),
            t("#table-" + e).find(".tab-a a:first").click()),
            app.reload && t("#dewdrop").length > 0 ? 0 === t(".day-a a.active").index() && t(".day-a a.active").trigger("click") : app.reload && t("#hot-table").length > 0 ? app.hot_reload(t("#hot-table").data("type")) : app.reload && t("#todaynumber-table").length > 0 ? app.todaynumber_reload(t("#todaynumber-table").data("type")) : app.reload && t("#plan-table").length > 0 ? app.plan_reload(t("#plan-table").data("type"), a.newest.issue) : app.reload && t("#trend-cont").length > 0 && app.trend_reload(t("#trend-cont").data("type"), a),
            app.reload = !0
        },
        is_today: function(t) {
            var e = app.get_date("yyyyMMdd")
              , a = window.location.href.split(t + "-")[1].split(".html")[0];
            return "today" == a || a == e
        },
        filter_date: function(e) {
            var a, n = app.get_date("yyyyMMdd"), s = window.location.pathname, d = "trend" == e ? s.split("/")[1].split("-")[3].split(".")[0] : d = s.split("/")[1].split("-")[2].split(".")[0], r = window.location.href.indexOf("today") > 0 ? n : d, i = r.slice(0, 4) + "-" + r.slice(4, 6) + "-" + r.slice(6, 8);
            "dewdrop" != e && t("#date").val(i),
            t(document).on("click", ".k-days span", function() {
                a = t("#date").val().replace(/-/g, ""),
				url = a == n ? s.replace(d, 'today') : s.replace(d, a),
                a <= n ? window.location.href = url : (app.loadmark({
                    text: "日期选择不能超过今天",
                    time: 1100
                }),
                t("#date").val(i)),
                t("#date").blur()
            })
        },
		get_shuangmian: function(e) {
						

            var a = (new Date).getTime();
            t.ajax({
                url: "/api/shuangmian?code=" + e + "&t=" + a,
                method: "get",
                success: function(e) {
					//console.log(e);
					var d='';
                    t.each(e,function(a,t){
						d += "<td>" + t + "</td>"
					})
					t(".sm-box").html(d)
					//console.log(d);
                }
            }) 					
        },
		get_changlong: function(e) {
            var a = (new Date).getTime();
            t.ajax({
                url: "/api/changlong?code=" + e + "&t=" + a,
                method: "get",
                success: function(e) {
					//console.log(e);
					var d='';
                    t.each(e,function(a,t){
						//console.log(t);
						n=t.num >= 6 ? "<font color=red>"+t.num+"</font>" : t.num;
						/*t.num >= 6 && app.loadmark({
							text: t.title+" 已连开 "+t.num+" 期",
							time: 1100
						});*/
						d += "<span>" + t.title +" "+ n +" 期</span>"
					})
					t(".cl-box").html(d)
					//console.log(d);
                }
            }) 					
        },

        get_countdown: function(e,n) {
			
            var a = (new Date).getTime();
            t.ajax({
                url: "/api/newest?code=" + e + "&t=" + a,
                method: "get",
                success: function(t) {
                    0 === t.code && n==1 ? app.live_djs(e, t.data.ticking) : app.index_djs(e, t.data.ticking, t.data.current, t.data.total, t.data.remain);
                }
            })
        },
        live_djs: function(e, a) {
            app.czinfo[e].live_ticking = a,
            t("#" + e).find(".second").html(a),
            clearInterval(app.czinfo[e].live_timer),
            app.czinfo[e].live_timer = setInterval(function() {
                if (--app.czinfo[e].live_ticking < 0)
                    return clearInterval(app.czinfo[e].live_timer),
                    void app.get_countdown(e,1);
                t("#" + e).find(".second").html(app.czinfo[e].live_ticking)
            }, 1e3)
        },
        index_djs: function(e, a,r,b,c) {
			var c = c==0 ? b : c;
            app.czinfo[e].live_ticking = a,
            t("#" + e).find(".time").html(app.format_djs(a)),
            t("#" + e).find("#qihao").html(r),
			t("#" + e).find("#total").html(b),
            t("#" + e).find("#remain").html(c),

            clearInterval(app.czinfo[e].index_timer),
            app.czinfo[e].index_timer = setInterval(function() {
                if (--app.czinfo[e].live_ticking < 0)
                    return clearInterval(app.czinfo[e].index_timer),
                    void app.get_countdown(e,2);
                t("#" + e).find(".time").html(app.format_djs(app.czinfo[e].live_ticking));
				t("#" + e).find("#qihao").html(r);
				t("#" + e).find("#total").html(b);
				t("#" + e).find("#remain").html(c);

            }, 1e3)
        },
        hot_reload: function(e) {
            var a = (new Date).getTime();
            t.ajax({
                url: "/api/hot?code=" + e + "&t=" + a,
                method: "get",
                success: function(a) {
                    0 === a.code && t("#hot-table tbody").html(app.hot_tbody(a.data, e))
                }
            })
        },
        hot_tbody: function(e, a) {
            var n = "";
            return t.each(e, function(e, s) {
                var d = "";
                t.each(s, function(e, n) {
                    var s = "";
                    t.each(n, function(t, e) {
                        s += '<span class="n' + t + '">' + t + "</span>"
                    }),
                    d += '<td><div class="cai-num ' + a + '-num size-32">' + s + "</div></td>"
                }),
                n += '<tr class="tr"><td>' + e + "</td>" + d + "</tr>"
            }),
            n
        },

        plan_reload: function(e, a) {
			app.loadmark({
                text: "算法优化中",
                img: !0,
                time: 0
            });
            var n = (new Date).getTime();
			
			t.ajax({
				url: "/api/number-plan?code=" + e + "&ball=" + t(".ball-a a.active").index() + "&uid=" + t("#plan-table").data("uid") + "&num=" + t(".num-a a.active").data("num") + "&rate=" + t("#rate").val() + "&money=" + t("#money").val() + "&t=" + n,
				method: "get",
				success: function(n) {
					//app.plan_tbody(n.list, e),
					//console.log(app.plan_tbody(n.list, e)),
					
					t("#plan-data-list").html(app.plan_tbody(n.list, e)),
					//t("#winNums").html(n.win),t("#winRate").html(n.winRate),t("#roundNums").html(n.roundNums),
					app.closemark()
				}
			})
			
			
			

        },
        plan_tbody: function(data, a) {
			var winArr=new Array();
			winArr[0]="待开奖";
			winArr[1]="<font color=green>√赢</font>";
			winArr[2]="<font color=red>×输</font>";
			var ballArr=new Array();
			if(app.czinfo[a].open_len==10){

				ballArr[1]="冠军";
				ballArr[2]="亚军";
				ballArr[3]="第三名";
				ballArr[4]="第四名";
				ballArr[5]="第五名";
				ballArr[6]="第六名";
				ballArr[7]="第七名";
				ballArr[8]="第八名";
				ballArr[9]="第九名";
				ballArr[10]="第十名";
			}else{
				
				ballArr[1]="第一球(万)";
				ballArr[2]="第二球(千)";
				ballArr[3]="第三球(百)";
				ballArr[4]="第四球(拾)";
				ballArr[5]="第五球(个)";
			}
            var n = "";
           return t.each(data, function(index, e) {
				
			if(app.czinfo[a].open_len==10){
				n+='<tr><th colspan="11" style="font-size:14px">'+e.text+'</th></tr><tr><th width="50">序号</th><th width="50">轮次</th><th width="120">期号</th><th width="80">专家</th><th width="400">开奖号码</th><th width="130">预测号码</th><th>类型</th><th>结果</th><th>截止输赢</th><th>反压输赢</th><th>单期成本</th></tr>'

			}else{
				n+='<tr><th colspan="11" style="font-size:14px">'+e.text+'</th></tr><tr><th width="70">序号</th><th width="70">轮次</th><th width="120">期号</th><th width="80">专家</th><th width="300">开奖号码</th><th width="140">预测号码</th><th>类型</th><th>结果</th><th>截止输赢</th><th>反压输赢</th><th>单期成本</th></tr>'

			}
					t.each(e.data,function(k, b) {
					
						
  						//开奖结果数组
						newResultArr = b.result.split(",");
						//计划数组
						newNumberArr = b.number.split(",");
						//创建新的替换计划数组
						var newNumArr=new Array();
						for(j = 0,len=newNumberArr.length; j < len; j++) {
							var ballb=b.ball-1;
							newNumArr[j]=newResultArr[ballb]==newNumberArr[j] ? '<b style="color:red;">'+newNumberArr[j]+'</b>': newNumberArr[j];
						}
						
						n += '<tr class="tr tr-' + b.round + '"><td>第' + b.k + '期</td><td>' + b.lunci + '</td><td>第' + b.round + '期</td><td>' + b.username + '</td><td class="num-td">' + (b.result ? '<div class="cai-num ' + a + '-num size-32 center">' + app.nums_str("kill", b.result.split(",")) + "</div>" : "待开奖") + '</td> <td style="font-size:14px">'+newNumArr.join(",")+'</td><td>'+ballArr[b.ball]+'-'+b.numbernum+'码</td><td>'+winArr[b.win]+'</td><td>'+(b.win==0 ? '待开奖' : b.rmoney)+'</td><td style="color:#bbb">'+(b.win==0 ? '待开奖' : b.fmoney)+'</td><td>' + b.money*b.numbernum + '</td></tr>'

					})
					



						

								

                
            }),
			n
        },
 
        trend_reload: function(e, a) {
            var n = "basic"
              , s = t("#trend-cont .filter-down .fr a.active").index()
              , d = app.get_date("yyyyMMdd")
              , r = t("#date").val().replace(/-/g, "")
              , i = (new Date).getTime();
            t("#trend-cont .filter-down .tab-a a.active").index() > 0 && (n = 1 == t("#trend-cont .filter-down .tab-a a.active").index() ? "number" : "sum"),
            0 == t("#trend-cont .filter-top>a.active").index() ? r == d && t.ajax({
                url: "/api/" + n + "-trend",
                data: {
                    code: e,
                    ball: s,
                    t: i
                },
                method: "get",
                success: function(t) {
                    0 === t.code && app.trend_tbody(t.data, e, n, a)
                }
            }) : a.newest.issue && 0 == t('.filter-time select option[value="' + a.newest.issue + '"]').length && t(".filter-time select").prepend('<option value="' + a.newest.issue + '">' + a.newest.issue + "</option>")
        },
        trend_tbody: function(e, a, n, s) {
            var d = ""
              , r = ""
              , i = ""
              , l = "";
            t.each(e.sum, function(t, e) {
                d += "<td>" + e + "</td>"
            }),
            t.each(e.max, function(t, e) {
                r += "<td>" + e + "</td>"
            }),
            t("#tj-table tr.tr:first").html("<td>总次数</td>" + d),
            t("#tj-table tr.tr:last").html("<td>最大遗漏</td>" + r),
            t.each(e.trend, function(e, a) {
                var n = "";
                t.each(a, function(t, e) {
                    n += '<td class="' + (0 === e ? "td-active" : "") + '">' + e + "</td>"
                }),
                i += '<tr class="tr-' + e + '"><td>' + e + "</td>" + n + "</tr>",
                l = e
            }),
            0 == t(".tr-" + l).length && (t("#trend-table tbody").prepend(i),
            app.trend_td(n))
        },
        trend_td: function(e) {
            t("#trend-table td.td-active").each(function() {
                var a = t("#trend-table thead tr:last th").eq(t(this).index() - 1).html();
                "反向" == a || "重号" == a || "正向" == a ? t(this).html(a.split("")[0]).addClass("f-blue") : "单" == a || "双" == a || "前" == a || "后" == a ? t(this).html(a).addClass("f-orange") : "大" == a || "小" == a ? t(this).html(a).addClass("f-green") : "number" == e ? t(this).html("<span>" + a.split("")[2 == a.split("").length ? 0 : 1] + "</span>").addClass("number") : t(this).html("<span>" + a + "</span>").addClass("number")
            }),
            app.render_trend(),
            t("#trend-table td.td-active").removeClass("td-active")
        },
        render_trend: function() {
            t("#svg svg").remove(),
            require(["raphael"], function(e) {
                var a = ""
                  , n = e("svg", t(".svg").width(), t(".svg").height());
                t(".trend-table .number").each(function() {
                    a += t(this).find("span").position().left + 12 + "," + (t(this).find("span").position().top + 12) + " "
                }),
                n.path("M " + a).attr({
                    stroke: "#ffab0a"
                })
            })
        },
		//今日号码统计加载
        todaynumber_reload: function(e,a) {
			var a = (new Date).getTime();
            t.ajax({
                url: "/api/todaynumber?code=" + e + "&t=" + a,
                method: "get",
                success: function(a) {
                    0 === a.code && t("#todaynumber-table tbody").html(app.todaynumber_tbody(a.data, e))
                }
            })
        },
        todaynumber_tbody: function(e, a) {
            var n = "";
			var f = "";
            return t.each(e, function(e, s) {
                var d = "";
                t.each(s, function(e, n) {
                    var s = "";
                    t.each(n, function(t, e) {
						if(t=='yilou'){
							f = e>=20 ? "<font color=red>"+e+"</font>" : e ;
						}else{
							f = e ;
						}
                        s += '<td>' + f + "</td>"
                    }),
                    d += s
                }),
                n += '<tr class="tr"><td class="numberb"><span>' + e + "</span></td>" + d + "</tr>"
            }),
            n
			
        },
        tipsmark: function(e) {
            var a = '<div class="tipsmark"><p>' + e.text + "</p></div>"
              , n = 0
              , s = 0;
            t(e.obj).hover(function() {
                s = t(this).offset().top,
                n = t(this).offset().left,
                t("body").append(a).find(".tipsmark").css({
                    left: n + e.left,
                    top: s + e.top
                })
            }, function() {
                t("body").find(".tipsmark").remove()
            })
        },
        loadmark: function(e) {
            var a = {
                text: "",
                time: 1e3,
                img: !1,
                callback: ""
            };
            t.extend(a, e),
            t("body").find(".loadmark").remove();
            var n = "";
            a.img && (n = '<p class="load_gif"><img src="/static/images/loading.gif" width="100%" /></p>');
            var s = '<div class="loadmark"><div class="load_tip">' + n + t.trim(a.text) + "</div></div>";
            t("body").append(s);
            var d = t("body").find(".loadmark");
            if (d.find(".load_tip").css({
                "margin-left": -(d.find(".load_tip").outerWidth() / 2),
                "margin-top": -(d.find(".load_tip").outerHeight() / 2)
            }),
            a.time > 0)
                var r = null
                  , r = setTimeout(function() {
                    d.remove(),
                    "" != a.callback && a.callback(),
                    clearTimeout(r)
                }, a.time)
        },
        closemark: function() {
            t(".loadmark").remove()
        },

        get_date: function(t) {
            var e = new Date;
            if (!(!e instanceof Date)) {
                var a = {
                    yyyy: e.getFullYear(),
                    M: e.getMonth() + 1,
                    d: e.getDate(),
                    H: e.getHours(),
                    m: e.getMinutes(),
                    s: e.getSeconds(),
                    MM: ("" + (e.getMonth() + 101)).substr(1),
                    dd: ("" + (e.getDate() + 100)).substr(1),
                    HH: ("" + (e.getHours() + 100)).substr(1),
                    mm: ("" + (e.getMinutes() + 100)).substr(1),
                    ss: ("" + (e.getSeconds() + 100)).substr(1)
                };
                return t.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
                    return a[arguments[0]]
                })
            }
        },
        format_time: function(t, e) {
            var a = parseFloat(t)
              , n = 0
              , s = 0
              , d = 0
              , r = "<em>分</em>"
              , i = "</span>";
            return null != a && "" != a && (a < 60 ? (d = a,
            a = "<span>00</span>" + r + "<span>" + (d > 9 ? d : "0" + d) + i + "<em>秒</em>") : a >= 60 && a < 3600 ? (s = parseInt(a / 60),
            d = parseInt(a % 60),
            a = "<span>" + (s > 9 ? s : "0" + s) + i + r + "<span>" + (d > 9 ? d : "0" + d) + i + "<em>秒</em>") : a >= 3600 && (n = parseInt(a / 3600),
            s = parseInt(a % 3600 / 60),
            d = parseInt(a % 3600 % 60 % 60),
            a = "<span>" + (n > 9 ? n : "0" + n) + i + "<em>时</em><span>" + (s > 9 ? s : "0" + s) + i + r)),
            0 == a && e ? e : a
        },
        format_djs: function(time) {
	
			var h=Math.floor(time/3600);
			var i=Math.floor(time/60) % 60;
			var s=time%60;	
			time = '<b>'+h+'</b><ins>时</ins><b>'+i+'</b><ins>分</ins><b>'+s+'</b><ins>秒</ins>';
			return time;  
        },
        tc: function(t, e) {
            return 1 == app.unique_len(e) ? "通吃" : t > 10 ? '<span class="c-red">大</span>' : "小"
        },
        lh: function(t, e, a) {
            var n = parseInt(t)
              , s = parseInt(e);
            return n > s ? "l" == a ? '<span class="c-red">龍</span>' : "龍" : n == s ? "和" : "h" == a ? '<span class="c-red">虎</span>' : "虎"
        },
        ds: function(t, e) {
            return t % 2 == 0 ? "s" == e ? '<span class="c-red">双</span>' : "双" : "d" == e ? '<span class="c-red">单</span>' : "单"
        },
        dx: function(t, e, a) {
            var n = parseInt(t)
              , s = parseInt(e);
            return n > s ? "d" == a ? '<span class="c-red">大</span>' : "大" : n == s ? "和" : "x" == a ? '<span class="c-red">小</span>' : "小"
        },
        unique_len: function(e) {
            return t.unique(e).length
        },
        shun: function(t) {
            var e = t.sort(app.sort)
              , a = 0;
            if (1 == app.unique_len(t))
                return "豹子";
            if (2 == app.unique_len(t))
                return "对子";
            for (var n = 0, s = e.length - 1; n < s; n++)
                parseInt(e[n]) + 1 == e[n + 1] && a++;
            return a == e.length - 1 ? "顺子" : a > 0 ? "半顺" : "杂六"
        },
        date_format: function(t, e) {
            if (t) {
                switch (e || (e = "yyyy-MM-dd"),
                t.indexOf("-") > -1 && (t = t.replace(/-/g, "/")),
                typeof t) {
                case "string":
                    t = new Date(t.replace(/-/g, "/"));
                    break;
                case "number":
                    t = new Date(t)
                }
                if (!(!t instanceof Date)) {
                    var a = {
                        yyyy: t.getFullYear(),
                        M: t.getMonth() + 1,
                        d: t.getDate(),
                        H: t.getHours(),
                        m: t.getMinutes(),
                        s: t.getSeconds(),
                        MM: ("" + (t.getMonth() + 101)).substr(1),
                        dd: ("" + (t.getDate() + 100)).substr(1),
                        HH: ("" + (t.getHours() + 100)).substr(1),
                        mm: ("" + (t.getMinutes() + 100)).substr(1),
                        ss: ("" + (t.getSeconds() + 100)).substr(1)
                    };
                    return e.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
                        return a[arguments[0]]
                    })
                }
            }
        },
        time: function(t) {
            var e = parseFloat(t)
              , a = 0
              , n = 0
              , s = 0;
            return null != e && (e < 60 ? (s = e,
            e = "00:" + (s > 9 ? s : "0" + s)) : e >= 60 && e < 3600 ? (n = parseInt(e / 60),
            s = parseInt(e % 60),
            e = (n > 9 ? n : "0" + n) + ":" + (s > 9 ? s : "0" + s)) : e >= 3600 && (a = parseInt(e / 3600),
            n = parseInt(e % 3600 / 60),
            s = parseInt(e % 3600 % 60 % 60),
            e = (a > 9 ? a : "0" + a) + ":" + (n > 9 ? n : "0" + n) + ":" + (s > 9 ? s : "0" + s))),
            e
        }
    }
});
