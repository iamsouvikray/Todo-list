import "./CSS/TodoItems.css";
import check from "./Assets/check.png";
import cross from "./Assets/cross.png";
import tick from "./Assets/tick.png";

const TodoItems = ({ todo, setTodos }) => {

  const remove = () => {
    setTodos(prev => prev.filter(item => item.id !== todo.id));
  };

  const toggle = () => {
    setTodos(prev =>
      prev.map(item =>
        item.id === todo.id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <div className="todoitems">
      <div
        className={`todoitems-container ${todo.completed ? "line-through" : ""}`}
        onClick={toggle}
      >
        <img
          src={todo.completed ? tick : check}
          alt=""
          height={40}
          width={40}
        />

        <div className="todoitems-text">{todo.text}</div>

        <img
          onClick={(e) => {
            e.stopPropagation(); // prevents toggle on delete
            remove();
          }}
          className="todoitems-cross-icon"
          src={cross}
          alt=""
          height={40}
          width={40}
        />
      </div>
    </div>
  );
};

export default TodoItems;
