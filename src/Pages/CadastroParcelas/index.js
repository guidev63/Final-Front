import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaSave, FaBan } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function CadastroParcela() {
    const navigate = useNavigate();
    const [faturamentoId, setFaturamentoId] = useState("");
    const [numeroParcela, setNumeroParcela] = useState("");
    const [valorParcela, setValorParcela] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    const [status, setStatus] = useState("");
    const [faturamentos, setFaturamentos] = useState([]);

    useEffect(() => {
        api.get('/faturamentos')
            .then(response => {
                setFaturamentos(response.data.faturamentos);
            })
            .catch(error => {
                console.error("Erro ao buscar IDs de faturamento:", error);
                alert("Erro ao buscar IDs de faturamento. Por favor, tente novamente.");
            });
    }, []);

    function handleCadastro(e) {
        e.preventDefault();
        if (!faturamentoId || !numeroParcela || !valorParcela || !dataVencimento || !status) {
            alert("Preencha todos os Campos Obrigatórios!");
            return;
        }
        api.post('/parcelas', {
            faturamento_id: faturamentoId,
            numero_parcela: numeroParcela,
            valor_parcela: parseFloat(valorParcela),
            data_vencimento: dataVencimento,
            data_pagamento: dataPagamento || null,
            status
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listaparcelas');
            })
            .catch(error => {
                console.error("Erro ao cadastrar parcela:", error);
                alert("Erro ao Cadastrar Parcela. Por favor, tente Novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Parcela" />
                <div className='form-container'>
                    <form className='cadastro-cliente-form' onSubmit={handleCadastro}>
                    <div className="select-styled">
    <select
        value={faturamentoId}
        onChange={e => setFaturamentoId(e.target.value)}
        required
    >
        <option value="">Selecionar ID de Faturamento</option>
        {faturamentos.map(faturamento => (
            <option key={faturamento.id} value={faturamento.id}>
                {faturamento.id}
            </option>
        ))}
    </select>
</div>
                        <input
                            type='text'
                            value={numeroParcela}
                            onChange={e => setNumeroParcela(e.target.value)}
                            placeholder='Número da Parcela'
                            required
                        />
                        <input
                            type='number'
                            step="0.01"
                            value={valorParcela}
                            onChange={e => setValorParcela(e.target.value)}
                            placeholder='Valor da Parcela'
                            required
                        />
                        <input
                            type='date'
                            value={dataVencimento}
                            onChange={e => setDataVencimento(e.target.value)}
                            placeholder='Data de Vencimento'
                            required
                        />
                        <input
                            type='date'
                            value={dataPagamento}
                            onChange={e => setDataPagamento(e.target.value)}
                            placeholder='Data de Pagamento'
                        />
                        <input
                            type='text'
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            placeholder='Status'
                            required
                        />

                        <div>
                            <button type="submit" className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>
                            <button
                                type="button"
                                className='btn-cancel'
                                onClick={() => navigate('/listaparcelas')}
                            >
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
