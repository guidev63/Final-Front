import React, { useState } from 'react';
import './style.css';
import Logo from '../../assets/img/logo.jpg';
import { useNavigate } from 'react-router-dom';
import api from '../../server/api';

export default function Logon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const logar = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/usuario/login', { email, senha });
      console.log(response.data);

      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        alert('Dados incorretos!!!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="logon-container">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <section className="form">
        <h1>Faça seu login</h1>
        <form onSubmit={logar}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <a href="#">Novo Cadastro</a>
        </form>
      </section>
    </div>
  );
}
