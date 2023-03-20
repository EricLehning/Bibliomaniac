import { Outlet, Route, Routes } from "react-router-dom"
import { BookForm } from "../books/BookForm"
import { BookList } from "../books/BookList"
import { NewListForm } from "../readingList/NewListForm"



export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1 className="title--main">Bibliomaniac</h1>
					<div>So much to read... So little time</div>
					<Outlet/>
				</>
			}>
		
				<Route path="books" element={ <BookList /> } />
				<Route path="book/create" element={ <BookForm/> } />
				<Route path="newReadingList" element={ <NewListForm/> } />
			</Route>
		</Routes>
	)
}

