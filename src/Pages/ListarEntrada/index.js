import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu'
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';
import moment from 'moment/moment';

export default function Listaentrada() {
    const [banco, setBanco] = useState([]);

    useEffect(() => {
        mostrardados();
    }, [])

    function mostrardados() {
        api.get('/entrada')
            .then(res => {
                console.log(res.data.entradas)
                setBanco(res.data.entradas)
            })
            .catch(error => {
                console.error("Erro ao buscar entradas:", error);
                alert("Ocorreu um erro ao buscar as entradas. Por favor, tente novamente.");
            });
    }

    function formatarData(data) {
        return moment(data).format('DD/MM/YYYY');
    }

    const apagar = (id) => {
        if (window.confirm("Deseja realmente excluir essa entrada?")) {
            api.delete(`/entrada/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        alert(`Você apagou a entrada com o ID: ${id}`);
                        mostrardados();
                    } else {
                        alert("Ocorreu um erro ao excluir a entrada. Por favor, tente novamente.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao excluir entrada:", error);
                    alert("Ocorreu um erro ao excluir a entrada. Por favor, tente novamente.");
                });
        }
    };

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1>  </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Lista de Entrada" />
                <Link to="/cadastroentrada" className='btn-novo'>Novo Cadastro</Link>
                <table className="table">
                    <tr>
                        <th>Id</th>
                        <th>ID_PRODUTO</th>
                        <th>PRODUTO</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th>Data de Entrada</th>
                        <th></th>
                    </tr>
                    {
                        banco.map((linha) => {
                            return (
                                <tr key={linha.id.toString()}>
                                    <td>{linha.id}</td>
                                    <td>{linha.id_produto}</td>
                                    <td>{linha.descricao}</td>
                                    <td>{linha.quantidade}</td>
                                    <td>{linha.valor_unitario}</td>
                                    <td>{formatarData(linha.data_entrada)}</td>
                                    <td className='botoes'>
                                        <FiTrash
                                            size={18}
                                            color='red'
                                            onClick={() => apagar(linha.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div >
    )
}
