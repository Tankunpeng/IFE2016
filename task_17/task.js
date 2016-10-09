/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var width;
  if(pageState.nowGraTime=="day") width = 10;
  if(pageState.nowGraTime=="week") width = 20;
  if(pageState.nowGraTime=="month") width = 50;
  var content="";
  for(item in chartData){
  	var bgc = "black";
  	if(chartData[item]<400) var bgc = "red";
  	if(chartData[item]<300) var bgc = "yellow";
  	if(chartData[item]<200) var bgc = "blue";
  	if(chartData[item]<100) var bgc = "green";
  	var div = document.createElement("div")
  	content += '<a href=# title="'+ item+"\n"+chartData[item]+'">'+'<div style="margin:1px;display:inline-block;vertical-align: bottom;width:'+width+
  							"px;height:"+chartData[item]+"px;background-color:"+bgc+
  							'"></div></a>'
  }
  $("aqi-chart-wrap").style.paddingTop = "20px"
  $("aqi-chart-wrap").innerHTML = content
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  list = document.getElementsByName("gra-time");
  var graTime;
  for(var i=0; i < list.length; i++){
  	if (list[i].checked) graTime = list[i].value;
  }
  if(graTime==pageState["nowGraTime"]) return;
  // 设置对应数据
  pageState["nowGraTime"]=graTime
  initAqiChartData()
  // 调用图表渲染函数
  renderChart()
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var citySelect = $("city-select");
  if (pageState.nowSelectCity == citySelect.selectedIndex) {
  	return null;
  }
  	
  // 设置对应数据
  pageState.nowSelectCity = citySelect.selectedIndex;
  initAqiChartData()
  // 调用图表渲染函数
  renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	list = document.getElementsByName("gra-time");
	for(var i=0; i < list.length; i++)
	{
		list[i].onchange = graTimeChange;
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = $("city-select"),
  	  content = "";
  for(i in aqiSourceData){
  	content+="<option>"+i+"</option>"
  }
  citySelect.innerHTML = content;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = aqiSourceData[Object.keys(aqiSourceData)[pageState.nowSelectCity]];
  var newData = {};
  if(pageState["nowGraTime"]=="day"){
  	
  }
  else if(pageState["nowGraTime"]=="week"){
  	var i = 1;
  	var value = 0;
  	var nums = 0;

  	for(daystr in chartData){
      day = new Date(daystr)
  	  if(day.getDay()==0){
  	  	nums++;
  	  	value+=chartData[daystr];
  	  	newData["week"+i] = Math.ceil(value/nums);
  	  	i++; value=0; nums = 0;
  	  }
  	  nums++;
  	  value+=chartData[daystr];
  	}
  	if(value){
  		newData["week"+i] = Math.ceil(value/nums);
  	}
  	chartData = newData;
  }
  else{
  	var i = 1;
  	var value = 0;
  	var nums = 0;

  	for(daystr in chartData){
  	  day = new Date(daystr)
  	  if(day.getMonth()+1!=i){
  	  	newData["month"+i] = Math.ceil(value/nums);
  	  	i++; value=chartData[daystr]; nums = 1;
  	  }
  	  nums++;
  	  value+=chartData[daystr];
  	}
  	if(value){
  		newData["month"+i] = Math.ceil(value/nums);
  	}
  	chartData = newData;
  }
  
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

/**
 * id选择器
 */
function $(id) { return document.getElementById(id); }

onload = init;
