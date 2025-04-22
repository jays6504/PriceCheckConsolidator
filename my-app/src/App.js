import './App.css';

var searchTerm
var amazonResult
var walmartResult
var targetResult


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

/**
 * This function makes a basic API call to a sample API and returns the JSON data.
 * It was used to test API calls in React.
 * The API used in this example is a sample API that returns a list of red wines.
*/
async function basicAPICall() {
  try {
    const response = await fetch('https://api.sampleapis.com/wines/reds');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default App;

function searchProducts() {
  amazonAPICall();
  walmartAPICall();
  //targetAPICall();
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
	console.log(result);
  amazonResult = await result.products[0];
  console.log(amazonResult);
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
    console.log(walmartResult);
  } catch (error) {
    console.error(error);
  }
}