import { RxDocument } from "rxdb";
import { useRxData } from "rxdb-hooks";

import { createTodo, TodoDocumentType } from "@/entities/todo";
import { useState } from "react";

import "./style.scss";

export const TodoPage = () => {
  const { result: todos, isFetching } = useRxData<TodoDocumentType>(
    "todos",
    collection => collection.find().sort({ done: "asc", timestamp: "desc" }),
  );

  const [todoName, setTodoName] = useState<string>("");

  const handleCreateTodo = async (name: string) => {
    createTodo({
      name: name,
      done: false,
      timestamp: new Date().toISOString(),
    });
  };

  const deleteTodo = async (entity: RxDocument<TodoDocumentType>) => {
    await entity.remove();
  };

  const changeDoneTodo = async (entity: RxDocument<TodoDocumentType>) => {
    // await entity.modify((todo) => ({ ...todo, done: !todo.done }));
    await entity.update({ $set: { done: !entity.done } });
  };

  const dinamicClass = (classes: object) => {
    return Object.keys(classes).filter(key => classes[key as keyof typeof classes]).join(" ");
  };

  if (isFetching) {
    return "loading characters...";
  }

  return (
    <div className="test">
      <h4>TODO Page</h4>

      <div>
        <input type="text" placeholder="todo name" onChange={e => setTodoName(e.target.value)} />
        <button onClick={() => handleCreateTodo(todoName)}>Add</button>
      </div>

      <br />

      {todos.map(t => (
        <div key={t.id} className={dinamicClass({ done: t.done, todo: true })}>
          <button onClick={() => changeDoneTodo(t)}>{t.done ? "undo" : "done"}</button>
          {t.name}
          <button onClick={() => deleteTodo(t)}>X</button>
        </div>
      ))}
    </div>
  );
};
