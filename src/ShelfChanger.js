import React, { Component } from 'react'


class ShelfChanger extends Component {
  render() {
    return(
      <div className="book-shelf-changer">
        <select onChange={(e) => this.props.changeShelf(this.props.bookTitle, e.target.value)}>
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
