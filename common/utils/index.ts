import { encode as ENCODE, decode as DECODE } from 'js-base64';
export const encode = (obj: any) =>{
    const objStr = JSON.stringify(obj);
    return ENCODE(objStr);
}
export const decode = (str:string) =>{
    return JSON.parse(DECODE(str));
}