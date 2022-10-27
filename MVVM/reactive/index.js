import { isObject } from "../shared/utils";
import { mutableHandler } from "./mutableHandler";

// 將target變成響應式物件
export function useReactive(target){
  return createReactObject(target, mutableHandler);
}

// 響應式物件
function createReactObject(target, baseHandler){
  if(!isObject(target)){
    return target;
  }

  const observer = new Proxy(target, baseHandler);
  return observer;
}