import React, { useState, useEffect } from "react";
import api from "../../config/configApi.js";

export const User = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [showPopover, setShowPopover] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/users/${userId}`); // Usa o userId na rota de busca
                setUser(response.data.user);
            } catch (error) {
                console.error('Erro ao obter o usuário:', error);
                setError(error.message);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]); // Executa useEffect apenas quando userId mudar

    return (
        <div className="user-body">
            {user ? (
                <>
                    <div className="user-img">
                        <img className="userImg" src="/img/userImg.svg" width={300} />
                    </div>
                    <div className="user-title">
                        <h1>Usuário: {user.name}</h1>
                    </div>
                    <div className="user-infoBody">
                        <div className="users-information">
                            <h5>ID</h5>
                            <p>{user.id}</p>
                        </div>
                        <div className="users-information">
                            <h5>Email</h5>
                            <p>{user.email}</p>
                        </div>
                        {/* Adicione mais campos de informações do usuário conforme necessário */}
                    </div>
                </>
            ) : (
                <p>Carregando usuário...</p>
            )}
        </div>
    );
};

export default User;