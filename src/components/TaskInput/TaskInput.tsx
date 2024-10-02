import React, { useState, useEffect } from "react";
import "./TaskInput.css";
import { Todo } from "../@types/todo.type";

interface TaskInputProps {
  addTodo: (name: string) => void;
  currentTask: Todo | null;
  edit: (name: string) => void;
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTask, edit } = props;
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (currentTask) {
      setName(currentTask.name); 
    } else {
      setName("");
    }
  }, [currentTask]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentTask) {
      edit(name); // Gọi edit khi nhấn submit
      setName(""); // Reset ô nhập
    } else {
      addTodo(name);
      setName(""); // Reset ô nhập
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value); // Chỉ cập nhật state name
  };

  return (
    <div className="">
      <div className="title">Title</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name} // Sử dụng state name
          placeholder="caption goes here"
          onChange={handleChange}
        />
        <button type="submit">{currentTask ? "✔️" : "➕"}</button>
      </form>
    </div>
  );
}
