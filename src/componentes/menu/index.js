import './style.css';
import { Link } from 'react-router-dom';
import { BsPerson, BsBoxSeam, BsClipboardData } from 'react-icons/bs'; // Exemplo de ícones da biblioteca React Icons
import { ImExit } from 'react-icons/im'; // Importando o ícone ImExit
import { RiMoneyDollarCircleFill } from 'react-icons/ri'; // Importando o ícone RiMoneyDollarCircleFill
import { FaCar, FaTools, FaTruck, FaUserFriends, } from 'react-icons/fa'; // Importando o ícone FaCar
import { FaMoneyCheckDollar ,FaClipboardList } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";


export default function Menu() {
    return (
        <div>
            <nav>
                <Link to="/listausuario" className='link'>
                    <BsPerson className='icon' />
                    Usuário
                </Link>
                <Link to="/listarfornecedores" className='link'>
                    <FaTruck className='icon' />
                    Fornecedor
                </Link>
                <Link to="/listarclientes" className='link'>
                    <FaUserFriends className='icon' />
                    Clientes
                </Link>
                <Link to="/listarservicos" className='link'>
                    <FaTools className='icon' />
                    Serviços
                </Link>
                <Link to="/listarproduto" className='link'>
                    <FaCar className='icon' /> {/* Substituindo o ícone */}
                    Produto
                </Link>
                <Link to="/listarentrada" className='link'>
                    <BsClipboardData className='icon' />
                    Entrada
                </Link>
                <Link to="/listarestoque" className='link'>
                    <BsBoxSeam className='icon' /> {/* Substituindo o ícone */}
                    Estoque
                </Link>
                <Link to="/listarestoque" className='link'>
                    <FaMoneyCheckDollar className='icon' /> {/* Substituindo o ícone */}
                    Parcelamento
                </Link>
                <Link to="/listarestoque" className='link'>
                    <BsCart4 className='icon' /> {/* Substituindo o ícone */}
                    Vendas 
                </Link>
                <Link to="/listarestoque" className='link'>
                    <FaClipboardList  className='icon' /> {/* Substituindo o ícone */}
                    Ordens De Serviços 
                </Link>


                <Link to="/listaorcamento" className='link'>
                    <RiMoneyDollarCircleFill className='icon' size={22} style={{ verticalAlign: 'middle' }} />
                    Faturamento
                </Link>
            </nav>
        </div>
    )
}
