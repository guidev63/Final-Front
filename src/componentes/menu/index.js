import './style.css';
import { Link } from 'react-router-dom';
import { BsPerson, BsBag, BsBoxArrowInDown, BsClipboardData, BsArchive } from 'react-icons/bs'; // Exemplo de ícones da biblioteca React Icons

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
                    Lista Entrada
                </Link>
                <Link to="/listarestoque" className='link'>
                    <BsBoxArrowInDown className='icon' />
                    Estoque
                </Link>
                <Link to="/listasaida" className='link'>
                    <BsArchive className='icon' />
                    Saída
                </Link>
            </nav>
        </div>
    )
}
