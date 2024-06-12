import React, { useState, useEffect } from 'react';
import api from '../../config/configApi';
import './real.css';

const Real = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await api.get('/produtos');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            }
        };
        fetchAllProducts();
    }, []);



    
    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = cartItems.map((item, index) => {
                if (index === existingItemIndex) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };


    const finishPurchase = () => {
        const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.reduce((acc, item) => {
            const existingItem = acc.find(existing => existing.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
            return acc;
        }, storedCartItems);
    
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        window.location.href = '/carrinho';
    };
    

    

    return (
        <div className="container">
            <div className="products">
                <h2>Products</h2>
                {products.map((product, index) => (
                    <div className="product" key={index}>
                        <h2>{product.name}</h2>
                        <p>Price: {product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Selected Products</h3>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <span>{item.name}</span>
                            <span>Quantity: {item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <button onClick={finishPurchase}>Finalizar Compra</button>
            </div>
        </div>
    );
};

export default Real;
