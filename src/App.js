import Layout from "./components/Layout";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import { UserContextProvider } from './UserContext';
import NewArticle from './components/NewArticle';
import ViewArticle from './components/ViewArticle';
import EditArticle from './components/EditArticle';
import PageNotFound from './components/PageNotFound';
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>} ></Route>
          <Route path='/newarticle' element={<NewArticle/>}></Route>
          <Route path='/article/:id' element={<ViewArticle/>}></Route>
          <Route path='/edit/:id' element={<EditArticle/>}></Route>
          <Route path='/viewprofile/:id' element={<ViewProfile/>}></Route>
          <Route path='/editprofile/:id' element={<EditProfile/>}></Route>
          <Route path="*" element={<PageNotFound/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;