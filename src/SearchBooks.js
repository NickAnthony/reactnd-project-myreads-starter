import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get, getAll, update, search } from './BooksAPI'
import ShelfChanger from './ShelfChanger'

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (new_query) => {
    this.setState({
      query: new_query
    })
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(this.state.query).then(
        response => {
          console.log(response)
          this.setState({
            searchResults: response
          })
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
              onKeyPress={this.handleKeyPress}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.searchResults.map((book, index) =>
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
