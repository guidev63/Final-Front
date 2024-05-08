import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiTrash } from "react-icons/fi";
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';
import moment from 'moment/moment';

export default function ListaOrcamento() {
    const [orcamentos, setOrcamentos] = useState([]);

    useEffect(() => {
        mostrarOrcamentos();
    }, []);

    function mostrarOrcamentos() {
        api.get('/orcamento')
            .then(res => {
                console.log(res.data.orcamentos);
                setOrcamentos(res.data.orcamentos);
            })
            .catch(error => {
                console.error("Erro ao buscar orçamentos:", error);
                alert("Ocorreu um erro ao buscar os orçamentos. Por favor, tente novamente.");
            });
    }

    function formatarData(data) {
        return moment(data).format('DD/MM/YYYY');
    }

    const apagarOrcamento = (id) => {
        if (window.confirm("Deseja realmente excluir este orçamento?")) {
            api.delete(`/orcamento/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        alert(`O orçamento com ID: ${id} foi excluído com sucesso.`);
                        mostrarOrcamentos();
                    } else {
                        alert("Ocorreu um erro ao excluir o orçamento. Por favor, tente novamente.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao excluir orçamento:", error);
                    alert("Ocorreu um erro ao excluir o orçamento. Por favor, tente novamente.");
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
                <Head title="Lista de Orçamentos" />
                <Link to="/cadastroorcamento" className='btn-novo'>Novo Cadastro</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Descrição</th>
                            <th>Valor Total</th>
                            <th>Data de Validade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orcamentos.map(orcamento => (
                            <tr key={orcamento.id}>
                                <td>{orcamento.id}</td>
                                <td>{orcamento.cliente}</td>
                                <td>{orcamento.descricao}</td>
                                <td>{orcamento.valorTotal}</td>
                                <td>{formatarData(orcamento.dataValidade)}</td>
                                <td>
                                    <FiTrash
                                        size={18}
                                        color='red'
                                        onClick={() => apagarOrcamento(orcamento.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
