import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiFilePlus } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function Editarusuario() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    mostrardados(id);
  }, []);

  async function mostrardados(idu) {
    try {
      const response = await api.get(`/usuario/${idu}`);
      if (response.status === 200 && response.data.usuario.length > 0) {
        const usuario = response.data.usuario[0];
        setNome(usuario.nome);
        setEmail(usuario.email);
        setSenha(usuario.senha);
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
  }

  function salvardados(e) {
    e.preventDefault();

    if (nome === "" || email === "" || senha === "") {
      alert("Verifique! Há campos vazios!");
    } else {
      const usuario = { id: Number(id), nome, email, senha };
      api.put('/usuario', usuario, { headers: { "content-type": "application/json" } })
        .then(function (response) {
          console.log(response.data);
          alert(response.data.mensagem);
          navigate('/listausuario');
        })
        .catch(function (error) {
          console.error("Erro ao salvar dados do usuário:", error);
        });
    }
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Editar Usuário" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvardados} >
            <input
              type='text'
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder='Digite o nome do usuário'
            />
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Digite o email'
            />
            <input
              type='password'
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder='Digite a senha'
            />
            <div className='acao'>
              <button type="submit" className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button type="button" className='btn-cancel' onClick={() => navigate('/listausuario')}>
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
