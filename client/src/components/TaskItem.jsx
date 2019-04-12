import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

// Wrapper for menu items on component Sidebar
function TaskItem({ payload, deleteTask }) {
  const { id, title, priority } = payload;
  const classPriotity = `priority${priority}`;
  const priorityValue = [0, 1, 2, 3];
  return (
    <li className="tasks-list_item">
      <input
        type="radio"
        onChange={deleteTask}
        className="checkbox-template"
        value={id}
      />
      <p className="tasks-list_item__title">{title}</p>
      <p className="tasks-list_item__priority ">
        <FontAwesomeIcon className={classPriotity} icon={faFlag} />
        <div className="priority-change">
          {priorityValue.map(value => (
            <label key={value}>
              <input
                type="radio"
                name={id}
                value={value}
                defaultChecked={value === priority ? "checked" : ""}
              />
            </label>
          ))}
        </div>
      </p>
      <p className="tasks-list_item__more-info">
        <FontAwesomeIcon icon={faEllipsisH} />
      </p>
    </li>
  );
}

export default TaskItem;
