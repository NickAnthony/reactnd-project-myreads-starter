import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

class BookShelf extends Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.map((book) =>
              <li key={book.title}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.thumbnail + '")' }}/>
                    <ShelfChanger changeShelf={this.props.changeShelf} book={book}/>
                  </div>
                  <div className="book-title">{book.title}</div>
                  { book.authors.map((author) =>
                    <div key={book + author} className="book-authors">{author}</div>
                  )}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelf
