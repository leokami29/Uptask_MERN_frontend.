import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import {useNavigate} from 'react-router-dom'

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setmodalFormularioTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarColab, setModalEliminarColab] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
      const obtenerProyectos = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios('/proyectos', config)
            setProyectos(data)

        } catch (error) {
            console.log(error)
        }
      }
      obtenerProyectos()
    }, [])
    

    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        
        setTimeout(() => {
            setAlerta({}) 
        }, 3000);
    }

    const submitProyectos = async proyecto => {

        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
    }

    const editarProyecto = async proyecto => {
       try {
        const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

            //Sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data  : proyectoState)
            setProyectos(proyectosActualizados)
            setAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error: false
            })
            
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
       } catch (error) {
        console.log(error)
       }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/proyectos', proyecto, config)
            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })
            
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
            
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                erro: true
            })
        }

        setCargando(false)
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config)

            //Sincronizar el State
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })
            

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () => {
        setmodalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async tarea => {
        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }
    }

    const crearTarea = async  tarea => {

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/tareas',tarea, config)

            // Agrega la tarea al state
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = [...proyecto.tareas, data]

            setProyecto(proyectoActualizado)
            setAlerta({})
            setmodalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }
    const editarTarea = async  tarea => {

        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`,tarea, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id ? data : tareaState )
            setProyecto(proyectoActualizado)

            setAlerta({})
            setmodalFormularioTarea(false)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setmodalFormularioTarea(!modalFormularioTarea)
    }
    
    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id )
            
            setProyecto(proyectoActualizado)
            setModalEliminarTarea(false)
            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post('/proyectos/colaboradores',{email}, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            setAlerta({
                msg:data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);

            setColaborador({})
            
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        }
    }

    const handlemodalEliminarColab = (colaborador) => {
        setModalEliminarColab(!modalEliminarColab)
        setColaborador(colaborador)
    }

    const eliminarColab = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

            setProyecto(proyectoActualizado)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            setColaborador({})
            setModalEliminarColab(false)

        } catch (error) {
            console.log(error)
        }
    }

    const completarTarea = async (id) =>  {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            setProyecto(proyectoActualizado)
            setTarea({})
            setAlerta({})
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyectos,
                obtenerProyecto,
                proyecto, 
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                setModalEliminarTarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handlemodalEliminarColab,
                modalEliminarColab,
                eliminarColab,
                completarTarea,
            }}
        >{children}</ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext