import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvaider";

const useProyectos = () => {
    return(
        useContext(ProyectosContext)
    )
}

export default useProyectos
