import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaFaturamentos() {
  const [faturamentos, setFaturamentos] = useState([]);

  useEffect(() => {
    mostrarFaturamentos();
  }, []);

  function mostrarFaturamentos() {
    api.get('/faturamentos')
      .then(res => {
        console.log(res.data.faturamentos);
        setFaturamentos(res.data.faturamentos);
      })
      .catch(error => {
        console.error('Erro ao buscar faturamentos:', error);
      });
  }

  const apagarFaturamento = (id) => {
    confirmAlert({
      title: 'Excluir Faturamento',
      message: 'Deseja realmente excluir este faturamento?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/faturamentos/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Faturamento com ID ${id} excluído com sucesso!`);
                  mostrarFaturamentos();
                } else {
                  alert("Houve um problema no servidor ao excluir o faturamento.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir faturamento:', error);
                alert("Houve um erro ao excluir o faturamento. Por favor, tente novamente.");
              });
          }
        },
        {
          label: 'Não',
          onClick: () => alert('Exclusão cancelada.')
        }
      ]
    });
  };

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <h1></h1>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Lista de Faturamentos" />
        <Link to="/cadastrarfaturamento" className='btn-novo'>Novo Cadastro</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ordem de Serviço ID</th>
              <th>Venda ID</th>
              <th>Valor Total</th>
              <th>Data de Faturamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {faturamentos.map(faturamento => (
              <tr key={faturamento.id}>
                <td>{faturamento.id}</td>
                <td>{faturamento.ordem_de_servico_id}</td>
                <td>{faturamento.venda_id}</td>
                <td>{faturamento.valor_total}</td>
                <td>{faturamento.data_faturamento}</td>
                <td className='botoes'>
                  <Link to={`/editarfaturamento/${faturamento.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarFaturamento(faturamento.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
