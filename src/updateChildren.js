import patchVnode from './patchVnode';
import createElement from './createElement'
/**
 * 
 * @param {document} parentElm 父节点
 * @param {object} oldCh 老节点的children
 * @param {object} newCh 新节点的children
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  /**
   * diff 算法的子节点更新策略(四个指针)
   * 四种命中查找:
   * 1. 新前 和 旧前
   * 2. 新后 和 旧后
   * 3. 新后 和 旧前
   * 4. 新前 和 旧后
   */
  // 旧前
  let oldStartIdx = 0; 
  // 新前
  let newStartIdx = 0; 
  // 旧后
  let oldEndIdx = oldCh.length -1; 
  // 新后
  let newEndIdx = newCh.length -1;  
  // 旧前节点
  let oldStartVnode = oldCh[oldStartIdx];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx]; 
  // 新前节点
  let newStartVnode = newCh[newStartIdx]; 
  // 新后节点
  let newEndVnode = newCh[newEndIdx]; 

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if(checkSameVnode(oldStartVnode,newStartVnode)){
      console.log("1️⃣");
      // 新前 === 旧前 命中
      patchVnode(oldStartVnode,newStartVnode);
      // 指针后移
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    }else if(checkSameVnode(oldEndVnode,newEndVnode)){
      console.log("2️⃣");
      // 新后 === 旧后 命中
      patchVnode(oldEndVnode,newEndVnode);
      // 指针上移
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    }else if(checkSameVnode(oldStartVnode,newEndVnode)){
      console.log("3️⃣");
      // 新后 === 旧前 命中
      patchVnode(oldStartVnode,newEndVnode);
      // 当 新后 和 旧前 命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling)
      // 指针移动
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    }else if(checkSameVnode(oldEndVnode,newStartVnode)){
      console.log("4️⃣");
      // 新前 === 旧后 命中
      patchVnode(oldEndVnode,newStartVnode);
      // 当 新前 和 旧后 命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧前的前面
      parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm)
      // 指针移动
      oldEndVnode = oldCh[--oldStartIdx];
      newStartIdx = newCh[++newEndIdx];
    }else{
      // 四种策略都没有匹配到
    }
  }

}

// 检测两个节点是否是同一个虚拟节点
function checkSameVnode(a,b){
  return a.sel === b.sel && a.key === b.key;
}