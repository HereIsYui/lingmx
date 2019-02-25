var wordClass=location.search.substr(5);
var ContTitle=$("content").children[0].children[0];
console.log(ContTitle);
function $(id){
	return document.getElementById(id);
}
switch (wordClass){
	case '1':
		document.title="Web前端|LMX的私密小屋";
		ContTitle.innerHTML="Web前端";
		break;
	case '2':
		document.title="闲文杂谈|LMX的私密小屋";
		ContTitle.innerHTML="闲文杂谈";
		break;
	case '3':
		document.title="否头笑谱|LMX的私密小屋";
		ContTitle.innerHTML="否头笑谱";
		break;
	case '4':
		document.title="U3D记录|LMX的私密小屋";
		ContTitle.innerHTML="U3D记录";
		break;
}
window.onload=function(){
	getWord(1,wordClass);
}

