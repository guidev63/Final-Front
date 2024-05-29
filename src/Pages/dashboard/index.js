import './style.css';
import Menu from '../../componentes/menu';
import ClienteImage from '../../assets/img/Cliente.png'; // Caminho para a imagem do cliente
import FornecedorImage from '../../assets/img/Fornecedor.png'; // Caminho para a imagem do fornecedor
import ClientesImage from '../../assets/img/clientes.png'; // caminho para a imagem do clientes 

import MecanicoImage from '../../assets/img/mecanico.png';// caminho para a imagem  do Mecanico 

import ServicoImage from '../../assets/img/servico.png'; // caminho para a imagem do servico  

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
                    <img src={ClientesImage} alt="clientes" className="clientes-image" /> {/* Adicionando a imagem do fornecedor */}
                </Link>
                <Link to="/listarchecklist">
                    <img src={MecanicoImage} alt="mecanico" className="mecanico-image" /> {/* Adicionando a imagem do fornecedor */}
                </Link>
                <Link to="/listarservicos">
                    <img src={ServicoImage} alt="servico" className="servico-image" /> {/* Adicionando a imagem do fornecedor */}
                </Link>
            </div>
        </div>
    );
}
