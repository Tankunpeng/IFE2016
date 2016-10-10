/**
 * 创建新节点
 */
function creatdom(num){
  var node = document.createElement("div");
  node.onclick = deldom;
  //node.style.width = "50px"
  //node.style.height = "50px"
  //node.style.lineHeight = "50px"
  //node.style.textAlign = 'center'
  //node.style.margin = "5px"
  node.style.float = "left"
  node.style.backgroundColor = "#f00"
  node.style.color = "rgba(0,0,0,0)"
  node.innerText = num
  //node.innerText.style.display = "none";

  node.style.width = "10px";
  node.style.height = num+"px";
  node.style.margin = "1px";
  //node.style.display = "inline-block";
  node.style.verticalAlign = "bottom";
  node.style.marginTop = 105 - num +"px";
  node.style.lineHeight = "105px"


  return node
}

/**
 * 获取待插入数字
 */
function getNum(){
  return $("num").value;
}

/**
 * push头部元素
 */
function pushHead(){
  //获取待插入数字
  if (vertify()){
  	var num = getNum()
 		//创建新节点
  	var node = creatdom(num)
  	//插入相应位置
  	if(!isfull()){
  		$("wrap").insertBefore(node, $("wrap").firstChild)
  	}
  }
}

/**
 * push尾部元素
 */
function pushTail(){
  //获取待插入数字
  if (vertify()){
  	var num = getNum()
  	//创建新节点
  	var node = creatdom(num)
  	//插入相应位置
		if(!isfull()){
			$("wrap").appendChild(node)
		}  	
  }
}

/**
 *
 */
function isfull(){
	var n = $("wrap").children.length;
	if(n>60){
		alert("队列元素超过60,无法插入")
		return true
	}
	else{return false}
}

/**
 * pop头部元素
 */
function popHead(){
  var head = $("wrap").firstElementChild;
  alert(head.innerText)
  $("wrap").removeChild(head)
}

/**
 * pop尾部元素
 */
function popTail(){
  var tail = $("wrap").lastElementChild;
  alert(tail.innerText)
  $("wrap").removeChild(tail)
}

/**
 * 删除节点
 */
function deldom(){
  $("wrap").removeChild(this)
}

/**
 * 数据验证
 */
function vertify(){
	var num = $("num").value;
  var pattern = /^100$|^[1-9][0-9]$/
  if(!pattern.test(num)) {
  	$("num").value=""
  	//alert("无效数据")
  	$("num").style.backgroundColor = "#ff0"
  	return false
  }
  else{

  	$("num").style.backgroundColor = "#fff"
  	return true
  }
  
}

var select = {};
/**
 *冒泡排序
 */
function sortView(){
	var list = $("wrap").children
	var n = list.length;
	
	while(n){
		//alert(n)
		select = list[0]
		//alert(select)
		for(var i = 1; i<n; i++){
			//alert(select.innerText+"-"+list[i].innerText)
			if(select.innerText>list[i].innerText){
				//select = list[i];
				var newselect = list[i]
				$("wrap").insertBefore(newselect,select)

				//setTimeout(function() {select.style.border="2px solid #00f";}, 10);
			}
			else{
				select.style.border="none";
				select = list[i];
				select.style.border="2px solid #00f";
			}
		}
		n=n-1;
	}
}

var bubleState={
	"list" : [],
	"times" : 0,
	"curr" : 0,
}

/**
 * 冒泡分解
 */
function buble(){

	var list = bubleState.list,
	len = bubleState.list.length,
	times = bubleState.times,
	curr=bubleState.curr
	console.log(curr+"-"+times+"-"+len)
	
	// 如果未排序元素数量大于1个
	if(len - times > 1){
		list[curr].style.backgroundColor = "#00f"
		if(list[curr].innerText > list[curr+1].innerText){
			// 当前节点大于下一节点，互换位置
			$("wrap").insertBefore(list[curr+1],list[curr])
		}
		// buble传递到下一位置
		curr++;
		list[curr].style.backgroundColor = "#00f"
		list[curr-1].style.backgroundColor = "#f00"
		if(curr+1==len-times){
			//curr 指向尾元素,当次排序完成
			//下次冒泡从头元素开始, times+1
			bubleState.curr = 0;
			bubleState.times+=1;
			// 标记完成排序的元素颜色为green
			list[curr].style.backgroundColor = "#0f0"
		}
		else{
			//下次冒泡从下一位置开始
			bubleState.curr = curr;
		}
	}
	else if(len - times){
		bubleState.times+=1;
		// 标记最后一个元素颜色为green
		list[curr].style.backgroundColor = "#0f0"
	}
}

/*
 * 展示当前进度
 */
function show(){}

/*
 *
 */
function synsort(){

	h = setInterval(buble,50);
	clear(h);
}

function clear(idle){
	if(bubleState.times == bubleState.list.length){
		clearInterval(idle);
		bubleState.times = 0;
		bubleState.curr = 0;
		alert("排序完成")
	}
	else{
		setTimeout(clear,200,idle)
	}
}
/**
 * id选择器
 */
function $(id) { return document.getElementById(id); }

/**
 * 初始化函数
 * 为button添加onclick事件处理函数
 */
function init(){
	$("wrap").removeChild($("wrap").firstChild);
  $("lin").onclick=pushHead;
  $("rin").onclick=pushTail;
  $("lout").onclick=popHead;
  $("rout").onclick=popTail;
  $("sort").onclick=synsort;//sortView
  test()
  bubleState.list = $("wrap").children
}

onload = init;

function test(){
	var l = [10,30,40,30,20,50,60,34,56,89,12,46,70,18,10,59]
	for(var i=0; i<l.length; i++){
		var num = l[i]
		var node = creatdom(num)

		$("wrap").appendChild(node)
	}

}