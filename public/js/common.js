//创建登录窗口
if($('loadIn') == null) {
	var loadObj = document.body;
	var html = "";
	html += "<div id='loadIn' >";
	html += '<div id="load_form"><div><img src="img/off.png" onclick="offload()"></div><h3>管理员登录</h3><input type="text" id="a_name" placeholder="名称"><input type="password" id="a_pwd" placeholder="密码"><br><span id="showLoad"></span><input type="button" class="form_btn" onclick="loadin()" value="> System Start <" /></div>';
	html += "</div>";
	loadObj.innerHTML += html;
}
//创建搜索窗口
if($('search') == null) {
	var searchObj = document.body;
	var html = "";
	html += "<div id='search' onclick='offSearch()'>";
	html += '<div id="search_cont"><input type="text" id="seatch_ipt" autofocus placeholder="请输入关键词"><img src="img/search.png" width="30px" onclick="searchWord(seatch_ipt.value,1)"></div>';
	html += "</div>";
	searchObj.innerHTML += html;
}
//创建返回顶部
if($('left_nav')==null){
	var html='<div id="left_nav"><ul><li><div class="img_front"><img src="img/home.png" /></div><div class="img_bottom"><a href="index.html" target="_parent"><img src="img/home_on.png" title="首页" /><div class="left_msg">&gt; 首页</div></a></div></li><li><div class="img_front"><img src="img/www.png" /></div><div class="img_bottom"><a href="web.html" target="_parent"><img src="img/www_on.png" title="Web前端" /><div class="left_msg">&gt; Web前端</div></a></div></li><li><div class="img_front"><img src="img/leisure.png" /></div><div class="img_bottom"><a href="talk.html" target="_parent"><img src="img/leisure_on.png" title="闲文杂谈" /><div class="left_msg">&gt; 闲文杂谈</div></a></div></li><li><div class="img_front"><img src="img/Ps.png" /></div><div class="img_bottom"><a href="photo.html" target="_parent"><img src="img/Ps_on.png" title="否头笑谱" /><div class="left_msg">&gt; 否头笑谱</div></a></div></li><li><div class="img_front"><img src="img/unity.png" /></div><div class="img_bottom"><a href="u3d.html" target="_parent"><img src="img/unity_on.png" title="U3D记录" /><div class="left_msg">&gt; U3D记录</div></a></div></li><li><div class="img_front"><img src="img/talk.png" /></div><div class="img_bottom"><a href="msg.html" target="_parent"><img src="img/talk_on.png" title="足迹" /><div class="left_msg">&gt; 足迹</div></a></div></li><li class="to_top"><div class="img_front"><img src="img/totop.png" /></div><div class="img_bottom"><a onclick="toTop()"><img src="img/totop_on.png" title="返回顶部" /></a></div></li></ul></div>';
	searchObj.innerHTML += html;
}
window.onscroll=function(){
	var scroll=document.documentElement.scrollTop || document.body.scrollTop;
	if(scroll>0){
		$('left_nav').style.cssText="display:block;";
		$('left_nav').style.opacity="1";
	}else{
		$('left_nav').style.opacity="0";
		setTimeout(()=>{$('left_nav').style.cssText="display:none;"},500);
	}
}
function $(id) {
	return document.getElementById(id);
}
//返回顶部函数
function toTop(){
	(function smoothscroll(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
})();
}
//登录弹出层
function loadIn() {
	var height = window.innerHeight;
	$('loadIn').style.cssText = 'height: ' + height + 'px;padding-top:' + height / 3 + 'px;';
	$('loadIn').style.cssText += "opacity: 1;";
	$('loadIn').onclick = function() {
		offload();
	}
	$('load_form').onclick = function() {
		window.event ? window.event.cancelBubble = true : e.stopPropagation();
	}
}
//关闭登录弹出层
function offload() {
	$('loadIn').style.cssText += "opacity: 0;";
	setTimeout(function() {
		$('loadIn').style.cssText = "height:0";
	}, 500);
}
//搜索弹出层
function search() {
	var height = window.innerHeight;
	$('search').style.cssText = 'height: ' + height + 'px;padding-top:' + height / 3 + 'px;';
	$('search').style.cssText += "opacity: 1;";

	$("search_cont").onclick = function() {
		window.event ? window.event.cancelBubble = true : e.stopPropagation();
	}
}
//关闭搜索弹出层
function offSearch() {
	$('search').style.cssText += "opacity: 0;";
	setTimeout(function() {
		$('search').style.cssText = "height:0";
	}, 500);
	//清空搜索框
	$('seatch_ipt').value = '';
}
//去除字符串中的尖括号
function delHtmlTag(str){
  return str.replace(/<[^>]+>/g,"");
}
//搜索含有关键词的文章
function searchWord(name,currentPage) {
	var xhr = new XMLHttpRequest();
	if(!name) {
		alert('请输入要查找的关键词');
		return;
	}
	xhr.open('get', '/word/search?name=' + name + '&currentPage=' + currentPage, true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			$('content').innerHTML = '<div class="title"><h2>搜索：<span style="color:#f8962e;font-size:20px;line-height:30px">' + name + '</span> 的结果</h2><hr><p>共计：<span id="wed"></span>篇</p></div><div id="cont"></div>';
			var res = JSON.parse(xhr.responseText);
			var data = res.data;
			//判断获取到的文章总数，如果大于0则添加到content中，否则返回搜索结果为0
			if(data.length > 0) {
				var search = '';
				for(var i = 0; i < data.length; i++) {
					var word = data[i];
					search += "<div class='cont_word'>";
					search += "<a class='cont_a' href='/word.html?wid=" + word.w_id + "' target='_blank'>" + isAuthor() + word.w_title + "</a>";
					search += "<p>" + delHtmlTag(word.w_cont).substr(0, 150) + "...</p>"
					search+='<div id="cont_date"><span id="cont_read"> '+word.w_read+' </span>阅读 作者：LingMX 发布时间：'+word.w_date+'</div>';
					search += "</div>"

					function isAuthor() {
						if(word.w_isAuthor == 1) {
							return '<span class="cont_y">原</span>';
						} else {
							return '<span class="cont_y nomy">转</span>';
						}
					}
				}
				$('cont').innerHTML = search;
				$('wed').innerHTML = res.total;
				var thekey="'"+name+"'";
				$('cont').innerHTML += '<div id="page"></div>';
				var pageHTML = '';
				var page = res.totalPage;
				pageHTML = "<ul>"
				if(currentPage > 1) {
					pageHTML += '<li class="up" onclick="searchWord('+thekey +','+(Number(currentPage) - 1)+')">上一页</li>';
					pageHTML += '<li onclick="searchWord('+thekey +','+(Number(currentPage) - 1)+')">' + (Number(currentPage) - 1) +'</li>';
				} else {
					pageHTML += '<li class="up" onclick="alert(\'已经是第一页了哦\')">上一页</li>';
				}
					pageHTML +=	'<li onclick="searchWord('+thekey +','+currentPage+')"class="active">'+ currentPage+'</li>';
				if(currentPage < page) {
					pageHTML += '<li onclick="searchWord('+thekey +','+(Number(currentPage) + 1)+')">' + (Number(currentPage) + 1) +'</li>';
					pageHTML += '<li class="down" onclick="searchWord('+thekey +','+(Number(currentPage) + 1)+')">下一页</li>';
				} else {
					pageHTML += '<li class="down" onclick="alert(\'已经是最后一页了哦\')">下一页</li>';
				}
				pageHTML += "</ul>";
				$('page').innerHTML = pageHTML;
				offSearch();
				if($('form') != null) {
					$('form').innerHTML = "";
				}
			} else {
				$('cont').innerHTML = "<div class='cont_err'>Sorry,未查找到含有“<span>" + name + "</span>”的文章o(╥﹏╥)o</div>";
				$('wed').innerHTML = res.total;
				offSearch();
				if($('form') != null) {
					$('form').innerHTML = "";
				}
			}
		}
	}
	xhr.send(null);
}

//用户登录
function loadin() {
	var xhr = new XMLHttpRequest();
	xhr.open('post', '/admin/login', true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var result = xhr.responseText;
			if(result == 1) {
				alert('登录成功！');
				window.location.replace("../blog-admin/transition.html");
			} else {
				showLoad.innerHTML = "用户名或密码错误！";
			}
		}
	}
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	var data = 'a_name=' + a_name.value + '&a_pwd=' + a_pwd.value;
	xhr.send(data);
}
//根据传递的值获取相关分类的文章列表
function getWord(currentPage, type) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', '/word/getWord?currentPage=' + currentPage + '&type=' + type, true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var res = JSON.parse(xhr.responseText);
			var data = res.data;
			var div = '';
			for(var i = 0; i < data.length; i++) {
				var word = data[i];
				div += "<div class='cont_word'>";
				div += "<a class='cont_a' href='/word.html?wid=" + word.w_id + "' target='_blank'>" + isAuthor() + word.w_title + "</a>";
				div += "<p>" + delHtmlTag(word.w_cont).substr(0, 100) + "...</p>";;
				div+='<div id="cont_date"><span id="cont_read"> '+word.w_read+' </span>阅读 作者：LingMX 发布时间：'+word.w_date+'</div>';
				div += "</div>";

				function isAuthor() {
					if(word.w_isAuthor == 1) {
						return '<span class="cont_y">原</span>';
					} else {
						return '<span class="cont_y nomy">转</span>';
					}
				}
			}
			$('cont').innerHTML = div;
			$('wed').innerHTML = res.total;
			$('cont').innerHTML += '<div id="page"></div>';
			var pageHTML = '';
			var page = res.totalPage;
			pageHTML = "<ul>"
			if(currentPage > 1) {
				pageHTML += "<li class='up' onclick='getWord(" + (Number(currentPage) - 1) + "," + type + ")'>上一页</li>";
				pageHTML += "<li onclick='getWord(" + (Number(currentPage) - 1) + "," + type + ")'>" + (Number(currentPage) - 1) + "</li>";
			} else {
				pageHTML += '<li class="up" onclick="alert(\'已经是第一页了哦\')">上一页</li>';
			}
			pageHTML += "<li onclick='getWord(" + currentPage + "," + type + ")' class='active'>" + currentPage + "</li>";
			if(currentPage < page) {
				pageHTML += "<li onclick='getWord(" + (Number(currentPage) + 1) + "," + type + ")'>" + (Number(currentPage) + 1) + "</li>";
				pageHTML += "<li class='down' onclick='getWord(" + (Number(currentPage) + 1) + "," + type + ")'>下一页</li>";
			} else {
				pageHTML += '<li class="down" onclick="alert(\'已经是最后一页了哦\')">下一页</li>';
			}
			pageHTML += "</ul>";
			$('page').innerHTML = pageHTML;
		}
	}
	xhr.send(null);
}