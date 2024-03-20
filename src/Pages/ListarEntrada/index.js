import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';
import moment from 'moment/moment';


export default function Listaentrada() {
  const [dados, setDados] = useState([]);
  const [banco, setBanco] = useState([]);
  // const dados = [
  // { id: 1, nome: "guilherme", email: "guilhermedev23@gmail.com", senha: "123" },
  // { id: 2, nome: "felipe", email: "felipe@gmail.com", senha: "123" },
  // { id: 3, nome: "nilson", email: "nilson@gmail.com", senha: "123" },
  // ]
  useEffect(() => {
    mostrardados();

  }, [])

  function mostrardados() {
   // setBanco(JSON.parse(localStorage.getItem("cd-entradas") || "[]"));
   api.get('/entrada')
        .then(res => {
          console.log(res.data.entradas)
          setBanco(res.data.entradas)
        })
  }

function formatarData(data){
  return moment(data).format('DD/MM/YYYY');
}
  const apagar = (id) => {
    confirmAlert({
      title: 'Excluir Entrada',
      message: 'Deseja realmente excluir essa Entrada?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            let dadosnovos = banco.filter(item => item.id !== id);
            localStorage.setItem("cd-entradas", JSON.stringify(dadosnovos));
            setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
            alert(`Você apagou uma entrada  id:${id}`);
          }

        },
        {
          label: 'Não',
          onClick: () => alert('Click No')
        }
      ]
    });
  };
   function mostrarnome(id_produto) {
    let nome = "";
    //const listarProduto = (JSON.parse(localStorage.getItem("cd-produto") || "[]"));
    //listarProduto.
    //  filter(value => value.id == id_produto).
     // map(value =>{

      //  nome = value.descricao;
      api.get(`/produtos/${id_produto}`)
      .then(res => {
    
        //setBanco(res.data.produtos)
        console.log(res.data.produto[0].descricao)
        nome = res.data.produto[0].descricao;
        return nome;
      
      })
      return nome;

    //  })

  }

  return (


    <div className="dashboard-container">


      <div className='menu'>
        <h1> menu </h1>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Lista de Entrada" />

        <Link to="/cadastroentrada" className='btn-novo'>Novo Cadastro</Link>

        <table className="table">
          <tr>
            <th>Id</th>
            <th>ID_PRODUTO</th>
            <th>PRODUTO</th>
            <th>Quantidade</th>
            <th>valor UNITARIO</th>
            <th>DATA  ENTRADA</th>
            <th></th>
            <th></th>
          </tr>
          {
            banco.map((linha) => {
              return (
                <tr key={linha.toString()}>
                  <td>{linha.id}</td>
                  <td>{linha.id_produto}</td>
                  <td>{linha.descricao}</td>
                  <td>{linha.quantidade}</td>
                  <td>{linha.valor_unitario}</td>
                  <td>{formatarData(linha.data_entrada)}</td>

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
