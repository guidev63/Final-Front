import React, { useState, useEffect } from 'react';
import '../../Pages/global.css';
import Menu from '../../componentes/menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
import Head from '../../componentes/head';
import api from '../../server/api';

export default function Listarproduto() {
    const [banco, setBanco] = useState([]);
    // const dados = [
    // { id: 1, nome: "guilherme", email: "guilhermedev23@gmail.com", senha: "123" },
    // { id: 2, nome: "felipe", email: "felipe@gmail.com", senha: "123" },
    // { id: 3, nome: "nilson", email: "nilson@gmail.com", senha: "123" },
    // ]

    /*modificando  */
    useEffect(() => {
        mostrardados();
        //console.table(banco)
    }, [])

    function  mostrardados() {
        //setBanco(JSON.parse(localStorage.getItem("cd-produto") || "[]"));
        api.get('/produtos')
        .then(res => {
          console.log(res.data.produtos)
          setBanco(res.data.produtos)
        })
    }
   

    const apagar = (id) => {
        confirmAlert({
            title: 'Excluir Produto',
            message: 'Deseja realmente excluir esse Produto?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        api.delete(`/produtos/${id}`)
                            .then(response => {
                                if (response.status === 200) {
                                    alert(`Produto com ID ${id} excluído com sucesso.`);
                                    mostrardados(); // Atualizar a lista após exclusão
                                } else {
                                    alert('Houve um erro ao excluir o produto.');
                                }
                            })
                            .catch(error => {
                                alert('Houve um erro ao excluir o produto.');
                            });
                    }
                },
                {
                    label: 'Não',
                    onClick: () => {} // Ação ao clicar em "Não" (opcional)
                }
            ]
        });
    };
    
    
    return (

        <div className="dashboard-container">


            <div className='menu'>
                <h1></h1>
                <Menu />
            </div>
            <div className='principal'>
                <Head title="Lista de Produto" />

                <Link to="/cadastroproduto" className='btn-novo'>Novo Produto</Link>

                <table className="table">
                    <tr>
                        <th>Id</th>
                        <th>status</th>
                        <th>descrição</th>
                        <th>estoque minimo</th>
                        <th>estoque maximo</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {
                        banco.map((pro) => {
                            return (
                                <tr key={pro.toString()}>
                                    <td>{pro.id}</td>
                                    <td>{pro.status}</td>
                                    <td>{pro.descricao}</td>
                                    <td>{pro.estoque_minimo}</td>
                                    <td>{pro.estoque_maximo}</td>
                                    <td className='botoes'>
                                        <Link to={`/editarproduto/${pro.id}`}>


                                            <FiEdit size={18} color='#3a5795' />
                                        </Link>
                                    </td>
                                    <td className='botoes'>
                                        <FiTrash
                                            size={18}
                                            color='red'
                                            onClick={(e) => apagar(pro.id)}
                                        />
                                    </td>

                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div >

    )

}
