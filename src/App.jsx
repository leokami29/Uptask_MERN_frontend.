import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvaider'
import { ProyectosProvider } from './context/ProyectosProvaider'
import AuthLayout from './Layouts/AuthLayout'
import RutaProtegida from './Layouts/RutaProtegida'
import ConfirmarCuenta from './Pages/ConfirmarCuenta'
import EditarProyecto from './Pages/EditarProyecto'
import Login from './Pages/Login'
import NuevoColoborador from './Pages/NuevoColoborador'
import NuevoPassword from './Pages/NuevoPassword'
import NuevoProyecto from './Pages/NuevoProyecto'
import OlvidePassword from './Pages/OlvidePassword'
import Proyecto from './Pages/Proyecto'
import Proyectos from './Pages/Proyectos'
import Registrar from './Pages/Registrar'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/proyectos' element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path='crear-proyecto' element={<NuevoProyecto/>}/>
              <Route path='nuevo-colaborador/:id' element={<NuevoColoborador/>}/>
              <Route path=':id' element={<Proyecto/>}/>
              <Route path='editar/:id' element={<EditarProyecto/>}/>
            </Route>

          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
