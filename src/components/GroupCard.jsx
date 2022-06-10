export function GroupCard({ name, value }) {
    const color = value < 0 ? 'text-red-600' : 'text-green-600'
    return (
        <div className="flex flex-col items-center rounded-xl p-4 bg-light-gray m-3 w-32 cursor-pointer hover:opacity-70 transition-opacity">
            <p className="font-bold">{name}</p>
            <div className="flex flex-col items-center mt-4">
                <p className="text-sm">Crédito:</p>
                <span className={`${color} font-bold`}>
                    {value.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </span>
            </div>
        </div>
    )
}
