import React, { Component } from 'react'
import { update } from './BooksAPI'

class ShelfChanger extends Component {
  handleUpdateShelf = (new_shelf) => {
    update(this.props.book, new_shelf).then(res => {
        console.log(res)
      }
    )
  }
  render() {
    return(
      <div className="book-shelf-changer">
        <select onChange={(e) => this.handleUpdateShelf(e.target.value)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChanger
