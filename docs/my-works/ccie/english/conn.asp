<%

connstr="DBQ="+server.mappath("../../../database/hyback.mdb")+";DefaultDir=;DRIVER={Microsoft Access Driver (*.mdb)};"
Set conn=Server.CreateObject("ADODB.CONNECTION")
conn.open connstr

if not isnumeric(request.querystring("id")) then 
	response.redirect "index.asp"
	response.end()
end if
%>

<!--#include file="../hycms/hycmsclass.asp" -->