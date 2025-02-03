
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';


//hooks
import {useState, useEffect} from  'react';
import { useAuthentication } from './hooks/useAuthentication';

//contexts
import { AuthProvider } from './context/AuthContext';


//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Search from './pages/Search/Search';
import BookReview from './pages/BookReview/BookReview';
import EditPost from "./pages/EditPost/EditPost";

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';




function App() {

  const [user, setUser] = useState("NO_USER");
  const {auth} = useAuthentication();
  
  //loading a user
  const loadingUser = user =="NO_USER";

  //given an user 
  useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        setUser(user)
        console.log("ON AUTH USER",user)
      })
  },[auth]) //if auth is altered, the useeffect is called

  if (loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar/>  
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/vite_react_bookBlog/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/posts/:id" element={<BookReview/>}/>
              {/*Lógica para bloquear acessos via url*/}
              <Route 
                path="/login" 
                element={!user ? <Login/>:  <Navigate to ="/"/>}/>

              <Route 
                path="/register" 
                element={!user ? <Register/>: <Navigate to ="/"/> }/>

              <Route 
                path="/posts/create" 
                element={user ? <CreatePost/>:  <Navigate to ="/"/>}/>

              <Route 
                path="/dashboard" 
                element={user ? <Dashboard/>: <Navigate to ="/"/>}/>

              <Route 
                path="/logout" 
                element={user ? <Dashboard/>: <Navigate to ="/"/>}/>
              <Route 
                path="/posts/edit/:id" 
                element={user ? <EditPost/>: <Navigate to ="/"/>}/>
            </Routes>
            </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>

  )
}

export default App;
