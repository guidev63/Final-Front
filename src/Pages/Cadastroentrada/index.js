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

export default function Cadastroentrada() {
    const navigate = useNavigate();

    const [id_produto, setId_produto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valor_unitario, setValor_Unitario] = useState("");
    const [data_entrada, setData_Entrada] = useState("");
    

    const Entrada = {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        quantidade,
        valor_unitario,
        data_entrada

    }
    const dadosestoque= {
        id: Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36),
        id_produto,
        quantidade,
        valor_unitario
        

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
            const banco = JSON.parse(localStorage.getItem("cd-estoques") || "[]");
            const banco = JSON.parse(localStorage.getItem("cd-entradas") || "[]");
            banco.push(Entrada);
            localStorage.setItem("cd-entradas", JSON.stringify(banco));
            localStorage.setItem("cd-estoques", JSON.stringify(dadosestoque));
            alert("Entrada salva com sucesso");
            navigate('/listarentrada');
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
                <Head title="Cadastro de Entrada" />
                <div className='form-container'>
                    <form className='form-cadastro' onSubmit={salvardados} >
       
                        <input type='text'
                            value={id_produto} onChange={e => setId_produto(e.target.value)} placeholder="Digite o id do produto"  />
                        <input type='text'
                            value={quantidade} onChange={e => setQuantidade(e.target.value)} placeholder="Digite a quantidade do produto"  />
                        <input type='number'
                            value={valor_unitario} onChange={e => setValor_Unitario(e.target.value)} placeholder="Digite o valor unitário do produto"  />
                        <input type='date'
                            value={data_entrada} onChange={e => setData_Entrada(e.target.value)}  />
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
