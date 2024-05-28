import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logon from './Pages/logon';
import Dashboard from './Pages/dashboard';
import Listausuario from './Pages/listarUsuario';



import Cadastrousuario from './Pages/CadastroUsuario';
import Editarproduto from './Pages/editarProduto';
import Listarproduto from './Pages/listarProduto';
import Cadastrosaida from './Pages/cadastroSaida';
import Cadastroproduto from './Pages/CadastrodeProduto';
import Cadastroentrada from './Pages/Cadastroentrada';
import Listasaida from './Pages/listarSaida';
import EntradaProduto from './Pages/Cadastroentrada';
import ListaClientes from './Pages/listarClientes';
import CadastroFornecedores from './Pages/CadastroFornecedores';
import Listarentrada from './Pages/ListarEntrada';
import Listarestoque from './Pages/listarestoque';
import CadastroCliente from './Pages/CadastrodeClientes';
import ListaFornecedores from './Pages/listarFornecedores';


import EditarFornecedor from './Pages/editarFornecedores';
import EditarCliente from './Pages/editarClientes';
import Editarusuario from './Pages/editarUsuario';
import EditarServico from './Pages/editarServicos';



import ListaServicos from './Pages/listarServicos';
import ListaChecklist from './Pages/listarChecklist';
import ListaVendas from './Pages/listarVendas';
import ListaPagamentos from './Pages/listarPagamentos';
import ListaFaturamentos from './Pages/listarFaturamento';

import CadastroChecklist from './Pages/CadastrodeChecklist';
import CadastroPagamentos from './Pages/CadastrodePagamentos';
import CadastroServico from './Pages/CadastrodeServicos';
import CadastroFaturamento from './Pages/cadastroFaturamento';


export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Logon />} />
                <Route path="/dashboard" element={<Dashboard />} />



                <Route path="/listausuario" element={<Listausuario />} />
                <Route path="/listarproduto" element={<Listarproduto />} />
                <Route path="/listarestoque" element={<Listarestoque />} />
                <Route path="/listasaida" element={<Listasaida />} />
                <Route path="/listarentrada" element={<Listarentrada />} /> {}
                <Route path="/listarclientes" element={<ListaClientes />} /> {}
                <Route path="/listarfornecedores" element={<ListaFornecedores />} /> {}
                <Route path="/listarServicos" element={< ListaServicos />} /> {}
                <Route path="/listarChecklist" element={< ListaChecklist />} /> {}
                <Route path="/listarVendas" element={< ListaVendas />} /> {}
                <Route path="/listarPagamentos" element={< ListaPagamentos />} /> {}
                <Route path="/listarfaturamento" element={< ListaFaturamentos />} /> {}
       




                <Route path="/cadastrousuario" element={<Cadastrousuario />} />
                <Route path="/cadastroproduto" element={<Cadastroproduto />} />
                <Route path="/cadastroentrada" element={<Cadastroentrada />} />
                <Route path="/cadastrosaida" element={<Cadastrosaida />} />
                <Route path="/cadastrarcliente" element={<CadastroCliente />} />
                <Route path="/cadastrarfornecedor" element={<CadastroFornecedores />} />
                <Route path="/cadastrarservico" element={<CadastroServico />} />
                <Route path="/cadastrarchecklist" element={<CadastroChecklist />} />
                <Route path="/cadastropagamento" element={<CadastroPagamentos />} />
                <Route path="/cadastrarfaturamento" element={<CadastroFaturamento />} />
                

    

                <Route path="/editarfornecedor/:id" element={<EditarFornecedor />} />
                <Route path="/editarusuario/:id" element={<Editarusuario />} />
                <Route path="/editarcliente/:id" element={<EditarCliente />} />
                <Route path="/editarproduto/:id" element={<Editarproduto />} />
                <Route path="/editarservico/:id" element={<EditarServico />} />





                <Route path="/entrada_Produto" element={<EntradaProduto />} />


            </Routes>
        </BrowserRouter>
    );
}
