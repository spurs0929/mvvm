// 正則匹配'' ""
const reg_check_str = /^[\'|\"].*?[\'|\"]$/;
// 正則匹配' "
const reg_str = /[\'|\"]/g;

// 判斷value是否為Object類型
export function isObject(value){
  return typeof value === 'object' && value !== null;
}

// 檢查target的key是否存在(自身)
export function hasOwnProperty(target, key){
  return Object.prototype.hasOwnProperty.call(target, key);
}

// 判斷相等性
export function isEqual(newValue, oldValue){
  newValue === oldValue;
}

// 產生唯一值
export function randomNum(){
  return new Date().getTime() + parseInt(Math.random() * 10000);
}

export function checkType(str){
  // 處理string
  if(reg_check_str.test(str)){
    return str.replace(reg_str, '');
  }

  // 處理boolean
  switch(str){
    case 'true': 
      return true;
    case 'false':
      return false;
    default:
      break;    
  }

  // 處理number
  return Number(str);
}