import './App.css';
import './index.css';

import Home from './components/home';
import SingleCategory from './components/singleCategory';

import { Routes, Route } from "react-router-dom"
import NavBar from './components/navBar';
import OrderStatus from './components/orderStatus';
import SingleCustomer from './components/singleCustomer';
import OrderInfo from './components/orderInfo.jsx';



function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/category" element={ <SingleCategory/> } />
        <Route path="/status" element={ <OrderStatus/> } />
        <Route path="/singlecustomer" element={ <SingleCustomer/> } />
        <Route path="/orderinfo" element={ <OrderInfo/> } />















        




      </Routes>
      </header>

    </div>
  );
}
export default App;
// https://www.freecodecamp.org/news/how-to-use-react-router-version-6/