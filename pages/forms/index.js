import "../forms/forms.css"
import React, { useState, useContext } from 'react';
import api from "../../config/configApi.js"
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from "../../Context/AuthContext.js";

export const Forms = () => {


  const { authenticated, handleLogout } = useContext(Context)
  console.log("Natela de Dashboard o usuario está" + authenticated)

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    estado: '',
    cidade: '',
    cep: '',
    rua: ''
  });

  const [status, setStats] = useState({
    type: '',
    mensagem: ''
  });

  const usuariosUpdate = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cpf') {
      newValue = value.replace(/\D/g, '');
      newValue = newValue.slice(0, 11);
    }

    if (name === 'email') {
      newValue = value.replace(/[^a-zA-Z0-9@.]/g, '');
    }

    if (name === 'password') {
      newValue = newValue.slice(0, 16);
    }


    setUser(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleCEPChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');

    setUser(prevState => ({
      ...prevState,
      cep: cep
    }));

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { uf, localidade, logradouro } = response.data;
        setUser(prevState => ({
          ...prevState,
          estado: uf,
          cidade: localidade,
          rua: logradouro
        }));
      } catch (error) {
        console.error('Erro ao buscar informações do CEP:', error);
      }
    }
  };

  const postSubmit = async e => {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (Object.values(user).some(value => value === '')) {
      setStats({
        type: 'error',
        mensagem: "Por favor, preencha todos os campos."
      });
      return;
    }

    try {
      await api.post('/user', user, { headers })
        .then((response) => {
          setStats({
            type: 'success',
            mensagem: response.data.mensagem
          });
          navigate("/listar");
        });
    } catch (error) {
      if (error.response) {
        setStats({
          type: 'error',
          mensagem: error.response.data.mensagem
        });
      } else {
        setStats({
          type: 'error',
          mensagem: "Servidor está em manutenção, tente novamente mais tarde"
        });
      }
    }
  };
  return (
    <div>

      <body>

        {/* <!-- Navbar Config --> */}
        <nav className="navbar  bg-dark navbar-forms border-bottom border-body navbarTopo" data-bs-theme="dark">
          <div className="container-fluid container-fluidForm navbarFluid navbarFluidForm">

            {/* <!-- Navbar Celular --> */}
            <img className="d-block d-sm-none imgLogo imgLogoCell" src="/img/logoAlphaSimples.svg" alt="LogoAlpha" />

            <button className="navbar-toggler navbar-togglerForms d-block d-sm-none menuResponsi menuResponsiForm" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
              aria-label="Toggle navigation">
              <i className="bi bi-person-circle"></i>
            </button>

            {/* parte offcanvas */}
            <div className="offcanvas offcanvas-top offcanvas-forms Form text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel">
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

            {/* <!-- Fim Navbar Celular --> */}

            {/* <!-- Navbar Computador --> */}
            <div className="headerComputadorForm d-none d-sm-table-cell">
              <div className="headerForm">
                <img className="logoAlphaForm" src="/img/logoAlphaSimples.svg" alt="LogoAlpha" />
                <div class="dropdown dropdownForm">
                  <button className="btn perfil-btn perfilForms" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle perfil"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-ComputadorForms">
                    {/* <li><a class="dropdown-item dropdown-itemForms" href="#">Perfil</a></li> */}
                    <li><a class="dropdown-item" onClick={handleLogout}>Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- Fim Navbar Computador --> */}

          </div>
        </nav>
        {/* <!-- Fim Navbar Config --> */}

        {/* Parte Conteudo  */}
        <div className="conteudo-forms">
          <div className="content-layout-forms">
            <h2>  Cadastrar</h2>
            {/* <img src="../img/img_centro.svg" alt="" /> */}
            <button type="button" class="btn btn-cadastrar " onClick={postSubmit}>CADASTRAR</button>

          </div>




          <div class="container containerForms">
            <form className="form-Cadastrar">
              <div class="row rowForm">
                <div class="col-md-6">
                  <div class="form-group form-groupForms">
                    <input type="text" className="form-control form-controlForm" placeholder="Nome Completo" name="name" value={user.name} onChange={usuariosUpdate} required />
                  </div>
                  <div class="form-group form-groupForms">
                    <input type="text" className="form-control form-controlForm" placeholder="Meu Email" name="email" value={user.email} onChange={usuariosUpdate} required />
                  </div>
                  <div class="form-group form-groupForms">
                    <input type="password" className="form-control form-controlForm" placeholder="Senha" name="password" value={user.password} onChange={usuariosUpdate} required />
                  </div>
                  <div class="form-group form-groupForms">
                    <input type="text" className="form-control form-controlForm" placeholder="Meu CPF" name="cpf" value={user.cpf} onChange={usuariosUpdate} required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group form-groupForms">
                        <input type="text" className="form-control form-controlForm" placeholder="CEP" name="cep" value={user.cep} onChange={handleCEPChange} required />
                      </div>
                    </div>
                  </div>
                  <div class="row city">
                    <div class="col-md-6">
                      <div class="form-group form-groupForms">
                        <input type="text" className="form-control form-controlForm" placeholder="Cidade" name="cidade" value={user.cidade} onChange={usuariosUpdate} required />
                      </div>
                    </div>
                    <div class="col-md-6 ">
                      <div class="form-group form-groupForms">
                        <input type="text" className="form-control form-controlForm" placeholder="Estado" name="estado" value={user.estado} onChange={usuariosUpdate} required />
                      </div>
                    </div>
                  </div>{/*Parte Cidade e Estado*/}
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group form-groupForms">
                        <input type="text" className="form-control form-controlForm" placeholder="Rua" name="rua" value={user.rua} onChange={usuariosUpdate} required />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group form-groupForms">
                        <input type="text" className="form-control form-controlForm" placeholder="Complemento" name="complemento" value={user.complemento} onChange={usuariosUpdate} required />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <br />
            {status.type === 'error' ? <p className='mensagemError'>{status.mensagem}</p> : ""}
            <div className="btn-cadastrar-mobile-footer ">
              <button type="button" class="btn btn-cadastrar-oficial " onClick={postSubmit}>CADASTRAR</button>
            </div>
          </div>
        </div>

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

      </body>
    </div>


  )
}

export default Forms;
