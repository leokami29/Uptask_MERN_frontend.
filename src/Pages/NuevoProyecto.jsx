import FormularioProyecto from '../Components/FormularioProyecto'

const NuevoProyecto = () => {
    return (
        <>
            <h1 className=" text-4xl font-black">Crear Proyectos</h1>

            <div className=' mt-10 flex justify-center'>
                <FormularioProyecto/>
            </div>
        </>
    )
}

export default NuevoProyecto