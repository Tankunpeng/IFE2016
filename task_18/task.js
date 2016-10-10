/**
 * 创建新节点
 */
function creatdom(num){
  var node = document.createElement("div");
  node.onclick = deldom;
  node.style.width = "50px"
  node.style.height = "50px"
  node.style.lineHeight = "50px"
  node.style.textAlign = 'center'
  node.style.margin = "5px"
  node.style.float = "left"
  node.style.backgroundColor = "#f00"
  node.style.color = "#fff"
  node.innerText = num
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
  var num = getNum()
  //创建新节点
  var node = creatdom(num)
  //插入相应位置
  $("wrap").insertBefore(node, $("wrap").firstChild)
}

/**
 * push尾部元素
 */
function pushTail(){
  //获取待插入数字
  var num = getNum()
  //创建新节点
  var node = creatdom(num)
  //插入相应位置
  $("wrap").appendChild(node)
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
 * id选择器
 */
function $(id) { return document.getElementById(id); }

/**
 * 初始化函数
 * 为button添加onclick事件处理函数
 */
function init(){
  $("lin").onclick=pushHead
  $("rin").onclick=pushTail
  $("lout").onclick=popHead
  $("rout").onclick=popTail
  //$("wrap").removeChild($("wrap").firstChild)
}

onload = init;