import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ShelfManager extends Component {
  render() {
    console.log(this.props)
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
              <div className="delete-shelf"/>
            </li>
          )}
          <li className="shelf-list-item">
            <input className="new-shelf-input"
              type="text"  placeholder="New shelf name"/>
            <div className="add-shelf"/>
          </li>
        </ul>
      </div>
    );
  }
}

export default ShelfManager
