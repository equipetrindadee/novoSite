import React, { useState, useEffect, useContext } from "react";
import api from "../../config/configApi.js";
import '../listAtual/list.css';
import axios from 'axios'; // Importação do Axios para fazer requisições HTTP
import { Context } from "../../Context/AuthContext.js"
import { useNavigate, Link } from "react-router-dom";



export const Listar = () => {

    const { authenticated, handleLogout } = useContext(Context)
    console.log("Natela de Dashboard o usuario está" + authenticated)

    const token = localStorage.getItem('token')

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const [data, setData] = useState([]);
    /* INFO BOTO~ES*/
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState({
        name: '',
        email: '',
        cpf: '',
        cep: '',
        estado: '',
        cidade: '',
        rua: ''
    });





    const [filterColumn, setFilterColumn] = useState('name');
    const [filterOption, setFilterOption] = useState('asc');
    const [filteredData, setFilteredData] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [regionFilter, setRegionFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('name');
    const [deletePopoverOpen, setDeletePopoverOpen] = useState(false); // Estado para controlar o popover de confirmação
    const [deletingUserId, setDeletingUserId] = useState(null);

    const handleCEPChange = async (e) => {
        const cep = e.target.value.replace(/\D/g, ''); // Remover caracteres não numéricos do CEP

        setEditedData(prevState => ({
            ...prevState,
            cep: cep
        }));

        if (cep.length === 8) { // Verificar se o CEP possui 8 dígitos
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); // Requisição GET ao ViaCEP
                const { uf, localidade, logradouro } = response.data; // Extrair dados de endereço da resposta
                setEditedData(prevState => ({
                    ...prevState,
                    estado: uf,
                    cidade: localidade,
                    rua: logradouro
                }));
            } catch (error) {
                console.error('Erro ao buscar informações do CEP:', error);
            }
        } else {
            // Limpar os campos de estado, cidade e rua se o CEP for inválido
            setEditedData(prevState => ({
                ...prevState,
                estado: '',
                cidade: '',
                rua: ''
            }));
        }
    };



    const getUsers = async () => {
        // requisição da Api com os Usuarios
        try {
            const response = await api.get('/users');
            setData(response.data.users);
        } catch (error) {
            console.log('Erro ao obter os usuários:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        // Chamar a função com requisição para API
        getUsers();
    }, []);

    const openEditPopover = (user) => {
        setEditingUser(user);
        setEditedData({ ...user });
    };

    const closeEditPopover = () => {
        setEditingUser(null);
        setEditedData({});
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const saveEditedData = async () => {
        try {
            await api.put(`/usuario/${editedData.id}`, editedData);
            getUsers();
            closeEditPopover();
        } catch (error) {
            console.log(error);
        }
    };

    const openDeletePopover = (userId) => {
        setDeletingUserId(userId);
        setDeletePopoverOpen(true);
    };

    const closeDeletePopover = () => {
        setDeletingUserId(null);
        setDeletePopoverOpen(false);
    };

    const deleteUser = async (id) => {
        try {
            await api.delete(`/user/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const applyFilter = () => {
        let filtered = [...data];

        if (regionFilter !== 'all') {
            filtered = filtered.filter(user => {
                const region = getRegion(user.estado);
                return region === regionFilter;
            });
        }

        if (filterOption === 'asc' || filterOption === 'desc') {
            filtered.sort((a, b) => {
                if (filterOption === 'asc') {
                    return a[filterColumn].localeCompare(b[filterColumn]);
                } else {
                    return b[filterColumn].localeCompare(a[filterColumn]);
                }
            });
        } else if (filterOption === 'normal') {
            filtered.sort((a, b) => a.id - b.id);
        }

        setFilteredData(filtered);
        setIsFilterApplied(true);
    };

    const getRegion = (state) => {
        const regioes = {
            'Norte': ['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC'],
            'Nordeste': ['MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'],
            'Centro-Oeste': ['MT', 'MS', 'GO', 'DF'],
            'Sul': ['PR', 'RS', 'SC'],
            'Sudeste': ['SP', 'RJ', 'MG', 'ES']
        };

        for (const region in regioes) {
            if (regioes[region].includes(state)) {
                return region;
            }
        }

        return 'Outra';
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchColumnChange = (e) => {
        setSearchColumn(e.target.value);
    };

    const filteredAndSearchedData = () => {
        let filteredDataCopy = [];
        if (data && data.length > 0) {
            if (isFilterApplied) {
                filteredDataCopy = [...filteredData];
            } else {
                filteredDataCopy = [...data];
            }
            if (searchTerm && searchTerm.trim() !== "") {
                filteredDataCopy = filteredDataCopy.filter(item =>
                    item[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
        }
        return filteredDataCopy;
    };

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
            {/* <!-- Navbar Config --> */}
            <nav className="navbar bg-dark border-bottom border-body navbarTopo" data-bs-theme="dark">
                <div className="container-fluid container-fluidListar navbarFluid navbarFluidListar">

                    {/* <!-- Navbar Celular --> */}
                    <img className="d-block d-sm-none imgLogo" src="/img/logoAlphaOriginal.svg" alt="LogoAlpha" />

                    <button class="btn perfil-btn-mobile buttonPerfil-Listar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <i className="bi bi-person-circle"></i></button>

                    <div class="offcanvas offcanvas-top offcanvas-listar" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">

                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body offcanvas-listar">
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
                    <div className="headerComputador d-none d-sm-table-cell">
                        <img className="logoAlpha" src="/img/logoAlphaOriginal.svg" alt="LogoAlpha" />
                    </div>
                    {/* <!-- Fim Navbar Computador --> */}

                </div>
            </nav>
            {/* <!-- Fim Navbar Config --> */}

            <div className="procurar">
                <div className="pesquisar">
                    <i className="bi bi-search logoPesquisar" onClick={applyFilter}></i>
                    <input
                        className="form-control me-2 pesquisarInput"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar"
                    />
                    <select
                        className="form-select opcoes"
                        value={searchColumn}
                        onChange={handleSearchColumnChange}
                    >
                        <option value="name">Nome</option>
                        <option value="email">Email</option>
                        <option value="cpf">CPF</option>
                        <option value="estado">Estado</option>
                        <option value="cidade">Cidade</option>
                        <option value="rua">Rua</option>
                    </select>

                </div>

                <div className="filtrar">
                    <div class="dropdown form-filtrar">
                        <button class="btn btn-secondary dropdown-toggle dropdown-Filtrar" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filtro
                        </button>
                        <ul class="dropdown-menu itensFiltrar">
                            <li>
                                <select className="form-select opcoesAZ"
                                    value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                                    <option value="asc">A-Z</option>
                                    <option value="desc">Z-A</option>
                                    <option value="normal">Ordem normal</option>
                                </select>
                            </li>
                            <li>
                                <select className="form-select opcoesAZ"
                                    value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}
                                >
                                    <option value="all">Todas as regioes</option>
                                    <option value="Norte">Norte</option>
                                    <option value="Nordeste">Nordeste</option>
                                    <option value="Centro-Oeste">Centro-Oeste</option>
                                    <option value="Sul">Sul</option>
                                    <option value="Sudeste">Sudeste</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Tabela */}
            <div className="tabela">
                <div className="conteudoTable">
                    <div>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="d-none d-sm-table-cell">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col" className="d-none d-sm-table-cell">CPF</th>
                                    <th scope="col" className="d-none d-sm-table-cell  cell-email">Email</th>
                                    <th scope="col" className="d-none d-sm-table-cell cell-state">Estado</th>
                                    <th scope="col">Visualizar</th>
                                    <th scope="col" >Editar</th>
                                    <th scope="col" >Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSearchedData().map(user => (

                                    <tr key={user.id}>
                                        <td className="d-none d-sm-table-cell">{user.id}</td>
                                        <td>{user.name}</td>
                                        <td className="d-none d-sm-table-cell">{user.cpf}</td>
                                        <td className="d-none d-sm-table-cell cell-email">{user.email}</td>
                                        <td className="d-none d-sm-table-cell cell-state">{user.estado}</td>

                                        <td><button type="button" className="btn btn-info btn-view" data-bs-toggle="modal"
                                            data-bs-target={`#staticBackdrop-${user.id}`}><i className="bi bi-eye"></i></button></td>

                                        <td >
                                            <button onClick={() => openEditPopover(user)} type="button" class="btn btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i class="bi bi-pencil-fill"></i>
                                            </button>


                                            <div class="modal modalListar fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body modal-editar">
                                                            <div className="container-fluid container-fluidListar base-modal-editar">
                                                                {editingUser && (
                                                                    // Popover de edição dos dados do usuário
                                                                    <div className="row">
                                                                        <div className="col colistar">
                                                                            <form className="formFulLISTAR">
                                                                                <div className="form-floating mb-3">
                                                                                    <h2 className="textoID">Editar </h2>
                                                                                </div>
                                                                                <div className="form-floating mb-3">
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        name="name"
                                                                                        value={editedData.name}
                                                                                        onChange={handleFieldChange}
                                                                                    />
                                                                                    <label htmlFor="name">Nome:</label>
                                                                                </div>
                                                                                <div className="form-floating mb-3">
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="email"
                                                                                        name="email"
                                                                                        value={editedData.email}
                                                                                        onChange={handleFieldChange}
                                                                                    />
                                                                                    <label htmlFor="name">Email:</label>
                                                                                </div>
                                                                                <div className="form-floating mb-3">
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        name="cpf"
                                                                                        value={editedData.cpf}
                                                                                        onChange={handleFieldChange}
                                                                                    />
                                                                                    <label htmlFor="name">CPF:</label>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col colCep">
                                                                                        <div className="form-floating formCep mb-3">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control "
                                                                                                placeholder="CEP"
                                                                                                name="cep"
                                                                                                value={editedData.cep}
                                                                                                onChange={handleCEPChange}
                                                                                                required
                                                                                            />
                                                                                            <label htmlFor="name">CEP:</label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col colState">
                                                                                        <div className="form-floating formState mb-3">
                                                                                            <input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                name="estado"
                                                                                                value={editedData.estado}
                                                                                                onChange={handleFieldChange}
                                                                                            />
                                                                                            <label htmlFor="name">Estado:</label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>                                                                   <div className="form-floating mb-3">
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        name="cidade"
                                                                                        value={editedData.cidade}
                                                                                        onChange={handleFieldChange}
                                                                                    />
                                                                                    <label htmlFor="name">Cidade:</label>
                                                                                </div>
                                                                                <div className="form-floating mb-3 last-input">
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        name="rua"
                                                                                        value={editedData.rua}
                                                                                        onChange={handleFieldChange}
                                                                                    />
                                                                                    <label htmlFor="name">Rua:</label>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button onClick={saveEditedData} type="button" class="btn btn-secondary btn-save" data-bs-dismiss="modal">Salvar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></td>

                                        <td><button className="btn btn-danger btn-delete"
                                            onClick={() => deleteUser(user.id)}
                                        ><i
                                            className="bi bi-trash-fill"></i></button></td>
                                    </tr>


                                ))}
                                {/* <!-- Adicione mais linhas conforme necessário --> */}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* parte matheus */}
                {/*        <nav aria-label="Page navigation example paginas">
                    <ul className="pagination  justify-content-center">
                       
                        <li className="page-item"><a className="page-link" onClick={prePage} href="#" disabled={currentPage === 1 }><i class="bi bi-arrow-left"></i></a></li>
                        {
                            numbers.map((n,i) =>{
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a className="page-link" onClick={()=> changeCPage(n)} href="#">{n}</a>
                                </li>
                            })
                        }
                         <li className="page-item"><a className="page-link"onClick={nextPage} href="#" disabled={currentPage === npage}><i class="bi bi-arrow-right"></i></a></li>
                       
                    </ul>
                </nav> */}

            </div>

            {/* Footer */}
            <div class="footer-dashboard footer-listar d-none d-sm-table-cell">

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
            </div>

            {/* Modal de Visualizar */}
            {filteredAndSearchedData().map(user => (
                <div className="modal modalListar fade"
                    id={`staticBackdrop-${user.id}`}
                    tabindex="-1" aria-labelledby={`staticBackdropLabel-${user.id}`} aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content modal-contentListar">
                            <div className="modal-header modal-headerListar">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Detalhes do Usuário</h1>
                                <span className="custom-close custom-closeListar" data-bs-dismiss="modal">&times;</span>
                            </div>

                            <div className="modal-body modal-bodyListar modal-table modal-tableListar">
                                {/* <!-- Conteúdo do modal --> */}
                                <div className="table-responsive">
                                    <table className="table table_center">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">CPF</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">CEP</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Cidade</th>
                                                <th scope="col">Rua</th>
                                                <th scope="col">Complemento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td className="cpfTable">{user.cpf}</td>
                                                <td>{user.email}</td>
                                                <td>{user.cep}</td>
                                                <td>{user.estado}</td>
                                                <td>{user.cidade}</td>
                                                <td>{user.rua}</td>
                                                <td>{user.complemento}</td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    );
}

export default Listar;  