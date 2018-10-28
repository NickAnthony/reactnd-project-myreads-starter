import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, getAll, update, search } from './BooksAPI'
import ShelfChanger from './ShelfChanger'

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
    showResults: false
  }

  updateQuery = (new_query) => {
    this.setState({
      query: new_query
    })
    if (new_query.length >= 3) {
      search(new_query).then(
        response => {
          if (response.error) {
            this.setState({
              searchResults: [],
              showResults: false
            })
          } else {
            this.setState({
              searchResults: response,
              showResults: true
            })
          }
        }
      );
    }
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(this.state.query).then(
        response => {
          if (response.error) {
            this.setState({
              searchResults: [],
              showResults: false
            })
          } else {
            this.setState({
              searchResults: response,
              showResults: true
            })
          }
        }
      );
    }
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search"/>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
              onKeyPress={this.handleKeyPress}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { !(this.state.showResults) && <div> No Results </div> }
            { this.state.showResults && this.state.searchResults.map((book, index) =>
              <li key={index}>
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

export default SearchBooks
