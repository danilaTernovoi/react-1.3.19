import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import Task from "./Task"

class TaskList extends Component {
  render() {
    const { list, onToggleCompleted, onDeleteTask } = this.props

    return (
      <ul className="todo-list">
        {list.map((task) => {
          return (
            <Fragment key={task.id}>
              <Task
                task={task}
                deleteSelf={() => onDeleteTask(task.id)}
                toggleCompletedSelf={() => onToggleCompleted(task.id)}
              />
            </Fragment>
          )
        })}
      </ul>
    )
  }
}

TaskList.defaultProps = {
  list: [],
}

TaskList.propTypes = {
  list: PropTypes.array,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export default TaskList
