import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiFilePlus } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function EditarServico() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [updateAt, setUpdateAt] = useState("");

  useEffect(() => {
    mostrarDados(id);
  }, []);

  async function mostrarDados(id) {
    try {
      const response = await api.get(`/servico/${id}`);
      if (response.status === 200 && response.data.servico) {
        const servico = response.data.servico;
        setNome(servico.nome);
        setDescricao(servico.descricao);
        setPreco(servico.preco);
        setCreateAt(servico.createAt);
        setUpdateAt(servico.updateAt);
      }
    } catch (error) {
      console.error("Erro ao obter dados do Serviço:", error);
    }
  }

  function salvarDados(e) {
    e.preventDefault();

    if (nome === "" || descricao === "" || preco === "" || createAt === "" || updateAt === "") {
      alert("Verifique! Há Campos Vazios!");
    } else {
      const servico = { id: Number(id), nome, descricao, preco, createAt, updateAt };
      api.put('/servico', servico, { headers: { "content-type": "application/json" } })
        .then(function (response) {
          console.log(response.data);
          alert(response.data.mensagem);
          navigate('/listaservicos');
        })
        .catch(function (error) {
          console.error("Erro ao salvar dados do Serviço:", error);
        });
    }
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Editar Serviço" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvarDados} >
            <input
              type='text'
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder='Digite o Nome'
            />
            <input
              type='text'
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder='Digite a Descrição'
            />
            <input
              type='text'
              value={preco}
              onChange={e => setPreco(e.target.value)}
              placeholder='Digite o Preço'
            />
            <input
              type='text'
              value={createAt}
              onChange={e => setCreateAt(e.target.value)}
              placeholder='Digite a Data de Criação'
            />
            <input
              type='text'
              value={updateAt}
              onChange={e => setUpdateAt(e.target.value)}
              placeholder='Digite a Data de Atualização'
            />
            <div className='acao'>
              <button type="submit" className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button type="button" className='btn-cancel' onClick={() => navigate('/listaservicos')}>
                <MdCancel />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
