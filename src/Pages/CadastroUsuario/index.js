import React, { useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaBucket ,FaLocationArrow} from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function Cadastrousuario() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }
        api.post('/usuario', { nome, email, senha })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listausuario');
            })
            .catch(error => {
                console.error("Erro ao cadastrar usuário:", error);
                alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Usuários" />
                <div className='form-container'>
                    <form className='form-cadastro' onSubmit={handleCadastro}>
                        <input type='text' value={nome} onChange={e => setNome(e.target.value)} placeholder='Digite o nome do usuário' />
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} placeholder='Digite seu email' />
                        <input type='password' value={senha} onChange={e => setSenha(e.target.value)} placeholder='Digite sua senha' />
                        <div>
                            <button type="submit" className='btn-save'>
                            <FaLocationArrow />
                                Salvar
                            </button>
                            <button type="button" className='btn-cancel'>
                            <FaBucket />

                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
