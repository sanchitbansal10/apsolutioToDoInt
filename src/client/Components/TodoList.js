import React, { Component } from 'react';
import SingleTodo from './SingleTodo';

export default class TodoList extends Component {

	constructor(){
		super();
		this.removeNode = this.removeNode.bind(this)
		this.toggleComplete = this.toggleComplete.bind(this)
	}

  removeNode(nodeId) {
    this.props.removeNode(nodeId);
		return;
  }

  toggleComplete(nodeId) {
    this.props.toggleComplete(nodeId);
		return;
  }

  render(){
    var listNodes = this.props.data.map(function (listItem) {
			return (
				<SingleTodo key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} />
			);
		},this);
		return (
			<ul className="list-group">
				{listNodes}
			</ul>
		);
  }
}