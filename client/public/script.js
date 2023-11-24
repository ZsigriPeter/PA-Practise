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


  //PA tasks

  console.log(`Number of products: ${products.length}`);

  console.log(`Name of last product: ${products[products.length - 1].name}`);

  console.log(`Number of songs of the first album: ${getSongCountInFirst()}`);

  console.log(`Number of albums that are available: ${getAvailableAmount()}`);

  //# PA 1

  console.log('Albums thats name contains "World": ');
  console.log(searchAlbums('World'));

  console.log(`Average number of tracks per album: ${averageTrackCount().toFixed(2)}`);

  console.log('Albums that are more expensive than 1000');
  console.log(getAlbumsWithHigherPrice(1000));

  //# PA 2

  console.log(`Total runtime of the last product: ${getAlbumRuntime(products[products.length - 1])} s`);

  console.log('The product which has the highest "price/runtime" ratio: ');
  console.log(getMostValuableAlbumForRuntime());

  //# PA 3

  console.log(`The different genre count that id:141 have:${getGenreCount(products[140])}`);
  console.log(products[140]);
  divRoot.insertAdjacentHTML('afterbegin', divElementCustom(`The different genre count that id:141 have:${getGenreCount(products[140])}`, 'h2'));

  console.log('Products that have more than one genre: ');
  console.log(getAlbumsWithMultipleGenres());

  console.log('Artists with one word names:');
  console.log(getOneWordArtistNames());

  // Write your JavaScript code before this line

};

function getOneWordArtistNames() {
  const oneWordNames=[];
  for (const album of products) {
    if(album.vendor.name.split(' ').length===1) {
      const exists=(oneWordNames.find((name) => name === album.vendor.name));
      if(!exists) {
        oneWordNames.push(album.vendor.name);
      }
    }
  }
  return oneWordNames;
}

function getAlbumsWithMultipleGenres() {
  const moreThanOneGenre=[];
  for (const album of products) {
    if(getGenreCount(album)>1) moreThanOneGenre.push(album);
  }
  return moreThanOneGenre;
}

function getGenreCount(album) {
  const genreIds=[];
  for (const track of album.details) {
    if(!genreIds.includes(track.genre_id)) {
      genreIds.push(track.genre_id);
    }
  }
  return genreIds.length;
}

function getMostValuableAlbumForRuntime() {
  let highestIndex = 0;
  let highest = products[0].price / getAlbumRuntime(products[0]);
  for (let i = 1; i < products.length; i++) {
    if (highest < products[i].price / getAlbumRuntime(products[i])) {
      highest = products[i].price / getAlbumRuntime(products[i]);
      highestIndex = i;
    }
  }
  return products[highestIndex];
}

function getAlbumRuntime(product) {
  let sumRuntime = 0;
  for (const track of product.details) {
    sumRuntime += track.milliseconds / 1000;
  }
  return sumRuntime;
}

function getAlbumsWithHigherPrice(minPrice) {
  const resultArray = [];
  for (const album of products) {
    if (album.price > minPrice) resultArray.push(album);
  }
  return resultArray;
}

function averageTrackCount() {
  let trackSum = 0;
  for (const album of products) {
    trackSum += album.details.length;
  }
  return (trackSum / products.length);
}

function searchAlbums(namePart) {
  const resultArray = [];
  for (const album of products) {
    if (album.name.includes(namePart)) resultArray.push(album);
  }
  return resultArray;
}

function getSongCountInFirst() {
  return products[0].details.length;
}

function getAvailableAmount() {
  let count = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].status === 'available') count++;
  }
  return count;
}

window.addEventListener('load', loadEvent);
