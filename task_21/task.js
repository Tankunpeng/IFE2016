/**
 * 创建新节点
 */
function creatdom(num){
  var node = document.createElement("div");
  
  //node.style.width = "50px"
  node.style.height = "30px"
  node.style.lineHeight = "30px"
  node.style.textAlign = 'center'
  //node.style.margin = "5px"
  //node.style.padding = "0px 5px"
  node.style.float = "left"
  //node.style.backgroundColor = "#f00"
  node.style.color = "#fff"
  node.innerText = num
  return node
}

/**
 * taglist
 */
var taglist = {"favor":[],"tag":[]}

/**
 * favorlist
 */ 
var favorlist = []

/**
 * 获取待插入数字
 */
function getNum(id){
  var pattern = /[^\w\u4e00-\u9fa5]/
  return $(id).value.split(pattern);
}

/**
 * push头部元素
 */
function pushHead(){
  //获取待插入数字
  var list = getNum("favor")
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
function pushTail(from,to){
  //获取待插入数字
  var list = getNum(from)
  for(var i=0; i<list.length; i++){
    num = list[i]
    taglist[from]=$(to).children
    if(num && !Array.prototype.some.call(taglist[from],function(x){ return x.innerText==num}) ){

      //taglist[from].push(num)
      //创建新节点
      var node = creatdom(num)

      //插入相应位置
      $(to).appendChild(node)
      //添加点击事件
      node.className = from+"-item"
      node.onclick = deldom;
      node.addEventListener("mouseover",function (){
        //this.innerText="点击删除"+this.innerText;
        //console.log(this.getBoundingClientRect())
        this.className="hover-item"})
      node.addEventListener("mouseout",function (){
        //this.innerText=this.innerText.slice(4);
        this.className=from+"-item"})
      if($(to).children.length>10){
        //alert(taglist[from][0].innerText)
        //Array.prototype.shift.call(taglist[from])
        $(to).removeChild($(to).firstChild)
      }
    }
  }
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
  this.parentNode.removeChild(this)
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
 * tag
 */
function tag(e){
  //alert(e.data)
  //alert(e.data == "," ||e.data == "，" || e.data ==" ")
  if(e.data == "," ||e.data == "，" || e.data ==" " || e.charCode==13 || e.keyCode==13){
    //alert(e.data+e.data == "," ||e.data == "，" || e.data ==" ")
    e.returnValue = false
    pushTail("tag","wrap-tag")
    this.value=""
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
  //$("lin").onclick=pushHead
  $("rin").onclick=function (){return pushTail("favor","wrap-favor")}
  //$("lout").onclick=popHead
  //$("rout").onclick=popTail
  //$("find").onclick=find
  $("tag").addEventListener("textInput",tag,false)
  $("tag").addEventListener("keypress",tag,false)
  taglist["tag"]=$("wrap-tag").children
  taglist["favor"]=$("wrap-favor").children
  //$("tag").ontextInput = tag
}

onload = init;