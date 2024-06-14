import React from "react";
import '../QuemSomos/QuemSomos.css';

export const QuemSomos = () => {

    return (
        <div>
            <body className="quemSomosBody">
                <h1 className="title-qs">Quem Somos?</h1>
                <section className="conteudo-qs">
                    <div className="gridQuemSomos">
                        <img className="quemSomosChild1 quemSimg" src="menininhos.png" alt="" />
                        <h6 className=" quemSomosChild2 quemSomosText">A equipe Alpha Develop está entusiasmada em compartilhar os resultados de semanas de dedicação ao trabalho. Cada membro contribuiu de forma única para o quebra-cabeça da tecnologia, trazendo suas habilidades e experiências para o projeto. Essa colaboração resultou em conquistas significativas das quais estamos imensamente orgulhosos. Estamos ansiosos para compartilhar mais detalhes sobre nossos avanços em breve.</h6>
                    </div>

                </section>

               
            </body>
        </div>
    );
}

export default QuemSomos;