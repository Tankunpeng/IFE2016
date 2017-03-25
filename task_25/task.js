/**
 * id选择器
 */
function $(id) { return document.getElementById(id); }

// 
function log(ele){
  if(typeof ele ==="string"){
    console.log(ele)
    return
  }
  console.log(ele.firstChild.textContent.trim())
}

function travArr(arr){
  for(var i in arr){
    log(arr[i])
  }
}

function hasSubitem(node){
  if(node.getElementsByTagName("div").length){
    return true
  }
  return false
}

function show(event){
  node = event.target;
  if(node.className === "showicon"){
    node.className = "collapsicon";
    node.parentNode.className += " collapsed"
  }
  else{
    node.className = "showicon";
    console.log(node.parentNode.className)
    node.parentNode.className =
        node.parentNode.className.replace("collapsed","").trim();
  }
  event.stopPropagation();
  return false
}

function initclapse(node){
  var col = document.createElement("span")
  col.className = "showicon"
  col.addEventListener("click", show)
  if(node.nodeName === "DIV"){
  if(hasSubitem(node)){
    node.className+=" container"
    node.insertBefore(col,node.firstChild)

  }
  else{
    node.className+=" items"
    log(node.className)
  }}
}


var menudata = {}

/**
 * 可视化方法
 */
function view(node){
  node.className += " selected"
}

/**
 * stepControl
 */
function stepcontrol(fun,args){

  var stepfun = fun(args);
  var delay = 1000/$("speed").value  ;
  var interval = setInterval(stepfun,delay,args);

  // 轮询步进进度
  setTimeout(function clear(interval){

    // 如果函数标记为完成，则结束迭代
    if(stepfun.isover){
      clearInterval(interval);
      alert("遍历结束")

      // 调用清理函数
      if(stepfun.clear){
        setTimeout(stepfun.clear(), 0)
      }
    }
    else{
      setTimeout(clear,delay,interval)
    }
  }, delay, interval);
}

function travsyn(root,view){
  var trav = traverse([root,view,"broad"])
  while(!trav.isover){
    trav()
  }
}

/**
 * traverse 遍历节点
 */
function traverse(args){
  
  var g_binroot = args[0],
      visit = args[1],
      g_stack = [],
      g_traved = [],
      isover = false,
      method = typeof args[2]==="string"? args[2]:args[2](),
      trav = _travorder(method);

  console.log("[METHOD] = " +method)

  // 分步遍历子函数
  function travbroad_step(){

    if (g_traved.length){
      //g_traved[0].className += "traved"
    }
    //console.log(g_binroot.firstChild.textContent.trim())

    if(trav()<0)
    {
      if(!isover){
        isover = true;
        travbroad_step.isover = isover;
      }
    }
  }

  // 定义遍历算法： 广度优先、深度优先
  function _travorder(method){
    if(method === "broad") {

      // 广度优先遍历
      return function(){
        visit(g_binroot)
        g_traved.unshift(g_binroot)
        if(g_binroot.firstElementChild){ //有儿子可以留下
          g_stack.push(g_binroot)
        }
        if(g_binroot.nextElementSibling) { //先去找兄弟
          g_binroot = g_binroot.nextElementSibling
          return 1
        }
        else if(g_stack.length){  //不行再找儿子
          g_binroot = g_stack.shift().firstElementChild;
          return 2
        } //都没了，就回家
        else {
          return -1
        }}}
    else{

      // 深度优先遍历
      return function(){
        visit(g_binroot)
        g_traved.unshift(g_binroot)
        if(g_binroot.nextElementSibling){ //有兄弟可以留下
          g_stack.push(g_binroot)
        }
        if(g_binroot.firstElementChild) { // 先去找儿子
          g_binroot = g_binroot.firstElementChild
          return 1
        }
        else if(g_stack.length){  //不行再找兄弟
          g_binroot = g_stack.pop().nextElementSibling;
          return 2
        } //都没了，就回家
        else {
          return -1
        }}}
  }
  
  // 遍历状态标记
  travbroad_step.isover = isover;

  // 为函数添加清理属性
  travbroad_step.clear = function(){
    while(g_traved.length){
      var node = g_traved.pop();
      var classlist = node.className.split(" ");
      classlist.length -=1; 
      node.className=classlist.join(" ");
    }
  };

  return travbroad_step
}



/**
 * 绑定参数，柯里化
 */
function travhandle(){

  // 初始化遍历算法、多叉树、可视化方法
  var foot = $("bin-root");
  var visit = view

  // 选择遍历方法
  function getmethod(){
    return  $("trav-method").children[$("trav-method").selectedIndex].value
  }

  return function(){
      return stepcontrol(traverse,[foot,visit,getmethod])
    }
}

function addelement(event){
  if(!selected.length) return
  var node = selected[0]
  var text = $("addtxt").value
  var ele = document.createElement("div")
  ele.innerText = text;
  node.appendChild(ele)

  
}

selected = []

function delelement(event){
  travArr(selected)
  if(!selected.length) return
  var node = selected[0]
  node.parentNode.removeChild(node);
  selected.shift();
  
}

function select(){
  
  return function(event){

    var envent = event || window.event;
    var node = event.target;
    var cname = node.className;
    var lastnode = selected[0];
    if(node == lastnode){
      if(cname.indexOf("selected") === -1){
         node.className = cname+=" selected";
         selected.push(node)
      }
      else{
        node.className = cname.replace("selected","").trim();
        selected.pop(node)
      }
    }
    else{
      node.className = cname+=" selected";
      selected.push(node)
      if(lastnode){
        lastnode.className = lastnode.className.replace("selected","").trim();
        selected.shift(node)
      }
    }
    
    log(node)
  }
}

function textContent(e) {
  var child, type, s = "";
  for(child = e.firstChild; child != null; child = child.nextSibling){
    type = child.nodeType;
    if(type === 3 || type ===4)
      s += child.nodeValue;
  }
  return s;
}

function showParent(node){
  while(node.parentNode != $("bin-tree")){
    node = node.parentNode;
    if(node.getElementsByTagName("span")){
      var icon = node.getElementsByTagName("span")[0];
      node.className =
        node.className.replace("collapsed","").trim();
      icon.className = "showicon";
    }
  }
}


function findelement(){
  var txt = $("findtxt").value
  var node = $("bin-root")
  travsyn(node,find)

  function find(node){
    // 当前结点是items/container
    if(node.nodeName==="DIV"){
      var nodename = textContent(node);
      if(nodename.indexOf(txt)!== -1){
        node.className += " selected"
        showParent(node);
        selected.push(node);
      }
    }
  }
}

function open(node){
  node.className = "showicon";
  console.log(node.parentNode.className)
  var parent = node.parentNode;
  parent.className = parent.className.replace("collapsed","").trim();
}

function showall(){
  var root = selected.lenth ? selected[0]:$("bin-root");
  function show(node){
    if(node.className.indexOf("collapsicon") !== -1)
      open(node)
  }
  travsyn(root,show)
}

/**
 * 初始化函数
 */
function init(){
  $("bin-root").addEventListener("click", select())
  $("traverse").addEventListener("click", travhandle())
  $("addbt").addEventListener("click", addelement)
  $("delbt").addEventListener("click", delelement)
  $("findbt").addEventListener("click", findelement)
  $("showallbt").addEventListener("click", showall)
  travsyn($("bin-root"),initclapse)
}

onload = init;