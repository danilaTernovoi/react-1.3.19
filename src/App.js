import React, { Component } from "react"

import NewTaskForm from "./components/NewTaskForm"
import TaskList from "./components/TaskList"
import Footer from "./components/Footer"

import { ACTIVE, COMPLETED } from "./constants"

class App extends Component {
  state = {
    currentFilter: "all",
    tasks: [],
  }

  createTask = (desc) => {
    const newTask = {
      desc,
      id: `${Date.now()}-${desc}`,
      mod: ACTIVE,
      timestamp: Date.now(),
    }

    this.setState((state) => {
      return {
        tasks: [...state.tasks, newTask],
      }
    })
  }

  toggleCompleted = (id) => {
    const toggledTask = this.state.tasks.find((task) => task.id === id)
    toggledTask.mod = toggledTask.mod === ACTIVE ? COMPLETED : ACTIVE
    this.forceUpdate()
  }

  deleteTask = (id) => {
    this.setState((state) => {
      return {
        tasks: state.tasks.filter((task) => task.id !== id),
      }
    })
  }

  clearCompleted = () => {
    this.setState((state) => {
      return {
        tasks: state.tasks.filter((task) => task.mod !== COMPLETED),
      }
    })
  }

  componentDidMount() {
    this.setState({
      tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    })
  }

  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTaskForm onCreate={this.createTask} list={this.state.tasks} />
        </header>

        <section className="main">
          <TaskList
            list={this.state.tasks.filter((task) => {
              return this.state.currentFilter === "all"
                ? task
                : task.mod === this.state.currentFilter
            })}
            onToggleCompleted={this.toggleCompleted}
            onDeleteTask={this.deleteTask}
          />

          <Footer
            count={this.state.tasks.length}
            currentFilter={this.state.currentFilter}
            setCurrentFilter={(newFilter) =>
              this.setState({ currentFilter: newFilter })
            }
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

export default App
