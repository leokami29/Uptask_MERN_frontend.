import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../Components/Alerta'
import clienteAxios from '../config/clienteAxios'

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false,
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    confirmarCuenta()
  }, [])

  const { msg } = alerta

  return (
    <>
      <h1 className=' text-sky-600 font-black text-6xl capitalize'>Confirma tu cuenta y empieza a crear tus {''} <span className=' text-slate-700'>Proyectos</span>
      </h1>
      <div className=' mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to='/'
            className=' block text-center my-1 text-sky-700  text-xl font-bold'
          >Inicia Sesion</Link>
        )}
      </div>
    </>

  )
}

export default ConfirmarCuenta