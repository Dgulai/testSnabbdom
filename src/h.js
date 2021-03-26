import vnode from './vnode';

/**
 * 低配 h 函数, 必须接受3个参数, 以下为固定调用形态:
 * h('div',{},'text')
 * h('div',{}, [])
 * h('div',{}, h(...))
 * 
 */

export default function(sel, data, unknow) {
  // 检查参数个数
  if(arguments.length != 3) throw Error('对不起, 这是低配版h函数,必须传入3个参数!')
  // 检查参数 c 的类型
  if(typeof unknow === 'string' || typeof unknow === 'number') {
    // h('div',{},'text')
    return vnode(sel,data,undefined, unknow, undefined )
  }else if(Array.isArray(unknow)){
    // h('div',{}, [])
    let children = [];
    for (let i = 0; i < unknow.length; i++) {
      // 检查 unknow[i] 必须是一个对象
      if(!(typeof unknow[i] === 'object' && unknow[i].hasOwnProperty('sel'))) throw Error('数组内的参数不是h函数')
      // 收集 children
      children.push(unknow[i])
    }
    return vnode(sel,data,children,undefined,undefined)
  }else if(typeof unknow === 'object' && unknow.hasOwnProperty('sel')){
    // h('div',{}, h(...))
    let children = [unknow];
    return vnode(sel,data,children,undefined,undefined)
  }else {
    throw Error('第三个参数类型错误!')
  }
}