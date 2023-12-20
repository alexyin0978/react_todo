import { useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  name: string;
  child?: Todo[];
};

const todoList: Todo[] = [
  {
    id: 1,
    name: "food",
    child: [
      {
        id: 1,
        name: "burger",
      },
      {
        id: 2,
        name: "noodle",
      },
      {
        id: 3,
        name: "pizza",
      },
    ],
  },
  {
    id: 2,
    name: "fruit",
    child: [
      {
        id: 1,
        name: "apple",
      },
      {
        id: 2,
        name: "grape",
      },
      {
        id: 3,
        name: "watermelon",
      },
    ],
  },
];

/*
process:
1. create ParentTodo, add isChecked state to control the checkbox
2. map todoList and render ParentTodo inside App 

3. create ChildTodo, add isChecked state to control the checkbox
4. map childTodoList and render ChildTodo inside ParentTodo

5. pass isParentChecked as key and prop to ChildTodo in order to allow ParentTodo to control ChildTodo

6. when child check, update childCheckListLength
if childCheckListLength === todo.child.length, check parent
if childCheckListLength === 0, uncheck parent
*/

function App() {
  return (
    <div>
      Answer here:
      {todoList.map((todo) => {
        return <ParentCheckbox key={todo.id} todo={todo} />;
      })}
    </div>
  );
}

const ParentCheckbox = ({ todo }: { todo: Todo }) => {
  const childLength = todo.child?.length ? todo.child.length : 0;

  const [isChecked, setIsChecked] = useState(false);
  const [childCheckedLength, setChildCheckedLength] = useState(0);

  const onChildCheck = (isChildChecked: boolean) => {
    if (isChildChecked) {
      const newChildCheckedLength = childCheckedLength + 1;
      setChildCheckedLength(newChildCheckedLength);

      if (newChildCheckedLength === childLength) {
        setIsChecked(true);
      }
    } else {
      const newChildCheckedLength = childCheckedLength - 1;
      setChildCheckedLength(newChildCheckedLength);

      if (newChildCheckedLength === 0) {
        setIsChecked(false);
      }
    }
  };

  const onChange = () => {
    const nextState = !isChecked;
    setIsChecked(nextState);

    if (nextState === true) {
      setChildCheckedLength(childLength);
    } else {
      setChildCheckedLength(0);
    }
  };

  return (
    <div>
      <label style={{ color: "yellow" }}>
        {todo.name}:
        <input type="checkbox" checked={isChecked} onChange={onChange} />
      </label>
      {todo.child &&
        todo.child.map((childTodo) => {
          return (
            <ChildTodo
              key={`${childTodo.id}${isChecked}`}
              childTodo={childTodo}
              isParentChecked={isChecked}
              onChildCheck={onChildCheck}
            />
          );
        })}
    </div>
  );
};

const ChildTodo = ({
  childTodo,
  isParentChecked,
  onChildCheck,
}: {
  childTodo: Todo;
  isParentChecked: boolean;
  onChildCheck: (isChildChecked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState(isParentChecked);
  const onChange = () => {
    const nextState = !isChecked;
    setIsChecked(nextState);
    onChildCheck(nextState);
  };
  return (
    <div>
      <label>
        {childTodo.name}:
        <input type="checkbox" checked={isChecked} onChange={onChange} />
      </label>
    </div>
  );
};

export default App;
