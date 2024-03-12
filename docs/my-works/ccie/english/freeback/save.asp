 

<!--#include file="../../hycms/common/debuggingConsole.asp" -->
<!--#include file="../../hycms/common/sur_class.asp" -->
<!--#include file="../../conn.asp" -->
<body>
<%
Set chk = new hysecure '检查是否本地发起
chk.ChkPost()
chk.Vaild
Set chk = nothing

Set db = new hycmsclass
with db

.GetSQL = "select * from msg where (id is null)"
.GetRS 3
.rs.addnew
.rs("name")=request("name")
.rs("type")=request("type")
.rs("tel")=request("tel")
.rs("email")=request("email")
.rs("url")=request("url")
.rs("url2")=request("url2")
.rs("address")=request("address")
.rs("con_people")=request("con_people")
.rs("service")=request("service")
if request("msg") <> "" then .rs("msg")=server.HTMLEncode(request("msg"))
if request("msg2") <> "" then .rs("msg2")=server.HTMLEncode(request("msg2"))
.rs("time")=now()
.rs("ip") = .GetIP()
.rs.update
.rs.close
end with

Set db = nothing
Set debugstr = New debuggingConsole 
    debugstr.Enabled = true
    debugstr.Print "own_dir",IP
    '……
    debugstr.draw 
Set debugstr = Nothing
		response.write "<script language='javascript'>" & chr(13)
		response.write "alert('操作成功。\n感谢您的留言！');" & Chr(13)
		response.write "window.document.location.href='javascript:history.back(1)';"&Chr(13)
		response.write "</script>" & Chr(13)
		Response.End
%>
<%
set rs=server.createobject("adodb.recordset")
sql="select * from msg where (id is null)"
rs.open sql,conn,1,3
rs.addnew

.rs("name")=request("name")
.rs("type")=request("type")
.rs("tel")=request("tel")
.rs("email")=request("email")
.rs("url")=request("url")
.rs("url2")=request("url2")
.rs("address")=request("address")
.rs("con_people")=request("con_people")
.rs("service")=request("service")
.rs("msg")=request("msg")
.rs("msg2")=request("msg2")
.rs("time")=now()
Dim GetIP,IP
Set GetIP = New hycmsclass
IP = GetIP.GetIP()
.rs("ip") = IP
Set GetIP = Nothing
.rs.update
.rs.close
set rs=nothing


Set debugstr = New debuggingConsole 
    debugstr.Enabled = true
    debugstr.Print "own_dir",IP
    '……
    debugstr.draw 
Set debugstr = Nothing
		response.write "<script language='javascript'>" & chr(13)
		response.write "alert('操作成功。\n感谢您的留言！');" & Chr(13)
		response.write "window.document.location.href='javascript:history.back(1)';"&Chr(13)
		response.write "</script>" & Chr(13)
		Response.End
%>
</body>
</html>
