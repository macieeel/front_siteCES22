import { Button } from '../components/Button'
import { useState } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from '../axios'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function logIn() {
        axios
            .post('/login', {
                email: email,
                senha: senha,
            })
            .then(response => {
                Router.push('/')
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })

        setEmail('')
        setSenha('')
    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className="flex h-full">
                <div className="w-1/3 bg-primary h-full">
                    <p className="text-3xl font-medium text-white h-full flex items-center justify-center">
                        Pixzada
                    </p>
                </div>
                <div className="flex flex-grow mx-4 justify-center items-center">
                    <div className="w-full max-w-xl bg-white rounded-xl px-8 pt-6 pb-8 mb-4">
                        <form className="" method="POST">
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

                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="senha">
                                    Senha
                                </label>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary transition-all"
                                    type="password"
                                    id="senha"
                                    placeholder="Escreva sua senha"
                                    value={senha}
                                    onChange={event => setSenha(event.target.value)}
                                />
                                <Link href="/">
                                    <a className="mt-1 ml-1 text-xs text-primary font-semibold hover:opacity-70 transition-opacity">
                                        Esqueceu sua senha?
                                    </a>
                                </Link>
                            </div>

                            <div className="w-full flex justify-center">
                                <Button primary title="Login" onClick={logIn} />
                            </div>
                        </form>

                        <div className="w-full flex flex-col items-center justify-center text-sm pt-6">
                            <div className="">
                                Se ainda não tem conta, inscreva-se{' '}
                                <Link href="/signin">
                                    <a className="font-bold text-primary hover:opacity-70 transition-opacity">
                                        aqui
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
