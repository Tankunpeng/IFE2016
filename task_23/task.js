/**
 * 可视化方法
 */
function view(node){
  node.className = "selected"
}


/**
 * traverse
 */
function traverse(){
  // 初始化遍历算法、二叉树、可视化方法
  var method = $("trav-method").children[$("trav-method").selectedIndex].value
  var fun = eval("trav"+method);
  var binroot = $("bin-root")
  
  // 开始遍历
  fun(binroot,view)
}


/**
 * travbroad 广度优先遍历 迭代展开版
 */
var g_binroot,g_stack,g_traved,isover;
function travbroad(binroot,visit){
  console.log("broad")
  g_binroot = binroot;
  g_stack = [];
  g_traved = [];
  isover = false;
  var delay = 1000/$("speed").value  
  var interval = setInterval(travbroad_step,delay,visit)
  setTimeout(function clear(interval){
    if(isover){
      clearInterval(interval);
      alert("遍历结束")
      while(g_traved.length){
        var node = g_traved.pop()
        node.className=""
      }
    }
    else{
      setTimeout(clear,delay,interval)
    }
  },delay,interval)

}
function travbroad_step(visit){
  if (g_traved.length){
    g_traved[0].className = "traved"
  }
  console.log(g_binroot.firstChild.textContent.trim())
  visit(g_binroot)
  g_traved.unshift(g_binroot)
  if(g_binroot.firstElementChild){ //有儿子可以留下
    g_stack.push(g_binroot)
  }
  if(g_binroot.nextElementSibling) { //先去找兄弟
    g_binroot = g_binroot.nextElementSibling
  }
  else if(g_stack.length){  //不行再找儿子
    g_binroot = g_stack.shift().firstElementChild;
  } //都没了，就回家
  else{
    if(!isover){
      isover = true;
    }

    
  }
}

/**
 * travdepth 深度优先遍历 迭代展开版
 */
function travdepth(binroot,visit){
  console.log("depth")
  g_binroot = binroot;
  g_stack = [];
  g_traved = [];
  isover = false;
  var delay = 1000/$("speed").value  
  var interval = setInterval(travdepth_step,delay,visit)
  setTimeout(function clear(interval){
    if(isover){
      clearInterval(interval);
      alert("遍历结束")
      while(g_traved.length){
        var node = g_traved.pop()
        node.className=""
      }
    }
    else{
      setTimeout(clear,delay,interval)
    }
  },delay,interval)
}
function travdepth_step(visit){
  if (g_traved.length){
    g_traved[0].className = "traved"
  }
  console.log(g_binroot.firstChild.textContent.trim())
  visit(g_binroot)
  g_traved.unshift(g_binroot)
  if(g_binroot.nextElementSibling){ //有兄弟可以留下
    g_stack.push(g_binroot)
  }
  if(g_binroot.firstElementChild) { //先去找儿子
    g_binroot = g_binroot.firstElementChild
  }
  else if(g_stack.length){  //不行再找兄弟
    g_binroot = g_stack.pop().nextElementSibling;
  } //都没了，就回家
  else{
    if(!isover){
      isover = true;
    }
  }
  
}


/**
 * id选择器
 */
function $(id) { return document.getElementById(id); }

/**
 * 初始化函数
 */
function init(){
  $("traverse").addEventListener("click",traverse)
}

onload = init;