export function Button({ primary, secondary, type = 'button', title, style, onClick }) {
    const option = secondary ? 'border-2 border-primary text-gray-800 py-1' : 'bg-primary'
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${option} hover:opacity-70 transition-opacity text-white font-semibold py-2 px-6 rounded-xl ${style} `}>
            {title}
        </button>
    )
}
