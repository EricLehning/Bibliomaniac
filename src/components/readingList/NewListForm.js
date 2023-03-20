import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewListForm = () => {

    const [search, update] = useState({
        lengthId: 0,
        genreId: 0

    })

    const [books, setBooks] = useState([])
    const [filteredBooks, setFiltered] = useState([])
    const [matchedBooks, setMatched] = useState([])
    const navigate = useNavigate()

    const localBiblioUser = localStorage.getItem("biblio_user")
    const biblioUserObject = JSON.parse(localBiblioUser)

    useEffect(() => {
        fetch(`http://localhost:8088/books?_expand=length&_expand=genre`)
                .then(response => response.json())
                .then((bookArray) => {
                    setBooks(bookArray)
    })
    },
    [])
  
    
    useEffect(
        () => { 
                const myBooks = books.filter(book => book.userId === biblioUserObject.id)
                setFiltered(myBooks)
            },
        [books]
    )

    const [lengths, updateLengths] = useState([])

        useEffect(() => {
            fetch(`http://localhost:8088/lengths`)
            .then(response => response.json())
            .then((lengthsArray) => {
                updateLengths(lengthsArray)
            })
        },
        [])

    const [genres, updateGenres] = useState([])

        useEffect(() => {
            fetch(`http://localhost:8088/genres`)
            .then(response => response.json())
            .then((genresArray) => {
                updateGenres(genresArray)
            })
        },
        [])

    const showListButton = (search) => {
        
        return <button onClick={(event) => {
            event.preventDefault()
            const searchedBooks = filteredBooks.filter(book => {
                return book.lengthId === search.lengthId && book.genreId === search.genreId
            })
            setMatched(searchedBooks)
            }} className="show_list">Show List</button>
            
    }


    return (
        <form className="newListForm">
        <h2 className="newListForm__title">New List Form</h2>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="length">Length:</label>
                        <select
                            className="lengthChoice"
                            onChange={
                                (evt) => {
                                    const copy = {...search}
                                    copy.lengthId = parseInt(evt.target.value)
                                    update(copy)
                                }}>
                            <option value="" >Choose a Page Count</option>
                            {lengths.map((length) => {
                                return <option key={length.id} value={length.id}>{length.pageRange}</option>
                            })}
                            
                        </select>
                 </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                        <select
                            className="genreChoice"
                            onChange={
                                (evt) => {
                                    const copy = {...search}
                                    copy.genreId = parseInt(evt.target.value)
                                    update(copy)
                                }}>
                            <option value="" >Choose a Genre</option>
                            {genres.map((genre) => {
                                return <option key={genre.id} value={genre.id}>{genre.category}</option>
                            })}
                            
                        </select>
                 </div>
            </fieldset>
            {showListButton(search)}
            <article className="books">
            {
                matchedBooks.map(
                    (book) => {
                        return <div key={book.id}>
                        
                        <section className="book">
                       <header className="book_header">
                        {book.title}
                        </header> 
                        <section>Author: {book.author}</section>
                        <section>Length: {book?.length?.pageRange} pages</section>
                        <section>Genre: {book?.genre?.category}</section>
                    
                    </section>
                        
                        
                        </div>
                    }
                )
            }
        </article>
        </form>
        
    )

}