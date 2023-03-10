import Image from 'next/image'
import React from 'react'
import { formatearDinero } from '@/helpers'
import axios from 'axios'
import { toast } from 'react-toastify'


function Orden({ orden }) {

    const { id, nombre, total, pedido } = orden

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Lista')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

    return (
        <div className=' border-b-4 shadow p-10 space-y-5'>
            <h3 className="text-3xl font-bold">Orden: {' '}{id}</h3>
            <p className="text-2xl font-bold">Cliente: {' '}{nombre}</p>

            <div>
                {pedido.map(p => (
                    <div key={p.id} className='py-3 flex- border-b last-of-type:border-0 items-center'>
                        <div className='w-32'>
                            <Image
                                width={400}
                                height={500}
                                src={`/assets/img/${p.imagen}.jpg`}
                                alt={`Imagen Plato ${p.nombre}`}
                                className='rounded-md'
                            />
                        </div>
                        <div className='p-5 space-y-2'>
                            <h4 className='text-xl font-bol text-amber-500'>{p.nombre}</h4>
                            <p className='text-lg font-bold'>Cantidad:{' '}{p.cantidad}</p>
                        </div>
                    </div>
                ))}
                <div>
                    <div className='md:flex md:items-center md:justify-between my-10'>
                        <p className='mt-5 font-black text-4xl text-amber-500'>
                            Total a pagar: {' '} {formatearDinero(total)}
                        </p>

                        <button
                            className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg'
                            type='button'
                            onClick={completarOrden}
                        >
                            completar orden
                        </button>
                    </div>
                </div>
            </div>








        </div>
    )
}

export default Orden
