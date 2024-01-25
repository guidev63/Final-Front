import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logon from './Pages/logon';
import Dashboard from './Pages/dashboard';
import Listausuario from './Pages/listarUsuario';
import Cadastrousuario from './Pages/CadastroUsuario';
import Editarusuario from './Pages/editarUsuario';


export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Logon />}>  </Route>
                <Route path="/dashboard" element={<Dashboard />}> </Route>
                <Route path="/listausuario" element={<Listausuario />}> </Route>
                <Route path="/cadastrousuario" element={<Cadastrousuario />}> </Route>
                <Route path="/editarusuario/:id" element={<Editarusuario />}>  </Route>
            </Routes>
        </BrowserRouter>
    )
}