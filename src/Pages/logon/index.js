import React, { useState } from 'react';
import './style.css';
import Logo from '../../assets/img/papelaria.jpg.png';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from "react-icons/md"; // Importe os ícones de e-mail e senha

import api from '../../server/api';

export default function Logon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const logar = (e) => {
    e.preventDefault();
    api.post("usuario/login", { email, senha }) 
      .then(res => {
        console.log(res.status)
        if (res.status === 200) {
          alert(res.data.mensagem)
          navigate('/dashboard')
        }
        if(res.status===404){
          alert(res.data.mensagem)
        }
      })
  }

  return (
    <div className="logon-container">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <section className="form">
        <h1>Bem vindo(a)</h1>
        <form onSubmit={logar}>
          <div className="input-with-icon">
            <input
              type="email"
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MdEmail className="input-icon" />
          </div>
          <div className="input-with-icon">
            <input
              type="password"
              placeholder="Insira sua senha de Acesso"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <MdLock className="input-icon" />
          </div>
          <button type="submit"> Acessar </button>
          <div className="link-container">
            <a>Não tem uma conta? Cadastre-se</a>
          </div>
        </form>
      </section>
    </div>
  );
}
