import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

//Contexts
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem('CART')) || []);

	const addItem = newItem => {
		setCart([...cart, newItem])
	};
	const removeItem = item => {
		setCart(cart.filter(currentItem => currentItem.id !== item.id))
	}

	useEffect(() => {
		window.localStorage.setItem('CART', JSON.stringify(cart))
	}, [cart])

	return (
		<ProductContext.Provider value={{ products, addItem, removeItem }}>
			<CartContext.Provider value={cart}>
		<div className="App">
			<Navigation cart={cart} />

			{/* Routes */}
			<Route
				exact
				path="/"
				component={Products}
			/>

			<Route
				path="/cart"
				component={ShoppingCart}
			/>
		</div>
		</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
