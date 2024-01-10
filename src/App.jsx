
import { Link } from 'react-router-dom'
import './App.css'
// import Pokedex from './assets/Components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'

function App() {
  

  return (
    <>
    <div className='pokedex' >
    <h1 id="pokedex-heading">
      <Link to="/" >
      Pokedex
      </Link>
      </h1>
      <div>
      <CustomRoutes />
      </div>
    </div>
    
    </>
  )
}

export default App
