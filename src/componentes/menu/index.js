import './style.css';
import { Link } from 'react-router-dom';
export default function menu() {
    return (
        <div>
            <nav>
                <Link to="/listausuario" className='link'>Usuário</Link>
                <Link to="/listarproduto" className='link'>Produto</Link>
            </nav>
        </div>
    )
}