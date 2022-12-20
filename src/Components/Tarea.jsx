import { formatearFecha } from "../helpers/formatearFecha"
import useAdmin from "../Hooks/useAdmin"
import useProyectos from "../Hooks/useProyectos"

const Tarea = ({ tarea }) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea

    const admin = useAdmin()

    return (
        <div className=" border-b p-5 justify-between items-center flex">
            <div>
                <p className=" mb-1 text-xl">{nombre}</p>
                <p className=" mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className=" mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
                <p className=" mb-1 text-gray-600">Prioridad: {prioridad}</p>
            </div>

            <div className=" flex gap-2">
                {admin && (
                    <button
                        className=" bg-orange-400 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-orange-600"
                        onClick={() => handleModalEditarTarea(tarea)}
                    >Editar</button>
                )}


                <button
                        className={`${estado ? 'bg-green-300 ' : 'bg-gray-600' } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-green-600`}
                        onClick={() => completarTarea(_id)}
                    >{ estado ? 'Completa' : 'Incompleta'}
                </button>

                {admin && (
                    <button
                        className=" bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700"
                        onClick={() => handleModalEliminarTarea(tarea)}
                    >Eliminar</button>
                )}

            </div>

        </div>
    )
}

export default Tarea