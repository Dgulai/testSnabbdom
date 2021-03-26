import Vnode from './vnode';
import createElement from './createElement';
// diff算法阉割版
export default function(oldVnode, newVnode) {
  // 判断 oldVnode 是 dom 还是 vnode
  if(oldVnode.sel ==''||oldVnode.sel == undefined){
    // dom节点  需要包装成 vnode
    oldVnode = Vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
    console.log(oldVnode);
  }
  // 判断 oldvnode和 newvnode 是否为同一个节点
  if(oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel){
    console.log('是同一个节点');
    /**
     *  1. 判断 新旧vnode是否为同一个对象, 是的话什么都不做
     *  2. 判断 newVnode 有没有 text 属性
     *  3. 
     */
    if(oldVnode === newVnode) return
    if(newVnode.text !== undefined && (newVnode.children === undefined|| newVnode.children.length===0)) {
      // newVnode 有text属性
      console.log('新vnode有text');
    }else{
      // newVnode 无text属性
    }
  }else{
    // 不是同一个节点 暴力删除并插入新节点
    console.log('不是同一个节点');
    const newVnodeDom = createElement(newVnode);
    newVnodeDom && oldVnode.elm.parentNode.insertBefore(newVnodeDom,oldVnode.elm)
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}