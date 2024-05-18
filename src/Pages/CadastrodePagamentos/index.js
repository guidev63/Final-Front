import React, { useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaSave, FaBan } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function CadastroPagamentos() {
    const navigate = useNavigate();
    const [faturamento_id, setFaturamentoId] = useState("");
    const [valor_pago, setValorPago] = useState("");
    const [data_pagamento, setDataPagamento] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (!faturamento_id || !valor_pago || !data_pagamento) {
            alert("Preencha todos os Campos Obrigatórios!");
            return;
        }
        api.post('/pagamentos', {
            faturamento_id,
            valor_pago,
            data_pagamento
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listarpagamentos');
            })
            .catch(error => {
                console.error("Erro ao cadastrar pagamento:", error);
                alert("Erro ao Cadastrar Pagamento. Por favor, tente Novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Pagamentos" />
                <div className='form-container'>
                    <form className='cadastro-servico-form' onSubmit={handleCadastro}>
                        <input type='text' value={faturamento_id} onChange={e => setFaturamentoId(e.target.value)} placeholder='Faturamento ID' />
                        <input type='text' value={valor_pago} onChange={e => setValorPago(e.target.value)} placeholder='Valor Pago' />
                        <input type='date' value={data_pagamento} onChange={e => setDataPagamento(e.target.value)} placeholder='Data do Pagamento' />
                        <div>
                            <button type="submit" className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>
                            <button type="button" className='btn-cancel' onClick={() => navigate('/listarpagamentos')}>
                                <FaBan />
                                Cancelar
                            </button>
                        </div>
                    </form>
                    <button type="button" className='btn-novo' onClick={() => navigate('/cadastropagamentos')}>
                        Novo Cadastro
                    </button>
                </div>
            </div>
        </div>
    );
}
