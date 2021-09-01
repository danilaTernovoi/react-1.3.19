import React, { Component } from "react"
import PropTypes from "prop-types"

import TasksFilter from "./TasksFilter"

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.count} items left</span>

        <TasksFilter
          currentFilter={this.props.currentFilter}
          setCurrentFilter={this.props.setCurrentFilter}
        />

        <button className="clear-completed" onClick={this.props.clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  currentFilter: PropTypes.string.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
