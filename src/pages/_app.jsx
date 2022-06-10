import '../../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <div className="flex flex-col h-screen bg-background">
            <Component {...pageProps} />
            {/* <p>Oi</p> */}
        </div>
    )
}

export default MyApp
