import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaServicos() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    mostrarServicos();
  }, []);

  function mostrarServicos() {
    api.get('/servicos')
      .then(res => {
        console.log(res.data.servicos);
        setServicos(res.data.servicos);
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
      });
  }

  const apagarServico = (id) => {
    confirmAlert({
      title: 'Excluir Serviço',
      message: 'Deseja realmente excluir este serviço?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/servicos/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Serviço com ID ${id} excluído com sucesso!`);
                  mostrarServicos();
                } else {
                  alert("Houve um problema no servidor ao excluir o serviço.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir serviço:', error);
                alert("Houve um erro ao excluir o serviço. Por favor, tente novamente.");
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
        <Head title="Lista de Serviços" />
        <Link to="/cadastrarservico" className='btn-novo'>Novo Cadastro</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map(servico => (
              <tr key={servico.id}>
                <td>{servico.id}</td>
                <td>{servico.nome}</td>
                <td>{servico.descricao}</td>
                <td>{servico.preco}</td>
                <td className='botoes'>
                  <Link to={`/editarservico/${servico.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                </td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarServico(servico.id)}
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
