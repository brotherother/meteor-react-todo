// import React, { Component } from 'react';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

// App component - represents the whole app
// export default class app extends Component {
//   getTasks() {
//     return [
//       { _id: 1, text: 'This is task 1' },
//       { _id: 2, text: 'This is task 2' },
//       { _id: 3, text: 'This is task 3' },
//     ];
//   }

class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field from the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    // Clear from
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  renderTasks() {
    // return this.getTasks().map((task) => (
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo list</h1>

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
