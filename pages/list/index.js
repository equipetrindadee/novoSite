import React, { useEffect, useState } from "react"
import api from "../../config/configApi.js"
import axios from 'axios'

export const List = () => {
    const [data, setData] = useState([])
    /* INFO BOTO~ES*/
    const [editingUser, setEditingUser] = useState(null)
    const [editedData, setEditedData] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const [filterColumn, setFilterColumn] = useState('name');
    const [filterOption, setFilterOption] = useState('asc');
    const [filteredData, setFilteredData] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [regionFilter, setRegionFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('name');
    const [deletePopoverOpen, setDeletePopoverOpen] = useState(false); // Estado para controlar o popover de confirmação
    const [deletingUserId, setDeletingUserId] = useState(null);


    const getUsers = async () => {

        // requisição da Api com os Usuarios
        await api.get('/users')
            .then((response) => {
                // console.log(response.data.users)
                setData(response.data.users)


            }).catch((err) => {

                console.log('não chegou.....')

            })
    }
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
        await api.put(`/usuario/${editedData.id}`, editedData)
            .then((response) => {
                getUsers();
                closeEditPopover();
            }).catch((err) => {
                console.log(err);
            });
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
        await api.delete(`/user/${id}`)
            .then((response) => {
                getUsers();
            }).catch((err) => {
                console.log(err);
            });
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
        let filteredDataCopy = [...(isFilterApplied ? filteredData : data)];
        if (searchTerm && searchTerm.trim() !== "") {
            filteredDataCopy = filteredDataCopy.filter(item =>
                item[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filteredDataCopy;
    };


    return (
        <body>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <img src="../img/logo.png" alt="" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/dashboard"><i className="bi bi-speedometer2"></i></a>
                            <p>Dashboard</p>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/listar"><i className="bi bi-card-list"></i></a>
                            <p>Listar</p>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/formulario"><i className="bi bi-ui-checks-grid"></i></a>
                            <p>Formulário</p>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/visualizar"><i className="bi bi-eye"></i></a>
                            <p>Visualizar</p>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/alerta"><i className="bi bi-exclamation-square"></i></a>
                            <p>Alerta</p>
                        </li>
                        <li className="nav-item">
                            <div class="dropdown">
                                <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <a className="nav-link" href="#"><i className="bi bi-person-circle"></i></a>
                                    <p>Custorms</p>
                                </button>
                                <ul className="dropdown-menu ">
                                    <li><a className="dropdown-item " href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            <div class="table_content">
                {/* parte dos frufrus */}

                <section>
                <div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar..."
                    />
                    <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
                        <option value="name">Nome</option>
                        <option value="email">Email</option>
                        <option value="cpf">CPF</option>
                        <option value="estado">Estado</option>
                        <option value="cidade">Cidade</option>
                        <option value="rua">Rua</option>
                    </select>
                    <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                        <option value="normal">Ordem normal</option>
                    </select>
                    <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                        <option value="all">Todas as regioes</option>
                        <option value="Norte">Norte</option>
                        <option value="Nordeste">Nordeste</option>
                        <option value="Centro-Oeste">Centro-Oeste</option>
                        <option value="Sul">Sul</option>
                        <option value="Sudeste">Sudeste</option>
                    </select>
                    <button className="filter-btn" onClick={applyFilter}><i class="bi bi-search lupa"></i></button>
                </div>
                {deletePopoverOpen && (
                    <div className="popover-delete">
                        <div className="popover-content">
                            <p>Deseja realmente deletar este usuário?</p>
                            <button className="confirm-btn" onClick={() => deleteUser(deletingUserId)}>Confirmar</button>
                            <button className="cancel-btn" onClick={closeDeletePopover}>Cancelar</button>
                        </div>
                    </div>
                )}
                </section>
               
                {/* fim dos frufrus */}
                <table class="table table-borderless">
                    <div class="px-4 text-center">
                        <div class="row gx-5">
                            
                          
                        </div>
                    </div>
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Coluna 4</th>
                            <th scope="col">Coluna5</th>
                            <th scope="col">Coluna 6</th>
                            <th scope="col">Ações</th>

                        </tr>
                    </thead>
                    <tbody>
                        { filteredAndSearchedData().map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.email}</td>
                                <td>
                                    
                                    <button type="button" class="btn btn-primary" onClick={() => openEditPopover(user)}>
                                        <i className='bx bxs-pencil'></i>
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>
                                        <i className='bx bxs-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingUser && (
                    <div className="popover-listar2">
                        <div className="popover-content">
                            <button className="close-btn" onClick={closeEditPopover}>
                                Fechar
                            </button>
                            <h3>Editar Usuário</h3>
                            <p>ID: {editingUser.id}</p>
                            <label htmlFor="name">Nome:</label>
                            <textarea id="name" name="name" value={editedData.name || ''} onChange={handleFieldChange} className="editar" />
                            <label htmlFor="email">Email:</label>
                            <textarea id="email" name="email" value={editedData.email || ''} onChange={handleFieldChange} className="editar" />
                            <label htmlFor="cpf">CPF:</label>
                            <textarea id="cpf" name="cpf" value={editedData.cpf || ''} onChange={handleFieldChange} className="editar" />
                            <label htmlFor="estado">Estado:</label>
                            <textarea id="estado" name="estado" value={editedData.estado || ''} onChange={handleFieldChange} className="editar" />
                            <label htmlFor="cidade">Cidade:</label>
                            <textarea id="cidade" name="cidade" value={editedData.cidade || ''} onChange={handleFieldChange} className="editar" />
                            <label htmlFor="rua">Rua:</label>
                            <textarea id="rua" name="rua" value={editedData.rua || ''} onChange={handleFieldChange} className="editar" />
                            <label htmlFor="cep">Cep:</label>
                            <textarea id="cep" name="cep" value={editedData.cep || ''} onChange={handleFieldChange} className="editar" />
                            <button className="save-btn" onClick={saveEditedData}>Salvar Informações</button>
                        </div>
                    </div>
                )}

                <nav aria-label="Page navigation example paginas">
                    <ul className="pagination  justify-content-center">

                        <li className="page-item"><a className="page-link" onClick={prePage} href="#" disabled={currentPage === 1}>Prev</a></li>
                        {
                            numbers.map((n, i) => {
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a className="page-link" onClick={() => changeCPage(n)} href="#">{n}</a>
                                </li>
                            })
                        }
                        <li className="page-item"><a className="page-link" onClick={nextPage} href="#" disabled={currentPage === npage}>next</a></li>

                    </ul>
                </nav>
            </div>

        </body>
    )
    function prePage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }


    function changeCPage(id) {
        setCurrentPage(id)
    }
    function nextPage() {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1)
        }
    }
}


export default List