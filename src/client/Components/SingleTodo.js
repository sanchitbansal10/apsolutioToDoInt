import React, { Component } from 'react'

export default class SingleTodo extends Component {
	constructor(){
		super();
		this.removeNode = this.removeNode.bind(this)
		this.toggleComplete = this.toggleComplete.bind(this)
	}

  removeNode(e) {
    e.preventDefault();
    this.props.removeNode(this.props.nodeId);
		return;
  }

  toggleComplete(e) {
    e.preventDefault();
		this.props.toggleComplete(this.props.nodeId);
		return;
  }

  render() {
    var classes = 'list-group-item clearfix';
		if (this.props.complete === 'true') {
			classes = classes + ' list-group-item-success';
		}
		return (
			<li className={classes}>
				{this.props.task}
				<div className="pull-right" role="group">
					<button type="button" className="btn btn-xs btn-success img-circle" onClick={this.toggleComplete}>&#x2713;</button> <button type="button" className="btn btn-xs btn-danger img-circle" onClick={this.removeNode}>&#xff38;</button>
				</div>
			</li>
		);
  }
}