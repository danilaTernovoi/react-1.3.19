import React, { Component } from "react"
import PropTypes from "prop-types"

import { ACTIVE, COMPLETED } from "../constants"
import { upperFirstLetter } from "../upperFirstLetter"

class TasksFilter extends Component {
  render() {
    const filters = ["all", ACTIVE, COMPLETED]
    const { currentFilter, setCurrentFilter } = this.props

    return (
      <ul className="filters">
        {/* selected */}
        {filters.map((filter) => {
          return (
            <li key={filter}>
              <button
                onClick={() => setCurrentFilter(filter)}
                className={filter === currentFilter ? "selected" : ""}
              >
                {upperFirstLetter(filter)}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}

TasksFilter.defaultProps = {
  currentFilter: "all",
}

TasksFilter.propTypes = {
  setCurrentFilter: PropTypes.func.isRequired,
}

export default TasksFilter
