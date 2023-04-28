import { TodoItem } from "@/types/Todo"
import { useState } from "react"

type Props = {
    todo: TodoItem,
    onChange: () => void
    onDelete: () => void
    onEdit: () => void
}

function Todos({todo, onChange, onDelete, onEdit}: Props) {
    
    return (
        <li key={todo.date.toString()} className="py-2 px-4 flex justify-between items-center border-b border-gray-200">
            <div className="flex gap-2 items-center">
                <button onClick={onEdit} className="text-gray-500 hover:text-blue-500 focus:outline-none">
                Edit
                </button>
                <input type="checkbox" checked={todo.completed} onChange={onChange} className="text-blue-500 rounded-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                <div className="overflow-wrap: brea max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <span className={todo.completed ? 'line-through text-gray-400 break-words' : 'text-gray-800 break-words'}>{todo.text}</span>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={onDelete} className="text-gray-500 hover:text-red-500 focus:outline-none ml-1">
                X
                </button>
                <span className="text-xs text-gray-400">{new Date(todo.date).toLocaleString()}</span>
            </div>
        </li>
    )
}

export default Todos