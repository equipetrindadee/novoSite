import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../config/configApi.js";
import "../changePass/mudarSenha.css"

export const ChangePass = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const isEmailValid = email.trim() !== '';
    const isFormValid = newPassword !== '' && confirmNewPassword !== '';
    const isPasswordValid = newPassword.length >= 5;

    const handleRecoverPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormSubmitted(true);

        try {
            const response = await api.post('/recover-password', { email });

            if (response.data.error && response.data.message === "Email não encontrado") {
                setError(response.data.message);
            } else {
                setError('');
                setNewPassword('');
                setConfirmNewPassword('');
            }
        } catch (error) {
            setError("Erro ao tentar recuperar a senha. Tente novamente mais tarde.");
        }

        setIsLoading(false);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormSubmitted(true);

        if (newPassword !== confirmNewPassword) {
            setError("As senhas não coincidem");
            setIsLoading(false);
            return;
        }

        if (!isPasswordValid) {
            setError("A nova senha deve ter no mínimo 5 caracteres");
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post('/password-change', { email, newPassword });

            if (response.data.error) {
                setError(response.data.message);
            } else {
                setError("");
                // Você pode adicionar aqui a lógica para redirecionar para a próxima tela
            }
        } catch (error) {
            setError("Erro ao tentar redefinir a senha. Tente novamente mais tarde.");
        }

        setIsLoading(false);
    };



    return (
        <body>
            <div>
                <div class="container-fluid p-0">
                    <div class="row m-0">
                        <div class="col-md-6 col-md-6-mudarSenha d-flex align-items-center justify-content-center flex-column order-md-1 order-2 fundo-img">
                            <img className="" src="../img/img_mudarSenha.svg" alt="Image" class="img-fluid" />
                        </div>
                        <div class="col-md-6 bg-yellow  d-flex flex-column order-md-2 order-1 direito">

                            <h2 class="mb-3">Mudar Senha</h2>
                            <form className="changePassword-dad" onSubmit={formSubmitted ? handlePasswordReset : handleRecoverPassword}>
                                {error && <p className="text-danger text-center">{error}</p>}

                                {/* email */}
                                <div class="mb-3 mb-3-senha email">
                                    <input className="form-control btn" type="text" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                                </div>
                                {/* password */}
                                <div class="mb-3 mb-3-senha senha">
                                    <input type="password" className="form-control btn" name="newPassword" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                {/* comfirmar password */}
                                <div class="mb-3 mb-3-senha comfirme">
                                    <input type="password" className="form-control btn" name="confirmNewPassword" placeholder="Confirme a senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                </div>

                                <button type="submit" className={`btn ${isLoading || (!isEmailValid && !isFormValid) ? 'disabled' : ''}`} disabled={isLoading || (!isEmailValid && !isFormValid)}>
                                    {isLoading ? "Enviando..." : formSubmitted ? "Redefinir Senha" : "MUDAR"}
                                </button>
                                {formSubmitted && (
                                    <a className="voltar" href="/"> Voltar para o início</a>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </body>

        //     <body>
        //     <div>
        //         <div className="formulario_senha">
        //             <img src="/img/boot.png" alt=""></img>

        //             <div className="login_senha">
        //                 <form onSubmit={formSubmitted ? handlePasswordReset : handleRecoverPassword} >
        //                     {error && <p className="text-danger text-center">{error}</p>}
        //                     <h1>Redefinir a senha</h1>
        //                     <h2>Coloque seu e-mail</h2>
        //                     <input className="form-control" type="text" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        //                     <input type="password" className="form-control" name="newPassword" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        //                     <input type="password" className="form-control" name="confirmNewPassword" placeholder="Confirme a Nova senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

        //                     <button type="submit" className={`btn btn-lg btn-block ${isLoading || (!isEmailValid && !isFormValid) ? 'disabled' : ''}`} disabled={isLoading || (!isEmailValid && !isFormValid)}>
        //                         {isLoading ? "Enviando..." : formSubmitted ? "Redefinir Senha" : "Recuperar Senha"}
        //                     </button>
        //                     {formSubmitted && (
        //                         <div className="mt-3 text-center">
        //                             <Link to="/" className="text-danger">Voltar ao login</Link>
        //                         </div>
        //                     )}
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </body>
    )


}

export default ChangePass;