import { GroupCard } from '../components/GroupCard'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '../axios'
import Router from 'next/router'

export default function Home() {
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
                            <GroupCard name="AP 127" value={50} />
                            <GroupCard name="AP 127" value={50} />
                            <GroupCard name="AP 127" value={-30} />
                            <GroupCard name="AP 127" value={-20} />
                        </div>
                    </div>
                </div>
                <div className="h-full pt-8 -mr-40 right-0 w-2/5 bg-light-gray flex flex-col pl-8 pr-48 items-center">
                    <p className="text-lg font-bold text-primary">RESUMO</p>
                    <div className="bg-background h-64 rounded-xl w-full my-8"></div>
                    <Button title="Ver Detalhes" style="text-sm" />
                </div>
            </div>
        </>
    )
}
