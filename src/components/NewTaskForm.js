import React, { Component } from "react"
import PropTypes from "prop-types"
import { upperFirstLetter } from "../upperFirstLetter"

class NewTaskForm extends Component {
  state = {
    value: "",
  }

  changeHandler = (e) => {
    this.setState({ value: e.target.value })
  }

  keydownHandler = (e) => {
    if (e.key === "Enter") {
      const { onCreate: createTask } = this.props
      createTask(upperFirstLetter(this.state.value))
      this.setState({ value: "" })
    }
  }

  render() {
    const isClone = !!this.props.list.find(
      (task) => task.desc === upperFirstLetter(this.state.value).trim()
    )
    const isVoid = !this.state.value
    const isValid = !isClone && !isVoid

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={this.state.value}
        onChange={this.changeHandler}
        onKeyDown={isValid ? this.keydownHandler : () => {}}
        style={{
          outline: isValid ? "" : "1px solid crimson",
        }}
      />
    )
  }
}

NewTaskForm.defaultProps = {
  list: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      mod: PropTypes.string.isRequired,
    })
  ),
}

NewTaskForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
}

export default NewTaskForm
