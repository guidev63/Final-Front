import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logon from './Pages/logon';
import Dashboard from './Pages/dashboard';
import Listausuario from './Pages/listarUsuario';
import Cadastrousuario from './Pages/CadastroUsuario';
import Editarusuario from './Pages/editarUsuario';
import Editarproduto from './Pages/editarProduto';
import Listarproduto from './Pages/listarProduto';

import Cadastroproduto from './Pages/CadastrodeProduto';
import Cadastroentrada from './Pages/Cadastroentrada';
import Cadastrosaida from './Pages/cadastrosaida';
import EntradaProduto from './Pages/Cadastroentrada';

import Listarentrada from './Pages/ListarEntrada';
import Listarestoque from './Pages/listarestoque';
import Listarsaida from './Pages/listarsaida';
export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Logon />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/listausuario" element={<Listausuario />} />
                <Route path="/listarproduto" element={<Listarproduto />} />
                <Route path="/listarestoque" element={<Listarestoque />} />
                <Route path="/listarsaida" element={<Listarsaida />} />
                
                <Route path="/cadastrousuario" element={<Cadastrousuario />} />
                <Route path="/cadastroproduto" element={<Cadastroproduto />} />
                <Route path="/cadastroentrada" element={<Cadastroentrada />} />
                <Route path="/cadastrosaida" element={<Cadastrosaida />} />
                
                <Route path="/editarusuario/:id" element={<Editarusuario />} />
                <Route path="/editarproduto/:id" element={<Editarproduto />} />

                <Route path="/entrada_Produto" element={<EntradaProduto />} />
                <Route path="/listarentrada" element={<Listarentrada />} /> {/* Added this line */}


            </Routes>
        </BrowserRouter>
    );
}
