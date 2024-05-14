import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    mostrarClientes();
  }, []);

  function mostrarClientes() {
    api.get('/clientes')
      .then(res => {
        console.log(res.data.clientes);
        setClientes(res.data.clientes);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }

  const apagarCliente = (id) => {
    confirmAlert({
      title: 'Excluir Cliente',
      message: 'Deseja realmente excluir este cliente?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/clientes/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Cliente com ID ${id} excluído com sucesso!`);
                  mostrarClientes();
                } else {
                  alert("Houve um problema no servidor ao excluir o cliente.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir cliente:', error);
                alert("Houve um erro ao excluir o cliente. Por favor, tente novamente.");
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
        <Head title="Lista de Clientes" />
        <Link to="/cadastrarcliente" className='btn-novo'>Novo Cadastro</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Genero</th>
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
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.tipo}</td>
                <td>{cliente.genero}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpfcnpj}</td>
                <td>{cliente.email}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.setor}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.uf}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.complemento}</td>
                <td className='botoes'>
                  <Link to={`/editarcliente/${cliente.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                </td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarCliente(cliente.id)}
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
