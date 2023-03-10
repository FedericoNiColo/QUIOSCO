import Layout from "@/layout/Layout"
import useQuiosco from '@/hooks/useQuiosco'
import { formatearDinero } from "@/helpers"


export default function total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()




    return (
        <Layout pagina='Resumen'>
            <h1 className="text-4xl font-black">Total</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>


            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label
                        htmlFor="nombre"
                        className="block uppercase text-state-800 font-bold text-xl">
                        nombre
                    </label>


                    <input
                        id="nombre"
                        type='text'
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: {''}<span className="font-bold text-amber-600 text-2xl">
                        {formatearDinero(total)}
                    </span></p>
                </div>

                {pedido.length > 0 && nombre.length > 3 ?
                    (<div className="mt-5">
                        <input
                            type='submit'
                            className="cursor-pointer bg-indigo-600 hover:bg-indigo-800  w-full lg:w-auto mt-3 px-5 py-2 rounded uppercase font-bold text-white text-center "
                            value='Confirmar Pedido'
                        />
                    </div>
                    ) : ('')
                }
            </form>


        </Layout>
    )
}
