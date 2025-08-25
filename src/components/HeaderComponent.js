import React from 'react';
import logo192 from './resource/logo192.png';

function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/;';
}

const HeaderComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg px-3 fixed-top shadow" style={{background: 'linear-gradient(90deg, #bbdefb 0%, #e3f2fd 100%)'}}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/" style={{letterSpacing: '2px', color: '#1976d2'}}>
            <img
              src={logo192}
              alt="Koko Logo"
              width="40"
              height="40"
              className="d-inline-block align-top"
              style={{borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}}
            />
            <span className="fw-bold fs-3" style={{color: '#1976d2'}}>Koko</span>
            <span className="ms-3 fs-5" style={{color: '#1976d2', fontWeight: 500}}>Kendriya School Bhopal</span>
          </a>

          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto align-items-center gap-2" style={{color: '#212529'}}>
              <li className="nav-item">
                <a className="nav-link active px-3 rounded-pill" href="/" style={{transition: 'background 0.2s', color: '#212529'}}>
                  <i className="bi bi-house-door-fill me-1" style={{color: '#212529'}}></i> Home
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle px-3 rounded-pill"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{transition: 'background 0.2s', color: '#212529'}}
                >
                  <i className="bi bi-people-fill me-1" style={{color: '#212529'}}></i> Students
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/add-student" style={{color: '#212529'}}><i className="bi bi-person-plus me-1" style={{color: '#212529'}}></i> Add Student</a></li>
                  <li><a className="dropdown-item" href="/list-students" style={{color: '#212529'}}><i className="bi bi-list-ul me-1" style={{color: '#212529'}}></i> View Students</a></li>
                  <li><a className="dropdown-item" href="/student-report" style={{color: '#212529'}}><i className="bi bi-file-earmark-text me-1" style={{color: '#212529'}}></i> Student Report</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link px-3 rounded-pill" href="/contact" style={{transition: 'background 0.2s', color: '#212529'}}>
                  <i className="bi bi-envelope-fill me-1" style={{color: '#212529'}}></i> Contact
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary px-3 rounded-pill ms-2"
                  style={{color: '#1976d2', borderColor: '#1976d2', background: '#e3f2fd'}}
                  onClick={() => {
                    deleteCookie('accessToken');
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
