import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ShelfManager extends Component {
  render() {
    return(
      <div>
        <Link to='/' className="close-search"/>
        <ul className="shelf-list">
          <li>
            <h2>Want to Read</h2>
            <div className="delete-shelf"/>
          </li>
          <li>
            <div className="add-shelf"/>
            <input type="text"  placeholder="New shelf name"/>
          </li>
        </ul>
      </div>
    );
  }
}

export default ShelfManager
