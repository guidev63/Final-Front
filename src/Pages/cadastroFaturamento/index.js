import React, { useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaSave, FaBan } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function CadastroFaturamento() {
    const navigate = useNavigate();
    const [ordem_de_servico_id, setOrdemDeServicoId] = useState("");
    const [venda_id, setVendaId] = useState("");
    const [valor_total, setValorTotal] = useState("");
    const [data_faturamento, setDataFaturamento] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (!ordem_de_servico_id || !venda_id || !valor_total || !data_faturamento) {
            alert("Preencha todos os Campos Obrigatórios!");
            return;
        }
        api.post('/faturamentos', {
            ordem_de_servico_id,
            venda_id,
            valor_total,
            data_faturamento
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listarfaturamentos');
            })
            .catch(error => {
                console.error("Erro ao cadastrar faturamento:", error);
                alert("Erro ao Cadastrar Faturamento. Por favor, tente Novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Faturamentos" />
                <div className='form-container'>
                    <form className='cadastro-faturamento-form' onSubmit={handleCadastro}>
                        <input type='text' value={ordem_de_servico_id} onChange={e => setOrdemDeServicoId(e.target.value)} placeholder='Ordem de Serviço ID' />
                        <input type='text' value={venda_id} onChange={e => setVendaId(e.target.value)} placeholder='Venda ID' />
                        <input type='text' value={valor_total} onChange={e => setValorTotal(e.target.value)} placeholder='Valor Total' />
                        <input type='date' value={data_faturamento} onChange={e => setDataFaturamento(e.target.value)} placeholder='Data de Faturamento' />
                        <div>
                            <button type="submit" className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>
                            <button type="button" className='btn-cancel' onClick={() => navigate('/listarfaturamentos')}>
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