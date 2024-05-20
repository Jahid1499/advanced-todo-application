import { useEffect, useRef, useState } from "react";
import {
  useDeleteTodosMutation,
  useUpdateTodosMutation,
} from "../features/todos/todosApi";

import cancelImage from "../assets/images/cancel.png";
import pencilImage from "../assets/images/pencil.png";

type TodoTypes = {
  todo: {
    text: string;
    completed: boolean;
    id: number;
    color?: "green" | "red" | "yellow";
  };
};

const Todo = ({ todo }: TodoTypes) => {
  const [deleteTodo, { isLoading }] = useDeleteTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();

  const { text, id, completed, color } = todo;
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState("");
  const [formDisplay, setFormDisplay] = useState(false);

  const handleEdit = () => {
    setInputValue(text);
    setFormDisplay(true);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue.length > 4) {
      updateTodos({
        id,
        data: {
          text: inputValue,
          color,
          completed,
        },
      });
      setFormDisplay(false);
      setInputValue("");
    } else {
      alert("Input field must be required");
    }
  };

  const handleCancel = () => {
    setInputValue("");
    setFormDisplay(false);
  };

  const handleStatusChange = () => {
    updateTodos({
      id,
      data: {
        text,
        color,
        completed: !completed,
      },
    });
  };

  const handleColorChange = (color: string) => {
    updateTodos({
      id,
      data: {
        text,
        completed,
        color,
      },
    });
  };

  const handleDelete = () => {
    const result = confirm("Want to delete?");
    if (result) {
      deleteTodo(id);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [formDisplay]);

  return (
    <div
      className={`flex justify-start items-center p-2 ${
        !formDisplay && "hover:bg-gray-100"
      } hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0`}
    >
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && "border-green-500 focus-within:border-green-500"
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleStatusChange()}
          className="opacity-0 absolute rounded-full cursor-pointer"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div
        className={`select-none flex-1 ${
          completed && !formDisplay && "line-through"
        }`}
      >
        {!formDisplay && text}
        {formDisplay && (
          <>
            <form
              className="flex items-center bg-gray-100 pr-4 rounded-md"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                type="text"
                placeholder="Type your todo"
                className="w-full text-md px-4 py-2 border-none outline-none bg-gray-100 text-gray-500"
                value={inputValue}
                onChange={handleChangeInput}
                ref={inputRef}
              />
              <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleCancel()}
              />
            </form>
          </>
        )}
      </div>

      {!formDisplay && (
        <>
          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
              color === "green" && "bg-green-500"
            }`}
            onClick={() => handleColorChange("green")}
          ></div>

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
              color === "yellow" && "bg-yellow-500"
            }`}
            onClick={() => handleColorChange("yellow")}
          ></div>

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
              color === "red" && "bg-red-500"
            }`}
            onClick={() => handleColorChange("red")}
          ></div>

          <img
            src={pencilImage}
            className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
            alt="Cancel"
            onClick={() => handleEdit()}
          />

          <button disabled={isLoading} style={{ margin: "0px" }}>
            <img
              src={cancelImage}
              className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
              alt="Cancel"
              onClick={() => handleDelete()}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Todo;
