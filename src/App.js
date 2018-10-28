import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import { get, getAll } from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    bookShelfTitles: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read",
      none: ""
    }
  }

  // Change the shelf of the current book
  handleChangeShelf = (bookID, newShelf) => {
    const updatedBookList = this.state.books.map((book) => {
      if (bookID === book.id) {
        book.shelf = newShelf
      }
      return(book)
    })
    this.setState({
      books: updatedBookList
    })
  }

  componentDidMount() {
    getAll().then(bookList => {
      this.setState({
        books: bookList
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title={this.state.bookShelfTitles.currentlyReading}
                  books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))}
                  handleChangeShelf={this.handleChangeShelf}
                />
                <BookShelf title={this.state.bookShelfTitles.wantToRead}
                  books={this.state.books.filter((book) => (book.shelf === "wantToRead"))}
                  changeShelf={this.handleChangeShelf}
                />
                <BookShelf title={this.state.bookShelfTitles.read}
                  books={this.state.books.filter((book) => (book.shelf === "read"))}
                  changeShelf={this.handleChangeShelf}
                />

              </div>
            </div>
            <div className="open-search">
              <Link to='/search'/>
            </div>
          </div>
        )}/>

        <Route exact path='/search' render={()=>(
          <SearchBooks books={this.state.books} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
