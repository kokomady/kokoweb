import React, { useState } from "react";
import StudentsService from "../services/StudentService";

const UpdateStudentComponent = () => {
  const [id, setId] = useState('');
  const [std, setStd] = useState('');
  const [section, setSection] = useState('');
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmailId] = useState('');

  const saveStudent = (e) => {
    e.preventDefault();

    const studentData = {
      id: id ? parseInt(id) : null,
      std: std ? parseInt(std) : null,
      section: section || null,
      name,
      fatherName,
      contactNumber: contactNumber ? parseInt(contactNumber) : null,
      isActive: 1,
      email,
      bookId: null,
    };

    console.log("Submitting Student Data:", studentData);

    StudentsService.addStudent(studentData)
      .then((response) => {
        console.log("Student added successfully:", response.data);
        alert("Student added successfully!");
      })
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card col-md-6">
          <h2 className="text-center mt-3">Add Student</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-3">
                <label className="form-label">Roll No</label>
                <input
                  type="text"
                  placeholder="Enter Roll No"
                  className="form-control"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Father's Name</label>
                <input
                  type="text"
                  placeholder="Enter Father's Name"
                  className="form-control"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Class</label>
                <input
                  type="text"
                  placeholder="Enter Class"
                  className="form-control"
                  value={std}
                  onChange={(e) => setStd(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Section</label>
                <input
                  type="text"
                  placeholder="Enter Section"
                  className="form-control"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Contact No</label>
                <input
                  type="text"
                  placeholder="Enter Contact Number"
                  className="form-control"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>

              <button
                className="btn btn-success w-100"
                onClick={saveStudent}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentComponent;
