import { Action } from "../actions/action";
import { Todo } from "../components/@types/todo.type";

export const initTodos: Todo[] = [];

const reducer = (state: Todo[], action: Action) => {
    switch (action.type) {
        case 'ADD_TODO':
            // Trả về một mảng mới với todo vừa thêm vào
            return [action.payload.todo, ...state];

        case 'DEL_TODO':
            return state.filter((todo) => todo.id !== action.payload.id);

        case 'EDIT_TODO':
            // Sử dụng map để cập nhật todo nếu id tương ứng
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, name: action.payload.name };
                }
                return todo; 
            });

        case 'SET_TODOS':
            return action.payload.todos;

        case 'TICK_TODO':
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, done: !todo.done };
                }
                return todo; 
            });

        default:
            return state;
    }
};

export default reducer;
