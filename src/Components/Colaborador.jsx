import useProyectos from '../Hooks/useProyectos'

const Colaborador = ({colaborador}) => {

  const {handlemodalEliminarColab} = useProyectos()
  const {email, nombre} = colaborador
  return (
    <div className=' border-b p-5 flex justify-between items-center'>

      <div>
        <p >{nombre}</p>
        <p className=' text-sm text-gray-700'>{email}</p>
      </div>

      <div>
          <button
            type='button'
            className=' bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-800'
            onClick={() => handlemodalEliminarColab(colaborador)}
          >Eliminar</button>
      </div>

    </div>
  )
}

export default Colaborador