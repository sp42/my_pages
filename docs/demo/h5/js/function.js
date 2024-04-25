/**
 * @author lb
 */
//去掉左右空格
$.extend({
    isEmpty:function(str){
        if(str===undefined || str==null){
            return true;
        }
        str= $.trim(str);
        if(str==""){
            return true;
        }
        return false;
    },
    isEmail:function(email){
        if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
            return true;
        }else{
            return false;
        }
    },
    //获得url参数
    GET:function(param){
        var url=document.URL;
        var paramList=url.split("?")[1];
        if(paramList){
            var arr=paramList.split("&");
            for(var i=0;i<arr.length;i++){
                var arr2=arr[i].split("=");
                if(arr2[0]==param){
                    return arr2[1];
                }
            }
        }
        return false;
    }
});
$.fn.pageLoad = function(options){
    var defaults = {
        speed:1000
    }
    var options = $.extend(defaults, options);
    this.each(function(){
        var _this=$(this);  //父元素
        var windowWidth,windowHeight;   //窗口尺寸
        var sideLeft,sideTop;   //边距
        var index=0;    //当前页面下标
        var pIndex=1;   //当前页面识别标签 data-page
        var oIndex=pIndex;  //前一场景页面识别标签
        var isLock=false;    //页面锁定
        var _window=$(window);
        var _page=_this.find(".page");  //页面组
        var _len=_page.size();           //页面个数
        var _pageNext=$("#pageNext");   //向下按钮
        var _pageSum=$("#pageSum");     //右侧指示器
        for(var i=0;i<_len;i++){
            if(i==0){
                _pageSum.append("<em class='on'></em>")
            }else{
                _pageSum.append("<em></em>")
            }
        }
        reSize();
        _window.resize(reSize);
        //绑定鼠标滚动事件
        _window.bind('mousewheel', function(event, delta){
            if(isLock){
                return;
            }
            if(delta>0){
                //向上
                pagePrev();
            }else{
                //向下
                pageNext();
            }
        });
        //绑定键盘上下事件
        $(document).on("keyup",function(event){
            var e=event || window.event;
            switch (e.keyCode){
                case 37:
                    break;
                case 38:    //上
                    if(isLock){
                        return;
                    }
                    pagePrev();
                    e.preventDefault();
                    break;
                case 39:
                    break;
                case 40:    //下
                    if(isLock){
                        return;
                    }
                    pageNext();
                    e.preventDefault()
                    break;
                case 32:    //空格
                    if(isLock){
                        return;
                    }
                    pageNext();
                    e.preventDefault()
                    break;
            }
        });
        //右侧指示器点击事件
        _pageSum.find("em").bind("click",function(){
            if(isLock){
                return;
            }
            var _index=$(this).index();
            if(_index==index){
                return;
            }
            index=_index;
            pageGo();
        });
        _pageNext.bind("click",function(){
            pageNext();
        });

        //上一页
        function pagePrev(){
            if(isLock || index<=0){
                return;
            }
            index--;
            index=index<0?0:index;
            pageGo();
        }
        //下一页
        function pageNext(){
            if(isLock || index>=_len-1){
                return;
            }
            index++;
            index=index>=_len?_len-1:index;
            pageGo();
        }
        pageAnimate(pIndex);
        //场景切换
        function pageGo(){
            isLock=true;
            //页面跳转位置
            var _top=-index*windowHeight;
            //获得当前场景识别号
            pIndex=parseInt(_page.eq(index).attr("data-page"));
            _pageSum.find("em").removeClass("on").eq(index).addClass("on");
            //最后场景隐藏向下按钮
            if(index>=_len-1){
                _pageNext.fadeOut(300);
            }else{
                _pageNext.fadeIn(300);
            }
            //上一场景离开执行动画
            leaveAnimate();
            //当前场景进入前执行动画
            beforeSendAnimate();
            _this.finish().animate(
                {"top":_top},
                {
                    duration:options.speed,
                    easing: "easeOutSine",
                    complete:function(){
                        //当前场景进入后执行动画
                        pageAnimate();
                        oIndex=pIndex;
                        setTimeout(function(){
                            isLock=false;
                        },500);
                    }
                }
            );
        }
        /****          pageAnimate start            ****/
        //切换场景后页面动画
        function pageAnimate(){
            var _p=_this.find("[data-page='"+pIndex+"']");  //当前场景
            switch (pIndex){
                case 1:
                    _p.find(".l1").finish().animate({"left":-300},1700);
                    _p.find(".l2").finish().animate({"top":1000},3500);

                    _p.find(".title").finish().delay(600).animate({"opacity":1,"height":70,top:250},1200);
                    _p.find(".text1").finish().delay(1000).animate({"opacity":1,top:350},800);
                    break;
                case 1001:
                    _p.find(".but1").addClass("on").css({"-webkit-transform":"scale(1.3)","transform":"scale(1.3)"});
                    _p.find(".but3,.but2").css({"-webkit-transform":"scale(0.6)","transform":"scale(0.6)"});
                    break;
                case 1002:
                    _p.find(".t1").finish().delay(600).animate({opacity:1,top:30,left:60},600);
                    _p.find(".img1").finish().delay(1200).animate({width:173},300);
                    _p.find(".l1,.l2,.l3,.l4,.l5,.l6").finish().delay(1500).animate({width:252},1000);
                    _p.find(".l7,.l8").finish().delay(2500).animate({height:166},1000,function(){
                        _p.find(".img2").addClass("on");
                    });
                    _p.find(".t2").finish().delay(3700).animate({opacity:1,top:30,left:330},600);
                    _p.find(".imgBj1").finish().delay(3500).animate({left: 244,top: 166,width: 265,height: 265},1000);
                    _p.find(".imgBj2").finish().delay(3700).animate({left: 227,top: 130,width: 332,height: 332},1000);
                    _p.find(".line2").finish().delay(5000).animate({width:67},1000);
                    _p.find(".t3").finish().delay(5500).animate({opacity:1,top:30,left:550},600);
                    _p.find(".img3").finish().delay(5500).animate({opacity:1,left:550,top:130},600);
                    _p.find(".line3").finish().delay(6000).animate({width:77},1000);
                    _p.find(".t4").finish().delay(7000).animate({opacity:1,top:30,left:780},600);
                    _p.find(".img4").finish().delay(7600).animate({opacity:1,left:768},600);
                    //_p.find(".text5").delay(8200).animate({"opacity":1},2000);
                    _p.find(".text5 em").delay(8200).animate({"width":0},2000);
                    break;
                case 2:
                    _p.find(".but2").addClass("on").css({"-webkit-transform":"scale(1.3)","transform":"scale(1.3)"});
                    _p.find(".but3,.but1").css({"-webkit-transform":"scale(0.6)","transform":"scale(0.6)"});
                    break;
                case 2001:
                    _p.find(".map").animate({"width":1000},1000,function(){
                        _p.addClass("on");
                    });
                    _p.find(".location1").delay(2500).animate({"top":372,"left":190,"width":60,"height":86},600);
                    _p.find(".line1").delay(3600).animate({"width":109},600);
                    _p.find(".photo").delay(4200).animate({"width":524},600);
                    _p.find(".lt1").delay(5600).animate({"opacity":1},1000);
                    _p.find(".location2").delay(6600).animate({"top":383,"left":597,"width":60,"height":86},600);
                    _p.find(".line2").delay(7200).animate({"width":43},600);
                    _p.find(".lt2").delay(7500).animate({"opacity":1},1000);
                    break;
                case 3001:
                    _p.find(".text1").animate({"width":500},4000);
                    _p.find(".img1").delay(0).animate({"opacity":1},2000);
                    _p.find(".img2").delay(500).animate({"opacity":1},2000);
                    _p.find(".img3").delay(1000).animate({"opacity":1},2000);
                    _p.find(".img4").delay(1500).animate({"opacity":1},2000);
                    break;
                case 3:
                    break;
                case 4:
                    _p.find(".text2").animate({opacity:1},1000);
                    _p.find(".text1").delay(1500).animate({opacity:1},1000);
                    $("#applyForm").finish().show().delay(2500).css({"top":(windowHeight-461)/2}).animate({"left":110},400);
                    break;
                case 5:
                    $("#userInfo").show();
                    $("#userInfo img").finish().delay(2000).animate({"left":100},300);
                    break;
                case 6:
                    _p.find(".tabs1").delay(600).animate({"opacity":0.8},100).animate({"opacity":1},100).animate({"opacity":0.8},100).animate({"opacity":1},100).animate({"opacity":0.8},100).animate({"opacity":1},100).animate({"opacity":0.8},100).animate({"opacity":1},100).animate({"opacity":0.8},100).animate({"opacity":1},100).animate({"opacity":0.8},100).animate({"opacity":1},100);
                    _p.find(".l1").delay(1500).animate({"height":50,"top":100},500);
                    _p.find(".l2").delay(2000).animate({"width":710},1500);
                    _p.find(".l3").delay(3500).animate({"height":30},500);
                    _p.find(".l4").delay(1500).animate({"height":135},500);
                    _p.find(".l5").delay(2000).animate({"width":412},1000);
                    _p.find(".l6").delay(3000).animate({"height":72,"top":460},500);
                    _p.find(".l7").delay(3500).animate({"width":150},300);
                    _p.find(".l8").delay(3800).animate({"height":30},200);
                    _p.find(".l9").delay(3000).animate({"width":160},1000);
                    _p.find(".l10").delay(3000).animate({"width":70},1000);
                    _p.find(".tabs2").delay(2500).animate({"opacity":1},600,function(){
                        _p.find(".tabs2").addClass("on");
                    });
                    break;
                case 6000:
                    var _delayTime=0;
                    if(oIndex==6001){
                        _delayTime=800;
                    }
                    _p.find(".title,.info,.userContent,.userTab").finish().delay(_delayTime).animate({"opacity":1},1000);

                    break;
                case 6002:
                    _p.find(".img1").finish().delay(300).animate({"height":330},600).delay(500).animate({"height":580},600);
                    _p.find(".img2").finish().delay(2500).animate({"width":91},600);
                    _p.find(".img3").finish().delay(3500).animate({"opacity":1,"top":60},2000);
                    $("#nameList"). finish().show().delay(3500).animate({"opacity":1,"top":sideTop+410},2000);
                    break;
                case 7:
                    var _tree=_p.find(".tree");
                    _tree.animate({"height":600},300);
                    _tree.find(".d1").finish().delay(300).animate({"top":80},700);
                    _tree.find(".tit1").finish().delay(300).animate({"top":80},700);
                    _tree.find(".img1").finish().delay(300).animate({"top":110},700);
                    _tree.find(".d2").finish().delay(1000).animate({"top":130},1000);
                    _tree.find(".tit2").finish().delay(1000).animate({"top":130},1000);
                    _tree.find(".img2").finish().delay(1000).animate({"top":160},1000);
                    _tree.find(".d3").finish().delay(2000).animate({"top":230},1000);
                    _tree.find(".tit3").finish().delay(2000).animate({"top":230},1000);
                    _tree.find(".img3").finish().delay(2000).animate({"top":260},1000);
                    _tree.find(".d4").finish().delay(3000).animate({"top":460},1000);
                    _tree.find(".tit4").finish().delay(3000).animate({"top":460},1000);
                    $("#msg").show().delay(3000).animate({"top":sideTop+490},options.speed);

                    break;
                case 8:
                    var _hand=_p.find(".hand");
                    var _phone=_p.find(".phone");
                    var _cont=_p.find(".cont");
                    //背景1
                    _p.find(".bj1").delay(4500).animate({"left":0},300)
                        .delay(4000).animate({"left":windowWidth},300);

                    _p.find(".tit1").delay(4500).animate({"left":0},300)
                        .delay(4000).animate({"left":windowWidth},300);

                    //背景2
                    _p.find(".bj2").delay(9000).animate({"left":0},300).delay(3000).animate({"left":windowWidth},300);
                    _p.find(".tit2").delay(9000).animate({"left":188},300).delay(3000).animate({"left":-windowWidth},300);

                    //背景3
                    _p.find(".bj3").delay(12300).animate({"left":0},300)
                        .delay(3000).animate({"left":windowWidth},300);
                    _p.find(".tit3").delay(12800).animate({"left":0},300)
                        .delay(3000).animate({"left":-windowWidth},300);

                    //背景4
                    _p.find(".bj4").delay(16200).animate({"left":0},300);
                    _p.find(".tit4").delay(16200).animate({"left":188},300);

                    //手机
                    _phone.delay(8000).animate({"left":700},600)
                        .delay(3000).animate({"left":0},600)
                        .delay(3500).animate({"left":700},600);

                    _cont.delay(8000).animate({"left":700+25},600)
                        .delay(3000).animate({"left":0+25},600)
                        .delay(3500).animate({"left":700+25},600);
                    _p.find(".qd").delay(3500).animate({"width":280,"height":485,"left":0,"top":0},1000);
                    _p.find(".bjPhone").delay(4500).animate({"opacity":0},1000);
                    //手
                    _hand.delay(500).animate({"top":300,"left":800},800)
                        .delay(500).animate({"top":100,"left":10},1000)
                        .delay(500).animate({"top":300,"left":300},600)
                        .delay(1500).animate({"top":500,"left":0},1000)
                        .delay(3000).animate({"top":520,"left":730},1000)
                        .delay(3000).animate({"top":520,"left":90},1000)
                        .delay(3000).animate({"top":500,"left":760},1000);
                    _hand.find("em").delay(3000).animate({"opacity":1},100).animate({"opacity":0},100)
                        .delay(3500).animate({"opacity":1},100).animate({"opacity":0},100)
                        .delay(3700).animate({"opacity":1},100).animate({"opacity":0},100)
                        .delay(3800).animate({"opacity":1},100).animate({"opacity":0},100)
                        .delay(3800).animate({"opacity":1},100).animate({"opacity":0},100);

                    _cont.find("ul").delay(7000).animate({"left":-280},500)
                        .delay(3500).animate({"left":-560},500)
                        .delay(3600).animate({"left":-840},500)
                        .delay(3600).animate({"left":0},500);


                    break;
                case 9:
                    _p.find(".data1 img").attr("src","images/p9/data1.gif");
                    _p.find(".data2 img").attr("src","images/p9/data2.gif");
                    break;
                case 10:
                    _p.find(".but3").addClass("on").css({"-webkit-transform":"scale(1.3)","transform":"scale(1.3)"});
                    _p.find(".but1,.but2").css({"-webkit-transform":"scale(0.6)","transform":"scale(0.6)"});

                    break;
                case 11:

                    break;
                case 1205:
                    _p.find(".bj").animate({"width":windowWidth,height:windowHeight,left:0,top:0},1000);
                    break;
            }
        }
        /****          pageAnimate end            ****/
        /****          leaveAnimate start            ****/
        //场景离开执行动画
        function leaveAnimate(){
            //旧场景元素
            var _p=_this.find("[data-page='"+oIndex+"']");
            switch (oIndex){
                case 1:
                    _p.find(".l1").finish().animate({"left":2000},300);
                    _p.find(".l2").finish().animate({"top":-500},300);
                    _p.find(".title").finish().animate({"opacity":0,"height":0,top:320},300);
                    _p.find(".text1").finish().animate({"opacity":0,top:300},300);

                    break;
                case 1001:
                    menuEnd();
                    break;
                case 1002:
                    _p.find(".t1").finish().animate({opacity:0,left:40},300);
                    _p.find(".img1").finish().animate({width:0},300);
                    _p.find(".l1,.l2,.l3,.l4,.l5,.l6").finish().animate({width:0},300);
                    _p.find(".l7,.l8").finish().animate({height:0},300,function(){
                        _p.find(".img2").removeClass("on");
                    });
                    _p.find(".t2").finish().animate({opacity:0,left:310},300);
                    _p.find(".imgBj1").finish().animate({left: 376,top: 298,width: 0,height: 0},300);
                    _p.find(".imgBj2").finish().animate({left: 393,top: 296,width: 0,height: 0},300);
                    _p.find(".line2").finish().animate({width:0},300);
                    _p.find(".t3").finish().animate({opacity:0,left:530},300);
                    _p.find(".img3").finish().animate({opacity:0,top:166},300);
                    _p.find(".line3").finish().animate({width:0},300);
                    _p.find(".t4").finish().animate({opacity:0,left:760},300);
                    _p.find(".img4").finish().animate({opacity:0,left:788},300);
                    _p.find(".text5 em").finish().animate({"width":windowWidth},300);
                    break;
                case 2:
                    menuEnd();
                    break;
                case 2001:
                    _p.removeClass("on");
                    _p.find(".location1").finish().animate({"top":453,"left":220,"width":0,"height":0},300);
                    _p.find(".line1").finish().animate({"width":0},300);
                    _p.find(".photo").finish().animate({"width":0},300);
                    _p.find(".lt1").finish().animate({"opacity":0},300);
                    _p.find(".location2").animate({"top":627,"left":469,"width":0,"height":0},300);
                    _p.find(".line2").animate({"width":0},300);
                    _p.find(".lt2").animate({"opacity":0},300);
                    break;
                case 3:
                    break;
                case 3001:
                    _p.find(".text1").finish().animate({"width":0},300);
                    _p.find(".img1").finish().animate({"opacity":0},300);
                    _p.find(".img2").finish().animate({"opacity":0},300);
                    _p.find(".img3").finish().animate({"opacity":0},300);
                    _p.find(".img4").finish().animate({"opacity":0},300);
                    break;
                case 4:
                    _p.find(".text2").finish().animate({opacity:0},300);
                    _p.find(".text1").finish().animate({opacity:0},300);
                    if(pIndex==5){

                    }else{
                        $("#applyForm").finish().animate({height:486,width: 350,"left":-800,"top":(windowHeight-461)/2},300).hide();
                    }
                    break;
                case 5:
                    $("#applyForm").finish().animate({height:486,width: 350,left: -800,top:(windowHeight-486)/2},300).hide();
                    if(pIndex==6){
                        $("#userInfo img").finish().animate({"left":0},300);
                        $("#userInfo").finish().animate({"left":sideLeft+150,"top":sideTop+12},300).delay(options.speed-500).animate({"top":sideTop+2+119,"height":0});
                    }else{
                        $("#userInfo").finish().hide().css({"left":sideLeft+325,"top":sideTop+230,"height":119});
                        $("#userInfo img").finish().animate({"left":125},300);
                    }
                    break;
                case 6:
                    $("#userInfo").hide().css({"left":sideLeft+325,"top":sideTop+230,"height":119});
                    $("#userInfo img").finish().animate({"left":125},300);
                    _p.find(".tabs1").finish();
                    _p.find(".l1").finish().animate({"height":0,"top":150},300);
                    _p.find(".l2").finish().animate({"width":0},300);
                    _p.find(".l3").finish().animate({"height":0},300);
                    _p.find(".l4").finish().animate({"height":0},300);
                    _p.find(".l5").finish().animate({"width":0},300);
                    _p.find(".l6").finish().animate({"height":0,"top":532},300);
                    _p.find(".l7").finish().animate({"width":0},300);
                    _p.find(".l8").finish().animate({"height":0},300);
                    _p.find(".l9").finish().animate({"width":0},300);
                    _p.find(".l10").finish().animate({"width":0},300);
                    _p.find(".tabs2").animate({"opacity":0},300,function(){
                        _p.find(".tabs2").removeClass("on");
                    });
                    if(pIndex==6001){
                        $("#person").find("span").eq(0).animate({"left":windowWidth-330-sideLeft-190,"top":-90,"width":40,"height":77},options.speed);
                        $("#person").find("span").eq(1).animate({"left":windowWidth-330-sideLeft-190,"top":100,"width":40,"height":77},options.speed);
                    }else{
                        $("#personj span").animate({"left":0,"top":0,"width":124,"height":238},300);
                        $("#person").animate({"left":sideLeft+190,"top":sideTop+230+windowHeight,"opacity":1},300,function(){
                            $("#person").hide();
                        });
                    }
                    break;
                case 6001:
                    if(pIndex==6){
                        $("#person span").finish().animate({"left":0,"top":0,"width":124,"height":238},300);
                    }else if(pIndex==6000){
                        $("#person").finish().animate({"left":sideLeft+100,"top":sideTop-77,"opacity":1},300);
                        $("#person span").finish().animate({"left":0,"top":0},300).delay(1000).animate({"top":77,"height":0},500);
                    }else{
                        $("#person").finish().hide().animate({"left":sideLeft+190,"top":sideTop+240+windowHeight,"opacity":1},300);
                        $("#person span").finish().animate({"left":0,"top":0,"width":124,"height":238},300);
                    }

                    break;
                case 6000:
                    if(pIndex!==6001){
                        $("#person").finish().hide().animate({"left":sideLeft+190,"top":sideTop+240+windowHeight},300);
                        $("#person span").finish().animate({"left":0,"top":0,"width":124,"height":238},300);
                    }
                    _p.find(".title,.info,.userContent,.userTab").finish().animate({"opacity":0},300);
                    _p.find(".userContent ul").finish().animate({"left":0},300);
                    _p.find(".curr").finish().animate({"left":92},300);


                    break;
                case 6002:
                    _p.find(".img1").finish().animate({"height":60},300);
                    _p.find(".img2").finish().animate({"width":0},300);
                    _p.find(".img3").finish().animate({"opacity":0,"top":120},300);
                    if(pIndex==7){
                        $("#nameList"). finish().animate({"top":sideTop+100,"left":sideLeft+300,"width":100,"height":55},2000,function(){
                            $("#nameList").hide().animate({"opacity":0,"left":sideLeft+730,"top":sideTop+470,"width":298,"height":165},300);
                        });
                    }else{
                        $("#nameList"). finish().hide().animate({"opacity":0,"top":sideTop+470,"width":298,"height":165},300);
                    }
                    break;
                case 7:
                    _p.find(".tree").finish().delay(800).animate({"height":0},10);
                    _p.find(".tree .dot,.title").finish().delay(500).animate({"top":windowHeight},10);
                    _p.find(".img1,.img2,.img3").finish().delay(500).animate({"top":windowHeight+30},10);
                    if(pIndex==8){
                        $("#msg").finish().animate({"left":sideLeft+120,"top":sideTop+200},options.speed,function(){
                            $("#msg").hide().finish().animate({"left":sideLeft+534,"top":windowHeight+sideTop+30},300);
                        });
                    }else{
                        $("#msg").hide().finish().animate({"left":sideLeft+534,"top":windowHeight+sideTop+30},300);
                    }
                    break;
                case 8:
                    var _hand=_p.find(".hand");
                    var _phone=_p.find(".phone");
                    var _cont=_p.find(".cont");
                    //背景1
                    _p.find(".bj1,.bj3").finish().animate({"left":windowWidth},300);
                    _p.find(".tit1,.tit3").finish().animate({"left":-windowWidth},300);
                    //背景2
                    _p.find(".bj2,.bj4").finish().animate({"left":-windowWidth},300);
                    _p.find(".tit2,.tit4").finish().animate({"left":windowWidth},300);
                    //手机
                    _phone.finish().animate({"left":0},300);
                    _cont.finish().animate({"left":25},300);
                    //手
                    _hand.finish().animate({"top":windowHeight,"left":800},300);
                    _hand.find("em").finish().animate({"opacity":0},100);
                    _cont.find("ul").finish().animate({"left":0},300);
                    _p.find(".qd").finish().animate({"width":0,"height":0,"left":140,"top":243},300);
                    _p.find(".bjPhone").finish().animate({"opacity":1},300);
                    break;
                case 9:
                    _p.find(".data1 img").attr("src","images/1.png");
                    _p.find(".data2 img").attr("src","images/1.png");
                    break;
                case 10:
                    menuEnd();
                    break;
                case 11:
                    break;
                case 1205:
                    _p.find(".bj").finish().animate({"width":0,height:0,left:windowWidth/2,top:windowHeight/2},300);
                    break;

            }
        }
        /****          leaveAnimate end            ****/
        /****          beforeSendAnimate start            ****/
        //场景进入前执行动画
        function beforeSendAnimate(){
            var _p=_this.find("[data-page='"+pIndex+"']");
            switch (pIndex){
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:

                    break;
                case 5:
                    if(oIndex==4){
                        $("#applyForm").finish().show().animate({"top":sideTop+200,"left":sideLeft+500,"width":1,"height":1},2000,function(){
                            $("#applyForm").hide();
                        });
                    }else{
                        $("#applyForm").finish().show().css({"top":-400-windowHeight,"left":(windowWidth-350)/2}).animate({"top":sideTop+200,"left":sideLeft+500,"width":1,"height":1},2000,function(){
                            $("#applyForm").hide();
                        });
                    }
                    break;
                case 6:
                    $("#person").show().animate({"top":sideTop+230,"left":sideLeft+190},options.speed);
                    break;
                case 6001:
                    if(oIndex!=6){
                        $("#person").show().animate({"top":sideTop+230,"left":sideLeft+190},options.speed);
                        $("#person").find("span").eq(0).finish().animate({"left":windowWidth-330-sideLeft-190,"top":-90,"width":40,"height":77},options.speed);
                        $("#person").find("span").eq(1).finish().animate({"left":windowWidth-330-sideLeft-190,"top":100,"width":40,"height":77},options.speed);
                    }
                    break;
                case 6002:
                    break;
                case 7:
                        $("#msg").hide().finish().animate({"left":sideLeft+534,"top":windowHeight+sideTop+30},300);
                    break;
                case 8:

                    break;
            }
        }
        /****          beforeSendAnimate end            ****/

        /****          树事件 start            ****/
        var _tree=_this.find("[data-page='7']").find(".tree");
        var _treeImg1=_tree.find(".img1");
        var _treeImg2=_tree.find(".img2");
        var _treeImg3=_tree.find(".img3");
        _treeImg1.bind("click",function(){
            if(_treeImg2.hasClass("on") || _treeImg3.hasClass("on")){
                return;
            }
            if(_treeImg1.hasClass("on")){
                isLock=false;
                _treeImg1.removeClass("on");
                _tree.finish().animate({"left":404},400);
                $("#msg").finish().animate({"left":sideLeft+534},400);
                _treeImg1.finish().animate({"width":188,"left":-130,"top":110},400);
            }else{
                isLock=true;
                _treeImg1.addClass("on");
                _tree.finish().animate({"left":700},400);
                $("#msg").finish().animate({"left":sideLeft+808+130},400);
                _treeImg1.finish().animate({"width":500,"left":-750,"top":107},400);
            }


        });
        _treeImg2.bind("click",function(){
            if(_treeImg1.hasClass("on") || _treeImg3.hasClass("on")){
                return;
            }
            if(_treeImg2.hasClass("on")){
                isLock=false;
                _treeImg2.removeClass("on");
                _tree.finish().animate({"left":404},400);
                $("#msg").finish().animate({"left":sideLeft+534},400);
                _treeImg2.finish().animate({"width":255,"left":130,"top":160},400);
            }else{
                isLock=true;
                _treeImg2.addClass("on");
                _tree.finish().animate({"left":100},400);
                $("#msg").finish().animate({"left":sideLeft+230},400);
                _treeImg2.finish().animate({"width":500,"left":400,"top":10},400);
            }


        });
        _treeImg3.bind("click",function(){
            if(_treeImg1.hasClass("on") || _treeImg2.hasClass("on")){
                return;
            }
            if(_treeImg3.hasClass("on")){
                isLock=false;
                _treeImg3.removeClass("on");
                _tree.finish().animate({"left":404},400);
                $("#msg").finish().animate({"left":sideLeft+534},400);
                _treeImg3.finish().animate({"width":188,"left":-130,"top":260},400);
            }else{
                isLock=true;
                _treeImg3.addClass("on");
                _tree.finish().animate({"left":700},400);
                $("#msg").finish().animate({"left":sideLeft+808+130},400);
                _treeImg3.finish().animate({"width":320,"left":-600,"top":10},400);
            }


        });
        /****          树事件 end            ****/

        /****  个人画像事件 start  ****/
        _this.find("[data-page='6000']").find(".userTab a").on("click",function(){
            var _a=$(this);
            var _aIndex=_a.parents("li").index();
            var _ul=_this.find("[data-page='6000']").find(".userContent ul");
            var _curr=_this.find("[data-page='6000']").find(".curr");
            _ul.finish().animate({"left":-_aIndex*754},400);
            _curr.css({"left":_aIndex*(140+38)-16+38+70});
        });
        _this.find("[data-page='12']").find(".p12Pop").on("click",function(){
            isLock=false;
            var _pop=$(this);
            _pop.finish().fadeOut(600);
        })
        /****  个人画像事件  end ****/

        /****  系统架构图 start  ****/
        _this.find("[data-page='12']").find("a.but").on("click",function(){
            isLock=true;
            var _but=$(this);
            var _img=_but.attr("data-img");
            var _d=_but.attr("data-d");
            var p12Pop=_this.find("[data-page='12']").find(".p12Pop");
            p12Pop.finish().css({"backgroundImage":"url("+_img+")"}).fadeIn(600);
        });
        _this.find("[data-page='12']").find(".p12Pop").on("click",function(){
            isLock=false;
            var _pop=$(this);
            _pop.finish().fadeOut(600);
        })
        /****  系统架构图  end ****/
        function menuEnd(){
            $(".menu").find("span").removeClass("on").css({"-webkit-transform":"scale(1)","transform":"scale(1)"});
        }

        //设置尺寸
        function reSize(){
            windowWidth=_window.width();
            windowHeight=_window.height();
            sideLeft=(windowWidth-1000)/2;
            sideTop=(windowHeight-600)/2;
            _page.css({"width":windowWidth,"height":windowHeight});
            _this.css({"top":-index*windowHeight});
            _pageSum.css({"top":(windowHeight-_pageSum.height())/2});
            _pageSum.fadeIn(2000);
            var _p7=_this.find("[data-page='7']");
            _p7.find(".tree .dot,.title").css({"top":windowHeight});
            _p7.find(".img1,.img2,.img3").css({"top":windowHeight+30});
            var _p8=_this.find("[data-page='8']");
            _p8.find(".bj1,.bj3").css({"width":windowWidth,"height":windowHeight,"left":-windowWidth});
            _p8.find(".tit1,.tit3").css({"left":windowWidth});
            _p8.find(".bj2,.bj4").css({"width":windowWidth,"height":windowHeight,"left":windowWidth});
            _p8.find(".tit2,.tit4").css({"left":-windowWidth});
            _p8.find(".hand").css({"top":windowHeight});

            $("#userInfo").css({"left":sideLeft+325,"top":sideTop+230,"height":119});
            $("#msg").css({"left":sideLeft+534,"top":windowHeight+sideTop+30});
            $("#nameList").css({"left":sideLeft+730,"top":sideTop+470});
            $("#person").css({"left":sideLeft+190,"top":sideTop+230+windowHeight});
        }

    });
};
//返回随机数
function getRandom(min,max){
    var _min=max?min:0;
    var _max=max?max:min;
    return parseInt(Math.random()*(_max-_min+1)+_min);
}
