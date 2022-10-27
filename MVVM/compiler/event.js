import { checkType, randomNum } from "../shared/utils";

// 正則匹配onClick="xxx"
const reg_onClick = /onClick\=\"(.+?)\"/g;

// 正則匹配函數名稱 
const reg_fnName = /^(.+?)\(/;

// 正則匹配argument
const reg_arg = /\((.+?)\)/;


const eventPool = [];

// 處理template onClick事件
export function eventFormat(template) {
  return template.replace(reg_onClick, function(node, key){
    const _mark = randomNum();

    eventPool.push({
      mark: _mark,
      handler: key.trim(),
      type: 'click'
    });

    return `data-mark="${_mark}"`;
  });
}

export function bindEvent(methods){
  const allElements = document.querySelectorAll('*');
  let oItem = null;
  let _mark = 0;

  eventPool.forEach(event => {
    for(let i = 0; i < allElements.length; i++){
      oItem = allElements[i];
      _mark = parseInt(oItem.dataset.mark);

      // html標籤上有data-mark標誌綁定事件處理函數
      if(event.mark === _mark){

        oItem.addEventListener(event.type, function(){
          // 函數名稱
          const fnName = event.handler.match(reg_fnName)[1];
          // 函數實參
          const arg = checkType(event.handler.match(reg_arg)[1]);
          
          methods[fnName](arg);
        }, false)
      }

    }
  });
}