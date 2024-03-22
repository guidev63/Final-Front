import React, { useState } from 'react';
import './style.css';
import Logo from '../../assets/img/papelaria.jpg.png';
import { useNavigate } from 'react-router-dom';
import api from '../../server/api';

export default function Logon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


  const logar = (e) => {
    e.preventDefault();
    // let banco = JSON.parse(localStorage.getItem("cd-usuarios") || "[]");
    // let dadosnovos = banco.filter(item => item.email === email && item.senha === senha);
    // console.log(banco);
    // if (dadosnovos.length > 0) {
    //   navigate('/dashboard');
    // } else {
    //   alert("Dados incorretos!!!");
    // }
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
      <section 
      
      className="form">
        <h1>Faça seu login:</h1>
        
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
          <a href="#"></a>
        </form>
      </section>
    </div>
  );
}
