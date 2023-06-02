import React, { useState } from "react";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, getUserName } from "../store/user";
import { createTask, getOneDeputy } from "../store/deputy";
import { nanoid } from "nanoid";
import { modifyDateWithoutTime } from "../utils/modifyDateWithoutTime";

const TaskForDeputy = ({ onClick }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getUserName());
  const deputy = useSelector(getOneDeputy()); // Данные из магазина или склада, короче, из store )
  const deputyTasksList = deputy.others.deputyTasksList;
  const [newTask, setNewTask] = useState();

  const handleTaskChange = (event) => {
    const taskText = event.target.value;
    setNewTask((prevState) => ({
      ...prevState,
      text: taskText,
      name: currentUser,
      deputyName: deputy.name
    }));
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    dispatch(createTask(newTask));
    const element = document.getElementById("task-textarea");
    element.value = "";
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="row">
            <div className="col">
              <h4>Направить поручение от {currentUser}</h4>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <form onSubmit={handleTaskSubmit}>
                <textarea
                  id="task-textarea"
                  name="task_text"
                  onChange={handleTaskChange}
                ></textarea>
                <br />
                <button type="submit" className="btn btn-success">
                  Отправить поручение
                </button>
              </form>
            </div>
          </div>

          <div className="row">
            <MDBAccordion>
              <MDBAccordionItem
                collapseId={1}
                headerTitle={`Поручения (${deputyTasksList.length})`}
              >
                {deputyTasksList.map((task) => {
                  return (
                    <div key={nanoid()}>
                      <span className="text-bold">{task.task_author} </span>
                      <span className="text-italic">
                        от {modifyDateWithoutTime(task.task_date)}{" "}
                      </span>
                      <img
                        className={
                          "task-img " +
                          (task.currentUserLiked ? " task-img-clicked" : "")
                        }
                        data-task-id={task.id}
                        src={require(`../media/image/like.png`)}
                        onClick={onClick}
                      />
                      <span className="span-task-rating">
                        {task.task_rating}
                      </span>
                      <p className="text-comment">{task.task_text}</p>
                    </div>
                  );
                })}
              </MDBAccordionItem>
            </MDBAccordion>
          </div>
        </>
      )}
    </>
  );
};

export default TaskForDeputy;
