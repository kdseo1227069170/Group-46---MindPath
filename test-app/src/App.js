import './App.css';
import Product from './components/Product'
import ProductData from './productsData';


function App() {
  const productComponents = ProductData.map(item => <Product key={item.id} product={item}/>)
  return (
    <div className="App">
      {productComponents}
    </div>
  );
}

export default App;
