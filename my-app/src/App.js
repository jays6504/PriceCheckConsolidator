import './App.css';

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
      <input type="submit" value="Search" onClick={basicAPICall} />
      </header>
    </div>
      
  );
}

async function basicAPICall() {
  var responseData = await fetch('https://api.sampleapis.com/wines/reds')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    var jsonData = response.json();
    console.log(jsonData);
    console.log(jsonData[0]);
    return jsonData
  })
}

export default App;
