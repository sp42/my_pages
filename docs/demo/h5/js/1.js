aj = {};
aj.COMMON = {};
aj.COMMON.SHOW = {opacity:1}; 

aj.instance = null;

function p1(){	
	var i = 1;
	if(!aj['p' + i]) {
		var h3 = document.querySelector('.p1-1 .text');
		var mySplitText = new SplitText(h3, {type:"chars"}); 
		TweenMax.set(h3, {perspective:400});

		aj.instance = aj['p' + i] = new TimelineMax({delay:1})
			.to('.p1-1 .building', 1.2, {transform: 'scaleY(1)', ease : Bounce.easeOut}).add('start')
			.add(new TimelineMax({repeat: -1})
				.to('.p1-1 .plane', 2.8, {x: 600, opacity:1})
				.to('.p1-1 .plane', .5,  {x: '+=300', opacity:0}))
			.to('.p1-1 .tree', .8, {autoAlpha: 1, transform:'scaleX(1)',ease : Bounce.easeOut})
			.to('.p1-1 .train', 3.8, {x: 2600, repeat: -1}, 'start')
			.to('.p1-1 .car', 4.8, {x: 2490, repeat: -1, ease : Power1.easeIn}, 'start')
			.to('.p1-1 .r-1', .8,  { y:-170, ease: Power1.easeIn, opacity:1}, 'start')
			.to('.p1-1 .r-2', 1.2, { y:-130, ease: Power1.easeIn,opacity:1}, 'start')
			.to('.p1-1 .bank', .5, {opacity:1})
			.set(h3, {opacity:1})
			.staggerFrom(mySplitText.chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50", ease:Back.easeOut}, 0.01)
			.to('.r-1', 1.5, { y:-195, ease: Power1.easeOut,yoyo:true,repeat:-1})
			.to('.r-2', .9,  { y:-120,ease: Power1.easeOut, yoyo:true,repeat:-1})
			.add(new TimelineMax({repeat: -1}).to('.p1-1 .light-1', 1, { opacity: .5}).to('.light-1', .6, {opacity: 1}))
			.add(new TimelineMax({repeat: -1}).to('.p1-1 .light-2', .5, { opacity: .3}).to('.light-2', .5, { opacity: 1}).to('.p1-1 .light-2', .6, {opacity: .5}))
			.add(new TimelineMax({repeat: -1}).to('.p1-1 .light-3', 1.5, { opacity: .2}).to('.light-3', .9, { opacity: 1}).to('.p1-1 .light-3', .5, {opacity: .2}))
			.add(new TimelineMax({repeat: -1}).to('.p1-1 .light-4', .5, { opacity: .3}).to('.light-4', .5, { opacity: 1}).to('.p1-1 .light-4', .6, {opacity: .5}))
	}
	
	aj['p' + i].resume();
}

function p2(){
	if(!aj.p2){
		var h3 = document.querySelector('.p2 .text');
		var mySplitText = new SplitText(h3, {type:"chars"}); 
		TweenMax.set(h3, {perspective:400});

		var 字体特效 = { opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50", ease:Back.easeOut},
			内阴影呼吸 = {'boxShadow' : '0 0px 15px 12px #2778dc inset, 0 0 15px 5px #4f6391', ease: Power1.easeOut, repeat:-1, yoyo:true };

		aj.instance = aj.p2 = new TimelineMax()
			.to('.p2 h3', 1.6, aj.COMMON.SHOW)  
			.fromTo('.p2 .t-1', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: 0  }, '-=.5')
			.fromTo('.p2 .t-2', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: .5 }, '-=1')
			.staggerFrom(mySplitText.chars, 0.8, 字体特效, 0.01, '-=1') 
			.to('.p2 .bg', .5, aj.COMMON.SHOW) 
			.to('.p2 .p3', .5, aj.COMMON.SHOW) 
			.to('.p2 .cy-holder', .5,  aj.COMMON.SHOW).add('show')
			.to('.p2 .path', .5, aj.COMMON.SHOW) 
			.staggerTo(['.p2 .gs', '.p2 .xqf'], .5, {scaleY: 1, ease : Bounce.easeOut})
			.to('.p2 .qipao', .8, {opacity: 1, bottom: 50, ease: Power1.easeOut})
			.to('.p2 .qipao', .9, {bottom: 40, yoyo: true, repeat: -1}) 
			.to('.p2 .cy-holder', 5, {
				bezier:[{top:160, left:800}, {top: 195, left: 673}, {top:209, left:500}, 
				{top:307, left:480}, {top:270, left:360}, {top: 340, left:315}, {top: 410, left:300}, {top: 405, left:185}], 
				ease:Power1.easeInOut})
			.to('.p2 .bg', 1, 内阴影呼吸, 'show')
			.staggerTo(['.p2 .gs', '.p2 .xqf'], .6, {top: '+=10', yoyo: true, repeat: -1})
	}

	aj.p2.resume();
}

function p3(){
	if(!aj.p3){
		var h3 = document.querySelector('.p3 .text');
		var mySplitText = new SplitText(h3, {type:"chars"}); 
		TweenMax.set(h3, {perspective:400});

		var 字体特效 = {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50", ease:Back.easeOut},
			内阴影呼吸 = {'boxShadow' : '0 0px 15px 12px #2778dc inset, 0 0 15px 5px #4f6391', ease: Power1.easeOut, repeat:-1, yoyo:true };

		aj.instance = aj.p3 = new TimelineMax()
			.to('.p3 h3', .8, {autoAlpha: 1})
			.fromTo('.p3 .t-1', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: 0  }, '-=.5')
			.fromTo('.p3 .t-2', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: .5 }, '-=1')
			.staggerFrom(mySplitText.chars, 0.8, 字体特效, 0.01, '-=1').add('showTree')
			.to('.p3 .g-2', .6, {transform: 'scaleY(1)', ease : Bounce.easeOut}, 'showTree')
			.fromTo('.p3 .g-1', .8, {}, {transform:'scaleY(1)', ease : Bounce.easeOut}, '-=.5','showTree')
			.to('.p3 .right-tree', .5, {autoAlpha: 1},'showTree')
			.to('.p3 .inner', .8, {autoAlpha: 1}).add("action")
			.to('.p3 .man_top', .6,  {rotation: '-2deg', yoyo: true, repeat: -1},"action")
			.to('.p3 .shenzi', .6,  {rotation: '1.3deg', yoyo: true, repeat: -1},"action")
			.to('.p3 .left', .8, {autoAlpha: 1})
			.to('.p3 .right', .8, {autoAlpha: 1})
			.to('.p3 .textBox', 1,  {y: 10, yoyo: true, repeat: -1})

	}
	
	aj.p3.resume();
}

function p4(){
	if(!aj.p4){
		var h3 = document.querySelector('.p4 .text');
		var mySplitText = new SplitText(h3, {type:"chars"}); 
		TweenMax.set(h3, {perspective:400});

		var 字体特效 = { opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50", ease:Back.easeOut};

		aj.instance = aj.p4 = new TimelineMax()
			.to('.p4 h3', .8, {autoAlpha: 1})
			.fromTo('.p4 .t-1', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: 0  }, '-=.5')
			.fromTo('.p4 .t-2', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: .5 }, '-=1')
			.staggerFrom(mySplitText.chars, 0.8, 字体特效, 0.01, '-=1')
			.to('.p4 .tp', .5, {autoAlpha: 1})
			.to('.p4 .push', .6, {left: '-=3.2%'}).add('move')
			.to('.p4 .gan', 2,  {rotation: '-10deg'}, 'move')
			.to('.p4 .rich', 2,  {top: "+=14%"}, 'move')
			.to('.p4 .building', 2,  {top: "-=14%"}, 'move')
			.to('.p4 .crew', 2,  {autoAlpha: 1}, 'move')
			.to('.p4 .kezhen', 1.5,  {rotation: '-65deg', ease : Bounce.easeOut}, 'move+=.5')
			.to('.p4 .climb', .8, {autoAlpha: 1})
			.to('.p4 .qipoao-left',  .5, {autoAlpha: 1, top:'-25%'})
			.to('.p4 .qipoao-right', .7, {autoAlpha: 1, top:'-25%'})
			.to('.p4 .qipoao-left',  .9, { top:'+=15px', yoyo: true, repeat: -1})
			.to('.p4 .qipoao-right',  .9, { top:'+=15px', yoyo: true, repeat: -1})
	}
	
	aj.p4.resume();
}

function p5(){
	if(!aj.p5){
		var h3 = document.querySelector('.p5 .text');
		var mySplitText = new SplitText(h3, {type:"chars"}); 
		TweenMax.set(h3, {perspective:400});

		var 字体特效 = { opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50", ease:Back.easeOut};
		var n1 = {n: 0}, h1 = document.querySelector('.p5 .blue-cycle.top span');
		var n2 = {n: 0}, h2 = document.querySelector('.p5 .blue-cycle.buttom span');	
		var n3 = {n: 0}, h3 = document.querySelector('.p5 .red-cycle.top span');
		var n4 = {n: 0}, h4 = document.querySelector('.p5 .red-cycle.buttom span');

		aj.instance = aj.p5 = new TimelineMax({delay:1})
			.to('.p5 h3', .8, {autoAlpha: 1})
			.fromTo('.p5 .t-1', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: 0  }, '-=.5')
			.fromTo('.p5 .t-2', 1, {}, {transform:'scale(1)', ease: Power1.easeOut, delay: .5 }, '-=1')
			.staggerFrom(mySplitText.chars, 0.8, 字体特效, 0.01, '-=1')
			.staggerTo(['.p5 .border', ".p5 .blue-cycle"],  .8, {autoAlpha: 1})
			.staggerTo(".p5 .blue-cycle", 0.4, {y: '+=45', repeat: 3, yoyo: true}).add('apart')
			.to(".p5 .blue-cycle.top", .6, {top : 140}, "apart")
			.to(".p5 .blue-cycle.buttom", .6, {top : 360}, "apart")
			.staggerTo(['.p5 .y2018', ".p5 .blue-cycle-bg", ".p5 .blue-cycle .i", ".p5 .blue-cycle h4", ".p5 .blue-cycle h5"], .6, {autoAlpha: 1}).add("bar")
			.to(n1, .6, { n:2.21, onUpdate: () => h1.innerHTML = n1.n.toFixed(2)})
			.to(n2, .4, { n:1.0, onUpdate: () => h2.innerHTML = n2.n.toFixed(1)}, 'bar')
			.to('.p5 .na',  .6, {autoAlpha: 1, left : 320})
			.to(".p5 .red-cycle", .5, {autoAlpha: 1})
			.staggerTo(".p5 .red-cycle", 0.4, {y: '+=45', repeat: 3, yoyo: true}).add('apart2')
			.to(".p5 .red-cycle.top", .6,    {top : 140}, "apart2")
			.to(".p5 .red-cycle.buttom", .6, {top : 360}, "apart2")
			.staggerTo(['.p5 .y2023', ".p5 .red-cycle-bg", ".p5 .red-cycle .i", ".p5 .red-cycle h4", ".p5 .red-cycle h5"], .6, {autoAlpha: 1}).add('foo')
			.to(n3, .6, { n:2.48, onUpdate: () => h3.innerHTML = n3.n.toFixed(2)})
			.to(n4, .2, { n:3.0, onUpdate: () => h4.innerHTML = n4.n.toFixed(1)}, 'foo')
			// .fromTo('.g-2', .6, {}, {autoAlpha: 1, left : "+=330", transform:'scaleX(1)',ease : Bounce.easeOut}, '-=.5')
			.to('.chartBg',  .8, {autoAlpha: 1})
			.set(document.querySelectorAll('.p5 .d'), {opacity:1})
			.staggerTo(document.querySelectorAll('.p5 .col'), .3, {cycle:{height: i => {
				if(i===1)return 210;
				  return 190 + i * 5;
			}}
			}, .1)
	}
	
	aj.p5.resume();
}

function p6(){
	var i = 6;
	if(!aj['p' + i]) {
		aj.instance = aj['p' + i] = new TimelineMax()
			.to('.p6 .t-1', 1, {autoAlpha: 1})
			.to('.p6 .inner', 1, {autoAlpha: 1})
			.to('.p6 .t-2', 1,  {autoAlpha: 1,delay:1})
			.to('.p6 .t-3', 1, {autoAlpha: 1,delay:.8})
			.to('.p6 .t-4', 1, {autoAlpha: 1,delay:.8})
			.to('.p6 .t-5', 1,  {autoAlpha: 1})
			.staggerTo(['.p6 .fd', '.p6 .fd-head'], 1,  {autoAlpha: 1})
			.to('.p6 .fd-head', .6,  {rotation: '-7deg', yoyo: true, repeat: -1})
	}
	
	aj['p' + i].resume();
}


function p7(){
	var i = 7;
	if(!aj['p' + i]) {
		aj.instance = aj['p' + i] = new TimelineMax()
			.to('.p7 .t-1', .5, {autoAlpha: 1})
			.to('.p7 .inner', .8, {autoAlpha: 1})
			.to('.p7 .t-2', 1, {autoAlpha: 1, delay:1})
			.to('.p7 .t-3', 1, {autoAlpha: 1, delay:.8})
			.to('.p7 .t-4', 1, {autoAlpha: 1, delay:.8})
			.to('.p7 .t-5', 1,  {autoAlpha: 1})
			.staggerTo(['.p7 .fd'], 1,  {autoAlpha: 1})
	}
	
	aj['p' + i].resume();
}

function p8(){
	var i = 8; 
	if(!aj['p' + i]) {
		aj.instance = aj['p' + i] = new TimelineMax({deplay:1})
			.to('.p8 .t-4', .5,  {opacity:1})
			.to('.p8 .t-2', .8,  {transform: 'scaleY(1)', ease : Bounce.easeOut}).add('showLight')
			.to('.p8 .light-1', .9, { opacity: .6, repeat: -1, yoyo: true}, 'showLight')
			.to('.p8 .light-2', .68, { opacity: .9, repeat: -1, yoyo: true}, 'showLight')
			.to('.p8 .light-3', .6, { opacity: .2, repeat: -1, yoyo: true}, 'showLight')
			.to('.p8 .light-4', .7, { opacity:  1, repeat: -1, yoyo: true}, 'showLight')
			.fromTo(['.p8 .t-6', '.p8 .t-7'], .5, {autoAlpha: 0}, {autoAlpha: 1, bottom: "+=50%"}).add("showText")
			.to('.p8 h3', .5,  {opacity:1, right: '20%'}, "showText")
			.to('.p8 p' , .5,  {opacity:1, right: '20%'}, "showText")
			.to('.p8 .tree', .8, {autoAlpha: 1, transform:'scaleX(1)',ease : Bounce.easeOut})
			.to('.p8 .t-6', .9, {bottom: "-=1.5%", repeat: -1, yoyo: true})
			.to('.p8 .t-7', .9, {bottom: "-=1%", repeat: -1, yoyo: true})
			.to('.p8 .t-3', 3.8, {x: 2600, repeat: -1})
			.add(new TimelineMax({repeat: -1})
			.to('.p8 .t-5', 2.8, {x: 600, opacity:1})
			.to('.p8 .t-5', .5,  {x: '+=300', opacity:0}))
	}
	
	aj['p' + i].resume();
}



function p9(){
	var i = 9;
	if(!aj['p' + i]) {
		TweenLite.to('.p10 .t-1', 5, {autoAlpha: 1});
		aj.instance = aj['p' + i] = new TimelineMax({delay:1.5})
			.to('.p10 .left', 1, {autoAlpha: 1}).add("showTime")
			.to('.p10 .iphone', 1, {autoAlpha: 1, top:"31%", left:"11%"}, "showTime")
			.to('.p10 .ftx', 1.6, {autoAlpha: 1, top:"73%", left:"30%", ease : Bounce.easeOut}, "showTime")
			.to('.p10 .left .man', 1, {autoAlpha: 1, top:"45%", left:"70%", ease : Cubic.easeOut,}, "showTime")
			.to('.p10 .boyu', 1.2,{opacity: 1, top:"49%", left:"96%"}, 'showTime')
			.to('.p10 .kunlun', 1.8,{opacity: 1, top:"20%", left:"84%"}, 'showTime+=.5')
			.to('.p10 .lehu', .8,{opacity: 1, top:"27%", left:"64%"}, 'showTime+=.4')
			.to('.p10 .i5', 1.8,{opacity: 1, top:"23%", left:"-13%", ease : Bounce.easeOut}, 'showTime')
			.to('.p10 .cc', .9,{opacity: 1, top:"3%", left:"3%"}, 'showTime+=1')
			.to('.p10 .chart', 1.5,{opacity: 1, top:"54%", ease : Bounce.easeOut}, 'showTime+=.7')
			.staggerTo(['.p10 .gy', '.p10 .leftTitle'], 1.5,{opacity: 1}, 'showTime+=1.7')
			.to('.p10 .shadow', .5,{opacity: 1}, 'showTime+=.7')
			.to('.p10 .gy', .9, {y:'+=15', repeat:-1, yoyo:true})
			.staggerTo(['.p10 .t-3', '.p10 .r'], 1, {autoAlpha: 1})
			.to('.p10 .right', 1,  {autoAlpha: 1}).add("showRight")
			.to('.p10 .right .man', .8,  {autoAlpha: 1})
			.to('.p10 .rightTitle', 1,  {autoAlpha: 1, y : -50}, "showRight")
			.to('.p10 .sun', 1,  {autoAlpha: 1, y : -50})
			.to(".p10 .cd", 2.5, {autoAlpha: 1, physics2D:{velocity:100, angle:-50, gravity: 500}, repeat: -1,});
	}
	
	aj['p' + i].resume();
}

function p10(){
	var i = 10;
	if(!aj['p' + i]) {
		aj.instance = aj['p' + i] = new TimelineMax({delay:1})
			.to('.p11 .t-1', 1,  {autoAlpha: 1})
			.to('.p11 .inner', 1,  {autoAlpha: 1}).add('start')
			.to('.p11 .logo', .9, {'boxShadow' : '0 0 20px 18px #ffffff75 inset, 0 0 15px 18px #ffffff2e', ease: Power1.easeOut, repeat:-1, yoyo:true })
			.staggerTo(document.querySelectorAll('.p11 .i'), .61,  {opacity: 1}, .5)
			.to('.p11 .zr', 1.2,  {opacity: 1, top: '-24%'}, .5, 'start')
			.to('.p11 .fws',1.2,  {opacity: 1, top: '66%'}, .5, 'start')
			.to('.p11 .zk', 1.2,  {opacity: 1, left: '64%'}, .5, 'start')
			.to('.p11 .fz', 1.2,  {opacity: 1, left: '-58%'}, .5, 'start')
			.to('.p11 .inner', .9, {y:'+=10', repeat:-1, yoyo:true})
	}
	
	aj['p' + i].resume();
}

function p11(){
	var i = 11;
	if(!aj['p' + i]) {
		aj.instance = aj['p' + i] = new TimelineMax({delay:1})
			.add('first')
			.to('.p9 .t-1', 1,  {opacity: 1, top: '29%'}, 'first')
			.to('.p9 .t-2', 1.2,   {opacity: 1, top: '56%'}, 'first+=.5').add('left')
			.to('.p9 .t-3', 1.2,   {opacity: 1, top: '56%'}, 'first').add('right')
			.staggerTo(['.p9 .t-4', '.p9 .t-5', '.p9 .t-6', '.p9 .t-7'], .5, {opacity: 1})
			.to('.p9 .t-8', 1,   {opacity: 1, bottom: '34%'}, 'left')
			.to('.p9 .t-11', 1,  {opacity: 1}, 'left+=1.2')
			.to('.p9 .t-9', 1.8,   {opacity: 1, bottom: '22%'}, 'left')
			.to('.p9 .t-12', 1,  {opacity: 1}, 'left+=1.8')
			.to('.p9 .t-10', 1.2,  {opacity: 1, bottom: '28%'}, 'right+=.5')
			.to('.p9 .t-13', 1,  {opacity: 1}, 'right+=1.6')
			.staggerTo(document.querySelectorAll('.p9 .icon-1'), 1.1,  {opacity: 1}, .1)
			.to('.p9 .main', .6,  {opacity: 1, top: '4%'}, 'right+=.9')
			.to('.p9 .top', .6,  {opacity: 1, top: '8%'}, 'right+=1.5')
			.staggerFromTo(Array.prototype.slice.call(document.querySelectorAll('.p9 .icon2')).reverse(), .7, {}, {opacity: 1}, .2, "-=1.9")
			.to('.p9 .head', .6,  {opacity: 1})
			.to('.p9 .text-right', .6,  {opacity: 1})
	}
	
	aj['p' + i].resume();
}

function p12(){
	var i = 12;
	if(!aj['p' + i]) {
		aj.instance = aj['p' + i] = new TimelineMax({delay:.5})
			.to('.p13 .center', 1, {autoAlpha: 1})
			.staggerTo(['.p13 .khphfx', '.p13 .khtz', '.p13 .zrqye', '.p13 .yxtz', '.p13 .khtzfx', '.p13 .text'], 1, {autoAlpha: 1}, .5)
			.set('.p13 .guanghuang', {opacity:1})
			.to('.p13 .guanghuang', .8, {y:'+=50', repeat: -1, yoyo: true})
			.to('.p13 .text', .8, {y:'+=10', repeat: -1, yoyo: true})
	}
	
	aj['p' + i].resume();
}

function p13(){
	var i = 13;
	if(!aj['p' + i]) {
		aj.instance = aj['p' + i] = new TimelineMax({delay:.5})
			.to('.p12 .t-1', 1, {autoAlpha: 1})
			.staggerTo(['.p12 .tizi', '.p12 .fz', '.p12 .zrqye', '.p12 .t-3', '.p12 .t-4'], 1, {autoAlpha: 1}, .5)
			.to('.p12 .t-4', .8, {y:'+=10', repeat: -1, yoyo: true})
	}
	
	aj['p' + i].resume();
}