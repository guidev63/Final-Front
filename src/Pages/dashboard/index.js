import './style.css';
import Menu from '../../componentes/menu';

import ClienteImage from '../../assets/img/Cliente.png'; // Caminho para a imagem Do Cliente


import FornecedorImage from '../../assets/img/Fornecedor.png'; // Caminho para a imagem Do Fornecedor


import ClientesImage from '../../assets/img/clientes.png'; // caminho para a imagem Do Clientes 


import MecanicoImage from '../../assets/img/mecanico.png';// caminho para a imagem  Do Mecanico 


import ServicoImage from '../../assets/img/servico.png'; // caminho para a imagem Do Servico 


import PagamentosImage from '../../assets/img/beneficio-de-empregado.png'; // caminho para a Imagem Do Pagamentos 


import FaturamentoImage from '../../assets/img/Faturamento.png'; // caminho para a Imagem Do Faturamento 


import EstoqueImage from '../../assets/img/estoque.png' // Caminho Para a imagem Do Estoque

import VendasImage from '../../assets/img/vendas.png' // Caminho Para a imagem Do Vendas

import ParcelasImage from '../../assets/img/parcelas.png' // Caminho Para a imagem Da Parcelas

import { Link } from 'react-router-dom'; // Adicione esta linha para garantir que o Link funcione corretamente

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className='menu'>
                <Menu />
            </div>
            <div className='principal'>
                <Link to="/listausuario">
                    <img src={ClienteImage} alt="cliente" className="client-image" /> {/* Adicionando a imagem do cliente */}
                </Link>
                <Link to="/listarfornecedores">
                    <img src={FornecedorImage} alt="fornecedor" className="fornecedor-image" /> {/* Adicionando a imagem do fornecedor */}
                </Link>
                <Link to="/listarclientes">
                    <img src={ClientesImage} alt="clientes" className="clientes-image" /> {/* Adicionando a imagem do Clientes */}
                </Link>
                <Link to="/listarchecklist">
                    <img src={MecanicoImage} alt="mecanico" className="mecanico-image" /> {/* Adicionando a imagem do cheklist */}
                </Link>
                <Link to="/listarservicos">
                    <img src={ServicoImage} alt="servico" className="servico-image" /> {/* Adicionando a imagem do Serviços */}
                </Link>
                <Link to="/listarPagamentos">
                    <img src={PagamentosImage} alt="pagamentos" className="pagamentos-image" /> {/* Adicionando a imagem do Pagamentos */}
                </Link>
                <Link to="/listarfaturamento">
                    <img src={FaturamentoImage} alt="faturamento" className="faturamento-image" /> {/* Adicionando a imagem do Faturamento */}
                </Link>
                <Link to="/listarestoque">
                    <img src={EstoqueImage} alt="estoque" className="estoque-image" /> {/* Adicionando a imagem do Estoque  */}
                </Link>
                <Link to="/listarvendas">
                    <img src={VendasImage} alt="vendas" className="vendas-image" /> {/* Adicionando a imagem do Vendas */}
                </Link>
                <Link to="/listarparcelas">
                    <img src={ParcelasImage} alt="parcelas" className="parcelas-image" /> {/* Adicionando a imagem do Parcelas */}
                </Link>
                
            </div>
            
        </div>

    );
}
