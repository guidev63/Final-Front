import react, { useState } from 'react';

import '../../Pages/global.css';
import Menu from '../../componentes/menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import Head from '../../componentes/head';

//fiz alteração aqui

export default function EntradaProduto() {
    const navigate = useNavigate();

    const [id_produto, setId_produto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valor_unitario, setValor_Unitario] = useState("");
    const [data_entrada, setData_Entrada] = useState("");

    const produto = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        quantidade,
        valor_unitario,
        data_entrada

    }
    function salvardados(e) {
        e.preventDefault();
        let i = 0;
        if (id_produto === "")
            i++;
        else if (quantidade === "")
            i++;
        else if (valor_unitario === "" || valor_unitario === 0)
            i++;
        else if (data_entrada === "" || data_entrada === 0)
            i++;
        if (i == 0) {
            const banco = JSON.parse(localStorage.getItem("cd-produto") || "[]");
            banco.push(produto);
            localStorage.setItem("cd-produto", JSON.stringify(banco));
            alert("Produto salvo com sucesso");
            navigate('/listarproduto');
        } else {
            alert("Verifique! Há campos vazios!")
        }
    }
    return (
        <div className="dashboard-container">

            <div className='menu'>
                <h1>  menu</h1>
                <Menu />

            </div>
            <div className='principal'>
                <Head title="Cadastro de Produto" />
                <div className='form-container'>
                    <form className='form-cadastro' onSubmit={salvardados} >
       
                        <input type='text'
                            value={id_produto} onChange={e => setId_produto(e.target.value)} placeholder='Digite a descrição' />
                        <input type='number'
                            value={valor_unitario} onChange={e => setValor_Unitario(e.target.value)} placeholder='Digite sua senha' />
                        <input type='number'
                            value={data_entrada} onChange={e => setData_Entrada(e.target.value)} placeholder='Digite sua senha' />
                        <div>
                            <button className='btn-save'>
                                <FaSave />
                                Salvar
                            </button>

                            <button className='btn-cancel'>
                                <MdOutlineCancel />
                                Cancelar
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
