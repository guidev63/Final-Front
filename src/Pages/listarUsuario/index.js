import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function Listausuario() {
  const [dados, setDados] = useState([]);
  const [banco, setBanco] = useState([]);
  // const dados = [
  // { id: 1, nome: "guilherme", email: "guilhermedev23@gmail.com", senha: "123" },
  // { id: 2, nome: "felipe", email: "felipe@gmail.com", senha: "123" },
  // { id: 3, nome: "nilson", email: "nilson@gmail.com", senha: "123" },
  // ]
  useEffect(() => {
    mostrardados();
    cep();
    console.table(banco)
  }, [])


  function cep() {
    const url = "https://viacep.com.br/ws/77807270/json/";
    fetch(url)
      .then(function (response) {
       // return response.json();//
       console.log(response.json())
      })
  }
  function mostrardados() {

    // setBanco(JSON.parse(localStorage.getItem("cd-usuarios") || "[]"));//
    api.get('/usuario')
      .then(res => {
        console.log(res.data)
        setBanco(res.data)


      })
  }


  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Usuário',
      message: 'Deseja realmente excluir esse usuário?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            let dadosnovos = banco.filter(item => item.id !== id);
            localStorage.setItem("cd-usuarios", JSON.stringify(dadosnovos));
            setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
            alert(`Você apagou o usuário id:${id}`);
          }

        },
        {
          label: 'Não',
          onClick: () => alert('Click No')
        }
      ]
    });
  };
  return (

    <div className="dashboard-container">


      <div className='menu'>
        <h1>menu</h1>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Lista de Usuario" />

        <Link to="/cadastrousuario" className='btn-novo'>Novo Cadastro</Link>

        <table className="table">
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
          {
            banco.map((linha) => {
              return (
                <tr key={linha.toString()}>
                  <td>{linha.id}</td>
                  <td>{linha.nome}</td>
                  <td>{linha.email}</td>
                  <td className='botoes'>
                    <Link to={`/editarusuario/${linha.id}`}>


                      <FiEdit size={18} color='#3a5795' />
                    </Link>
                  </td>
                  <td className='botoes'>
                    <FiTrash
                      size={18}
                      color='red'
                      onClick={(e) => apagar(linha.id)}
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
