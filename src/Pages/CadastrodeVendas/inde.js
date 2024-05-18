import React, { useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaSave, FaBan } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function CadastroVendas() {
    const navigate = useNavigate();
    const [clienteId, setClienteId] = useState("");
    const [dataVenda, setDataVenda] = useState("");
    const [valorTotal, setValorTotal] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (!clienteId || !dataVenda || !valorTotal) {
            alert("Preencha todos os Campos Obrigatórios!");
            return;
        }
        api.post('/vendas', {
            cliente_id: clienteId,
            data_venda: dataVenda,
            valor_total: valorTotal
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listarvendas');
            })
            .catch(error => {
                console.error("Erro ao cadastrar venda:", error);
                alert("Erro ao Cadastrar Venda. Por favor, tente Novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Vendas" />
                <div className='form-container'>
                    <form className='cadastro-cliente-form' onSubmit={handleCadastro}>
                        <input type='text' value={clienteId} onChange={e => setClienteId(e.target.value)} placeholder='ID do Cliente' />
                        <input type='date' value={dataVenda} onChange={e => setDataVenda(e.target.value)} placeholder='Data da Venda' />
                        <input type='text' value={valorTotal} onChange={e => setValorTotal(e.target.value)} placeholder='Valor Total' />
                        <div>
                            <button type="submit" className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>
                            <button type="button" className='btn-cancel' onClick={() => navigate('/listarvendas')}>
                                <FaBan />
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}