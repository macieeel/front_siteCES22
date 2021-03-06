import { GroupCard } from '../components/GroupCard'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from '../axios'
import Router from 'next/router'
import { NewGroupModal } from '../components/Modals/NewGroupModal'
import { ConfirmModal } from '../components/Modals/ConfirmModal'

export default function Home() {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false)
    const [currentId, setCurrentId] = useState(-1)
    const [user, setUser] = useState({})
    const [groups, setGroups] = useState([])
    const [saldoGrupos, setSaldoGrupos] = useState([])

    useEffect(() => {
        async function fecthData() {
            try {
                const response = await axios.get('/@me')
                setUser({ id: response.data.id, nome: response.data.nome })
                setGroups(response.data.groups)
                setSaldoGrupos(response.data.saldo_groups)
            } catch (error) {
                console.log('Not authenticated')
                console.log(error)
                Router.push('/login')
            }
        }
        fecthData()
    }, [])

    function handleClick(index) {
        setCurrentId(index)
        setIsConfirmModalOpened(true)
    }

    async function handleMePagaram(groupId) {
        try {
            const response = await axios.delete('/paid/' + groupId)
            console.log(response.data)
            Router.reload(window.location.pathname)
        } catch (error) {
            console.log('Not authenticated')
            console.log(error)
        }
    }

    return (
        <>
            {user.nome ? (
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

                    <ConfirmModal
                        isModalOpened={isConfirmModalOpened}
                        setIsModalOpened={setIsConfirmModalOpened}
                        message="Tem certeza que deseja confirmar que todos te pagaram?"
                        onConfirm={() => handleMePagaram(currentId)}
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
                            <div className="bg-background rounded-xl w-full my-8 py-4 px-6 flex flex-col items-center">
                                <p className="font-semibold">Grupos Saldo Positivo</p>
                                {saldoGrupos.filter(elem => elem > 0).length == 0 ? (
                                    <p>-----</p>
                                ) : (
                                    <></>
                                )}
                                {saldoGrupos.map((elem, index) => {
                                    if (elem > 0) {
                                        return (
                                            <div key={index} className="flex flex-col w-full">
                                                <div className="flex mt-2 justify-between w-full">
                                                    <p>{groups[index].nome}</p>
                                                    <p className={`text-green-600 font-medium`}>
                                                        {new Intl.NumberFormat('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                        }).format(Math.abs(elem))}
                                                    </p>
                                                </div>
                                                <p
                                                    className="font-semibold text-sm text-primary text-right mb-2 cursor-pointer"
                                                    onClick={() => handleClick(groups[index].id)}>
                                                    Me pagaram
                                                </p>
                                            </div>
                                        )
                                    }
                                })}
                                {/* <span className="text-primary mt-1 cursor-pointer hover:opacity-70 transition-opacity font-semibold text-xs w-full">
                                    Cobrar
                                </span> */}
                                <p className="font-semibold mt-6">Grupos Saldo Negativo</p>
                                {saldoGrupos.filter(elem => elem < 0).length == 0 ? (
                                    <p>-----</p>
                                ) : (
                                    <></>
                                )}
                                {saldoGrupos.map((elem, index) => {
                                    if (elem < 0) {
                                        return (
                                            <div
                                                key={index}
                                                className="flex mt-2 justify-between w-full ">
                                                <p>{groups[index].nome}</p>
                                                <p className={`text-red-600 font-semibold`}>
                                                    {new Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    }).format(Math.abs(elem))}
                                                </p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            {/* <Button title="Ver Detalhes" style="text-sm" onClick={createGroup} /> */}
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
