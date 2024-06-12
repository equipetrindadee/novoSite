import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/configApi";
import '../Product/product.css';

export const ChocolateRosa = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [imageBlob, setImageBlob] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const productId = sessionStorage.getItem('selectedProductId');
            if (!productId) {
                console.error("Produto não selecionado.");
                return;
            }

            try {
                const response = await api.get(`/produtos/${productId}`);
                const selectedProduct = response.data.product;
                if (selectedProduct) {
                    setProduct(selectedProduct);
                    fetchProductImage(productId);
                    setBackgroundColor(determineBackgroundColor(productId));
                } else {
                    console.error("Produto não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
            }
        };

        const fetchProductImage = async (productId) => {
            try {
                const response = await api.get(`/produtos/${productId}/image`, { responseType: 'blob' });
                const imageBlob = URL.createObjectURL(response.data);
                setImageBlob(imageBlob);
            } catch (error) {
                console.error("Erro ao buscar a imagem do produto:", error);
            }
        };

        fetchProduct();
    }, []);

    const handleBuyClick = () => {
        if (product) {
            const selectedProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                complemento: product.complemento,
                quantity: quantity
            };

            addToCart(selectedProduct);
            navigate('/carrinho');
        } else {
            console.error("Nenhum produto disponível.");
        }
    };

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        addToCart({ ...product, quantity: newQuantity });
    };

    const decreaseQuantity = () => {
        const newQuantity = Math.max(0, quantity - 1);
        setQuantity(newQuantity);
        if (newQuantity >= 0) {
            removeToCart({ ...product, quantity: newQuantity });
        }
    };



    const determineBackgroundColor = (productId) => {

        switch (productId) {
            case '1':
                return '#EBBC8E'; // Cor para o ID 1
            case '2':
                return '#C3E5EF'; // Cor para o ID 2
            case '3':
                return '#DA3C3C'; // Cor para o ID 3
            default:
                return 'white'; // Cor padrão para outros IDs
        }
    };

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
    const removeToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = cartItems.map((item, index) => {
                if (index === existingItemIndex) {
                    return { ...item, quantity: item.quantity - 1 };
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
            }
            else {
                acc.push(item);
            }
            return acc;


        }, storedCartItems);

        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        window.location.href = '/carrinho';
    };
    return (
        <div>
        <nav className="navbar nav-cart navbar-expand-lg bg-body-tertiary myGrid">
        <div className="container-fluid">
          <button className="navbar-toggler navChoco d-block d-sm-none menuResponsi" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-top myGridChild1" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body body-Cart">
              <ul className="nav navChocoDoce">
                <li className="nav-item nav-ChocoItem">
                  <a className="nav-link nav-chocoLink nav-alpha" href="/">Home</a>
                </li>
                {/* <li className="nav-item nav-ChocoItem">
                  <a className="nav-link nav-chocoLink nav-alpha" href="#">Quem Somos</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="alphaBrand myGridChild2">
          <img className="chocoRosa" src="/img/logo_Chocolate.svg" alt="Bootstrap" />
        </div>
        <div className="input-group myGridChild3">
          {/* <div className="pesquisarChoco">
            <i className="bi bi-search"></i>
            <input type="text" className="form-control" />
          </div> */}


          {/* <a href="/carrinho"> <i className="bi bi-cart2 carrinho"></i></a> */}
          <div class="btn-group">
            <button type="button" class="btn btn-secondary dropdown-toggle dropdown-perfil-Ecommecer" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-circle"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-Ecommerce ">
              {/* <li className="carrinhoCell"><a class="dropdown-item" href="/login">Logar</a></li> */}
              <li><a class="dropdown-item " href="/login">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

            <p className="descricao-chocolateRosa">Descrição do produto</p>

            <div className="container-rosa">
                <div className="quadradoAmarelo"></div>
                <div className="chocolate-rosa-info">
                    <h1 className="titleDescri">Descrição de produto</h1>
                    {product ? (
                        <>
                            <img className="talentoMorango" src={imageBlob} alt={product.name} /> {/* Use o blob da imagem */}
                            <div className="flexImage">
                                <div className="chocoMorango">
                                    <h1 className="chocoRosa-h1">{product.name}</h1>
                                    <p>
                                        <span className="text-marcado" style={{ backgroundColor: backgroundColor }}>{product?.complemento}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="valores-product">
                                <p className="preco-rosa">R$ {product.price.toFixed(2)}</p>
                                <div className="quantity-control">
                                    <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                    <span className="quantity">{quantity}</span>
                                    <button className="quantity-button" onClick={increaseQuantity}>+</button>


                                </div>
                            </div>

                            <div className="rating">
                                <input type="radio" id="star5" name="rate" value="5" />
                                <label htmlFor="star5" title="text"></label>
                                <input type="radio" id="star4" name="rate" value="4" />
                                <label htmlFor="star4" title="text"></label>
                                <input type="radio" id="star3" name="rate" value="3" />
                                <label htmlFor="star3" title="text"></label>
                                <input type="radio" id="star2" name="rate" value="2" />
                                <label htmlFor="star2" title="text"></label>
                                <input defaultChecked type="radio" id="star1" name="rate" value="1" />
                                <label htmlFor="star1" title="text"></label>
                            </div>

                            <p className="descricao-chocoRosa">DESCRIÇÃO</p>
                            <p className="descricao-text-chocoRosa">{product.description}</p>
                            <div className="compra-chocolateRosa">
                                {/* <div className="icone-chocolateRosa">
                                    <i className="bi bi-cart2 cartIcon"></i>
                                </div> */}
                                {/* <button onClick={handleBuyClick} className="comprar-chocoRosa">COMPRAR</button> */}
                                <button className="comprar-chocoRosa" onClick={finishPurchase}>COMPRAR</button>

                            </div>
                        </>
                    ) : (
                        <p>Carregando produto...</p>
                    )}
                </div>
                <div className="chocolate-image">
                    <img src={imageBlob || "./img/talento1.png"} alt="Chocolate Talento" />
                </div>
            </div>
        </div>
    );
};

export default ChocolateRosa;
