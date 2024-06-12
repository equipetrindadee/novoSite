import React, { useState, useEffect } from 'react';
import "./cart.css";

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Ler os itens do carrinho da sessão temporária ao carregar a tela
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const clearCart = () => {
        // Limpar todos os itens do carrinho
        setCartItems([]);
        // Limpar a sessão temporária
        sessionStorage.removeItem('cartItems');
    };

    // Função para calcular o total da conta
    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2); // Arredonda para 2 casas decimais
    };

    return (
        <div>
            <div className='cart'>
                <h2>Shopping Cart</h2>
                <ul>
                    {cartItems && cartItems.map((item, index) => (
                        <li key={index}>
                            <span>{item.name}</span>
                            <span>Price: ${item.price}</span>
                            <span>Quantity: {item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <button onClick={clearCart}>Limpar Carrinho</button>
            </div>
            <div className='finalizarCart'>
                <img src='/img/pagarPIX.svg' />
                <div className='informCart'>
                    <h1 className='titleTotal'>Total</h1>
                    <h2 className='totalPreco'>Total: ${calculateTotal()}</h2> {/* Exibir o total da conta */}
                    <h2 className='totalPreco'>Delivery</h2>
                    <button className='finalizarChoco'>Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
