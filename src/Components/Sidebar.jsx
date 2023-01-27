import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"

const Sidebar = () => {

  const  { auth } = useAuth()

  return (
    <aside className=" md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className=" text-xl font-bold">😊 Hola: {auth.nombre}</p>

      <Link
        to='crear-proyecto'
        className=" bg-sky-600 font-bold w-full p-3 text-white uppercase block mt-5 text-center rounded-lg hover:bg-sky-900 transition-colors"
      >Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar