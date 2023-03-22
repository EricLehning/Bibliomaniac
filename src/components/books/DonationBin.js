import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Books.css"

export const DonationBin = () => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFiltered] = useState([])
    const navigate = useNavigate()

    const localBiblioUser = localStorage.getItem("biblio_user")
    const biblioUserObject = JSON.parse(localBiblioUser)

    useEffect(() => {
        fetch(`http://localhost:8088/donations?_expand=length&_expand=genre&_expand=canon`)
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

    const deleteButton = (book) => {
        
            return <button onClick={() => {

                fetch(`http://localhost:8088/donations/${book.id}`, {
                    method: "DELETE"
                })
                    .then(response => response.json())
                    .then(fetch (`http://localhost:8088/donations?_expand=length&_expand=genre&_expand=canon`)
                    .then(response => response.json())
                    .then((bookArray) => {
                        setBooks(bookArray)
                        
                    }))
            }} className="book_delete">Delete</button>
        
    }

    const returnToShelfButton = (book) => {

        const bookToSendToApi = {
            userId: biblioUserObject.id,
            author: book.author,
            title: book.title,
            lengthId: book.lengthId,
            genreId: book.genreId,
            canonId: book.canonId
        }
        
            return <button onClick={() => {

                fetch(`http://localhost:8088/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookToSendToApi)
            })
                    .then(response => response.json())
                    .then(fetch(`http://localhost:8088/donations/${book.id}`, {
                        method: "DELETE"
                    }))
                    .then(response => response.json())
                    .then(fetch (`http://localhost:8088/donations?_expand=length&_expand=genre&_expand=canon`)
                    .then(response => response.json())
                    .then((bookArray) => {
                        setBooks(bookArray)
                        
                    }))
            }} className="book_return">Return To Shelf</button>
    }
        

    return <>
    
        <h2>List of Books to Donate</h2>

    

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
                        {deleteButton(book)} {returnToShelfButton(book)}
                    </section>
                         
                        
                )}
                    
                   
               

        </article>

    </>
}
