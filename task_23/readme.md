[TOC]

# [task——23](http://ife.baidu.com/task/detail?taskId=23)
## 任务描述 task_23
 
>    基于任务22，参考[示例图](http://7xrp04.com1.z0.glb.clouddn.com/task_2_23_1.jpg)，将二叉树变成了多叉树，并且每一个节点中带有内容
>    提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
>    当前被遍历到的节点做一个特殊显示（比如不同的颜色）
>    每隔一段时间（500ms，1s等时间自定）再遍历下一个节点
>    增加一个输入框及一个“查询”按钮，点击按钮时，开始在树中以动画形式查找节点内容和输入框中内容一致的节点，找到后以特殊样式显示该节点，找不到的话给出找不到的提示。查询过程中的展示过程和遍历过程保持一致




## 任务分解
* 从前有一个多叉树
* 多叉树遍历算法
* 算法可视化
* 分解算法，用时间间隔触发迭代，以满足可视化效果

# 技术要点
* 多叉树遍历与二叉树遍历的关系
* 布局调整：flexbox布局

# 知识点学习
## flexbox
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties#flexbox-container-properties)
[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)


### 概念
- 通过设置其内元素宽高，实现对可用显示空间最佳填充的能力
- 内元素可扩张填充，或者收缩适应
- 可以响应视口的方向旋转、调整大小、拉伸、收缩
- 用于应用程序组件及小规模布局，栅格布局针对大规模布局

*比较*
*块布局* 垂直方向顺序布局
*行内布局* 水平方向顺序布局

### 名词

- 弹性容器(Flex container)
包含着弹性项目的父元素。通过设置 display 属性的值为 flex 或 inline-flex 来定义弹性容器。
- 弹性项目(Flex item)
弹性容器的每个子元素都称为弹性项目。弹性容器直接包含的文本将被包覆成匿名弹性单元。
- 轴(Axis)
每个弹性框布局包含两个轴。弹性项目沿其依次排列的那根轴称为主轴(main axis)。垂直于主轴的那根轴称为侧轴(cross axis)。
    - flex-direction 确立主轴。
    - justify-content 定义了在当前行上，弹性项目沿主轴如何排布。
    - align-items 定义了在当前行上，弹性项目沿侧轴默认如何排布。
    - align-self 定义了单个弹性项目在侧轴上应当如何对齐，这个定义会覆盖由 - align-items 所确立的默认值。

### 属性
- display: flex; /* or inline-flex */
- flex-direction：row | row-reverse | column | column-reverse;
- flex-wrap: nowrap | wrap | wrap-reverse;
- flex-flow: <‘flex-direction’> || <‘flex-wrap’>
- justify-content: flex-start | flex-end | center | space-between | space-around;
- align-items: flex-start | flex-end | center | baseline | stretch;
- align-content: flex-start | flex-end | center | space-between | space-around | stretch;

- order:  <integer>; /* default in the source order */
- flex-grow: <number>; /* default 0 */
- flex-shrink: <number>; /* default 1 */
- flex-basis: <length> | auto; /* default auto */
- flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]/* default 0 1 auto */
- align-self: auto | flex-start | flex-end | center | baseline | stretch;

### 要点
- Note that float, clear and vertical-align have no effect on a flex item.
