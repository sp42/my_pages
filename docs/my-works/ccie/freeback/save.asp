 

<!--#include file="../hycms/common/debuggingConsole.asp" -->
<!--#include file="../hycms/common/sur_class.asp" -->
<!--#include file="../conn.asp" -->
<body>
<%
Set chk = new hysecure '����Ƿ񱾵ط���
chk.ChkPost()
if chk.Vaild = False then '��֤����
			response.write "<script language='javascript'>" & chr(13)
			response.write "alert('��֤�����');" & Chr(13)
			response.write "window.document.location.href='javascript:history.back(-1)';"&Chr(13)
			response.write "</script>" & Chr(13)   
		else
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
				'����
				debugstr.draw 
			Set debugstr = Nothing
					response.write "<script language='javascript'>" & chr(13)
					response.write "alert('�����ɹ���\n��л�������ԣ�');" & Chr(13)
					response.write "window.document.location.href='javascript:history.back(1)';"&Chr(13)
					response.write "</script>" & Chr(13)
		end if
Set chk = nothing
%>
</body>
</html>
