const $=(selector)=> document.querySelector(selector);
const $$=(selector)=> document.querySelectorAll(selector);

const crElement=function(tagName,className,content){
    const newElem=document.createElement(tagName);
    if(className)  newElem.setAttribute('class',className);
    if(content) newElem.innerHTML=content;
    return newElem;
}


