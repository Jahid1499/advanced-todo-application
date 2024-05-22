import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
  useAddTodosMutation,
  useDeleteTodosMutation,
  useGetTodosQuery,
  useUpdateTodosMutation,
} from "../features/todos/todosApi";
import Error from "./ui/Error";
import Success from "./ui/Success";

type TodoTypes = {
  text: string;
  completed: boolean;
  id: number;
  color?: "green" | "red" | "yellow";
};

const Header = () => {
  const [input, setInput] = useState("");
  const [shown, setShown] = useState(false);
  const [inputError, setInputError] = useState("");
  const [addTodos, { data: isSuccess, isError, isLoading }] =
    useAddTodosMutation();
  const { data: todos } = useGetTodosQuery({});
  const [deleteTodo] = useDeleteTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.length > 4) {
      setInputError("");
    }
    setInput(e.target.value);
  };

  const clearHandler = () => {
    const oldTodos = JSON.parse(JSON.stringify(todos));
    oldTodos.map((todo: TodoTypes) => {
      const { id } = todo;
      if (todo?.completed) {
        deleteTodo(id);
      }
    });
  };

  const completeHandler = () => {
    const oldTodos = JSON.parse(JSON.stringify(todos));
    oldTodos.map((todo: TodoTypes) => {
      if (!todo.completed) {
        updateTodos({
          id: todo.id,
          data: {
            completed: true,
            text: todo.text,
            color: todo.color,
          },
        });
      }
    });
  };

  const submitHandler = (e: { preventDefault: () => void }) => {
    // React.FormEventHandler<HTMLFormElement>;
    e.preventDefault();
    if (input.length < 5) {
      setInputError("Single todo need minimum 5 letter");
      return;
    }

    addTodos({
      text: input,
      completed: false,
    });
    setShown(true);

    setTimeout(() => {
      setShown(false);
    }, 3000);

    setInput("");
    setInputError("");
  };

  return (
    <div>
      {shown && (
        <div style={{ marginBottom: "8px" }}>
          {isSuccess && <Success message="Todo was added successfully !!!" />}
          {isError && <Error message="There was an error adding todo !!!" />}
        </div>
      )}

      {inputError.length > 0 && <Error message={inputError} />}

      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={submitHandler}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={handleInput}
        />
        <button disabled={isLoading} type="submit">
          <img src={plusImage} className="w-7" alt="Add todo" />
        </button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer" onClick={completeHandler}>
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <span>Complete All Tasks</span>
        </li>
        <li className="cursor-pointer" onClick={clearHandler}>
          Clear completed
        </li>
      </ul>
    </div>
  );
};

export default Header;
