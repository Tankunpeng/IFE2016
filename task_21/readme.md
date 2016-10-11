[TOC]

# task——21
## 任务描述 task_21
>
>* 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
>* 如示例图上方，实现一个tag输入框
>* 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
>* Tag不能有重复的，遇到重复输入的Tag，自动忽视。
>* 每个Tag请做trim处理
>* 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
>* 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
>* 如示例图下方，实现一个兴趣爱好输入的功能
>* 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
>* 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
>* 爱好不能重复，所以在下方呈现前，需要做一个去重
>* 每个爱好内容需要做trim处理
>* 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉



## 任务分解
### 封装原有代码
* 整理代码
* 确定接口

### tag
1. 遇间隔符自动添加tag
2. 去重
3. trim
4. max_num = 10
5. del

### html+css
* 布局

### 兴趣爱好
1.  设定间隔符
2. 去重
3. trim
4. max_num =10

# 技术要点
* DOM操作 e.parentNode
* 事件响应 node.addEventListener("mouseover",function (){})
* js为元素添加类 e.className
* 尽量使用css调整样式
* 元素位置console.log(this.getBoundingClientRect())
* clear-fix 
* 通过调整margin消除浮动元素宽度变化对布局的影响
* 类数组元素使用Array方法：Array.prototype.some.call(taglist[from],function(x){ return x.innerText==num})

