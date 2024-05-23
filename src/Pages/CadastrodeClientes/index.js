import React, { useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaBucket, FaLocationArrow } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function CadastroCliente() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState("");
    const [genero, setGenero] = useState("");
    const [nome, setNome] = useState("");
    const [cpfcnpj, setCpfCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [contato, setContato] = useState("");
    const [endereco, setEndereco] = useState("");
    const [setor, setSetor] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState("");
    const [complemento, setComplemento] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (!tipo || !nome || !cpfcnpj || !email || !contato || !endereco || !cidade || !uf || !cep) {
            alert("Preencha todos os Campos Obrigatórios!");
            return;
        }
        api.post('/clientes', {
            tipo,
            genero,
            nome,
            cpfcnpj,
            email,
            contato,
            endereco,
            setor,
            cidade,
            uf,
            cep,
            complemento
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listarclientes');
            })
            .catch(error => {
                console.error("Erro ao cadastrar cliente:", error);
                alert("Erro ao Cadastrar Cliente. Por favor, tente Novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Clientes" />
                <div className='form-container'>
                    <form className='cadastro-cliente-form' onSubmit={handleCadastro}>
                        <input type='text' value={tipo} onChange={e => setTipo(e.target.value)} placeholder='Tipo (Pessoa Física/Jurídica)' />
                        <input type='text' value={genero} onChange={e => setGenero(e.target.value)} placeholder='Gênero' />
                        <input type='text' value={nome} onChange={e => setNome(e.target.value)} placeholder='Nome' />
                        <input type='text' value={cpfcnpj} onChange={e => setCpfCnpj(e.target.value)} placeholder='CPF/CNPJ' />
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                        <input type='contato' value={contato} onChange={e => setContato(e.target.value)} placeholder='Contato' />
                        <input type='text' value={endereco} onChange={e => setEndereco(e.target.value)} placeholder='Endereço' />
                        <input type='text' value={setor} onChange={e => setSetor(e.target.value)} placeholder='Setor' />
                        <input type='text' value={cidade} onChange={e => setCidade(e.target.value)} placeholder='Cidade' />
                        <input type='text' value={uf} onChange={e => setUf(e.target.value)} placeholder='UF' />
                        <input type='text' value={cep} onChange={e => setCep(e.target.value)} placeholder='CEP' />
                        <input type='text' value={complemento} onChange={e => setComplemento(e.target.value)} placeholder='Complemento' />
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
