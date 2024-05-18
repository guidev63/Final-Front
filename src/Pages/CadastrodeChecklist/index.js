import React, { useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FaSave, FaBan } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';


export default function CadastroChecklist() {
    const navigate = useNavigate();
    const [ordemDeServicoId, setOrdemDeServicoId] = useState("");
    const [itemChecklistId, setItemChecklistId] = useState("");
    const [status, setStatus] = useState("");
    const [observacao, setObservacao] = useState("");

    function handleCadastro(e) {
        e.preventDefault();
        if (!ordemDeServicoId || !itemChecklistId || !status) {
            alert("Preencha todos os Campos Obrigatórios!");
            return;
        }
        api.post('/checklist', {
            ordem_de_servico_id: ordemDeServicoId,
            item_checklist_id: itemChecklistId,
            status,
            observacao
        })
            .then(response => {
                console.log(response.data);
                alert(response.data.mensagem);
                navigate('/listarchecklist');
            })
            .catch(error => {
                console.error("Erro ao cadastrar checklist:", error);
                alert("Erro ao Cadastrar Checklist. Por favor, tente Novamente.");
            });
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1> </h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Checklist" />
                <div className='form-container'>
                    <form className='cadastro-cliente-form' onSubmit={handleCadastro}>
                        <input
                            type='text'
                            value={ordemDeServicoId}
                            onChange={e => setOrdemDeServicoId(e.target.value)}
                            placeholder='Ordem de Serviço ID'
                        />
                        <input
                            type='text'
                            value={itemChecklistId}
                            onChange={e => setItemChecklistId(e.target.value)}
                            placeholder='Item Checklist ID'
                        />
                        <input
                            type='text'
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            placeholder='Status'
                        />
                        <textarea
                            className="observacao-textarea"
                            value={observacao}
                            onChange={e => setObservacao(e.target.value)}
                            placeholder='Observação'
                        />

                        <div>
                            <button type="submit" className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>
                            <button
                                type="button"
                                className='btn-cancel'
                                onClick={() => navigate('/listarchecklist')}
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
