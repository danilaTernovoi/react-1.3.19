import React, { Component } from "react"
import PropTypes from "prop-types"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { COMPLETED } from "../constants"

class Task extends Component {
  interval = null
  state = {
    created: "",
  }

  componentDidMount() {
    this.setState({
      created: formatDistanceToNow(this.props.task.timestamp, {
        addSuffix: true,
        includeSeconds: true,
      }),
    })

    this.interval = setInterval(() => {
      this.setState({
        created: formatDistanceToNow(this.props.task.timestamp, {
          addSuffix: true,
          includeSeconds: true,
        }),
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { desc, mod } = this.props.task
    const { deleteSelf, toggleCompletedSelf } = this.props

    return (
      <li className={mod}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={toggleCompletedSelf}
            checked={mod === COMPLETED}
          />
          <label>
            <span className="description">{desc}</span>
            <span className="created">{this.state.created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={deleteSelf}></button>
        </div>
        {/* <input type="text" className="edit" value="Editing task" /> */}
      </li>
    )
  }
}

Task.propTypes = {
  deleteSelf: PropTypes.func.isRequired,
  toggleCompletedSelf: PropTypes.func.isRequired,

  task: PropTypes.exact({
    timestamp: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    mod: PropTypes.string.isRequired,
  }),
}

export default Task
