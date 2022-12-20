import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../Components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../Hooks/useAuth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todo los Campos son Obligatorios',
                error: true
            })
        }


        try {
            const { data } = await clienteAxios.post('/usuarios/login', {email, password})
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
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
        <h1 className=' text-sky-600 font-black text-6xl capitalize'>Inicia Sesión y Administra tus {''} <span className=' text-slate-700'>Proyectos</span> 
        </h1>
        {msg && <Alerta alerta={alerta}/>}

        <form 
            className=' my-10 bg-white shadow rounded-lg p-10'
            onSubmit={handleSubmit}
        >
            <div className=' my-5'>
                <label 
                    className=' uppercase text-gray-600 block text-xl font-bold'
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
                    className=' uppercase text-gray-600 block text-xl font-bold'
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

            <input 
                type="submit" 
                value="Iniciar Sesion"
                className=' bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-400 transition-colors'
            />
        </form>

        <nav className=' lg:flex lg:justify-between'>
            <Link 
                to='/registrar'
                className=' block text-center my-5 text-sky-700  text-sm hover:text-sky-400 font-bold'
            >¿No tienes una Cuenta? Regístrate</Link>

            <Link 
                to='/olvide-password'
                className=' block text-center my-5 text-sky-700  text-sm hover:text-sky-400 font-bold'
            >Olvide mi Password</Link>

        </nav>
    </>
  )
}

export default Login