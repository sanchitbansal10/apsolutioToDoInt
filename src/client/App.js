import React , { Component } from 'react'
import ReactDOM from 'react-dom'

import TodoList from './Components/TodoList';
import AddTodo from './Components/AddToDo';

export default class TodoBox extends Component{
  constructor(){
		super()
    this.state = {
      data : []
		}
		this.handleNodeRemoval = this.handleNodeRemoval.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleComplete = this.handleToggleComplete.bind(this)
    this.saveToDatabase = this.saveToDatabase.bind(this)
  }

  
  componentWillMount(){
    fetch('/api/appLoad')
    .then(res => res.json())
    .then(d => this.setState({data:d.toDo}))
  }
  //no sideeffects should be in componentDidMount(sideEffect-stateChange)

  componentDidMount(){
    window.addEventListener('unload', this.saveToDatabase)
  }

  saveToDatabase(){
    let toDoObject = this.state.data
    console.log('save to called')
    postData('/api/appUnload', {toDoObject})
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.error(error))

    function postData(url, data) {
      // Default options are marked with *
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      .then(response => response.json()) // parses response to JSON
    }
  }

  //this function saves the updated state to the database
  //cases when this is called: when user refresh the page, click the save changes button

  generateId() {
    return Math.floor(Math.random()*90000) + 10000;
  } 
  
  handleNodeRemoval(nodeId) {
    var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({data});
		return;
  }

  handleSubmit(task) {
      var data = this.state.data;
      var id = this.generateId().toString();
      var complete = 'false';
      data = data.concat([{id, task, complete}]);
      this.setState({data});
  }

  handleToggleComplete(nodeId) {
    var data = this.state.data;
		for (var i in data) {
			if (data[i].id == nodeId) {
				data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({data});
		return;
  }

  
  render() {
    return(
      <div className="well">
				<h1 className="vert-offset-top-0">To do:</h1>
        <button className='btn btn.primary' onClick={this.saveToDatabase}>Save Changes</button>
				<AddTodo onTaskSubmit={this.handleSubmit} />
				<TodoList data={this.state.data} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} />
			</div>
    )
  }
}





