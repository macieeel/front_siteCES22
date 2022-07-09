import Link from 'next/link'
import { HiMenu } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from '../axios'
import Router from 'next/router'

export function Header() {
    const { asPath } = useRouter()
    const [isActive, setIsActive] = useState(false)

    async function logOut() {
        axios
            .post('/logout')
            .then(() => {
                Router.push('/login')
            })
            .catch(error => {
                console.log(error)
                alert(error)
                Router.push('/login')
            })
    }

    return (
        <header className="bg-primary py-3 text-white">
            <div className="max-w-screen-xl py-3 my-0 mx-auto px-8 flex flex-wrap items-center justify-between">
                <Link href="/">
                    <a className="block font-semibold text-xl tracking-tight">Pixzada</a>
                </Link>

                <div className="block lg:hidden">
                    <button
                        className="hover:opacity-70 transition-opacity"
                        onClick={() => setIsActive(isActive => !isActive)}>
                        <HiMenu size={22} />
                    </button>
                </div>
                <nav
                    className={` ${
                        isActive ? 'block' : 'hidden'
                    } mt-4 w-full border-t border-gray-400 lg:border-none lg:w-auto lg:block lg:mt-0`}>
                    <div className="text-sm text-gray-400">
                        <Link href="/">
                            <a
                                className={` block mt-4 lg:inline-block lg:mt-0 mr-8 hover:text-white transition-colors`}>
                                Home
                            </a>
                        </Link>
                        {/* <Link href="/logout"> */}
                        <button
                            className={` block mt-4 lg:inline-block lg:mt-0 mr-8 hover:text-white transition-colors`}
                            onClick={logOut}>
                            Sair
                        </button>
                        {/* </Link> */}
                        {/* <Link href="/login">
                            <a
                                className={` block mt-4 lg:inline-block lg:mt-0 mr-8 hover:text-white transition-colors`}>
                                Login
                            </a>
                        </Link>
                        <Link href="/signin">
                            <a
                                className={` block mt-4 lg:inline-block lg:mt-0 mr-8 hover:text-white transition-colors`}>
                                Inscreva-se
                            </a>
                        </Link> */}
                    </div>
                </nav>
            </div>
        </header>
    )
}

// ${
//     asPath == '/signin' ? 'text-white font-semibold' : ''
// }
