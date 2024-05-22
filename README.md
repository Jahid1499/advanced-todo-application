# About this Application

**1. Adding and Viewing Todos:**

- Users can add new todos and view the todo list.

**2. Editing Todos**

- Click the pen icon to edit a todo.
- Edit in the provided box and press enter to save changes.
- The edit box disappears, and the updated list is shown.

**3. Deleting Todos**

- Click the cross icon to delete a todo.
- Confirmation is required before deletion.

**4. Priority Setting**

- Each todo has three priority colors: green, yellow, and red.
- Users can set the priority of each todo.

**5. Validation**

- New todos must be validated before creation.

**6. Status Management**

- Todos can be marked as completed or uncompleted.
- Toggle the status of a todo.
- Completed todos are shown with a line-through and are checked.

**7. Batch Actions**

- "Complete all tasks" button marks all todos as completed.
- "Clear completed" button deletes all completed todos.

**8. Footer Features**

- Displays the number of tasks left (e.g., "4 tasks left").
- Filtering options to view
  - All tasks
  - Incomplete tasks
  - Completed tasks
  - Tasks by priority color
- Multiple filter options can be selected (e.g., incomplete and red).

**9. Messages and Synchronization**

- Relevant messages are displayed for create, update, delete, or error actions.
- Todos are synchronized with both frontend and backend.
- New and edited todos are saved on the server and shown on the frontend without reloading.
- Maintain optimistic updates for new todos without refetching the list.

# Technology

- React
- Redux
- Typescript
- Tailwind css
- RTK Query
- Json server
- Deploy in vercel

## How to clone project

```sh
git clone https://github.com/Jahid1499/advanced-todo-application
```

## How to run server

1. Go to the cloned project directory

```sh
cd advanced-todo-application
```

2. First you need run server - for this follow those step

```sh
cd server
```

```sh
npm i
```

```sh
npm start
```

The server run in http://localhost:4010

> Note: when run server, in the terminal show, which port run server

## How to run react application

1.  Go to the cloned project directory

```sh
cd advanced-todo-application
```

2. Setup environment - create a .env file in root directory and add those variable

```sh
VITE_API_URL=http://localhost:4010
VITE_ENVIRONMENT_SERVER="development"
```

3. Install package

```sh
npm i
```

4. Run application

```sh
npm run dev
```

5. Build application

```sh
npm run build
```

## Documentation

[Advanced todo application's documentation](https://docs.google.com/document/d/1A6W_cBX0jlGxyab0qr0I3j_n_jDA0QXIGmJYvf5iFTU/edit?usp=sharing)
