import React, { useContext } from "react"
import { useNavigate, Link } from 'react-router-dom'
import '../Dashboard/dashboard.css'
import { Context } from "../../Context/AuthContext"
export const Dashboard = () => {

    const { authenticated, handleLogout } = useContext(Context)
    console.log("Natela de Dashboard o usuario está" + authenticated)

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    return (
        <body>
            <header>
                <nav class="navbar navbarDashboard">
                    <div class="container-sm">

                        <div class="parent-menu">
                            <div class="div1-menu"> <h1 className="logoDashboard">Alpha</h1></div>
                            <div class="div2-menu">  <button class="btn
                                perfil-btn-mobile" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <i className="bi bi-person-circle"></i></button>
                            </div>
                        </div>


                        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body offcanvas-body-view">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/listar">
                                            Listar
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/formulario">
                                            Formulario
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/visualizar">
                                            Visualizar
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/alerta">
                                            Alerta
                                        </Link>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Perfil
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" onClick={handleLogout}>Logout</a></li>
                                            <li><a class="dropdown-item" href="#">Meu perfil</a></li>

                                        </ul>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button className="btn perfil-btn perfil-btnDash" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-person-circle perfil"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a onClick={handleLogout} class="dropdown-item" href="#">Logout</a></li>
                                {/* <li><a class="dropdown-item" href="/formulario">Cadastrar</a></li> */}
                            </ul>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="fas fa-user"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container-dashboard">
                <div className="info-dashboard">

                    <div className="card usuario">
                        <i class="bi bi-floppy"></i>
                        <h6>7</h6>
                        <p class="card-text">Complemento</p>
                    </div>
                    <div className="card entregas">
                        <i class="bi bi-people-fill"></i>
                        <h6>43</h6>
                        <p class="card-text">Usuários</p>
                    </div>
                    <div className="card completas">
                        <i class="bi bi-exclamation-triangle-fill"></i>
                        <h6>1</h6>
                        <p class="card-text">Alerta</p>
                    </div>
                    <div className="card alerta">
                         <i class="bi bi-check-circle"></i>
                        <h6>5</h6>
                        <p class="card-text">Entregas</p>
                    </div>
                </div>
                <div className="parent">
                    <img class="moca-lapis div1" src="./img/moca.png" alt="icone-perfil" />
                    <div className="footer-Dashboard">
                        <div class="menu menuListar div2">

                            <ul className="menuCenter menuCenterListar">
                                {/* <!-- 1 --> */}
                                <Link to="/dashboard">
                                    <li className="Dashboard">
                                        <span class="icon iconListar"><i className="bi bi-speedometer2"></i></span>
                                        <span class="text textListar">Dashboard</span>
                                    </li>
                                </Link>

                                {/* <!-- 2 --> */}
                                <Link to="/listar">
                                    <li className="Listar">
                                        <span class="icon iconListar"><i className="bi bi-card-list"></i></span>
                                        <span class="text textListar">Listar</span>
                                    </li>
                                </Link>

                                {/* <!-- 3 --> */}
                                <Link to="/formulario">
                                    <li className="Formulario">
                                        <span class="icon iconListar"><i className="bi bi-ui-checks-grid"></i></span>
                                        <span class="text textListar">Formulario</span>
                                    </li>
                                </Link>

                                {/* <!-- 4 --> */}
                                <Link to="/visualizar">
                                    <li className="Visualizar">
                                        <span class="icon iconListar"><i className="bi bi-eye-fill"></i></span>
                                        <span class="text textListar">Visualizar</span>
                                    </li>
                                </Link>

                                {/*  <!-- 5 --> */}
                                <Link to="/alerta">
                                    <li className="Alerta">
                                        <span class="icon iconListar"><i className="bi bi-slash-circle"></i></span>
                                        <span class="text textListar">Alerta</span>
                                    </li>
                                </Link>

                                <Link to="/login">
                                    <li className="logOut">
                                        <span class="icon iconListar"><i class="bi bi-x-circle" ></i></span>
                                        <span class="text textListar" onClick={handleLogout}>Logout</span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Dashboard