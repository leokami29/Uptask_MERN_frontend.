import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../Hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {
    

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const { mostrarAlerta, alerta, submitProyectos, proyecto} = useProyectos()
    
    useEffect(() => {
      if (params.id ) {
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
        setCliente(proyecto.cliente)
      } 
    }, [params])
    

    const handlesubmit = async e => {
        e.preventDefault()

        if ([nombre, handlesubmit, fechaEntrega, cliente].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return 
        }

        //Pasar datos al Provider
         await submitProyectos({id, nombre, descripcion, fechaEntrega, cliente})
         setId(null)
         setNombre('')
         setDescripcion('')
         setFechaEntrega('')
         setCliente('')
    }

    const {msg} = alerta

  return (
    <form 
        onSubmit={handlesubmit}
        className=' bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-sm '>
            {msg && <Alerta alerta={alerta}/>}
        <div className=" mb-5">
            <label 
                className=' text-gray-700 uppercase font-bold text-sm'
                htmlFor='nombre'
            >Nombre Proyecto</label>

            <input 
                id='nombre'
                type="text"
                className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Proyecto'
                value={nombre}
                onChange={ e => setNombre(e.target.value)}
            />
        </div>

        <div className=" mb-5">
            <label 
                className=' text-gray-700 uppercase font-bold text-sm'
                htmlFor='descripcion'
            >Descripcion</label>

            <textarea 
                id='descripcion'
                className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Descripcion del Proyecto'
                value={descripcion}
                onChange={ e => setDescripcion(e.target.value)}
            />
        </div>

        <div className=" mb-5">
            <label 
                className=' text-gray-700 uppercase font-bold text-sm'
                htmlFor='fecha-entrega'
            >Fecha Entrega</label>

            <input 
                id='fecha-entrega'
                type='date'
                className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fechaEntrega}
                onChange={ e => setFechaEntrega(e.target.value)}
            />
        </div>

        <div className=" mb-5">
            <label 
                className=' text-gray-700 uppercase font-bold text-sm'
                htmlFor='cliente'
            >Nombre Cliente</label>

            <input 
                id='cliente'
                type="text"
                className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Nombre del Cliente'
                value={cliente}
                onChange={ e => setCliente(e.target.value)}
            />
        </div>
        <input 
            type="submit" 
            value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            className="  bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-900"
        />
    </form>

    
  )
}

export default FormularioProyecto