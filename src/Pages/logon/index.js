import React, { useState } from 'react';
import './style.css';
import Logo from '../../assets/img/papelaria.jpg.png';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaKey } from "react-icons/fa"; // Importe os ícones de usuário e chave do Font Awesome

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
        <h1 >Bem vindo(a)</h1>
        <form onSubmit={logar}>
          <div className="input-with-icon">
            <input
              type="email"
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="input-icon" /> {/* Use o ícone FaUser aqui */}
          </div>
          <div className="input-with-icon">
            <input
              type="password"
              placeholder="Insira sua senha de Acesso"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <FaKey className="input-icon" /> {/* Use o ícone FaKey aqui */}
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
