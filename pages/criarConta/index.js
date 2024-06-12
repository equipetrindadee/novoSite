
import React, { useState } from 'react';
import api from "../../config/configApi.js"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../criarConta/criarConta.css'


export const CriarConta = () => {
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
            navigate("/");
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
        <body className="fundo4">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 left-side-2">
                        <img src="/img/logoAlphaSimples.svg" alt="Logo" class="logo" />

                        <h1 class="text-center text-white">Criar Conta</h1>
                        <form className="formCriarConta">
                            <div class="form-group createForm-2">
                                <input type="text" class="form-control btn" placeholder="Nome" name="name" value={user.name} onChange={usuariosUpdate} required />
                            </div>
                            <div class="form-group createForm-2">
                                <input type="email" class="form-control btn" placeholder="Email" name="email" value={user.email} onChange={usuariosUpdate} required  />
                            </div>
                            <div class="form-group createForm-2">
                                <input type="password" class="form-control btn" placeholder="Senha" name="password" value={user.password} onChange={usuariosUpdate} required  />
                            </div>
                            <div class="form-group createForm-2">
                                <input type="text" class="form-control btn" placeholder="CPF" name="cpf" value={user.cpf} onChange={usuariosUpdate} required />
                            </div>
                            <div class="form-group createForm-2">
                                <input type="text" class="form-control btn" placeholder="CEP" name="cep" value={user.cep} onChange={handleCEPChange} required  />
                            </div>
                            <div class="form-group createForm-2">
                                <input type="text" class="form-control btn" placeholder="Estado" name="estado" value={user.estado} onChange={usuariosUpdate} require />
                            </div>
                            <div class="form-group createForm-2">
                                <input type="text" class="form-control btn" placeholder="Cidade" name="cidade" value={user.cidade} onChange={usuariosUpdate} required  />
                            </div>
                            <div class="form-group createForm-2">
                                <input type="text" class="form-control btn" placeholder="Endereço" name="rua" value={user.rua} onChange={usuariosUpdate} required/>
                            </div>
                            <div class="form-group createForm-2">
                                <input type="text" class="form-control btn" placeholder="Complemento" name="complemento" value={user.complemento} onChange={usuariosUpdate} required />
                            </div>
                            <div className="buttonCriarConta">
                            {status.type === 'error' ? <p className='mensagemError'>{status.mensagem}</p> : ""}
                                <button class="btn btn-lajanja"  onClick={postSubmit}>
                                    <p>CRIAR</p>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 right-side">
                        <img src="/img/moca-celular.svg" alt="Background Image" class="background-image" />
                    </div>
                </div>
            </div>
        </body>
    )

}

export default CriarConta