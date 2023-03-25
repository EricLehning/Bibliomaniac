import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Books.css"

export const BookList = () => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFiltered] = useState([])
    const navigate = useNavigate()

    const localBiblioUser = localStorage.getItem("biblio_user")
    const biblioUserObject = JSON.parse(localBiblioUser)

    useEffect(() => {
        fetch(`http://localhost:8088/books?_expand=length&_expand=genre&_expand=canon`)
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

    const donateButton = (book) => {

        const bookToSendToApi = {
            userId: biblioUserObject.id,
            author: book.author,
            title: book.title,
            lengthId: book.lengthId,
            genreId: book.genreId,
            canonId: book.canonId
        }
        
            return <button onClick={() => {

                fetch(`http://localhost:8088/donations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookToSendToApi)
            })
                    .then(response => response.json())
                    .then(fetch(`http://localhost:8088/books/${book.id}`, {
                        method: "DELETE"
                    })
                    .then(response => response.json())
                    .then(fetch (`http://localhost:8088/books?_expand=length&_expand=genre&_expand=canon`)
                    .then(response => response.json())
                    .then((bookArray) => {
                        setBooks(bookArray)
                        
                    })))
            }} className="book_donate">Donate</button>
        
    }

    return <>
    
        <h2>List of Books</h2>

        <button onClick={() => navigate("/book/create")}>Add Book</button>

        <article className="books">
                {
                    filteredBooks.map((book) =>
                    <section key={book.id} className="book">
                       <header className="book_header">
                        {book.title}
                        </header> 
                        <section>Author: {book.author}</section>
                        <section>Length: {book?.length?.pageRange} pages</section>
                        <section>Genre: {book?.genre?.category}</section>
                        <section>Canonical Age: {book?.canon?.age}</section>
                        {donateButton(book)}
                    </section>
                         
                        
                )}
                    
                   
               

        </article>

    </>
}

