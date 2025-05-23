import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup  from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import NewBlog from './pages/NewBlog'


function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin'element={<Signin/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/publish' element={<NewBlog/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
