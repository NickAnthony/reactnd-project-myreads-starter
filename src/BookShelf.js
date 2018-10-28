import React, { Component } from 'react'
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
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.coverURL + '")' }}/>
                    <ShelfChanger changeShelf={this.props.changeShelf} bookTitle={book.title}/>
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

export default BookShelf
