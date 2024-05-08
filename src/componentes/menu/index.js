import './style.css';
import { Link } from 'react-router-dom';
import { BsPerson, BsBoxSeam, BsClipboardData } from 'react-icons/bs'; // Exemplo de ícones da biblioteca React Icons
import { ImExit } from 'react-icons/im'; // Importando o ícone ImExit
import { RiMoneyDollarCircleFill } from 'react-icons/ri'; // Importando o ícone RiMoneyDollarCircleFill
import { FaCar } from 'react-icons/fa'; // Importando o ícone FaCar

export default function Menu() {
    return (
        <div>
            <nav>
                <Link to="/listausuario" className='link'>
                    <BsPerson className='icon' />
                    Usuário
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
                <Link to="/listasaida" className='link'>
                    <ImExit className='icon' />
                    Saída
                </Link>
                <Link to="/listaorcamento" className='link'>
                    <RiMoneyDollarCircleFill className='icon' size={22} style={{ verticalAlign: 'middle' }} />
                    Orçamento
                </Link>
            </nav>
        </div>
    )
}
