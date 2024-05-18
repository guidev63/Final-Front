import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaPagamentos() {
  const [pagamentos, setPagamentos] = useState([]);

  useEffect(() => {
    mostrarPagamentos();
  }, []);

  function mostrarPagamentos() {
    api.get('/pagamentos')
      .then(res => {
        console.log(res.data.pagamentos);
        setPagamentos(res.data.pagamentos);
      })
      .catch(error => {
        console.error('Erro ao buscar pagamentos:', error);
      });
  }

  const apagarPagamento = (id) => {
    confirmAlert({
      title: 'Excluir Pagamento',
      message: 'Deseja realmente excluir este pagamento?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/pagamentos/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Pagamento com ID ${id} Excluído com Sucesso!`);
                  mostrarPagamentos();
                } else {
                  alert("Houve um Problema no servidor ao excluir o Pagamento.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir pagamento:', error);
                alert("Houve um erro ao excluir o pagamento. Por favor, tente novamente.");
              });
          }
        },
        {
          label: 'Não',
          onClick: () => alert('Exclusão Cancelada.')
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
        <Head title="Lista de Pagamentos" />
        <Link to="/cadastropagamento" className='btn-novo'>Novo Pagamento</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Faturamento ID</th>
              <th>Valor Pago</th>
              <th>Data do Pagamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map(pagamento => (
              <tr key={pagamento.id}>
                <td>{pagamento.id}</td>
                <td>{pagamento.faturamento_id}</td>
                <td>{pagamento.valor_pago.toFixed(2)}</td>
                <td>{new Date(pagamento.data_pagamento).toLocaleDateString()}</td>
                <td className='botoes'>
                  <Link to={`/editarpagamento/${pagamento.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarPagamento(pagamento.id)}
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