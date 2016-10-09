
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = $("aqi-city-input").value.trim(),
		cqi = $("aqi-value-input").value.trim();
	if(vertify(city,cqi)){
		aqiData[city]=cqi;
	}

}

/**
 * 验证用户输入
 */
function vertify(city,cqi){
	var pattern_num = /0|^[1-9]\d*$/;
	var pattern_str = /^[a-zA-Z\u4e00-\u9fa5]+$|^[a-zA-Z]+ ?[a-zA-Z]+$/;
	if(pattern_str.test(city)){
		if($("aqi-city-input").nextElementSibling){$("aqi-city-input").parentNode.removeChild(
				$("aqi-city-input").nextElementSibling)}
		if(pattern_num.test(cqi)){
			if($("aqi-value-input").nextElementSibling){$("aqi-value-input").parentNode.removeChild(
				$("aqi-value-input").nextElementSibling)}
			return true;
		}
		else{
			console.log("空气质量指数必须为整数");
			if(!$("aqi-value-input").nextElementSibling){
			var span = document.createElement("span");
			span.innerText = "空气质量指数必须为整数"
			span.style="{color:red}"
			$("aqi-value-input").parentNode.appendChild(span);}
			}
	}
	else{
		console.log("城市名必须为中英文字符");
		if(!$("aqi-city-input").nextElementSibling){
		var span = document.createElement("span");
		span.innerText = "城市名必须为中英文字符"
		span.style="{color:red}"
		$("aqi-city-input").parentNode.appendChild(span);}
			
	}
	return null;	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	console.log(aqiData)
	var content="<tr>\
      <td>城市</td><td>空气质量</td><td>操作</td>\
    </tr>"
	for(key in aqiData){
		content+="<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td><button>删除</button></td></tr>"
	}
	$("aqi-table").innerHTML = content;
	var table = $("aqi-table").getElementsByTagName("tr")
	for(var i=1; i<table.length; i++){
		table[i].getElementsByTagName("button")[0].onclick = (function () {
			var city = table[i].getElementsByTagName("td")[0].innerText;
			return function(){
				delete aqiData[city];
				renderAqiList()
				console.log(city+"数据已删除");
			};
		}())
	}
}

function delcity(city){

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $("add-btn").onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

/**
 * 封装DOM获取函数
 */
 function $(id){
 	return document.getElementById(id);
 }

init();