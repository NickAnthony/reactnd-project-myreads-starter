import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ShelfChanger from './ShelfChanger'

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
    showResults: false,
    showRecommended: false
  }

  hanldeUpdateQuery = (new_query) => {
    this.setState({
      query: new_query
    })
    if (new_query.length >= 3) {
      BooksAPI.search(new_query).then(
        response => {
          if (response.error) {
            this.setState({
              searchResults: [],
              showResults: false,
              showRecommended: false
            })
          } else {
            this.setState({
              searchResults: response,
              showResults: true,
              showRecommended: false
            })
          }
        }
      );
    }
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      BooksAPI.search(this.state.query).then(
        response => {
          if (response.error) {
            this.setState({
              searchResults: [],
              showResults: false,
              showRecommended: false
            })
          } else {
            this.setState({
              searchResults: response,
              showResults: true,
              showRecommended: false
            })
          }
        }
      );
    }
  }
  generateRecBooks = () => {
    if (this.state.query !== '' || this.props.books.length === 0) {
      return
    }
    var bookList = this.props.books.slice()
    console.log("bookList: ", bookList)
    // const recommendedResults = []
    var tries = 0
    while (tries < 5) {
      const randBookIndex = Math.floor(Math.random()*(bookList.length-1))
      BooksAPI.search(bookList[randBookIndex].title).then(res => {
        console.log("res :", res)
        console.log("searchResults: ", this.state.searchResults)
        if (res.length > 0 && this.state.searchResults.length === 0) {
          console.log("Set state!")
          this.setState({
            searchResults: res,
            showResults: true,
            showRecommended: true
          })

        }
      });
      tries++
    }
  }

  getThumbnail = (book) => {
    if (book.imageLinks && book.imageLinks.thumbnail) {
      return book.imageLinks.thumbnail
    } else {
      return ""
    }
  }

  componentDidMount() {
    this.generateRecBooks()
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
              onChange={(e) => this.hanldeUpdateQuery(e.target.value)}
              onKeyPress={this.handleKeyPress}/>
          </div>
        </div>
        <div className="search-books-results">
          { (this.state.showRecommended) && <div className='recommended-text'> "Have you considered..." </div> }
          <ol className="books-grid">
            { !(this.state.showResults) && <div> {"\"" + this.state.query + "\" returned no results." } </div> }
            { this.state.showResults && this.state.searchResults.map((book, index) =>
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + this.getThumbnail(book) + '")' }}/>
                    <ShelfChanger
                      changeShelf={this.props.changeShelf}
                      book={book}
                      shelves={this.props.shelves}/>
                  </div>
                  <div className="book-title">{book.title}</div>
                  { book.authors && book.authors.map((author) =>
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

SearchBooks.propTypes = {
  changeShelf: PropTypes.func.isRequired
};

export default SearchBooks
