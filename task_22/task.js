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

function  travPre_Rstep(visit){
  console.log(g_binroot+"-"+g_stack.length)
  if (g_traved.length){
    g_traved[0].className = "traved"
  }
  if (g_binroot){//visitAlongLeftBranch
    visit(g_binroot);
    g_traved.unshift(g_binroot);
    g_stack.push(g_binroot.lastElementChild);
    g_binroot = g_binroot.firstElementChild;
  }
  else if(g_stack.length){
    g_binroot = g_stack.pop();
  }
  else{ //遍历结束
    if(!isover){
      while(g_traved.length){
        var node = g_traved.pop()
        node.className=""
      }
      isover = true;
      alert("遍历结束")
    } 
  }
}


/**
 * travIn_R 中序遍历 迭代展开版
 */
function travIn_R(binroot,visit){
  g_binroot = binroot;
  g_stack = [];
  g_traved = [];
  isover = false;
  var delay = 1000/$("speed").value  
  
  var interval = setInterval(travIn_Rstep,delay,visit)
  setTimeout(function clear(interval){
    if(isover){
      clearInterval(interval);
    }
    else{
      setTimeout(clear,delay,interval)
    }
  },delay,interval)
}

function  travIn_Rstep(visit){
  console.log(g_binroot+"-"+g_stack.length)
  if (g_traved.length){
    g_traved[0].className = "traved"
  }
  if (g_binroot){//visitAlongLeftBranch
    //visit(g_binroot);
    //g_traved.unshift(g_binroot);
    g_stack.push(g_binroot);//当前结点入栈
    g_binroot = g_binroot.firstElementChild;
  }
  else if(g_stack.length){
    g_binroot = g_stack.pop();
    visit(g_binroot);
    g_traved.unshift(g_binroot);
    g_binroot = g_binroot.lastElementChild;
  }
  else{ //遍历结束
    if(!isover){
      while(g_traved.length){
        var node = g_traved.pop()
        node.className=""
      }
      isover = true;
      alert("遍历结束")
    } 
  }
}

/**
 * travPost_R 后序遍历 迭代展开版
 */
function travPost_R(binroot,visit){
  g_binroot = binroot;
  g_stack = [];
  g_traved = [];
  isover = false;
  var delay = 1000/$("speed").value  
  
  if(binroot) g_stack.unshift(binroot);//根节点入栈
  var interval = setInterval(travPost_Rstep,delay,visit)
  setTimeout(function clear(interval){
    if(isover){
      clearInterval(interval);
    }
    else{
      setTimeout(clear,delay,interval)
    }
  },delay,interval)
}

function  travPost_Rstep(visit){
  console.log(g_binroot+"-"+g_stack.length)
  if (g_traved.length){
    g_traved[0].className = "traved"
  }
  
  if(g_stack.length && g_stack[0]!=g_binroot.parentNode && g_stack[0]){//在其右兄为根子树中找到HLVFL
    
    var x = g_stack[0];
    if(x.firstElementChild){
      if(x.lastElementChild) g_stack.unshift(x.lastElementChild);
      g_stack.unshift(x.firstElementChild);
    }
    else{
      g_stack.unshift(x.lastElementChild);
    }
  }
  else if (g_stack.length ){//
    if(!g_stack[0]) g_stack.shift();
    g_binroot = g_stack.shift()
    visit(g_binroot);
    g_traved.unshift(g_binroot);}
  
  else{ //遍历结束
    if(!isover){
      while(g_traved.length){
        var node = g_traved.pop()
        node.className=""
      }
      isover = true;
      alert("遍历结束")
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