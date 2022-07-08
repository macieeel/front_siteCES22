import Link from 'next/link'

export function GroupCard({ name, index, value }) {
    const color = value < 0 ? 'text-red-600' : 'text-green-600'
    return (
        <Link href={'/groups/' + index}>
            <div className="flex flex-col items-center rounded-xl p-4 bg-light-gray m-3 w-32 cursor-pointer hover:opacity-70 transition-opacity">
                <p className="font-semibold">{name}</p>
                {/* <div className="flex flex-col items-center mt-4">
                    <p className="text-sm">Participantes:</p>
                    <span className={`font-bold`}>
                        {value.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </span>
                </div> */}
            </div>
        </Link>
    )
}
