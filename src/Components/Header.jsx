import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import useProyectos from "../Hooks/useProyectos"
import Busqueda from "./Busqueda"

const Header = () => {

    const {handleBuscador, cerrarSesionProyectos} = useProyectos()
    const {cerrarSesionAuth} = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProyectos()
        localStorage.removeItem('token')
    }
    
  return (
    <header className=" px-4 py-5 bg-white border-b">
        <div className=" md:flex md:justify-between">
            <h2 className=" text-4xl text-sky-600 font-bold text-center mb-5 md:mb-0">
                UpTask
            </h2>

            
            <div className=" flex flex-col md:flex-row items-center gap-4">
                <button
                    type="button"
                    className=" font-bold uppercase hover:text-sky-600"
                    onClick={handleBuscador}
                >Buscar Proyecto</button>
                <Link
                    to='/proyectos'
                    className=" font-bold uppercase hover:text-sky-600"
                >Proyectos</Link>

                <button
                    type="button"
                    className=" text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-gray-700"
                    onClick={handleCerrarSesion}
                >Cerrar Sesion</button>

                <Busqueda/>
            </div>
        </div>
    </header>
  )
}

export default Header