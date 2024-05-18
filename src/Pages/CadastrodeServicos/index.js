import React, { useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaBucket, FaLocationArrow } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function CadastroServico() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [preco, setPreco] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (!nome || !descricao || !quantidade || !preco) {
            alert("Preencha todos os Campos Obrigatórios!");
            return;
        }
        api.post('/servicos', {
            nome,
            descricao,
            quantidade,
            preco
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listaservicos');
            })
            .catch(error => {
                console.error("Erro ao cadastrar serviço:", error);
                alert("Erro ao Cadastrar Serviço. Por favor, tente Novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Serviços" />
                <div className='form-container'>
                    <form className='cadastro-servico-form' onSubmit={handleCadastro}>
                        <input type='text' value={nome} onChange={e => setNome(e.target.value)} placeholder='Nome' />
                        <input type='text' value={descricao} onChange={e => setDescricao(e.target.value)} placeholder='Descrição' />
                        <input type='text' value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder='Quantidade' />
                        <input type='text' value={preco} onChange={e => setPreco(e.target.value)} placeholder='Preço' />
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
