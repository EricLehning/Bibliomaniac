import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const BookForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [book, update] = useState({
        author: "",
        title: "",
        lengthId: 0,
        genreId: 0,
        canonId:0

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    const localBiblioUser = localStorage.getItem("biblio_user")
    const biblioUserObject = JSON.parse(localBiblioUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const bookToSendToApi = {
            userId: biblioUserObject.id,
            author: book.author,
            title: book.title,
            lengthId: book.lengthId,
            genreId: book.genreId,
            canonId: book.canonId
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/books")
            })
    }

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

    const [canons, updateCanons] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/canons`)
        .then(response => response.json())
        .then((canonsArray) => {
            updateCanons(canonsArray)
        })
    },
    [])

    return (
        <form className="bookForm">
            <h2 className="bookForm__title">New Book</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Author's name"
                        value={book.author}
                        onChange={
                            (evt) => {
                                const copy = {...book}
                                copy.author = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Book title"
                        value={book.title}
                        onChange={
                            (evt) => {
                                const copy = {...book}
                                copy.title = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div classname="form-group">
                    <label htmlFor="length">Length:</label>
                        <select
                            className="lengthChoice"
                            onChange={
                                (evt) => {
                                    const copy = {...book}
                                    copy.lengthId = parseInt(evt.target.value)
                                    update(copy)
                                }}>
                            <option value="" >Choose a Page Count</option>
                            {lengths.map((length) => {
                                return <option value={length.id}>{length.pageRange}</option>
                            })}
                            
                        </select>
                 </div>
            </fieldset>
            <fieldset>
                <div classname="form-group">
                    <label htmlFor="genre">Genre:</label>
                        <select
                            className="genreChoice"
                            onChange={
                                (evt) => {
                                    const copy = {...book}
                                    copy.genreId = parseInt(evt.target.value)
                                    update(copy)
                                }}>
                            <option value="" >Choose a Genre</option>
                            {genres.map((genre) => {
                                return <option value={genre.id}>{genre.category}</option>
                            })}
                            
                        </select>
                 </div>
            </fieldset>
            <fieldset>
                <div classname="form-group">
                    <label htmlFor="canon">Canonical Age:</label>
                        <select
                            className="canonChoice"
                            onChange={
                                (evt) => {
                                    const copy = {...book}
                                    copy.canonId = parseInt(evt.target.value)
                                    update(copy)
                                }}>
                            <option value="" >Choose a Canonical Age</option>
                            {canons.map((canon) => {
                                return <option value={canon.id}>{canon.age}</option>
                            })}
                            
                        </select>
                 </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Book
            </button>
        </form>
        
    )
}