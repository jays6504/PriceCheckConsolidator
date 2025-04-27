import './App.css';
import React from 'react';
var searchTerm = 'shoes'
var amazonResult
var walmartResult
var aliBabaResult
var amazonPrice = 0;
var walmartPrice = 0;
var aliBabaPrice = 0;
var amazonURL = "https://www.amazon.com";
var aliBabaURL = "https://www.alibaba.com";
var walmartURL = "https://www.walmart.com";
var amazonBoolean = false;
var walmartBoolean = false;
var aliBabaBoolean = false;

function App() {
  return (
    <div className="App">
      <header className="Price Search Tool">
      <h1>Welcome to the Price Search Tool</h1>
      <p>
        This is a simple price search tool that allows you to search for prices of various products.
        You can enter a product name and the tool will return the current price of that product.
      </p>
      <label>
        Product Name:
        <input type="text" name="productName" />
      </label>
      <input type="submit" value="Search" onClick={searchProducts} />
      </header>
      <div className="Results">
        <div className="Amazon">
          <h2>Amazon Price</h2>
          <p>${amazonPrice}</p><br />
          <a href={amazonURL}>Amazon Link</a>
        </div>
        <div className="Walmart">
          <h2>Walmart Price</h2>
          <p>${walmartPrice}</p><br />
          <a href={walmartURL}>Walmart Link</a>
        </div>
        <div className="AliBaba">
          <h2>AliBaba Price</h2>
          <p>${aliBabaPrice}</p><br />
          <a href={aliBabaURL}>AliBaba Link</a>
        </div>
      </div>
    </div>
  );
}

export default App;

async function searchProducts() {

  searchTerm = document.querySelector('input[name="productName"]').value;
  amazonResult = await amazonAPICall();
  walmartResult = await walmartAPICall();
  aliBabaResult = await aliBabaAPICall();
  while(amazonBoolean == false || walmartBoolean == false || aliBabaBoolean == false) {
  }
  console.log(`Waiting done`)
  document.querySelector('.Amazon p').innerText = `$`+amazonPrice;
  document.querySelector('.Walmart p').innerText = walmartPrice
  document.querySelector('.AliBaba p').innerText = `$`+aliBabaPrice;
  document.querySelector('.Amazon a').href = await amazonURL;
  document.querySelector('.Walmart a').href = await walmartURL;
  document.querySelector('.AliBaba a').href = await aliBabaURL;
}
async function amazonAPICall() {
  const url = `https://amazon-online-data-api.p.rapidapi.com/search?query=${searchTerm}&page=1&geo=US`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '89e5627daamshca69235f04cbfebp1db5adjsn4a8297c8a77c',
		'x-rapidapi-host': 'amazon-online-data-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  var itemResult = await result.products[0];
  amazonPrice = await itemResult.product_price;
  amazonURL = await itemResult.product_url
} catch (error) {
	console.error(error);
}
  amazonBoolean = true;
  return await itemResult
}

async function walmartAPICall() {
  const url = `https://walmart2.p.rapidapi.com/searchV2?query=${searchTerm}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '89e5627daamshca69235f04cbfebp1db5adjsn4a8297c8a77c',
      'x-rapidapi-host': 'walmart2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    
    const result = await response.json();
    var itemResult = await result.itemsV2[0]
    walmartURL = "https://www.walmart.com" + await itemResult.canonicalUrl
    walmartPrice = await itemResult.priceInfo.currentPrice.priceString
  } catch (error) {
    console.error(error);
  }
  walmartBoolean = true;
  return await itemResult
}

async function aliBabaAPICall() {
  const url = `https://alibaba-datahub.p.rapidapi.com/item_search?q=${searchTerm}&page=1`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '89e5627daamshca69235f04cbfebp1db5adjsn4a8297c8a77c',
		'x-rapidapi-host': 'alibaba-datahub.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  var itemResult = await result.result.resultList[0].item;
  aliBabaPrice = await itemResult.sku.def.priceModule.price;
  aliBabaURL = await `https://` + itemResult.itemUrl
}
catch (error) {
	console.error(error);
}
aliBabaBoolean = true;
return await itemResult
}

