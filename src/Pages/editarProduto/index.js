import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import Head from '../../componentes/head';
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';


import api from '../../server/api';



export default function EditarProduto() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");
  const [estoque_minimo, setEstoque_minimo] = useState("");
  const [estoque_maximo, setEstoque_maximo] = useState([]);

  const produto ={
    id,
    status,
    descricao,
    estoque_minimo,
    estoque_maximo,
  }
  useEffect(() => {
    mostrarDados(id);
  }, [])

  
  async function mostrarDados(id) {
    const response = await api.get(`/produtos/${id}`);
    const produto = response.data.produtos;
   
    setStatus(produto[0].status);
    setDescricao(produto[0].descricao);
    setEstoque_minimo(produto[0].estoque_minimo);
    setEstoque_maximo(produto[0].estoque_maximo);
  }
 

  function salvarDados(e) {
    
    e.preventDefault();

    if (status === "" || descricao === "" || estoque_minimo === "" || estoque_maximo === "" ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }


    const produto = {
      id,
      status,
      descricao,
      estoque_minimo: estoque_minimo,
      estoque_maximo,
      
    };

    api.put(`/produtos/${id}`, produto, { headers: { "Content-Type": "application/json" } })
      .then(function (response) {
        console.log(response.data);
        alert(response.data.mensagem);
    
        navigate('/listarproduto');
      })
      .catch(function (error) {
        console.error("Erro ao editar produto:", error);
      });
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Editar Produto" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvarDados}>
            <input type='text'
              value={status}
              onChange={e => setStatus(e.target.value)}
              placeholder='Digite o Status (Ativo/Inativo)'
            />
            <input
              type='text'
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder='Digite a Descrição'
            />
            <input
              type='text'
              value={estoque_minimo}
              onChange={e => setEstoque_minimo(e.target.value)}
              placeholder='Digite a medida por Metro'
            />
            <input
              type='number'
              value={estoque_maximo}
              onChange={e => setEstoque_maximo(e.target.value)}
              placeholder='Digite o Valor'
            />
           
            <div className='acao'>
              <button className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button className='btn-cancel'>
                <MdCancel />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}