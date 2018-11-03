import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { update } from './BooksAPI'

class ShelfChanger extends Component {
  handleUpdateShelf = (newShelf) => {
    update(this.props.book, newShelf)
    this.props.changeShelf(this.props.book, newShelf)
  }
  handleSelectValue = () => {
    if (this.props.book.shelf) {
      return (this.props.book.shelf)
    } else {
      return ("none")
    }
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select
          value={this.handleSelectValue()}
          onChange={(e) => this.handleUpdateShelf(e.target.value)}>
          <option value="move" disabled>Move to...</option>
          { this.props.shelves.map((shelf) =>
            <option
              key={shelf.id}
              value={shelf.id}>
              {shelf.title}
            </option>
          )}
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
};

export default ShelfChanger
