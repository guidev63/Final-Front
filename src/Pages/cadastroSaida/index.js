import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';

export default function Listasaida() {
    const [banco, setBanco] = useState([]);

    useEffect(() => {
        mostrarDados();
    }, []); // Chamada apenas na montagem do componente (equivalente ao componentDidMount)

    function mostrarDados() {
        const saida = JSON.parse(localStorage.getItem("cd-saidas") || "[]");
        setBanco(saida);
    }

    function apagar(id) {
        confirmAlert({
            title: 'Excluir Saída',
            message: 'Deseja realmente excluir essa Saída?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        let dadosNovos = banco.filter(item => item.id !== id);
                        localStorage.setItem("cd-saidas", JSON.stringify(dadosNovos));
                        setBanco(dadosNovos);
                        alert(`Você apagou uma saída id:${id}`);
                    }
                },
                {
                    label: 'Não',
                    onClick: () => alert('Click No')
                }
            ]
        });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> menu </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Lista de Saída" />
                <Link to="/cadastrosaida" className='btn-novo'>saída</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor Unitário</th>
                            <th>Data de Saída</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {banco.map((linha, index) => (
                            <tr key={index}>
                                <td>{linha.id}</td>
                                <td>{linha.nome_produto}</td>
                                <td>{linha.quantidade}</td>
                                <td>{linha.valor_unitario}</td>
                                <td>{linha.data_saida}</td>
                                <td className='botoes'>
                                    <FiTrash
                                        size={18}
                                        color='red'
                                        onClick={() => apagar(linha.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}