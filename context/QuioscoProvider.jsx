import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    const router = useRouter()

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')

        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {

        const calcularTotal = () => {
            const total = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
            setTotal(total)
        }

        calcularTotal()
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id == id)
        setCategoriaActual(categoria[0])

        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {
        if (pedido.some(productoState => productoState.id === producto.id)) {
            //Actualizar la cantidad para que no se repita el pedido
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')
        } else {
            console.log(producto);
            setPedido([...pedido, producto]);
            toast.success('Agregado al pedido', {
                autoClose: 3000,
            })
        }
    }

    const handleEditarCantidades = id => {

        const productoActualizar = pedido.filter(producto => producto.id === id)

        setProducto(productoActualizar[0])

        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)

        setPedido(pedidoActualizado)
    }

    const colocarOrden = async e => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toLocaleString() })

            //Resetear app

            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente', {
                autoClose: 2500,
            }
            )

            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                handleChangeModal,
                modal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export { QuioscoProvider }

export default QuioscoContext