import { GroupCard } from '../components/GroupCard'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '../axios'
import Router from 'next/router'

export default function Home() {
    const pessoas = [
        { nome: 'Mamadeira', value: 5 },
        { nome: 'Educado', value: 10 },
        { nome: 'Pi', value: -5 },
    ]

    const [user, setUser] = useState('')

    useEffect(() => {
        ;(async () => {
            console.log('a')
            try {
                const response = await axios.get('/@me')
                setUser(response.data)
                console.log(response)
            } catch (error) {
                console.log('Not authenticated')
                console.log(error)
                // alert(error)
                Router.push('/login')
            }
        })()
    }, [])

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <div className="max-w-screen-xl w-full h-full flex mx-auto px-8">
                <div className="flex-grow">
                    <div className="mt-8">
                        <Button title="Criar Grupo" style="text-sm" />
                        <p className="mt-8">
                            Bem vindo, <span className="font-bold">{user.nome}</span>
                        </p>
                        <p className="font-bold mt-4">Seus Grupos:</p>
                        <div className="flex">
                            <GroupCard name="AP 127" value={50} />
                            <GroupCard name="AP 229" value={20} />
                            <GroupCard name="Churras" value={-10.5} />
                            <GroupCard name="UBER SP" value={-30} />
                            <GroupCard name="Casd" value={1.5} />
                        </div>
                    </div>
                </div>
                <div className="h-full pt-8 -mr-40 right-0 w-2/5 bg-light-gray flex flex-col pl-8 pr-48 items-center">
                    <p className="text-lg font-bold text-primary">RESUMO</p>
                    <div className="bg-background h-64 rounded-xl w-full my-8 py-4 px-6 flex flex-col items-center">
                        <p className="font-semibold">Quem me deve</p>
                        {pessoas
                            .filter(elem => elem.value > 0)
                            .map((elem, index) => (
                                <div key={index} className="flex mt-2 justify-between w-full">
                                    <p>{elem.nome}</p>
                                    <p className={`text-green-600 font-semibold`}>
                                        {elem.value.toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </p>
                                </div>
                            ))}
                        <span className="text-primary mt-1 cursor-pointer hover:opacity-70 transition-opacity font-semibold text-xs w-full">
                            Cobrar
                        </span>
                        <p className="font-semibold mt-6">Para quem eu devo</p>
                        {pessoas
                            .filter(elem => elem.value < 0)
                            .map((elem, index) => (
                                <div key={index} className="flex mt-2 justify-between w-full ">
                                    <p>{elem.nome}</p>
                                    <p className={`text-red-600 font-semibold`}>
                                        {elem.value.toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <Button title="Ver Detalhes" style="text-sm" />
                </div>
            </div>
        </>
    )
}
