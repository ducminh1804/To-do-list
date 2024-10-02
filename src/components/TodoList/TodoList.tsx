import React, { useEffect, useReducer, useState } from "react";
import TaskInput from "../TaskInput/TaskInput";
import TaskList from "../TaskList/TaskList";
import "./TodoList.css";
import { Todo } from "../@types/todo.type";
import reducer, { initTodos } from "../../reducer/reducer";
import { Action } from "../../actions/action";

//dua setState vao reducer
//const tham so  = action type

type HandleLocalStorage = (todos: Todo[]) => Todo[];
export default function TodoList() {
  //dat danh sach task o cha de truyen xuong con
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [todos, dispatch] = useReducer(reducer, initTodos);
  const doneTodos = todos.filter((todo) => todo.done);
  const notDoneTodos = todos.filter((todo) => !todo.done);
  const [currentTask, setCurrentTask] = useState<Todo | null>(null);

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    const todosString: Todo[] = JSON.parse(todos || "[]");
    // setTodos(todosString);-> thay bang dispatch
    dispatch({ type: "SET_TODOS", payload: { todos: todosString } });
  }, []);

  //ham syncLocal nhan vao 1 ham co dang: function() hoac co dang ()=>{}
  //callback nay nhan vao tham so la 1 array Todo[],xu li mang do roi tra ve 1 mang roi luu vao localstorage
  const syncLocal = (handleLocalStorage: HandleLocalStorage) => {
    const localTodos = localStorage.getItem("todos");
    const localTodosString = JSON.parse(localTodos || "[]");
    const newLocalTodosString = handleLocalStorage(localTodosString);
    localStorage.setItem("todos", JSON.stringify(newLocalTodosString));
  };

  const addTodo = (task_name: string) => {
    const todo: Todo = {
      name: task_name,
      done: false,
      id: new Date().toISOString(),
    };
    dispatch({ type: "ADD_TODO", payload: { todo: todo } });
    syncLocal((todolists) => [todo, ...todolists]);
  };

  const startEdit = (id: string) => {
    let curTask = todos.find((task) => task.id === id);
    if (curTask) setCurrentTask(curTask);
    console.log(id);
  };

  // const edit = (name: string) => {
  //   setCurrentTask((prev) => {
  //     if (prev) return { ...prev, name };
  //     return null;
  //   });
  // };
  const edit = (name: string) => {
    if (currentTask) {
      dispatch({ type: "EDIT_TODO", payload: { id: currentTask.id, name } });
      setCurrentTask(null);
    }
  };
  const deleteTask = (id: string) => {
    dispatch({ type: "DEL_TODO", payload: { id } });
    syncLocal((todos) => todos.filter((todo) => todo.id !== id));
  };

  const tickTask = (id: string) => {
    dispatch({ type: "TICK_TODO", payload: { id } });
    syncLocal((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  return (
    <div className="main">
      <TaskInput
        addTodo={addTodo}
        currentTask={currentTask}
        edit={edit}
      />
      <TaskList
        todos={notDoneTodos}
        startEdit={startEdit}
        deleteTask={deleteTask}
        tickTask={tickTask}
      />
      <TaskList
        doneTaskList
        todos={doneTodos}
        startEdit={startEdit}
        deleteTask={deleteTask}
        tickTask={tickTask}
      />
    </div>
  );
}
