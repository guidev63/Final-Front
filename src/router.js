import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logon from './Pages/logon';
import Dashboard from './Pages/dashboard';
import Listausuario from './Pages/listarUsuario';
import Cadastrousuario from './Pages/CadastroUsuario';
import Editarusuario from './Pages/editarUsuario';
import Listarproduto from './Pages/listarProduto';
import Cadastroproduto from './Pages/CadastrodeProduto';
import Cadastroentrada from './Pages/Cadastroentrada';
import EntradaProduto from './Pages/Cadastroentrada';
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
                <Route path="/cadastroentrada" element={<Cadastroentrada />} />
                <Route path="/editarusuario/:id" element={<Editarusuario />} />
                <Route path="/entrada_Produto" element={<EntradaProduto />} />
                <Route path="/listarentrada" element={<Listaentrada />} /> {/* Added this line */}

            </Routes>
        </BrowserRouter>
    );
}
