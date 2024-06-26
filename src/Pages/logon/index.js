import React, { useState } from 'react';
import './style.css';
import Logo from '../../assets/img/Mecanicaservices.png';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaKey, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa"; // Importe os ícones de usuário, chave, spinner e olho

import api from '../../server/api';

export default function Logon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a exibição da senha

  const logar = (e) => {
    e.preventDefault();
    setLoading(true); // Ative o indicador de carregamento
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
      .finally(() => {
        // Desative o indicador de carregamento após 3 segundos
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
              type={showPassword ? "text" : "password"}
              placeholder="Insira sua senha de Acesso"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <FaKey className="input-icon" /> {/* Use o ícone FaKey aqui */}
            <span className="input-icon-right" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <FaSpinner className="loading-spinner spin" /> : 'Acessar'}
          </button>
          <div className="link-container">
            <a href="/cadastro">Não tem uma conta? Cadastre-se</a>
          </div>
        </form>
      </section>
    </div>
  );
}
