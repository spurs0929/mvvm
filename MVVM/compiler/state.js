import { randomNum } from "../shared/utils";

// 匹配html
const reg_html = /\<.+?\>\{\{(.+?)\}\}\<\/.+?\>/g;
// 匹配標籤名稱
const reg_tag = /\<(.+?)\>/;
// 匹配雙大括號
const reg_var = /\{\{(.+?)\}\}/g;

export const statePool = [];

let o = 0;

export function stateFormat(template, state){
  
  let _state = {};

  // 模板替換
  template = template.replace(reg_html, function(node, key){
    // 標籤名
    const matched = node.match(reg_tag);
    // 隨機標誌
    const _mark = randomNum();

    _state.mark = _mark;
    statePool.push(_state);
    _state = {};

    return `<${matched[1]} data-mark="${_mark}">{{${key}}}</${matched[1]}>`
  });

  // 模板替換
  template = template.replace(reg_var, function(node, key){
    let _var = key.trim();
    const _varArr = _var.split('.');
    let i = 0;

    while(i < _varArr.length){
      _var = state[_varArr[i]];
      i++;
    }

    _state.state = _varArr;
    // 確認statePool state有修改
    statePool[o].state = _varArr;
    o++;

    return _var;
  })
  
  return template;
}