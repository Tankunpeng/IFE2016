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
 * travIn_R 中序遍历 递归版
 */
function travIn_Rd(binroot,visit){
  if (!binroot) return;
  travIn_R(binroot.firstElementChild,visit);
  visit(binroot);
  travIn_R(binroot.lastElementChild,visit);
}
/**
 * travPre_R 先序遍历 迭代版
 */
function travPre_Rd(binroot,visit){
  var stack = [];
  while(true){
    (function visitAlongLeftBranch(x) {
      while(x){
        visit(x);
        stack.push(x.lastElementChild);
        x = x.firstElementChild;
      }
    })(binroot);
    if (stack.empty()) break;
    binroot = stack.pop();
  }
}

/**
 * travPre_R 先序遍历 迭代展开版
 */
var g_binroot,g_stack,g_traved,isover;
function travPre_R(binroot,visit){
  g_binroot = binroot;
  g_stack = [];
  g_traved = [];
  isover = false;
  var delay = 1000/$("speed").value  
  var interval = setInterval(travPre_Rstep,delay,visit)
  setTimeout(function clear(interval){
    if(isover){
      clearInterval(interval);
    }
    else{
      setTimeout(clear,delay,interval)
    }
  },delay,interval)
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