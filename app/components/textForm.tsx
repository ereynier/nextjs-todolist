type Props = {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function TextForm({value, onSubmit, onChange}: Props) {
    return (
        <form onSubmit={onSubmit} className="my-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Todo..."
                    value={value}
                    onChange={onChange}
                    className="flex-grow py-2 px-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                Add Todo
                </button>
            </div>
        </form>
    )
}