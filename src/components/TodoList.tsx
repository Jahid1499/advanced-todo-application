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

  if (!isLoading && !isError && todos?.length > 0) {
    content = todos.map((todo: TodoTypes) => (
      <Todo key={todo.id} todo={todo} />
    ));
  }

  return <>{content}</>;
};

export default TodoList;
