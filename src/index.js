import h from './h';
import patch from './patch';

const container = document.getElementById('container');
const btn = document.getElementById('btn');
const vnode1 = h('ul',{}, [
  h('li',{key: "A"},'A'),
  h('li',{key: "C"},'C'),
  h('li',{key: "B"},'B'),
]);
// const vnode2 = h("ul",{},'haha')

// const vnode1 = h("ul",{},'haha')
const vnode2 =h('ul',{}, [
  h('li',{key: "A"},'A1'),
  h('li',{key: "B"},'B'),
  h('li',{key: "M"},'M'),
  h('li',{key: "N"},'N'),
  h('li',{key: "C"},'C'),
]);
patch(container,vnode1)
btn.onclick = function() {
  patch(vnode1,vnode2)
}

