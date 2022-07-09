import Link from 'next/link'

export function GroupCard({ name, id, value }) {
    const color = value < 0 ? 'text-red-600' : 'text-green-600'
    return (
        <Link href={'/groups/' + id}>
            <div className="flex flex-col justify items-center rounded-xl p-4 bg-light-gray h-full m-3 w-32 cursor-pointer hover:opacity-70 transition-opacity">
                <p className="font-semibold">{name}</p>
            </div>
        </Link>
    )
}
