import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logon from './Pages/logon';
import Dashboard from './Pages/dashboard';
import Listausuario from './Pages/listarUsuario';
import Cadastrousuario from './Pages/CadastroUsuario';
import Editarusuario from './Pages/editarUsuario';
import Cadastroproduto from './Pages/CadastrodeProduto';
import Listarproduto from './Pages/listarProduto';
import EntradaProduto from './Pages/EntradaProduto';
import Listaentrada from './Pages/Lista_Entrada';
export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Logon />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/listausuario" element={<Listausuario />} />
                <Route path="/listarproduto" element={<Listarproduto />} />
                <Route path="/cadastrousuario" element={<Cadastrousuario />} />
                <Route path="/cadastroproduto" element={<Cadastroproduto />} />
                <Route path="/editarusuario/:id" element={<Editarusuario />} />
                <Route path="/entrada_Produto" element={<EntradaProduto />} />
                <Route path="/listaEntrada" element={<Listaentrada />} /> {/* Added this line */}
            </Routes>
        </BrowserRouter>
    );
}
