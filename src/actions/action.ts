import { Todo } from "../components/@types/todo.type"
export type Action =
    | { type: 'ADD_TODO', payload: { todo: Todo } }
    | { type: 'EDIT_TODO', payload: { id: string, name: string } }
    | { type: 'DEL_TODO', payload: { id: string } }
    | { type: 'TICK_TODO', payload: { id: string } }
    | { type: 'SET_TODOS', payload: { todos: Todo[] } }


