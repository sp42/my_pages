<%
  if session("aleave")="" then
      response.redirect "adminlogin.asp"
	  response.end
  end if
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>活映工作室信息发布管理系统--Basic CMS Version 1.0--</title>
<script type="text/JavaScript">
<!--

function format_now_time()
{
  var d_time=new Date();
  var week_dim=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
  //var week_dim=week_dim.concat("星期三","星期四","星期五");
  var temp1="[今天是]：";
  temp1+=d_time.getYear()+"年";
  temp1+=(d_time.getMonth() + 1) + "月";
  temp1+=d_time.getDate() + "日";
  temp1+=week_dim[d_time.getDay()];
  temp1+=" [登入时间] "+d_time.getHours()+":"+d_time.getMinutes()+":"+d_time.getSeconds();

  return temp1;
}
function MM_displayStatusMsg() { //v1.0
	var	user = "<%=session("admin")%>";
  status=("[当前用户]:" + user+"   "+format_now_time());
}
MM_displayStatusMsg()
//-->
</script>
</head>

<frameset rows="*" cols="198,*" framespacing="0" frameborder="no"  bordercolor="#47478D">
  <frame src="admin_left.asp" name="left" scrolling="NO" noresize>
 
  <frameset rows="70,*" cols="*" framespacing="0" frameborder="NO" border="0">
    <frame src="head.asp" name="topFrame" scrolling="NO" noresize>
    <frame src="admin_center.asp" name="main">
  </frameset>
</frameset>
<noframes><body>

</body></noframes>
</html>
