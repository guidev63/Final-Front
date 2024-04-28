import './style.css';
import { Link } from 'react-router-dom';
import { BsPerson, BsBag, BsBoxSeam, BsClipboardData } from 'react-icons/bs'; // Exemplo de ícones da biblioteca React Icons
import { ImExit } from 'react-icons/im'; // Importando o ícone ImExit

export default function Menu() {
    return (
        <div>
            <nav>
                <Link to="/listausuario" className='link'>
                    <BsPerson className='icon' />
                    Usuário
                </Link>
                <Link to="/listarproduto" className='link'>
                    <BsBag className='icon' />
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
            </nav>
        </div>
    )
}
