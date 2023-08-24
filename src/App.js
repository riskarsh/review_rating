import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Signup from './Signup';
import Signup from './app/component/auth/UserSignup';
import Login from './app/component/auth/UserLogin';
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Companylist from './app/component/company/CompanyList';
import CreateCompany from './app/component/company/CreateCompany';
import CompanyDetails from './app/component/company/CompanyDetails';
import CompanyReview from './app/component/review/CompanyReview'



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path ='/login' element = {<Login/> }>
            <Route path ='back' elment={<Signup/>} />
          </Route>
          <Route path ='/companylist' element = {<Companylist/> }/>
          
          <Route path ='/createcompany' element = {<CreateCompany/> }/>
          <Route path ='/companydetails/:id' element = {<CompanyDetails/> }/>
          <Route path ='/companyreviews/:id' element = {<CompanyReview/> }/>

        
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;