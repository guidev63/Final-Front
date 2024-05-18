import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiEdit, FiTrash } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function ListaChecklist() {
  const [checklists, setChecklists] = useState([]);


  useEffect(() => {
    mostrarChecklists();
  }, []);

  function mostrarChecklists() {
    api.get('/checklist')
      .then(res => {
        console.log(res.data.checklist);
        setChecklists(res.data.checklist);
      })
      .catch(error => {
        console.error('Erro ao buscar checklists:', error);
      });
  }


  const apagarChecklist = (id) => {
    confirmAlert({
      title: 'Excluir Checklist',
      message: 'Deseja realmente excluir este checklist?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            api.delete(`/checklist/${id}`)
              .then(res => {
                if (res.status === 200) {
                  alert(`Checklist com ID ${id} excluído com sucesso!`);
                  mostrarChecklists();
                } else {
                  alert("Houve um problema no servidor ao excluir o checklist.");
                }
              })
              .catch(error => {
                console.error('Erro ao excluir checklist:', error);
                alert("Houve um erro ao excluir o checklist. Por favor, tente novamente.");
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
        <Head title="Lista de Checklists" />
        <Link to="/cadastrarchecklist" className='btn-novo'>Novo Cadastro</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ordem de Serviço Id</th>
              <th>Item Checklist Id</th>
              <th>Status</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            {checklists.map(checklist => (
              <tr key={checklist.id}>
                <td>{checklist.id}</td>
                <td>{checklist.ordem_de_servico_id}</td>
                <td>{checklist.item_checklist_id}</td>
                <td>{checklist.status}</td>
                <td>{checklist.observacao}</td>
                <td className='botoes'>
                  <Link to={`/editarchecklist/${checklist.id}`}>
                    <FiEdit size={18} color='#3a5795' />
                  </Link>
                </td>
                <td className='botoes'>
                  <FiTrash
                    size={18}
                    color='red'
                    onClick={() => apagarChecklist(checklist.id)}
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
