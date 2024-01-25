import'./style.css'
import Menu from '../../componentes/menu'
export default function Dashboard() {
    return (

    <div className="dashboard-container">

        <div className='menu'>
            <h1>menu</h1>
            <Menu />
        </div>
        <div className='principal'>
           <h1>pagina principal</h1>
        </div>       
    </div>
  
    )
  
  }
