# TODO
## 任务描述 task_18
```
    * 基于任务18
    * 限制输入的数字在10-100
    * 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
    * 队列展现方式变化如图，直接用高度表示数字大小
    * 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料
```

## 任务分解
* 验证数据有效性
* 判断队列是否超限
* 改变队列样式
* 冒泡排序算法

# BUG
* 左侧入后第一次右侧出提示undefined

# 内容
* 5个input，1个文本框，4个按钮
* 分析逻辑，建立函数框架
* 为按钮绑定处理函数
* 事件处理程序中this指代事件目标
* document.createElement("div")
* element.firstChild/ .lastChild
* element.removeChild(child)
* element.appendChild(child)/ .insertBefore

