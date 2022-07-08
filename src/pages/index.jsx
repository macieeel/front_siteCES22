import { GroupCard } from '../components/GroupCard'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '../axios'
import Router from 'next/router'
import groups from '../../src/groups.json'
import { NewGroupModal } from '../components/Modals/NewGroupModal'

export default function Home(props) {
    const pessoas = [
        { nome: 'Mamadeira', value: 5 },
        { nome: 'Educado', value: 10 },
        { nome: 'Pi', value: -5 },
    ]

    const [isModalOpened, setIsModalOpened] = useState(false)

    const [user, setUser] = useState({})
    const [groups, setGroups] = useState([])

    useEffect(() => {
        async function fecthData() {
            try {
                const response = await axios.get('/@me')
                setUser(response.data)
            } catch (error) {
                console.log('Not authenticated')
                console.log(error)
                Router.push('/login')
            }
        }
        fecthData()
    }, [])

    useEffect(() => {
        async function fecthData() {
            try {
                const response = await axios.get('/groupsbyuser')
                setGroups(response.data.groups)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [])

    async function createGroup() {
        try {
            const response = await axios.post('/creategroup', {
                group_name: 'Group 1',
            })
            console.log(response.data)
        } catch (error) {
            console.log('Not authenticated')
            console.log(error)
        }
    }

    return (
        <>
            {user ? (
                <>
                    <Head>
                        <title>Home</title>
                    </Head>
                    <Header />
                    <NewGroupModal
                        isModalOpened={isModalOpened}
                        setIsModalOpened={setIsModalOpened}
                        setGroups={setGroups}
                    />
                    <div className="w-full h-full flex">
                        <div className="w-2/3 px-32">
                            <div className="mt-8">
                                <Button
                                    title="Criar Grupo"
                                    style="text-sm"
                                    onClick={() => setIsModalOpened(true)}
                                />
                                <p className="mt-8">
                                    Bem vindo, <span className="font-bold">{user.nome}</span>
                                </p>
                                <p className="font-bold mt-4">Seus Grupos</p>
                                <div className="flex flex-wrap">
                                    {groups.map(elem => (
                                        <GroupCard
                                            key={elem.id}
                                            id={elem.id}
                                            name={elem.nome}
                                            // value={50}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="h-full pt-8 flex-none w-1/3 bg-light-gray flex flex-col px-20 items-center">
                            <p className="text-lg font-bold text-primary">RESUMO</p>
                            <div className="bg-background h-64 rounded-xl w-full my-8 py-4 px-6 flex flex-col items-center">
                                <p className="font-semibold">Quem me deve</p>
                                {pessoas
                                    .filter(elem => elem.value > 0)
                                    .map((elem, index) => (
                                        <div
                                            key={index}
                                            className="flex mt-2 justify-between w-full">
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
                                        <div
                                            key={index}
                                            className="flex mt-2 justify-between w-full ">
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
                            <Button title="Ver Detalhes" style="text-sm" onClick={createGroup} />
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

// export async function getServerSideProps(context) {
// const response = await Axios.get('https://jsonplaceholder.typicode.com/post/1')
// if (!response) {
//     return {
//         notFound: true,
//     }
// }
// try {
//     const response = await axios.get('/@me')
// console.log('TESTE')
//     console.log(response)
// console.log(response)
// return {
// props: {},
// }
// } catch (error) {
//     console.log(error)
//     return {
//         redirect: {
//             permanent: false,
//             destination: '/login',
//         },
//         props: {},
//     }
// }
// }

// export async function getServerSideProps(ctx) {
//     const response = await fetch('http://localhost:5000/@me')
//     console.log('po')
//     console.log(response)
//     return {
//         props: {},
//     }
// }
