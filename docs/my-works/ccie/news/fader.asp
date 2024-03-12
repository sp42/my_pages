<!--#include file="../conn.asp"-->
<% 
sql="select * from NEWS order by id desc"
Set rs = Server.CreateObject ("ADODB.Recordset")
rs.open sql,conn,1,3
n=request("n")
if n="" then n=100
%>

prefix="";
arNews = [
//"本站属个人网站，而绝hjkhjk经营性网站","hj",
//"<a href='http://www.eachnet.com/fu/shop/myshop.php?user_id=117332'>自用二手特售</a>","",
//"推荐浏览方式：IE6+；1024x768+",""
<%do while not rs.eof
			Dim strNew, hits
			if  IsNull(rs("hits"))  then 'hits字段为数字类型 需作null处理 
					hits = "28" '人为设置HITS
				else 
					hits = cstr(rs("hits"))
			end if
			strNew = "'" '标记开始 for JS
			strNew = strNew + "<a title="+rs("title")+"&nbsp;阅读:"+hits+"次"
			strNew = strNew + "&#10;"+ cstr(rs("time"))
			strNew = strNew +" href=news/news.asp?id="+cstr(rs("id"))+">"+left(rs("title"),16)+"</a>"
			strNew = strNew + "&nbsp;&nbsp;&nbsp;"
			strNew = strNew +"<span class = ""times"">"+cstr(rs("time")) + "</span>"
			rs.movenext
			'response.Write strNew
			if rs.eof then exit do '必须语句 否则错误
			strNew = strNew + "<br/>" '换行标记
			strNew = strNew + "<a title="+rs("title")+"&nbsp;阅读:"+hits+"次"
			strNew = strNew + "&#10;"+ cstr(rs("time"))
			strNew = strNew +" href=news/news.asp?id="+cstr(rs("id"))+">"+left(rs("title"),16)+"</a>"
			strNew = strNew + "&nbsp;&nbsp;&nbsp;"
			strNew = strNew +"<span class = ""times"">"+cstr(rs("time")) + "</span>"
			strNew = strNew +"','',"+ vbCrLf
			response.Write strNew
			n=n-1
			if n<1 then exit do

			rs.movenext 
loop		
%>
<%
rs.close   
set rs=nothing   
conn.close   
set conn=nothing%>
"查看新闻一览 >>","news/allnews.asp"]

//   FDRboxWid = 350;             
//   FDRboxHgt = 27;
//   FDRborWid = 0;//边框宽度
//   FDRborCol = "#D98200";//边框颜色
//   FDRborSty = "solid";
//   FDRbackCol = "";//背景颜色
//   FDRboxPad = 4;
//
//   FDRtxtAln = "left";
//   FDRlinHgt = "10pt";
//   FDRfntFam = "Verdana,Arial,Helvetica,sans-serif,宋体";
//   FDRfntCol = "#D98200";
//   FDRfntSiz = "9pt";
//   FDRfntWgh = "";
//   FDRfntSty = "normal";
//   FDRlnkCol = "#D98200";
//   FDRlnkDec = "underline";
//   FDRhovCol = "#D98200";

 FDRboxWid = 300;//显示块的宽度
 FDRboxHgt = 35;//高度
 FDRborWid = 0;//边框宽度
 FDRborCol = "";//边框颜色
 FDRborSty = "solid";
 FDRbackCol = "";//背景颜色
 FDRboxPad = 1;

 FDRtxtAln = "left";
 FDRlinHgt = "16px";//行高
 FDRfntFam = "Verdana,Arial,宋体";//字体
 FDRfntCol = "#000000";
 FDRfntSiz = "9pt";//字体大小
 FDRfntWgh = "";
 FDRfntSty = "normal";
 FDRlnkCol = "#000000";
 FDRlnkDec = "underline";
 FDRhovCol = "#000000";

   FDRgifSrc = "";
   FDRgifInt = 60;

   FDRblendInt = 3;
   FDRblendDur = 1;
   FDRmaxLoops = 100;

   FDRendWithFirst = true;
   FDRreplayOnClick = true;
   
   FDRjustFlip = false;
   FDRhdlineCount = 0;

NS4 = (document.layers);
IE4 = (document.all);

appVer = navigator.appVersion;
IEmac = (IE4 && appVer.indexOf("Mac") != -1);
IE4mac = (IEmac && appVer.indexOf("MSIE 4") != -1);
IE40mac = (IE4mac && appVer.indexOf("4.0;") != -1);
IE45mac = (IE4mac && appVer.indexOf("4.5;") != -1);
NSpre401 = (NS4 && (parseFloat(appVer) <= 4.01));
NSpre403 = (NS4 && (parseFloat(appVer) <= 4.03));

FDRjustFlip = (window.FDRjustFlip) ? FDRjustFlip : false;
FDRhdlineCount = (window.FDRhdlineCount) ? FDRhdlineCount : 1;

FDRfinite = (FDRmaxLoops > 0);
FDRisOver = false;
FDRloadCount = 0;

blendTimer = null;

if (!window.prefix) prefix = "";
window.onload = FDRcountLoads;

if (NS4) {
	if(FDRjustFlip || NSpre403) {
		totalLoads = 1;
		FDRfadeImg = new Object();
		FDRfadeImg.width = FDRboxWid - (FDRborWid*2);;
	}
	else {
		totalLoads = 2;
		FDRfadeImg = new Image();
		FDRfadeImg.onload = FDRcountLoads;
		FDRfadeImg.onerror = FDRcountLoads;
		FDRfadeImg.src = FDRgifSrc;
	}
}

function FDRcountLoads(e) {
	if (IE4) {
		setTimeout("FDRinit()",1);
	}
	else {
		if(e.type == "error") FDRjustFlip = true; 
		FDRloadCount++;
		if (FDRloadCount==totalLoads) {
			origWidth = innerWidth;
			origHeight = innerHeight;
			window.onresize = function(){
				if (innerWidth==origWidth && innerHeight==origHeight) return;
				location.reload();
			}
			FDRinit();
		}
	}
}

function FDRinit(){
	if(!window.arNews) {
		if(!window.arTXT || !window.arURL) return;
		if(arTXT.length != arURL.length) return;
		arNews = [];
		for (i=0;i<arTXT.length;i++){
			arNews[arNews.length] = arTXT[i];
			arNews[arNews.length] = arURL[i];
		}
	}

    if (NS4) {
        if (!document.elFader) return;
		with(document.classes.newslink.A) {
			textDecoration = FDRlnkDec;
			color = FDRlnkCol;
			fontWeight = FDRfntWgh;
			fontSize = FDRfntSiz;
			fontStyle = FDRfntSty;
			fontFamily = FDRfntFam;
			lineHeight = FDRlinHgt;
			textAlign = FDRtxtAln;
		}
		with(document.classes.nolink.P) {
			color = FDRfntCol;
			fontWeight = FDRfntWgh;
			fontSize = FDRfntSiz;
			fontStyle = FDRfntSty;
			fontFamily = FDRfntFam;
			lineHeight = FDRlinHgt;
			textAlign = FDRtxtAln;
		}
        elFader = document.elFader;
		with (elFader) {
			document.write(" ");
			document.close();
			bgColor = FDRborCol;
			clip.width = FDRboxWid;
			clip.height = FDRboxHgt;
		}

		contWidth = FDRboxWid - (FDRborWid*2);
		contHeight = FDRboxHgt - (FDRborWid*2);
		elCont = new Layer(contWidth,elFader);
		with (elCont) {
			top = FDRborWid;
			left = FDRborWid;
			clip.width = contWidth;
			clip.height = contHeight;
			bgColor = FDRbackCol;
			visibility = "inherit";
		}

		newsWidth = contWidth - (FDRboxPad*2);
		newsHeight = contHeight - (FDRboxPad*2);
        elNews = new Layer(newsWidth,elCont);
		with (elNews) {
			top = FDRboxPad;
			left = FDRboxPad;
			clip.width = newsWidth ;
			clip.height = newsHeight;
		}

		if (!FDRjustFlip) {
			elGif = new Layer(contWidth,elCont); 
	        imStr = "<IMG SRC='" + FDRgifSrc +"' WIDTH="+ Math.max(FDRfadeImg.width,(FDRboxWid - (FDRborWid*2)));
			imStr += (NSpre403) ? " onError='window.FDRjustFlip = true'>" : ">";
	        with (elGif) {
				document.write(imStr);
	        	document.close();
				moveAbove(elNews);
			}
	
			imgHeight = elGif.document.height;
			slideInc = (imgHeight/(FDRblendDur*1000/FDRgifInt));
			startTop = -(imgHeight - FDRboxHgt);
		}

		elFader.visibility =  "show";
    }
    else {
        if (!window.elFader) return;
		elFader.innerHTML ="";
		if(IE4mac) {
			document.body.insertAdjacentHTML("BeforeBegin","<STYLE></STYLE>");
		}
		else {
			if (!document.styleSheets.length) document.createStyleSheet();
		}
		with (document.styleSheets(document.styleSheets.length-1)) {
			addRule("A.newslink","text-decoration:"+FDRlnkDec+";color:"+ FDRlnkCol);
			addRule("A.newslink:hover","color:"+ FDRhovCol);
		}

		with (elFader.style) {
			errorOffset = (IE4mac) ? (FDRboxPad + FDRborWid) : 0;
			width = FDRboxWid - (errorOffset * 2);
			height = FDRboxHgt - (errorOffset * 2);
			if(IE4mac && !IE45mac){
				pixelLeft = elFader.offsetLeft + errorOffset;
				pixelTop = elFader.offsetTop + errorOffset;
			}

			backgroundColor = FDRbackCol;
			overflow = "hidden";
			color = FDRfntCol;
			fontWeight = FDRfntWgh;
			fontSize = FDRfntSiz;
			fontStyle = FDRfntSty;
			fontFamily = FDRfntFam;
			lineHeight = FDRlinHgt;
			textAlign = FDRtxtAln;
			cursor = "default";
			visibility = "visible";
			borderWidth = FDRborWid;
			borderStyle = FDRborSty;
			borderColor = FDRborCol;
			padding  = FDRboxPad;

			if(!FDRjustFlip) filter = "blendTrans(duration=" + FDRblendDur + ")";
		}
		elFader.onselectstart = function(){return false};

		IEhasFilters = (elFader.filters.blendTrans) ? true : false;

    }

	if (!NSpre401) {
		elFader.onmouseover = function (){
			FDRisOver = true;
		}
		elFader.onmouseout = function(){
			FDRisOver = false;
			status = "";
		}
	}
	
	FDRstart(0);
}

function FDRstart(ind){
    newsCount = ind;
    if (FDRfinite) loopCount = 0;
    FDRdo();
    blendTimer = setInterval("FDRdo()",FDRblendInt*1000)
}

function FDRdo() {
	if(!blendTimer && loopCount>0) return;

    if (FDRfinite && loopCount==FDRmaxLoops) {
        FDRend();
		return;
    }
	FDRfade();

    if (newsCount == arNews.length) {
        newsCount = 0;
        if (FDRfinite) loopCount++;
    }
}

function FDRmakeStr(){
	tempStr = "";
	for (i=0;i<FDRhdlineCount;i++){
		if(newsCount>=arNews.length)break;
		dispStr = arNews[newsCount];
		linkStr = arNews[newsCount+1];
		isLink = linkStr.length;
		if (isLink) {
			tempStr += "<P><A CLASS=newslink "
					+ "HREF='" + prefix + linkStr + "'>"
		            + dispStr + "</A></P>"
		}
		else {
			tempStr += ((NS4) ? "<P CLASS=nolink>" : "<P>") +dispStr+"</P>";

		}
        if(IE40mac) tempStr +="<BR>";
		newsCount += 2;
	}
	return tempStr;
}

function FDRfade(){
	newsStr = FDRmakeStr();

    if (NS4) {
		if (!FDRjustFlip) {
			elGif.top = startTop;
			elGif.visibility = "inherit";
		}

		elNews.visibility = "hide";
        with (elNews.document) {
            write(newsStr);
            close();
        }
		elNews.visibility = "inherit";
    }
    else {
        if(IEhasFilters)elFader.filters.blendTrans.Apply();
        elFader.innerHTML = newsStr;
        if(IEhasFilters)elFader.filters.blendTrans.Play();
    }

	if(FDRhdlineCount==1) window.status = (FDRisOver && isLink) ? (prefix + linkStr) : "";

    if (NS4 && !FDRjustFlip) FDRslide();
}

function FDRslide(){
    elGif.top += slideInc;
    if (elGif.top >= 0) {elGif.visibility = "hide";return}
    setTimeout("FDRslide()",FDRgifInt);
}

function FDRdblClickNS(){
	elFader.releaseEvents(Event.DBLCLICK);
	FDRstart(startIndex);
	return false;
}

function FDRend(){
	clearInterval(blendTimer);

	blendTimer = null;

	if (FDRendWithFirst) {
		newsCount = 0;
		FDRfade();
	}
	if (FDRreplayOnClick) {

		startIndex = FDRendWithFirst ? (FDRhdlineCount * 2) : 0;
		if (IE4) {
			elFader.title = "Double click to replay";
			elFader.ondblclick = function(){
				this.ondblclick = null;
				this.title = "";
				FDRstart(startIndex);
			}
		}
		else {
			elFader.captureEvents(Event.DBLCLICK);

			elFader.ondblclick = FDRdblClickNS;

		}
    }
}


