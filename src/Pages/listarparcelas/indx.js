import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaParcelas() {
  const [parcelas, setParcelas] = useState([]);

  useEffect(() => {
    mostrarParcelas();
  }, []);

  function mostrarParcelas() {
    api.get('/parcelas')
      .then(res => {
        console.log(res.data.parcelas);
        setParcelas(res.data.parcelas);
      })
      .catch(error => {
        console.error('Erro ao buscar parcelas:', error);
      });
  }

  const apagarParcela = (id) => {
    confirmAlert({
      title: 'Excluir Parcela',
      message: 'Deseja realmente excluir esta parcela?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/parcelas/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Parcela com ID ${id} Excluída com Sucesso!`);
                  mostrarParcelas();
                } else {
                  alert("Houve um Problema no servidor ao excluir a Parcela.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir parcela:', error);
                alert("Houve um erro ao excluir a parcela. Por favor, tente novamente.");
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
        <Head title="Lista de Parcelas" />
        <Link to="/cadastroparcela" className='btn-novo'>Nova Parcela</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Faturamento ID</th>
              <th>Número da Parcela</th>
              <th>Valor da Parcela</th>
              <th>Data de Vencimento</th>
              <th>Data de Pagamento</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parcelas.map(parcela => (
              <tr key={parcela.id}>
                <td>{parcela.id}</td>
                <td>{parcela.faturamento_id}</td>
                <td>{parcela.numero_parcela}</td>
                <td>{parcela.valor_parcela.toFixed(2)}</td>
                <td>{new Date(parcela.data_vencimento).toLocaleDateString()}</td>
                <td>{parcela.data_pagamento ? new Date(parcela.data_pagamento).toLocaleDateString() : 'N/A'}</td>
                <td>{parcela.status}</td>
                <td className='botoes'>
                  <Link to={`/editarparcela/${parcela.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarParcela(parcela.id)}
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
