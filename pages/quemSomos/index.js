import React from "react";
import '../quemSomos/QuemSomos.css';

export const QuemSomos = () => {

    return (
        <div>
            <body className="quemSomosBody">
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
                                    <li className="nav-item nav-ChocoItem">
                                        <a className="nav-link nav-chocoLink nav-alpha" href="/quemsomos">Quem Somos</a>
                                    </li>
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
                <h1 className="title-qs">Quem Somos?</h1>
                <section className="conteudo-qs">
                    <div className="gridQuemSomos">
                        <img className="quemSomosChild1 quemSimg" src="../../img/menininhos.png" alt="" />
                        <h6 className=" quemSomosChild2 quemSomosText">A equipe Alpha Develop está entusiasmada em compartilhar os resultados de semanas de dedicação ao trabalho. Cada membro contribuiu de forma única para o quebra-cabeça da tecnologia, trazendo suas habilidades e experiências para o projeto. Essa colaboração resultou em conquistas significativas das quais estamos imensamente orgulhosos. Estamos ansiosos para compartilhar mais detalhes sobre nossos avanços em breve.</h6>
                    </div>
                </section>
            </body>
        </div>
    );
}

export default QuemSomos;