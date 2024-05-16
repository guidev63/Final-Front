import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    mostrarFornecedores();
  }, []);

  function mostrarFornecedores() {
    api.get('/fornecedores')
      .then(res => {
        console.log(res.data.fornecedores);
        setFornecedores(res.data.fornecedores);
      })
      .catch(error => {
        console.error('Erro ao buscar fornecedores:', error);
      });
  }

  const apagarFornecedor = (id) => {
    confirmAlert({
      title: 'Excluir Fornecedor',
      message: 'Deseja realmente excluir este fornecedor?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/fornecedores/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Fornecedor com ID ${id} excluído com sucesso!`);
                  mostrarFornecedores();
                } else {
                  alert("Houve um problema no servidor ao excluir o fornecedor.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir fornecedor:', error);
                alert("Houve um erro ao excluir o fornecedor. Por favor, tente novamente.");
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
        <Head title="Lista de Fornecedores" />
        <Link to="/cadastrarfornecedor" className='btn-novo'>Novo Cadastro</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Gênero</th>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Email</th>
              <th>Contato</th>
              <th>Endereço</th>
              <th>Setor</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>CEP</th>
              <th>Complemento</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map(fornecedor => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.id}</td>
                <td>{fornecedor.tipo}</td>
                <td>{fornecedor.genero}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cpfcnpj}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.contato}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.setor}</td>
                <td>{fornecedor.cidade}</td>
                <td>{fornecedor.uf}</td>
                <td>{fornecedor.cep}</td>
                <td>{fornecedor.complemento}</td>
                <td className='botoes'>
                  <Link to={`/editarfornecedor/${fornecedor.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                </td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarFornecedor(fornecedor.id)}
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
