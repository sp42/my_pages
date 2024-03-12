
javastr=""
javastr=javastr+"<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"
<!--#include file="../conn.asp"-->
<%
owen=request("owen")
owen1=request("owen1")
owen2=request("owen2")
n=request("n")
if n="" then
n=100
end if%>

<%
if owen1<>"" and owen2<>"" then
sql="select  * from NEWS where BigClassName='"& owen1 &"' and  SmallClassName='"& owen2 &"' order by id desc"
set rs=conn.execute(sql)
do while not rs.eof 
%>
javastr=javastr+"<tr><td height=\"15\" style=\"BORDER-bottom: #999999 1px dotted\">"
javastr=javastr+"&nbsp;<span style=\"font-size:9pt;line-height:15pt\"><a href=\"onewKK.asp?id=<%=rs("id")%>\" title=\"<%=rs("title")%>\" target=\"_blank\"><%=left(rs("title"),12)%></a></span> <font color=\"#999999\" >[<%=rs("time")%>]</font> <font color=\"#999999\" >(ÔÄ¶Á<font color=\"#FFcc66\" ><%=rs("hits")%></font>´Î)</font>"
javastr=javastr+"</td></tr><img src='images\news.gif'>"
<%n=n-1
if n<1 then exit do
rs.movenext 
loop
%>
javastr=javastr+"</table>" 
<%
rs.close   
set rs=nothing   
%>
document.write (javastr) 

<%
ElseIf owen2<> "" then
sql="select  * from NEWS where SmallClassName='"& owen2 &"' order by id desc"
set rs=conn.execute(sql) 
do while not rs.eof 
%>
javastr=javastr+"<tr><td height=\"15\" style=\"BORDER-bottom: #999999 1px dotted\">"
javastr=javastr+"&nbsp;<span style=\&quot;font-size:9pt;line-height:15pt\"><a href=\"onewKK.asp?id=<%=rs("id")%>\" title=\"<%=rs("title")%>\" target=\"_blank\"><%=left(rs("title"),12)%></a></span> <font color=\"#999999\" >[<%=rs("time")%>]</font> <font color=\"#999999\" >(ÔÄ¶Á<font color=\"#FFcc66\" ><%=rs("hits")%></font>´Î)</font>"
javastr=javastr+"</td></tr>"
<%n=n-1
if n<1 then exit do
rs.movenext 
loop
%>
javastr=javastr+"</table>" 
<%
rs.close   
set rs=nothing   
%>
document.write (javastr) 

<%
ElseIf  owen1<>"" then
sql="select  * from NEWS where BigClassName='"& owen1 &"' order by id desc"
set rs=conn.execute(sql) 
do while not rs.eof 
%>
javastr=javastr+"<tr><td height=\"15\" style=\"BORDER-bottom: #999999 1px dotted\">"
javastr=javastr+"&nbsp;<span style=\&quot;font-size:9pt;line-height:15pt\"><a href=\"onewKK.asp?id=<%=rs("id")%>\" title=\"<%=rs("title")%>\" target=\"_blank\"><%=rs("title")%></a></span> <font color=\"#999999\" >[<%=rs("time")%>]</font> <font color=\"#999999\" >(ÔÄ¶Á<font color=\"#FFcc66\" ><%=rs("hits")%></font>´Î)</font>"
javastr=javastr+"</td></tr>"
<%n=n-1
if n<1 then exit do
rs.movenext 
loop
%>
javastr=javastr+"</table>" 
<%
rs.close   
set rs=nothing   
%>
document.write (javastr) 
<% End If %>

<% 
if owen1= "" and owen2= "" then
sql="select * from NEWS order by id desc"
set rs=conn.execute(sql)
do while not rs.eof 
%>
javastr=javastr+"<tr><td height=\"10\">&nbsp;&nbsp;"
javastr=javastr+"<img src=\"news/icon_gray1.gif\">&nbsp;<span style=\"font-size:9pt;line-height:10pt\"><a href=\"onewKK.asp?id=<%=rs("id")%>\" title=\"<%=rs("title")%>\" target=\"_blank\" ><%=left(rs("title"),12)%></a><font color=\"#999999\" class=\"times\">[<%=rs("time")%>]</font><font color=\"#cccccc\" >(ÔÄ¶Á<font color=\"#cccccc\" ><%=rs("hits")%></font>´Î)</font></span>"
javastr=javastr+"</td></tr>"
<%n=n-1
if n<1 then exit do
rs.movenext 
loop
%>
javastr=javastr+"</table>" 
<%rs.close   
set rs=nothing   
conn.close   
set conn=nothing%>
document.write (javastr) 
<%end if%>
