
    document.write("<BODY bottommargin=0 rightmargin=0 topmargin=0 rightmargin=0>");
	var c_id = '';
    var hot_query_list=['0,26871:һ�����ĵ绰������ŮӪҵԱ','0,26851:������ͮרҵ��ͯ��Ӱ','0,26817:��Ƹ','0,26796:��ʥ̩������Ƹ�༭/����','0,26795:ҽҩ��˾��Ƹҵ����Ա','0,26786:������','0,26750:����һ��������Ե��Ů��.','0,26719:��ׯС����¥���淿����','0,26708:���ʶ���������У��Ƹ������Ա','0,26707:���ڸ���ѧУ���մ����ƶ��ֻ�..','0,26696:���ʵ�����У��Ƹ������Ա','0,26695:�����Ʒ����������','0,26693:�ֻ��洢��רҵ����','0,26692:����С��200Ԫ�⵽��ů����','0,26686:�����ģ�','0,26675:��Ƹ��ʦ��'];   
    var currentHotQueryOffset = -1;
    var refreshHotQueryTimer = null;
    function setHotQueryList(offset){
    	if(0==offset){
    		return;
    	}
      if(null!=refreshHotQueryTimer){
      	clearTimeout(refreshHotQueryTimer);
      	refreshHotQueryTimer = null;
      }
      var number_per_row = 1;
      var hot_query_content = '';
      currentHotQueryOffset+=offset;
      if(currentHotQueryOffset+10>hot_query_list.length){
        currentHotQueryOffset = hot_query_list.length-10;
      }
      if(currentHotQueryOffset<0){
        currentHotQueryOffset = 0; //hot_query_list.length - (hot_query_list.length+10-1) % 10;
      }
      var i;
      for(i=currentHotQueryOffset;i<currentHotQueryOffset+10;i++){ // ��ʾ��Ŀ����
        if(i>=hot_query_list.length){
                break;
        }

        var hot_query = hot_query_list[i];
        var query_string = hot_query;
        var query_string_quoted = '';
        var corder = 0;
        var is_renew_query = false;
        var pos = hot_query.indexOf(':');

        if(i%10==0){        
        hot_query_content+='<TABLE hspace=0 vspace=0 cellSpacing=0 width=209 align=center><tr><td bgcolor=#FFFFFF>';}
        if(i%10==5){        
        hot_query_content+='</td></tr><td bgcolor=#eefff9>';}

        if(-1!=pos){
          query_string = hot_query.substring(pos+1, hot_query.length);
          var pos2 = hot_query.indexOf(',');
          if(-1!=pos2 && pos2<pos){
            query_string_quoted = hot_query.substring(pos2+1, pos);
            corder = hot_query.substring(0, pos2);
            if(corder=='N'){
            }
            else if(corder.length>0 && corder.substring(corder.length-1, corder.length)=='N'){
              is_renew_query = true;
              corder = corder.substring(0, corder.length-1);
              corder=parseInt(corder);
            }
            else{
              corder=parseInt(corder);
            }
          }
          else{
            corder = parseInt(hot_query.substring(0, pos));
          }
        }
        if(''==query_string_quoted){
          query_string_quoted = query_string;
        }
        if(i>currentHotQueryOffset && (i-currentHotQueryOffset)%number_per_row==0){
          hot_query_content += '';
        }

        hot_query_content += '- <a style="FONT-SIZE: 12px;LINE-HEIGHT:170%" href="http://yellow.jninfo.net.cn/showinfo.asp?id='+query_string_quoted+'" target=_blank title="'+query_string;
        hot_query_content += '"><FONT COLOR=#00007f>'+query_string+'</FONT></a>';
        if(i%10!=9){         
            hot_query_content+='<br>';}
        if(i%10==9){        
        hot_query_content+='</td></tr>';}
      }
      hot_query_nav = '';
      if(currentHotQueryOffset>0){
        hot_query_nav += ' ';
      }
      if(i<hot_query_list.length){
        hot_query_nav += '';
      }
      if(''!=hot_query_nav){
	      hot_query_content += hot_query_nav;
	      hot_query_content += '';
      }
      hot_query_content += '';
      if(null!=hot_query_td.filters){
      	hot_query_td.filters[0].apply();
      	hot_query_td.filters[0].motion = offset>0 ? 'forward' : 'reverse';
      }
      hot_query_td.innerHTML = hot_query_content;
      if(null!=hot_query_td.filters){
      	hot_query_td.filters[0].play();
      }
    }
    function refreshHotQuery(){
    	refreshHotQueryTimer = null;
    	if(currentHotQueryOffset+10>=hot_query_list.length){
    		setHotQueryList(-currentHotQueryOffset);
	    }
	    else{
    		setHotQueryList(10);
    	}
    	refreshHotQueryTimer = setTimeout('refreshHotQuery();', 1000);
    }
    if(hot_query_list.length>0){
      document.writeln('<table><tr><td id=HotSearchList style="filter: progid:DXImageTransform.Microsoft.GradientWipe(GradientSize=0.25,wipestyle=0,motion=forward);" onMouseOver="if(null!=refreshHotQueryTimer){clearTimeout(refreshHotQueryTimer);refreshHotQueryTimer=null;}" onMouseOut="if(null==refreshHotQueryTimer){refreshHotQueryTimer = setTimeout(\'refreshHotQuery();\', 1000);}" nowrap></td></tr></table> ');
      var hot_query_td = document.all ? document.all['HotSearchList'] : document.getElementById('HotSearchList');
      setHotQueryList(1);
      refreshHotQueryTimer = setTimeout('refreshHotQuery();', 1000);
    }