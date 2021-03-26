/**
 * 真正创建节点, 将 vnode 创建为 dom 
 */

export default function createElement(vnode) {
  let domnode = document.createElement(vnode.sel);
  // 子节点是元素还是文本
  if(vnode.text != '' && (vnode.children === undefined||vnode.children.length === 0)){
    // 内部是文字
    domnode.innerText = vnode.text;
    // 补充 elm属性
  }else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 内部是子节点,需要递归创建
    for (let i = 0; i < vnode.children.length; i++) {
      const ch = vnode.children[i]
      const curDom = createElement(ch)
      domnode.appendChild(curDom)
    }
  }
  
  // 返回elm
  return vnode.elm = domnode;
}