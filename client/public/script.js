/* eslint-disable max-len */
import { products } from '/data.js';


const divThreeElement = function (mainElem, subElem1, subElem2, tagMain, tagSub){
  const result = `${divElementCustom(mainElem, tagMain)}
  ${divElementCustom(subElem1, tagSub)}
  ${divElementCustom(subElem2, tagSub)}`;
  return divWithClass(result, 'album-item');
};

const divWithClass = function(content, classHTML) {
  return `<div class="${classHTML}">${content}</div>`;
};

const divElementCustom = function (content, tag){
  return `<${tag}>${content}</${tag}>`;
};

const loadEvent = function() {

  // Write your JavaScript code after this line
  console.log(products[0]);
  const divRoot = document.querySelector('#root');
  products.forEach((prduct) => {
    let currentItem = divThreeElement(prduct['name'], prduct['price'], prduct['status'], 'h2', 'h3');
    prduct['details'].forEach((track) => {
      currentItem += divThreeElement(track['name'], track['composer'], track['unit_price'], 'h4', 'h5');
    });
    divRoot.insertAdjacentHTML('beforeend', divWithClass(currentItem, 'album'));
  });

  // Write your JavaScript code before this line

};

window.addEventListener('load', loadEvent);
