import React from "react"

export const AddUser = () => {
    return (
        <div>
         <div className="card-cadastro">
            <div className="header-Cadastro">
                <img src="/img/logo-cadastro.png" alt="" />
            </div>
                
                <form>
                    <div className="info-Login">
                        <div className="row mb-3" >
                            <div className="col-sm-10">
                                <input type="text" name="nome" placeholder="Digite o seu nome" />
                                <input type="email" name="email" placeholder="Digite o seu email"/>
                                <input type="password" name="password" placeholder="Digite a senha"/>
                            </div>
                        </div>
                    </div>
                    <div className="infos">
                        
                        <button type="submit" className="btn"><a href="/dashboard">Entrar</a></button>  
                    </div>
                    
                </form>
            </div>


        </div>
    )
}

export default AddUser