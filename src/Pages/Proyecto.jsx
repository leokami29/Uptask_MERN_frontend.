import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../Components/Alerta"
import Cargando from "../Components/Cargando"
import Colaborador from "../Components/Colaborador"
import ModalEliminarColaborador from "../Components/ModalEliminarColaborador"
import ModalEliminarTarea from "../Components/ModalEliminarTarea"
import ModalFormularioTarea from "../Components/ModalFormularioTarea"
import Tarea from "../Components/Tarea"
import useAdmin from "../Hooks/useAdmin"
import useProyectos from "../Hooks/useProyectos"
import { io } from 'socket.io-client'

let socket

const Proyecto = () => {

  const params = useParams()

  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyectos, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea } = useProyectos()

  const admin = useAdmin()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  }, [])
  
  useEffect(() => {
    socket.on('tarea agregada', tareaNueva => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyectos(tareaNueva)
      }
    })

    socket.on('tarea eliminada', tareaEliminada => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on('tarea actualizada', tareaActualizada => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada)
      }
    })

    socket.on('nuevo estado', nuevoEstadoTarea => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea)
      }
    })
  })
  

  // useEffect(() => {
  //   socket.on('respuesta', (persona) => {
  //     console.log(persona)
  //   })
  // })

  

  const { nombre } = proyecto
  
  // console.log(proyecto)

  const { msg } = alerta
  return  (
      cargando ? <Cargando /> : (
        <>
          <div className=" justify-between flex ">
            <h1 className=" font-black text-4xl">{nombre}</h1>
            {admin && (
              <div className=" flex items-center gap-2 text-gray-400 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>

                <Link
                  to={`/proyectos/editar/${params.id}`}
                  className=" uppercase font-bold "
                >Editar</Link>
              </div>
            )}
          </div>

          {admin && (
            <button
              onClick={handleModalTarea}
              type="button"
              className=" text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-9 flex gap-2 cursor-pointer items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              Nueva tarea</button>
          )}

          <p className=" font-bold text-xl mt-10">Tareas del Proyecto</p>
          {/* <div className=" flex justify-center">
            <div className=" w-full md:w-1/3 lg:w-1/4">
              {msg && <Alerta alerta={alerta} />}
            </div>
          </div> */}

          <div className=" bg-white shadow mt-10 rounded-lg">
            {proyecto.tareas?.length ? proyecto.tareas?.map(tarea => (
              <Tarea
                key={tarea._id}
                tarea={tarea}
              />
            )) : <div className=" text-center my-5 p-10"> No hay tareas en este proyecto <Cargando /></div>}
          </div>
          
          {admin && (
            <>
              <div className=" flex items-center justify-between mt-10">
                <p className=" font-bold text-xl ">Colaboradores</p>

                <Link
                  to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                  className='flex text-gray-400 uppercase font-bold gap-2 hover:text-black'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                  </svg>
                  Agregar</Link>
              </div>

              <div className=" bg-white shadow mt-10 rounded-lg">
                {proyecto.colaboradores?.length ? proyecto.colaboradores?.map(colaborador => (

                  <Colaborador
                    key={colaborador._id}
                    colaborador={colaborador}
                  />
                )) : <div className=" text-center my-5 p-10"> No hay Colaboradores en este proyecto <Cargando /></div>}
              </div>
            </>
          )}
          <ModalFormularioTarea />
          <ModalEliminarTarea />
          <ModalEliminarColaborador />
        </>
      )
    )
  
}

export default Proyecto