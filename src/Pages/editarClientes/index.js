import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiFilePlus } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function EditarCliente() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("");
  const [genero, setGenero] = useState("");
  const [nome, setNome] = useState("");
  const [cpfcnpj, setCpfcnpj] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [endereco, setEndereco] = useState("");
  const [setor, setSetor] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    mostrardados(id);
  }, []);

  async function mostrardados(idc) {
    try {
      const response = await api.get(`/cliente/${idc}`);
      if (response.status === 200 && response.data.cliente.length > 0) {
        const cliente = response.data.cliente[0];
        setTipo(cliente.tipo);
        setGenero(cliente.genero);
        setNome(cliente.nome);
        setCpfcnpj(cliente.cpfcnpj);
        setEmail(cliente.email);
        setContato(cliente.contato);
        setEndereco(cliente.endereco);
        setSetor(cliente.setor);
        setCidade(cliente.cidade);
        setUf(cliente.uf);
        setCep(cliente.cep);
        setComplemento(cliente.complemento);
      }
    } catch (error) {
      console.error("Erro ao obter dados do cliente:", error);
    }
  }

  function salvardados(e) {
    e.preventDefault();

    if (nome === "" || email === "" || cpfcnpj === "" || contato === "" || endereco === "" || setor === "" || cidade === "" || uf === "" || cep === "") {
      alert("Verifique! Há campos vazios!");
    } else {
      const cliente = { id: Number(id), tipo, genero, nome, cpfcnpj, email, contato, endereco, setor, cidade, uf, cep, complemento };
      api.put('/cliente', cliente, { headers: { "content-type": "application/json" } })
        .then(function (response) {
          console.log(response.data);
          alert(response.data.mensagem);
          navigate('/listacliente');
        })
        .catch(function (error) {
          console.error("Erro ao salvar dados do Cliente:", error);
        });
    }
  }

  return (
    <div className="dashboard-container">
      <div className='menu'>
        <Menu />
      </div>
      <div className='principal'>
        <Head title="Editar Cliente" />
        <div className='form-container'>
          <form className='form-cadastro' onSubmit={salvardados} >
            <input
              type='text'
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              placeholder='Digite o Tipo'
            />
            <input
              type='text'
              value={genero}
              onChange={e => setGenero(e.target.value)}
              placeholder='Digite o Gênero'
            />
            <input
              type='text'
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder='Digite o nome do Cliente'
            />
            <input
              type='text'
              value={cpfcnpj}
              onChange={e => setCpfcnpj(e.target.value)}
              placeholder='Digite o CPF/CNPJ'
            />
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Digite o Email'
            />
            <input
              type='text'
              value={contato}
              onChange={e => setContato(e.target.value)}
              placeholder='Digite o contato'
            />
            <input
              type='text'
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              placeholder='Digite o endereço'
            />
            <input
              type='text'
              value={setor}
              onChange={e => setSetor(e.target.value)}
              placeholder='Digite o setor'
            />
            <input
              type='text'
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              placeholder='Digite a cidade'
            />
            <input
              type='text'
              value={uf}
              onChange={e => setUf(e.target.value)}
              placeholder='Digite a UF'
            />
            <input
              type='text'
              value={cep}
              onChange={e => setCep(e.target.value)}
              placeholder='Digite o CEP'
            />
            <input
              type='text'
              value={complemento}
              onChange={e => setComplemento(e.target.value)}
              placeholder='Digite o complemento'
            />
            <div className='acao'>
              <button type="submit" className='btn-save'>
                <FaSave />
                Salvar
              </button>
              <button type="button" className='btn-cancel' onClick={() => navigate('/listacliente')}>
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
