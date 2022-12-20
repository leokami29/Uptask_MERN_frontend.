import { Navigate, Outlet } from 'react-router-dom'
import Cargando from '../Components/Cargando'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import useAuth from '../Hooks/useAuth'

const RutaProtegida = () => {

    const { auth, cargando } =useAuth()
    if (cargando) return <Cargando/>
  return (
    <div>
        {auth._id ?
         (
            <div className=' bg-gray-100 '>
                <Header/>
                <div className=' md:flex md:min-h-screen'>
                    <Sidebar/>
                    <main className=' flex-1  p-10'>
                      <Outlet/>
                    </main>
                </div>
            </div>
        ) : <Navigate to='/'/>}
    </div>
  )
}

export default RutaProtegida