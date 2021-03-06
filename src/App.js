import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import ShelfManager from './ShelfManager'
import './App.css'

/* BooksApp: Base App Component that handles home page and routing
*/
class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    shelves: [
      { id: "currentlyReading", title: "Currently Reading" },
      { id: "wantToRead", title: "Want to Read" },
      { id: "read", title: "Read" }
    ]
  }

  handleDeleteShelf = (shelfToDelete) => {
    this.setState((prevState) => ({
      shelves: prevState.shelves.filter(
        (shelf) => { return (shelf.id !== shelfToDelete.id) }
      )
    }));
  }

  handleAddShelf = (newShelf) => {
    // Check if shelf already exists
    if (this.state.shelves.filter((shelf) => (shelf.id === newShelf.id)) > 0) {
      return
    }
    if ((!newShelf.id) || (!newShelf.title)) {
      return
    }
    var updatedShelfList = this.state.shelves.slice()
    updatedShelfList.push(newShelf)
    this.setState({
      shelves: updatedShelfList
    })
  }

  // Change the shelf of the current book
  handleChangeShelf = (changedBook, newShelf) => {
    // The local book ref we've retrieved does not have the shelf update
    changedBook.shelf = newShelf
    var exists = false
    const updatedBookList = this.state.books.map((book) => {
      if (changedBook.id === book.id) {
        // Book exists in state - replace it
        exists = true
        return changedBook
      }
      return(book)
    })
    // If book does not exist in state, add it to state
    if (!exists) {
      updatedBookList.push(changedBook)
    }
    this.setState({
      books: updatedBookList
    })
  }

  componentDidMount() {
    // Get book list from server
    BooksAPI.getAll().then(bookList => {
      this.setState({
        books: bookList
      })
      for (var index in bookList) {
        this.handleAddShelf(bookList[index].shelf)
      }
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
                { this.state.shelves.map((bookShelf) =>
                  <BookShelf key={bookShelf.id}
                    title={bookShelf.title}
                    books={this.state.books.filter((book) => (book.shelf === bookShelf.id))}
                    changeShelf={this.handleChangeShelf}
                    shelves={this.state.shelves}
                  />
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'/>
            </div>
            <div className="open-manage-shelves">
              <Link to='/manageshelves'
                className="link"
                style={{textDecoration: "none"}}>
                  Manage Shelves
              </Link>
            </div>
          </div>
        )}/>

        <Route exact path='/search' render={()=>(
          <SearchBooks
            changeShelf={this.handleChangeShelf}
            books={this.state.books}
            shelves={this.state.shelves}/>
        )}/>

        <Route exact path='/manageshelves' render={()=>(
          <ShelfManager
            shelves={this.state.shelves}
            addShelf={this.handleAddShelf}
            deleteShelf={this.handleDeleteShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
