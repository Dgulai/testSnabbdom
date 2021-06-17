import createElement from './createElement';
import updateChildren from './updateChildren';
/**
 * diff 算法的子节点更新策略
 * 四种命中查找:
 * 1. 新前 和 旧前
 * 2. 新后 和 旧后
 * 3. 新后 和 旧前
 * 4. 新前 和 旧后
 */

export default function(oldVnode,newVnode) {
  /**
   *  新老节点是同一个节点的情况最为复杂 大致步骤如下:
   *  1. 判断 新旧vnode是否为同一个对象, 是的话什么都不做
   *  2. 判断 newVnode 有没有 text 属性  有的话 > 判断新老节点text是否相同 相同不处理  不同的话将老节点的innerText改为新节点的innerText
   *  3. newVnode 没有text属性 有children子节点 则需要再次判断 老节点是否有text和children
   *  4. 老节点有 text 的情况  直接删掉老节点中的text 将新节点中的子节点push进去
   *  5. 老节点没有text但是有children子节点，这种为最复杂的情况 需要进行递归等精细化对比子节点
   */
  if(oldVnode === newVnode) return
  if(newVnode.text !== undefined && (newVnode.children === undefined|| newVnode.children.length===0)) {
    // newVnode 有text属性
    console.log('新vnode有text');
    if(newVnode.text !== oldVnode.text){
      oldVnode.elm.innerText = newVnode.text;
    }
  }else{
    // newVnode 无text属性
    // 判断老节点有没有children
    if(oldVnode.children!==undefined && oldVnode.children.length > 0){
      // 老节点有children 此处为最复杂的情况
      updateChildren(oldVnode.elm,oldVnode.children,newVnode.children);
    }else{
      // 老的有text 新的有children
      // 1 清空老节点text 追加新节点children
      oldVnode.elm.innerText = ""
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom)
      }
    }
  }
  
}