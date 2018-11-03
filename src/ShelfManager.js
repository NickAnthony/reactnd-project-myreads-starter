import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ShelfManager extends Component {
  state = {
    newShelfName: ''
  }
  handleAddShelf = () => {
    var newShelf = {
      id: this.state.newShelfName.toString().toLowerCase().split(' ').join(''),
      title: this.state.newShelfName
    }
    // Check that shelf doesn't already exist
    if ( this.props.shelves.filter((shelf) => (shelf.id === newShelf.id)).length > 0 ) {
      console.log("Shelf exists: ", newShelf.id)
    } else {
      this.props.addShelf(newShelf)
    }
    this.updateNewShelfName('')
  }
  updateNewShelfName = (newName) => {
    this.setState({
      newShelfName: newName
    })
  }
  render() {
    return(
      <div>
      <div className="list-books-title">
        <h1>MyShelves</h1>
      </div>
        <Link to='/' className="close-search"/>
        <ul className="shelf-list">
          { this.props.shelves.map((shelf) =>
            <li
              key={shelf.id}
              className="shelf-list-item">
              <h2>{shelf.title}</h2>
              <div
                className="delete-shelf"
                onClick={() => this.props.deleteShelf(shelf)}/>
            </li>
          )}
          <li className="shelf-list-item">
            <input className="new-shelf-input"
              type="text"
              placeholder="New shelf name"
              value={this.state.newShelfName}
              onChange={(e) => this.updateNewShelfName(e.target.value)}
              />
            <div
              className="add-shelf"
              onClick={this.handleAddShelf}/>
          </li>
        </ul>
      </div>
    );
  }
}

export default ShelfManager
