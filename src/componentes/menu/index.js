import './style.css';
import { Link } from 'react-router-dom';
import { BsPerson, BsBoxSeam, BsClipboardData } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { FaCar, FaTools, FaTruck, FaUserFriends } from 'react-icons/fa';
import { FaMoneyCheckDollar, FaClipboardList } from 'react-icons/fa6';
import { BsCart4 } from 'react-icons/bs';
import { BsCreditCard } from "react-icons/bs";

import { PiListChecksFill } from 'react-icons/pi';

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
                <Link to="/listarchecklist" className='link'>
                    <PiListChecksFill className='icon' />
                    Checklist Veículo
                </Link>
                <Link to="/listarservicos" className='link'>
                    <FaTools className='icon' />
                    Serviços
                </Link>
                <Link to="/listarproduto" className='link'>
                    <FaCar className='icon' />
                    Produto
                </Link>
                <Link to="/listarentrada" className='link'>
                    <BsClipboardData className='icon' />
                    Entrada
                </Link>
                <Link to="/listarestoque" className='link'>
                    <BsBoxSeam className='icon' />
                    Estoque
                </Link>
                <Link to="/listarPagamentos" className='link'>
                    <FaMoneyCheckDollar className='icon' />
                    Pagamentos
                </Link>
                <Link to="/listarvendas" className='link'>
                    <BsCart4 className='icon' />
                    Vendas
                </Link>
                <Link to="/listarestoque" className='link'>
                    <FaClipboardList className='icon' />
                    Ordens De Serviços
                </Link>
                <Link to="/listarfaturamento" className='link'>
                    <RiMoneyDollarCircleFill className='icon' />
                    Faturamento
                </Link>
                <Link to="/listarparcelas" className='link'>
                    <BsCreditCard className='icon' />
                    Parcelas
                </Link>
            </nav>
        </div>
    )
}
