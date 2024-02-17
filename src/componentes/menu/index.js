import './style.css';
import { Link } from 'react-router-dom';
export default function menu() {
    return (
        <div>
            <nav>
                <Link to="/listausuario" className='link'>Usuário</Link>
                <Link to="/listarproduto" className='link'>Produto</Link>
                <Link to="/listarentrada" className='link'>Lista_Entrada</Link>
                <Link to="/listarestoque" className='link'> Estoque</Link>
                <Link to="/listarsaida" className='link'>Saída</Link>
            </nav>
        </div>
    )
}