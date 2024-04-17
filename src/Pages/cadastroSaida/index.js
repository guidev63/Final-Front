import React, { useEffect, useState } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu';
import { FiSave, FiCancel } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function Cadastrosaida() {
    const navigate = useNavigate();

    const [id_produto, setId_produto] = useState("");
    const [produto, setProduto] = useState([]);
    const [quantidade, setQuantidade] = useState("");
    const [valor_unitario, setValor_Unitario] = useState("");
    const [data_saida, setData_Saida] = useState("");

    const [qtd_estoque, setQtd_estoque] = useState(0);

    const saida = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        quantidade,
        valor_unitario,
        data_saida
    };
    useEffect(() => {

        mostrarproduto();

    }, [])
    useEffect(() => {
        api.get(`/estoque/${id_produto}`).then((res) => {
            setQtd_estoque(res.data.estoque.quantidade)
        })
    }, [id_produto])

    function salvarDados(e) {
        e.preventDefault();
        let i = 0;
        if (id_produto === "")
            i++;
        else if (quantidade === "")
            i++;
        else if (valor_unitario === "" || valor_unitario === 0)
            i++;
        else if (data_saida === "" || data_saida === 0)
            i++;
        if (i === 0) {
            // const banco = JSON.parse(localStorage.getItem("cd-saidas") || "[]");
            // banco.push(Saida);
            //  localStorage.setItem("cd-saidas", JSON.stringify(banco));
            // Aqui você pode adicionar qualquer lógica adicional, como a atualização do estoque, se necessário

            //alert("Saída salva com sucesso");

            api.post('/saida', saida, { headers: { "content-type": "application/json" } })
                .then(function (response) {
                    console.log(response.data);
                    alert(response.data.mensagem);
                    navigate('/listasaida');
                })
                .catch(function (error) {
                    console.error('Erro ao salvar a saída:', error);
                    alert('Erro ao salvar a saída');
                });
        }
    }
    function mostrarproduto() {

        api.get("/estoque")
            .then((resposta) => {
                setProduto(resposta.data.estoque)
             
            })
    }

    return (
        <div className="dashboard-container">
            <div className='menu'>
                <h1></h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Cadastro de Saída" />
                <div className='form-container'>
                    <form className='form-cadastro' onSubmit={salvarDados}>
                        <input type='text' value={id_produto} onChange={e => setId_produto(e.target.value)} placeholder="Digite o ID do produto" />
                        <select value={id_produto} onChange={e => setId_produto(e.target.value)}  >
                            <option value=""> Selecione um produto</option>
                            {produto && produto.map((linha) => (
                                <option value={linha.id_produto}>{linha.descricao}</option>
                            ))}
                        </select>
                        <input type='text' value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder="Digite a quantidade do produto" />
                        <input type='number' value={valor_unitario} onChange={e => setValor_Unitario(e.target.value)} placeholder="Digite o valor unitário do produto" />
                        <input type='date' value={data_saida} onChange={e => setData_Saida(e.target.value)} />
                        <div>
                            <button className='btn-save'>
                                <FiSave />
                                Salvar
                            </button>
                            <button className='btn-cancel' onClick={() => navigate('/listarsaida')}>
                                <MdOutlineCancel />
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}