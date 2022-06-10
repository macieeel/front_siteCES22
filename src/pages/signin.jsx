import Head from 'next/head'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import Router from 'next/router'

import axios from '../axios'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [senha1, setSenha1] = useState('')
    const [senha2, setSenha2] = useState('')
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')

    async function signIn() {
        axios
            .post('/signin', {
                email: email,
                nome: nome,
                sobrenome: sobrenome,
                senha1: senha1,
            })
            .then(response => {
                Router.push('/')
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })

        setEmail('')
        setNome('')
        setSobrenome('')
        setSenha1('')
        setSenha2('')
    }
    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <Header />
            <div className="flex justify-center items-center mx-8 h-full relative animate-page">
                <div className="w-full max-w-4xl">
                    <form className="bg-white rounded-xl px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email">
                                Email
                            </label>
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                                type="email"
                                id="email"
                                placeholder="Escreva seu email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap mb-4 -mx-3">
                            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="nome">
                                    Nome
                                </label>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                                    type="text"
                                    id="nome"
                                    placeholder="Escreva seu nome"
                                    value={nome}
                                    onChange={event => setNome(event.target.value)}
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="sobrenome">
                                    Sobrenome
                                </label>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                                    type="text"
                                    id="sobrenome"
                                    placeholder="Escreva seu sobrenome"
                                    value={sobrenome}
                                    onChange={event => setSobrenome(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="senha1">
                                Senha
                            </label>
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                                type="password"
                                id="senha1"
                                placeholder="Escreva sua senha"
                                value={senha1}
                                onChange={event => setSenha1(event.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="senha2">
                                Confirme sua senha
                            </label>
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                                type="password"
                                id="senha2"
                                placeholder="Confirme sua senha"
                                value={senha2}
                                onChange={event => setSenha2(event.target.value)}
                            />
                        </div>

                        <div className="w-full flex justify-center">
                            <Button title="Inscrever-se" onClick={signIn} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
