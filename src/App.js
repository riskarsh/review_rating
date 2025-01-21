import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./app/component/auth/UserSignup";
import Login from "./app/component/auth/UserLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companylist from "./app/component/company/CompanyList";
import CreateCompany from "./app/component/company/CreateCompany";
import CompanyDetails from "./app/component/company/CompanyDetails";
import CompanyReview from "./app/component/review/CompanyReview";
import Protected from "./app/component/Protected";
import ResetPassword from "./app/component/auth/ResetPassword";
import ResetPasswordEmail from "./app/component/auth/ResetPasswordEmail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/companylist" element={<Companylist />} />
          <Route
            path="/createcompany"
            element={<Protected Component={CreateCompany} />}
          />
          <Route path="/companydetails/:id" element={<CompanyDetails />} />
          <Route path="/companyreviews/:id" element={<CompanyReview />} />
          <Route path="/protected" element={<Protected />} />
          <Route
            path="/user/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/resetpasswordemail" element={<ResetPasswordEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
