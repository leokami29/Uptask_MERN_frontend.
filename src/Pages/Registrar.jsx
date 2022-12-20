import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../Components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todo los campos son obligatorios 😐',
        error:true
      })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los Password no coinciden 🥴',
        error:true
      })
    }

    if (password.length < 6 ) {
      setAlerta({
        msg: 'El Password es muy corto 😕 minimo 6 caracteres',
        error:true
      })
    }

    setAlerta({})

    //Crear el ususario en la api
    try {
      const { data } = await clienteAxios.post(`/usuarios`, 
      { nombre, email, password,})

      setAlerta({
        msg:data.msg,
        error:false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  } 
  const { msg } = alerta

  return (
    <>
      <h1 className=' text-sky-600 font-black text-6xl capitalize'>Crea tu Cuenta y Administra tus {''} <span className=' text-slate-700'>Proyectos</span> </h1>

    { msg && <Alerta alerta={alerta}/>}

      <form 
        className=' my-10 bg-white shadow rounded-lg p-10'
        onSubmit={handleSubmit}
      >

      <div className=' my-5'>
          <label
            className='  text-gray-600 capitalize block text-xl font-bold'
            htmlFor='nombre'
          >Nombre</label>
          <input
            id='nombre'
            type="text"
            placeholder='Tu Nombre'
            className=' w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={nombre}
            onChange={ e => setNombre(e.target.value)}
          />
        </div>

        <div className=' my-5'>
          <label
            className=' capitalize text-gray-600 block text-xl font-bold'
            htmlFor='email'
          >Email</label>
          <input
            id='email'
            type="email"
            placeholder='Email de Registro'
            className=' w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
        </div>

        <div className=' my-5'>
          <label
            className=' capitalize text-gray-600 block text-xl font-bold'
            htmlFor='password'
          >Password</label>
          <input
            id='password'
            type="password"
            placeholder='Password de Registro'
            className=' w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={ e => setPassword(e.target.value)}
          />
        </div>

        <div className=' my-5'>
          <label
            className=' capitalize text-gray-600 block text-xl font-bold'
            htmlFor='password2'
          >Confirma Tu Password</label>
          <input
            id='password2'
            type="password"
            placeholder='Confirma Tu Password '
            className=' w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={repetirPassword}
            onChange={ e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className=' bg-sky-700 w-full py-3 mb-2 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-400 transition-colors'
          value='Crear Cuenta'
        />
      </form>

      <nav className=' lg:flex lg:justify-between'>
        <Link
          to='/'
          className=' block text-center my-1 text-sky-700  text-sm font-bold hover:text-sky-400'
        >¿Ya tienes una Cuenta? Inicia Sesion</Link>

        <Link
          to='/olvide-password'
          className=' block text-center my-1 text-sky-700  text-sm font-bold hover:text-sky-400'
        >Olvide mi Password</Link>

      </nav>
    </>
  )
}

export default Registrar