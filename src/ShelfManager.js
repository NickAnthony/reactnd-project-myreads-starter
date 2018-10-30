import React, { Component } from 'react'


class ShelfManager extends Component {
  render() {
    return(
      <div>
        <Link to='/' className="close-search"/>
        <ul style="list-style-type:none">
          <li>
            <h2>Want to Read</h2>
            <div className="delete-shelf"/>
          </li>
          <li>
            <div className="add-shelf"/>
            <Input />
          </li>
        </ul>
      </div>
    );
  }
}

export default ShelfManager
