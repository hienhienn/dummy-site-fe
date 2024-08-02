import { Routes, Route } from 'react-router-dom'
import Login from "./Login/Login";
import { Toaster } from "react-hot-toast";
import Home from "./Home/Home";

export default function App() {
  return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
			</Routes>
			<Toaster />
		</>
  )
}

