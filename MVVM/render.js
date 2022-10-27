import { bindEvent } from "./compiler/event";
import { eventFormat, stateFormat } from "./index";

// 掛載函數
export function useDOM({ template, state, methods }, rootDOM){
  rootDOM.innerHTML = render(template, state);
  // 綁定事件處理函數
  bindEvent(methods);
}

// 渲染函數
export function render(template, state){
  
  // 處理事件
  template = eventFormat(template);
  // 處理狀態
  template = stateFormat(template, state);
  
  return template;
}

export function update(statePool, key, value){
  const allElements = document.querySelectorAll('*');
  let oItem = null;

  statePool.forEach(item => {
    if(item.state[item.state.length - 1] === key){
      for(let i = 0; i < allElements.length; i++){
        oItem = allElements[i];
        const _mark = parseInt(oItem.dataset.mark);

        if(item.mark === _mark){
          oItem.innerHTML = value;
        }
      }
    }
  })
}