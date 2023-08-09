import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Signup from './Signup';
import Signup from './app/component/auth/UserSignup';
import Login from './app/component/auth/UserLogin';
import {BrowserRouter, Routes, Route,} from 'react-router-dom'



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path ='/login' element = {<Login/> }>
            <Route path ='back' elment={<Signup/>} />
          </Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;