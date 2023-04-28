"use client"

import { TodoItem, TodoList } from "@/types/Todo"
import { useEffect, useState } from "react"
import Todo from "./todo"
import { TextForm } from "./textForm"
import Prompt from "./Prompt"
import { GET_TODOS } from "../api/graphql/queries"
import { useMutation, useQuery } from "@apollo/client"
import { ITodo } from "@/typings"
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from "../api/graphql/mutations"

export default function Todos() {

    const {data, loading, error} = useQuery(GET_TODOS)
    const [deleteTodoItem] = useMutation(DELETE_TODO, {
        refetchQueries: [{query: GET_TODOS}]
    })
    const [updateTodoItem] = useMutation(UPDATE_TODO, {
        refetchQueries: [{query: GET_TODOS}]
    })
    const [createTodoItem] = useMutation(CREATE_TODO, {
        refetchQueries: [{query: GET_TODOS}]
    })

    const [todos, setTodos] = useState<TodoList>([])
    const [newTodo, setNewTodo] = useState<string>("")
    const [todoEdition, setTodoEdition] = useState<string | null>(null)
    const [popUpOpen, setPopUpOpen] = useState<boolean>(false)
    const [popUpText, setPopUpText] = useState<string>("")
    const [filter, setFilter] = useState<string>("all")
    const [sortOrder, setSortOrder] = useState<number>(0)
    const sortType: string[] = ["asc", "desc", "chrono", "reverse"]

    useEffect(() => {
        if (!loading && !error && data) {
            const fetchedTodos = data.todos.map((todo: ITodo) => {
                return {text: todo.text, completed: todo.completed, date: new Date(parseInt((todo.createdAt).toString(), 10)), id: todo.id}
                })
            setTodos(fetchedTodos)
        }
    }, [data, loading, error])


    const addTodo = (text: string, completed: boolean) => {
        createTodoItem({variables: {text: text, completed: completed}})
        // const newTodo: TodoItem = { text: text, completed: completed, date: Date.now(), id: Date.now().toString() }
        // setTodos([...todos].concat(newTodo))
    }

    const removeTodo = (id: string) => {
        deleteTodoItem({variables: {id: id}})
        //setTodos([...todos].filter((todo) => todo.id !== id))
    }

    const editTodo = (id: string, text: string, completed: boolean) => {
        updateTodoItem({variables: {id: id, text: text, completed: completed}})
        // setTodos([...todos].map((todo) => {
        //     if (todo.id === id) {
        //         todo.text = text
        //         todo.completed = completed 
        //     }
        //     return todo
        // }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewTodo(event.target.value)
    }

    const handleSubbmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newTodo === "") return
        addTodo(newTodo, false)
        setNewTodo("")
    }

    const handleEdit = (todo: TodoItem) => {
        setTodoEdition(todo.id)
        setPopUpOpen(true)
        setPopUpText(todo.text)
    }


    const handlePromptSubmit = (value: string) => {
        if (todoEdition !== null) {
            editTodo(todoEdition, value, false)
            setTodoEdition(null)
        }
        setPopUpOpen(false)
        setPopUpText("")
      };
    
      const handlePromptCancel = () => {
        setTodoEdition(null)
        setPopUpOpen(false)
        setPopUpText("")
      };

      const handleFilterClick = (filter: string) => {
        setFilter(filter)
    }

    const clickSortList = (unsort: TodoList) => {
        setSortOrder((sortOrder + 1) % 4)
        setTodos(sortList(unsort))
    }
        

    const sortList = (unsort: TodoList) => {
        let sorted: TodoList = []
        const sort: string = sortType[(sortOrder + 1) % 4]
        console.log(sort)
        if (sort === "asc" || sort === "desc") {
            sorted = ([...unsort].sort((a, b) => {
                const mod = sort === "asc" ?  -1 : 1
                if (a.text < b.text) return 1 * mod
                if (a.text > b.text) return -1 * mod
                return 0
            }))
        } else if (sort === "chrono" || sort === "reverse") {
            sorted = ([...unsort].sort((a, b) => {
                const mod = sort === "chrono" ?  1 : -1
                if (a.date < b.date) return 1 * mod
                if (a.date > b.date) return -1 * mod
                return 0
            }))
        }
        return sorted
    }

    return (
        <div>
            {
                popUpOpen &&
                (<Prompt onSubmit={handlePromptSubmit} onCancel={handlePromptCancel} text={popUpText} />)
            }
            <div className="flex justify-center">
                <button
                    className={`${
                        filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                    } hover:bg-blue-600 py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2`}
                    onClick={() => handleFilterClick("all")}
                >
                    All
                </button>
                <button
                    className={`${
                        filter === "finished" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                    } hover:bg-blue-600 py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2`}
                    onClick={() => handleFilterClick("finished")}
                >
                    Finished
                </button>
                <button
                    className={`${
                        filter === "unfinished" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                    } hover:bg-blue-600 py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2`}
                    onClick={() => handleFilterClick("unfinished")}
                >
                    Unfinished
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => clickSortList(todos)}>
                    Sort
                    <span className="ml-2">
                        {sortType[sortOrder] === "asc" && 'A-Z'}
                        {sortType[sortOrder] === "desc" && 'Z-A'}
                        {sortType[sortOrder] === 'reverse' && 'Old-New'}
                        {sortType[sortOrder] === 'chrono' && 'New-Old'}
                    </span>
                </button>
            </div>
            <TextForm value={newTodo} onChange={handleChange} onSubmit={handleSubbmit}/>
            {loading && <p>Loading...</p>}
            {error && <p>Oops something went wrong</p>}
            <ul>
                {todos.map((todo) => {
                    if (filter === "finished" && !todo.completed) return null
                    if (filter === "unfinished" && todo.completed) return null
                    return (
                        <Todo key={todo.id} todo={todo} onChange={() => editTodo(todo.id, todo.text, !(todo.completed))} onDelete={() => removeTodo(todo.id)} onEdit={() => handleEdit(todo)}/>
                    )
                })}
            </ul>
        </div>
    )
    
}
