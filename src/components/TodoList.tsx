import { useGetFiltersQuery } from "../features/filters/filterApi";
import { useGetTodosQuery } from "../features/todos/todosApi";
import Todo from "./Todo";
import Error from "./ui/Error";

type TodoTypes = {
  text: string;
  completed: boolean;
  id: number;
  color?: "green" | "red" | "yellow";
};

const TodoList = () => {
  const { data: todos, isLoading, isError } = useGetTodosQuery({});

  const { data: filters } = useGetFiltersQuery({});

  let status = "";
  let colors = [];

  if (filters && filters.length > 0) {
    status = filters[0]?.status;
    colors = filters[0]?.colors;
  }

  let content = null;

  if (isLoading) {
    content = <h1>Loading........</h1>;
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && todos?.length === 0) {
    content = <Error message="No todos found!" />;
  }
  const filterByStatus = (todo: TodoTypes) => {
    switch (status) {
      case "Complete":
        return todo.completed;

      case "Incomplete":
        return !todo.completed;

      default:
        return true;
    }
  };

  const filterByColors = (todo: TodoTypes) => {
    if (colors?.length > 0) {
      return colors.includes(todo?.color);
    }
    return true;
  };

  if (!isLoading && !isError && todos?.length > 0) {
    content = todos
      .filter(filterByStatus)
      .filter(filterByColors)
      .map((todo: TodoTypes) => <Todo key={todo.id} todo={todo} />);
  }

  return <>{content}</>;
};

export default TodoList;
