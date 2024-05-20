import {
  useGetFiltersQuery,
  useUpdateColorStatusMutation,
  useUpdateStatusMutation,
} from "../features/filters/filterApi";
import { useGetTodosQuery } from "../features/todos/todosApi";

type TodoTypes = {
  text: string;
  completed: boolean;
  id: number;
  color?: "green" | "red" | "yellow";
};

const Footer = () => {
  const { data: todos } = useGetTodosQuery({});
  const { data: filters } = useGetFiltersQuery({});
  const [updateStatus] = useUpdateStatusMutation();
  const [updateColorStatus] = useUpdateColorStatusMutation();

  let status: string = "";
  let colors: string[] = [];

  if (filters && filters.length > 0) {
    status = filters[0]?.status;
    colors = filters[0]?.colors;
  }

  const todosRemaining = todos?.filter(
    (todo: TodoTypes) => !todo.completed
  ).length;

  const handleStatusChange = (status: string) => {
    updateStatus({
      id: 1,
      data: { status },
    });
  };

  const handleColorChange = (color: string) => {
    console.log(colors, status);
    let newColor = JSON.parse(JSON.stringify(colors));
    if (newColor.includes(color)) {
      newColor = newColor.filter(
        (existingColor: string) => existingColor !== color
      );
    } else {
      newColor = [...newColor, color];
    }

    updateColorStatus({ colors: [...newColor] });
  };

  const numberOfTodos = (no_of_todos: number) => {
    switch (no_of_todos) {
      case 0:
        return "No task";
      case 1:
        return "1 task";
      default:
        return `${no_of_todos} tasks`;
    }
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{numberOfTodos(todosRemaining)} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "All" && "font-bold"}`}
          onClick={() => handleStatusChange("All")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Incomplete" && "font-bold"}`}
          onClick={() => handleStatusChange("Incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Complete" && "font-bold"}`}
          onClick={() => handleStatusChange("Complete")}
        >
          Complete
        </li>
        <li></li>
        <li></li>
        <li
          className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
            colors?.includes("green") && "bg-green-500"
          }`}
          onClick={() => handleColorChange("green")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
            colors?.includes("red") && "bg-red-500"
          }`}
          onClick={() => handleColorChange("red")}
        ></li>
        <li
          className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
            colors?.includes("yellow") && "bg-yellow-500"
          }`}
          onClick={() => handleColorChange("yellow")}
        ></li>
      </ul>
    </div>
  );
};

export default Footer;
