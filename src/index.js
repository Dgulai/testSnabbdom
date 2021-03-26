import h from './h';
import patch from './patch';

const container = document.getElementById('container');
const btn = document.getElementById('btn');
const vnode1 = h('ul',{}, [
  h('li',{},'haha'),
  h('li',{},'haha'),
  h('li',{},'haha'),
  h('li',{},'haha'),
]);
const vnode2 = h("ul",{},'haha')
patch(container,vnode1)
btn.onclick = function() {
  patch(vnode1,vnode2)
}

