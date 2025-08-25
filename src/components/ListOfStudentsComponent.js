import React, { useState, useEffect } from "react";
import StudentService from "../services/StudentService";

const ListOfStudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    StudentService.getAllStudents()
      .then((response) => setStudents(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleEditClick = (student) => {
    setEditRowId(student.id);
    setEditFormData({ ...student });
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    StudentService.updateStudent(editRowId, editFormData)
      .then(() => {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === editRowId ? editFormData : student
          )
        );
        setEditRowId(null);
      })
      .catch((error) => console.log("Error updating student:", error));
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      StudentService.deleteStudent(id)
        .then(() => {
          setStudents(students.filter((student) => student.id !== id));
        })
        .catch((error) => console.log("Error deleting student:", error));
    }
  };

  return (
    <div className="container mt-5" style={{marginTop: '90px'}}>
      <h2 className="text-center text-primary">List of Students</h2>
      <div className="row mb-3 justify-content-end">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, class, roll no, father name, contact, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card shadow-lg border-0" style={{background: 'linear-gradient(180deg, #e3f2fd 0%, #90caf9 100%)', borderRadius: '16px'}}>
        <div className="card-header text-white" style={{background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}>
          <h4 className="mb-0">Student Table</h4>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-bordered mb-0" style={{borderRadius: '16px', overflow: 'hidden'}}>
              <thead style={{background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)', color: '#fff'}}>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Father Name</th>
                  <th>Contact No</th>
                  <th>Email ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.filter(student => {
                  const q = search.toLowerCase();
                  return (
                    student.name?.toLowerCase().includes(q) ||
                    student.className?.toLowerCase().includes(q) ||
                    student.rollNo?.toLowerCase().includes(q) ||
                    student.fatherName?.toLowerCase().includes(q) ||
                    student.contactNo?.toLowerCase().includes(q) ||
                    student.emailId?.toLowerCase().includes(q)
                  );
                }).length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.filter(student => {
                    const q = search.toLowerCase();
                    return (
                      student.name?.toLowerCase().includes(q) ||
                      student.className?.toLowerCase().includes(q) ||
                      student.rollNo?.toLowerCase().includes(q) ||
                      student.fatherName?.toLowerCase().includes(q) ||
                      student.contactNo?.toLowerCase().includes(q) ||
                      student.emailId?.toLowerCase().includes(q)
                    );
                  }).map((student) => (
                    <tr key={student.id}>
                      <td>
                        {editRowId === student.id ? (
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={editFormData.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          student.name
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <input
                            type="text"
                            className="form-control"
                            name="className"
                            value={editFormData.className}
                            onChange={handleInputChange}
                          />
                        ) : (
                          student.className
                        )}
                      </td>
                      <td>{student.rollNo}</td>
                      <td>
                        {editRowId === student.id ? (
                          <input
                            type="text"
                            className="form-control"
                            name="fatherName"
                            value={editFormData.fatherName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          student.fatherName
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <input
                            type="text"
                            className="form-control"
                            name="contactNo"
                            value={editFormData.contactNo}
                            onChange={handleInputChange}
                          />
                        ) : (
                          student.contactNo
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <input
                            type="email"
                            className="form-control"
                            name="emailId"
                            value={editFormData.emailId}
                            onChange={handleInputChange}
                          />
                        ) : (
                          student.emailId
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={handleSaveClick}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={handleCancelClick}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEditClick(student)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteStudent(student.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfStudentsComponent;
