import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link,useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function Listaestoque(){
const [dados,setDados] = useState([]);
const [banco,setBanco] = useState([]);
const navigate=useNavigate();
    // const dados=[
    //     {id:1,nome:"Carlos",email:"carlos@gmail.com",senha:"123"},
    //     {id:2,nome:"Felipe",email:"felipe@gmail.com",senha:"321"},
    //     {id:3,nome:"Nilson",email:"nilson@gmail.com",senha:"321"},

    // ]
    useEffect(()=>{
      mostrardados();
    },[])
 
    // function formatReal(valor) {
    //   let valorFormatado = valor.replace(/\D/g, ''); // Remove caracteres não numéricos
    //   valorFormatado = valorFormatado.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3,$4'); // Formata com pontos e vírgulas
    //   return `R$ ${valorFormatado}`;
    // }

    function mostrardados() {
      api.get("/estoque")
          .then((res) => {
              if (res.data.estoque) {
                  setBanco(res.data.estoque);
              } else {
                  console.error('Dados de estoque não encontrados na resposta:', res);
              }
          })
          .catch(error => {
              console.error('Erro ao buscar dados do estoque:', error);
          });
  }
    // function mostrarnome(idproduto){
    //   let nome= "";
    //   //  const listarproduto = JSON.parse(localStorage.getItem("cd-produto") || "[]");
    //    listarproduto.
    //                 filter(value => value.id ==idproduto).
    //                 map(value => {
                     
    //                 nome=value.descricao;
                        
    //               })
    //         return nome;
            
    //   }
     const  apagar = (id) => {
      confirmAlert({
        title: 'Excluir Estoque',
        message: 'Deseja Realmente excluir o Estoque desse Produto?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => {
              // let dadosnovos = banco.filter(item => item.id !== id);
              // localStorage.setItem("cd-estoques", JSON.stringify(dadosnovos));
              // setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
              alert(`Você apagou o Estoque id:${id}`);
            }
            
          },
          {
            label: 'Não',
            onClick: () => alert('Click No')
          }
        ]
      });
    };
  

   return(
    <div className="dashboard-container">
       <div className='menu'>
                <h1>  </h1>
                <Menu />
            </div>
       

        
        <div className='principal'>
        <Head title="Lista de Estoque de Produtos" />
        <div>
      
        </div>
        <table className="table">
           <tr>
                <th>Id</th>
                <th>Id Produto</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th></th>
                <th></th>
            </tr>
            {
               banco.map((linha)=>{
                return(
                  <tr key={linha.toString()}>
                    <td>{linha.id}</td>    
                    <td>{linha.id_produto}</td>   
                    <td>{linha.descricao}</td>   
                    <td>{linha.quantidade}</td>    
                    <td>{linha.valor_unitario}</td>    
         
                    <td className='botoes'> 
                    <Link to={`/editarproduto/${linha.id}`}>
                    </Link> 
                    </td>    
                      
                    
                  </tr>  
                )
               }) 
            }

        </table>
        </div>
    </div>

   )

}