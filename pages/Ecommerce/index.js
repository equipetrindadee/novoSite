import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../Ecommerce/Ecommerce.css';
import { Context } from "../../Context/AuthContext"
import api from "../../config/configApi";
export const Ecommerce = () => {

  const { authenticated, handleLogout } = useContext(Context)
  console.log("Natela de Dashboard o usuario está" + authenticated)


  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/produtos');
        setProducts(Array.isArray(response.data.products) ? response.data.products : []);
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
      }
    };

    fetchData();
  }, []);

  const fetchImage = async (id) => {
    try {
      const response = await api.get(`/produtos/${id}/image`, { responseType: 'blob' });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error('Erro ao obter a imagem:', error);
      return null;
    }
  };

  const loadImages = async () => {
    const productsWithImages = await Promise.all(products.map(async (product) => {
      const imageUrl = await fetchImage(product.id);
      return { ...product, imageUrl };
    }));
    setProducts(productsWithImages);
  };

  useEffect(() => {
    if (products.length > 0) {
      loadImages();
    }
  }, [products]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? products.length - 1 : prevSlide - 1));
  };

  const handleImageClick = (productId) => {
    sessionStorage.setItem('selectedProductId', productId);

    if (authenticated === true) {
      navigate('/rosa');
    } else {
      navigate('/login');
    }
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
          <div class="btn-group dropdow">
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

      <section className="orange-container">
        <div className="row">
          <div className="col-md-12 space-above">
            <h2 className="pattaya-text">Compre Agora</h2>
            <p className="montserrat-text">Entre e mergulhe em um mundo de delícias! Bem-vindo ao paraíso dos chocolates, onde cada pedaço é uma tentação irresistível.</p>
          </div>
        </div>
        <img src="../../img/menina-chocolate.png" alt="Sua Imagem" className="image-menina" />
      </section>

      <section className="colorful-background">
        {/* <div className="overlay-content"> */}
        <div className="sobreEquipe">
          <h2 className="sobreEquipe-title"> Descubra Nossos Novos Sabores!</h2>
          <p className="sobreEquipe-Conteudo">A equipe Alpha Develop está ansiosa para revelar os resultados de seu esforço conjunto. Eles ressaltam a contribuição de cada membro e expressam orgulho pelo progresso alcançado. Venha conferir mais detalhes sobre nossa equipe!</p>
          <div className="buttons">
            <button className="saiba-mais-button">Saiba mais</button>
          </div>
        </div>
      </section>

      <section className="centered-image">
        <img src="../../img/menino-comendo.png" alt="Sua Imagem" className="image-menino" />
        <div className="carousel-section">
          <div className="carousel">
            <button className="prev" onClick={prevSlide}><i className="bx bx-chevron-left"></i></button>
            {products.map((product, index) => (
              <img
                key={index}
                src={product.imageUrl}
                alt={`Slide ${index}`}
                className={index === currentSlide ? "slide active" : "slide"}
                onClick={() => handleImageClick(product.id)}
                href="/login"
              />
            ))}
            <button className="next" onClick={nextSlide}><i className="bx bx-chevron-right"></i></button>
          </div>
        </div>
      </section>

      {/* <section className="product-list">
        <h2>Produtos</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.nome}</li>
          ))}
        </ul>
      </section> */}

      <footer id="footerLoja">
        <div className="conatiner-home">
          <div className="row">
            <div className="col-md-3 WIDTH logoDiv">
              <div className="logoHome">
                <a href="index.html"><img src="../../img/Alpha.svg" alt="" className="img-fluid logo-footer" width={130} /></a>
                <div className="footer-about">
                  <p> </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 faleConosco WIDTH">
              <div className="useful-link">
                <h2>Useful Links</h2>
                <img src="./assets/images/about/home_line.png" alt="" className="img-fluid" />
                <div className="use-links">
                  <li><a target="_blank" href="https://www.linkedin.com/in/jo%C3%A3o-kleber-de-moraes-dias-9671162b9/"><i class="bi bi-linkedin"></i>João Kleber</a></li>
                  <li><a target="_blank" href="https://www.linkedin.com/in/matheus-parizoti-de-ara%C3%BAjo-6101172b9/"><i class="bi bi-linkedin"></i>Matheus Parizoti</a></li>
                  <li><a target="_blank" href="https://www.linkedin.com/in/marcelo-vinicius-jord%C3%A3o-almeida-186604248/"><i class="bi bi-linkedin"></i>Marcelo Vinicius</a></li>
                  <li><a target="_blank" href="https://www.linkedin.com/in/miri%C3%A3-de-oliveira-fernandes-48b1162b9/"><i class="bi bi-linkedin"></i>Miriã Oliveira</a></li>
                </div>
              </div>
            </div>

            {/* Contato dos funcionarios */}
            <div className="col-md-3 linksHome WIDTH">
              <div className="social-links">
                <h2>Follow Us</h2>
                <img src="./assets/images/about/home_line.png" alt="" />
                <div className="social-icons">
                  <li><a href=""><i className="bi bi-facebook"></i> Add other develop</a></li>
                  <li><a href=""><i className="bi bi-instagram"></i> Instagram</a></li>
                  <li><a href=""><i className="bi bi-linkedin"></i> Linkedin</a></li>
                </div>
              </div>
            </div>
            <div className="col-md-3 localHome">
              <div className="address">
                <h2>Follow more projects</h2>
                <img src="./assets/images/about/home_line.png" alt="" className="img-fluid" />
                <div className="social-icons">
                  <li><a href=""><i class="bi bi-facebook"></i> Facebook</a></li>
                  <li><a href=""><i class="bi bi-instagram"></i> Instagram</a></li>
                  <li><a href=""><i class="bi bi-linkedin"></i> Linkedin</a></li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <section id="copy-right">
        <div className="copy-right-sec">
          <div className="itemsCopy">
            <i class="bi bi-c-circle"></i>
            <p>2021 Chobani, LCC, All Rights Reserved</p>
            <a href="#"> Privacy Policy</a>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Ecommerce;
