import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListOfStudentsComponent from './components/ListOfStudentsComponent';
import AddStudentComponent from './components/AddStudentComponent';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';



function App() {
  return (
    <Router>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route exact path="/Student" element={<ListOfStudentsComponent />} />
          <Route path='/addemployee' element={<AddStudentComponent/>}/>
          <Route path='' element={<SignInComponent/>}/>
          <Route path='/signup' element={<SignUpComponent/>}/>
        </Routes>
      </div>
      <FooterComponent />
    </Router>
  );
}

export default App;
