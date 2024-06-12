import React, { useState, useEffect, useContext } from 'react';
import api from "../../config/configApi.js"
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../toView/toView.css'
import { Context } from '../../Context/AuthContext.js';

export const View = () => {

    const { authenticated, handleLogout } = useContext(Context)
    console.log("Natela de Dashboard o usuario está" + authenticated)

    const token = localStorage.getItem('token')
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showPopover, setShowPopover] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/users');
                setUsers(Array.isArray(response.data.users) ? response.data.users : []);
            } catch (error) {
                console.error('Erro ao obter os usuários:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <header>
                <nav className="navbar navbar-view fixed-top">
                    <div className="container-fluid">

                        <a className="navbar-brand " href="#">Alpha</a>
                        <div className="d-lg-flex align-items-center">
                            {/* Botão de dropdown */}
                            <div className="dropdown d-none d-lg-block">
                                <button
                                    className="btn dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-circle"></i>
                                </button>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    {/* <li>
                                        <a className="dropdown-item" href="#">Perfil</a>
                                    </li> */}
                                    <li>
                                        <a onClick={handleLogout} className="dropdown-item" href="/">Logout</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Botão de toggle para o offcanvas */}
                            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                <i className="bi bi-person-circle"></i>
                            </button>
                        </div>

                        {/* Offcanvas */}
                        <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                    </div>
                </nav>
            </header>
            <body>
                <div className="content">

                    <div className="content-layout">
                        <h2>Users</h2>
                        <img className='imgView' src="../img/img_view.svg" alt="" />

                        {/*                         <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item" ><a className="page-link" href="#"><i className="bi bi-arrow-left"></i></a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-right"></i></a></li>
                            </ul>
                        </nav> */}


                    </div>
                    <div className="content-card">
                        {users.map(user => (
                            <div key={user.id} className="card-info">
                                {/* INFORMAÇÕES DO INICIO */}
                                <div className="info-header">

                                    <div className='users'>
                                        <i className="bi bi-person-circle"></i>
                                        <p>{user.id}</p>
                                    </div>
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${user.id}`}>
                                        <img src="../img/plus.svg" alt="" />
                                    </button>

                                    {/* MODAL */}

                                    <div className="modal modal-view fade" id={`staticBackdrop-${user.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`staticBackdropLabel-${user.id}`} aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content modal-contentView">
                                                <div className="modal-header">
                                                    <i className="bi bi-person-circle"></i>
                                                    {/* <button type="button"data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x"></i></button> */}
                                                </div>
                                                <div className="modal-body">
                                                    <ul className='modalInfo'>
                                                        <li>
                                                            <h3 className='id-modal-h3'>id:</h3>
                                                            <p className='id-modal-visualizar'>{user.id}</p>
                                                        </li>
                                                        <li>
                                                            <h3 className='nome-modal-h3'>Nome:</h3>
                                                            <p className='nome-modal-visualizar'>{user.name}</p>
                                                        </li>
                                                        <li>
                                                            <h3 className='cpf-modal-h3'>CPF:</h3>
                                                            <p className='cpf-modal-visualizar'>{user.cpf}</p>
                                                        </li>
                                                        <li>
                                                            <h3 className='email-modal-h3'>Email:</h3>
                                                            <p className='email-modal-visualizar'>{user.email}</p>
                                                        </li>
                                                        <li>
                                                            <h3 className='estado-modal-h3'>Estado:</h3>
                                                            <p className='estado-modal-visualizar'>{user.estado}</p>
                                                        </li>
                                                        <li>
                                                            <h3 className='cidade-modal-h3'>Cidade:</h3>
                                                            <p className='cidade-modal-visualizar'>{user.cidade}</p>
                                                        </li>
                                                        <li>
                                                            <h3 className='rua-modal-h3'>Rua:</h3>
                                                            <p className='rua-modal-visualizar'>{user.rua}</p>
                                                        </li>
                                                        <li>
                                                            <h3 className='cep-modal-h3'>CEP:</h3>
                                                            <p className='cep-modal-visualizar'>{user.cep}</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-body">
                                    <ul >
                                        <li>
                                            <h3>Nome:</h3>
                                            <p>{user.name}</p>
                                        </li>
                                        <li>
                                            <h3>CPF:</h3>
                                            <p>{user.cpf}</p>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        ))}
                    </div>
                    {/*                     <nav aria-label="Page navigation example">
                        <ul className=" pagination paginationView pagination-mobile">
                            <li className="page-item" ><a className="page-link" href="#"><i className="bi bi-arrow-left"></i></a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#"><i className="bi bi-arrow-right"></i></a></li>
                        </ul>
                    </nav> */}
                    <footer className="fixed-bottom">

                        <nav className="navbar navbar-expand-md bottom-navbar">
                            {/* <!-- /* parte menu */}

                            <div class="menu menuListar">

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

                                    <a href="/">
                                        <li className="logOut">
                                            <span class="icon iconListar"><i class="bi bi-x-circle"></i></span>
                                            <span class="text textListar" onClick={handleLogout}>Logout</span>
                                        </li>
                                    </a>
                                </ul>
                            </div>
                            {/* /* fim menu */}
                        </nav>
                    </footer>
                </div>
            </body>
        </div>
    )
}

export default View
