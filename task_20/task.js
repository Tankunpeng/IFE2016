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
  var pattern = /[^\w\u4e00-\u9fa5]/
  return $("text").value.split(pattern);
}

/**
 * push头部元素
 */
function pushHead(){
  //获取待插入数字
  var list = getNum()
  for(var i=0; i<list.length; i++){
    num = list[i]
    if(num){
    //创建新节点
    var node = creatdom(num)
    //插入相应位置
    $("wrap").insertBefore(node, $("wrap").firstChild)}
  }
  
}

/**
 * push尾部元素
 */
function pushTail(){
  //获取待插入数字
  var list = getNum()
  for(var i=0; i<list.length; i++){
    num = list[i]
    if(num){
    //创建新节点
    var node = creatdom(num)
    //插入相应位置
    $("wrap").appendChild(node)}
  }
}


/**
 * pop头部元素
 */
function popHead(){
  var head = $("wrap").firstChild;
  alert(head.innerText)
  $("wrap").removeChild(head)
}

/**
 * pop尾部元素
 */
function popTail(){
  var tail = $("wrap").lastChild;
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
 * 查询
 */
function find(){
  var word = new RegExp( $("word").value);
  for(var i = 0; i < $("wrap").children.length; i++){
    var text = $("wrap").children[i].innerText  
    if(word.test(text)){
      //标记匹配元素
      var spantext = text.split(word)
      $("wrap").children[i].style.backgroundColor = "#ff0"
      $("wrap").children[i].style.color = "#f00"
      $("wrap").children[i].innerHTML = spantext.join("<mark>"+$("word").value+"</mark>")
    }
    else{
      //恢复原有样式
      $("wrap").children[i].style.backgroundColor = "#f00"
      $("wrap").children[i].style.color = "#fff"
      $("wrap").children[i].innerHTML = text
    }
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
  $("lin").onclick=pushHead
  $("rin").onclick=pushTail
  $("lout").onclick=popHead
  $("rout").onclick=popTail
  $("find").onclick=find
  $("wrap").removeChild($("wrap").firstChild)
}

onload = init;