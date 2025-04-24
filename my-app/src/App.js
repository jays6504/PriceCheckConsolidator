import './App.css';

var searchTerm
var amazonResult
var walmartResult
var aliBabbaResult


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
    </div>
      
  );
}

export default App;

function searchProducts() {
  amazonAPICall();
  walmartAPICall();
  aliBabbaAPICall();
}
async function amazonAPICall() {
  const url = 'https://amazon-online-data-api.p.rapidapi.com/search?query=crocs&page=1&geo=US';
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
  amazonResult = await result.products[0];
} catch (error) {
	console.error(error);
}

}

async function walmartAPICall() {
  const url = 'https://walmart2.p.rapidapi.com/searchV2?query=xiaomi';
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
    walmartResult = await result.itemsV2[0]
  } catch (error) {
    console.error(error);
  }
}

async function aliBabbaAPICall() {
  const url = 'https://alibaba-datahub.p.rapidapi.com/item_search?q=shoes&page=1';
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
  aliBabbaResult = await result.result.resultList[0].item;
}
catch (error) {
	console.error(error);
}
}