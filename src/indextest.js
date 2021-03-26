import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes
import hh from './h'
console.log(hh('div',{},[
  hh('p',{},'123'),
  hh('p',{},'456'),
  hh('p',{},hh('span',{},'aaa')),
]));
// // 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])
// const mVnode = h('a',{props: {href:"https://www.baidu.com"}}, 'Gulai')
// console.log(mVnode);
// // 让虚拟节点上树
const container = document.getElementById("container")
// patch(container,mVnode)
const btn = document.getElementById('btn');
const vnode1 = h('ul',{},[
  h('li', {key:'A'}, 'A'),
  h('li', {key:'B'}, 'B'),
  h('li', {key:'C'}, 'C'),
  h('li', {key:'D'}, 'D')
])
patch(container,vnode1)
const vnode2 = h('ul',{},[
  h('li', {key:'A'}, 'A'),
  h('li', {key:'B'}, 'B'),
  h('li', {key:'C'}, 'C'),
  h('li', {key:'D'}, 'D'),
])
// 点击按钮将vnode1变为vnode2
btn.onclick = function(){
  patch(vnode1,vnode2)
} 