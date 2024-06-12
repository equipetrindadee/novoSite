import React, { useState, useContext } from "react";
import api from "../../config/configApi.js";
import { useNavigate } from 'react-router-dom';
import { Context, AuthProvider } from "../../Context/AuthContext.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../login/login.css";

export const Login = () => {
    const { authenticated, singIn } = useContext(Context);
    console.log("Usuário está" + authenticated);

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });
    const [loading, setLoading] = useState(false);

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const loginSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const headers = { 'Content-Type': 'application/json' };

        try {
            const response = await api.post('/user-login', user, { headers });
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            });
            localStorage.setItem('token', response.data.token);
            singIn(true);

            // Redirecionar com base no domínio do email
            if (user.email.endsWith('@alpha.com')) {
                return navigate("/dashboard");
            } else {
                return navigate("/");
            }
        } catch (error) {
            setStatus({ type: 'error', mensagem: error.response.data.mensagem || "Erro ao fazer login" });
        } finally {
            setLoading(false);
        }
    };

    const token = localStorage.getItem('token');

    return (
        <div className="login-body">
            <section>
                <div className="login-content">
                    <form onSubmit={loginSubmit} className="content-login">
                        <div className="login-header">
                            <img src="./img/img_logo.svg" width={80} />
                            <h1>Login</h1>
                        </div>
                        <div className="mb-3 mb-3-login">
                            <label className="alLabel">Email</label>
                            <input type="email" name="email" placeholder="Digite seu email" onChange={valueInput} />
                        </div>
                        <div className="mb-3 mb-3-login">
                            <label className="alLabel">Senha</label>
                            <input type="password" name="password" placeholder="Digite a sua senha" onChange={valueInput} />
                        </div>
                        {status.type === 'success' ? <p className="login-mensagem">{status.mensagem}</p> : ""}
                        {status.type === 'error' ? <p className="login-mensagem">{status.mensagem}</p> : ""}
                        <div className="more-information">
                            {/* <a className="link-info link-dark" href="/mudar-senha">Esqueci minha senha</a> */}
                            <br />
                            <a className="link-info link-dark" href="/criarConta">Cadastre-se</a>
                        </div>
                        <div className="nav-icons">
                            {/* <div className="icon-item">
                                <i className="bx bxl-google"></i>
                            </div>
                            <div className="icon-item i2">
                                <i className='bx bxl-github'></i>
                            </div>
                            <div className="icon-item i2">
                                <i className='bx bxs-envelope'></i>
                            </div> */}
                        </div>
                        <button type="submit" className="btn buttonDark" disabled={loading}>
                            {loading ? 'Carregando...' : 'Entrar'}
                        </button>
                    </form>
                    <div className="final-login">
                        <img className="login-img" src="login.gif" width={400} />
                    </div>
                    <div className="blackbox"></div>
                </div>
            </section>
        </div>
    );
}

export default Login;
