import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaVendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    mostrarVendas();
  }, []);

  function mostrarVendas() {
    api.get('/vendas')
      .then(res => {
        console.log(res.data.vendas);
        setVendas(res.data.vendas);
      })
      .catch(error => {
        console.error('Erro ao buscar vendas:', error);
      });
  }

  const apagarVenda = (id) => {
    confirmAlert({
      title: 'Excluir Venda',
      message: 'Deseja realmente excluir esta venda?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/vendas/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Venda com ID ${id} Excluída com Sucesso!`);
                  mostrarVendas();
                } else {
                  alert("Houve um Problema no servidor ao excluir a Venda.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir venda:', error);
                alert("Houve um erro ao excluir a venda. Por favor, tente novamente.");
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
        <Head title="Lista de Vendas" />
        <Link to="/cadastrarvenda" className='btn-novo'>Nova Venda</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Cliente Id</th>
              <th>Data Da Venda</th>
              <th>Valor Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map(venda => (
              <tr key={venda.id}>
                <td>{venda.id}</td>
                <td>{venda.cliente_id}</td>
                <td>{new Date(venda.data_venda).toLocaleDateString()}</td>
                <td>{venda.valor_total.toFixed(2)}</td>
                <td className='botoes'>
                  <Link to={`/editarvenda/${venda.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarVenda(venda.id)}
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