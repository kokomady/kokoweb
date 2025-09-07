import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListOfStudentsComponent from './components/ListOfStudentsComponent';
import AddStudentComponent from './components/AddStudentComponent';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import HomePage from './components/HomePage';
import ContactUsPage from './components/ContactUsPage';
import AdminPage from './components/AdminPage';
import GmailStyleInbox from './components/GmailStyleInbox';

function getAccessToken() {
  const match = document.cookie.match(/(^| )accessToken=([^;]+)/);
  return match ? match[2] : null;
}

// Private route wrapper
function PrivateRoute({ element }) {
  return getAccessToken() ? element : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <HeaderComponent className="header-fixed" />
      <div className="container-main">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />

          {/* Protected routes */}
          <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
          <Route path="/contact" element={<PrivateRoute element={<ContactUsPage />} />} />
          <Route path="/student" element={<PrivateRoute element={<ListOfStudentsComponent />} />} />
          <Route path="/addemployee" element={<PrivateRoute element={<AddStudentComponent />} />} />
          <Route path="/gmail" element={<PrivateRoute element={<GmailStyleInbox />} />} />

          {/* Catch-all: redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <div className="footer-div">
          <FooterComponent />
        </div>
      </div>
    </Router>
  );
}

export default App;
