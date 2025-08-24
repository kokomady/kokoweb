import React, { useState, useEffect } from "react";
import StudentService from "../services/StudentService";

const ListOfStudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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
    <div className="container mt-5">
      <h2 className="text-center text-primary">List of Students</h2>

      <table className="table table-striped table-bordered shadow">
        <thead className="table-dark">
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
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student) => (
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
                      name="std"
                      value={editFormData.std}
                      onChange={handleInputChange}
                    />
                  ) : (
                    student.std
                  )}
                </td>
                <td>{student.id}</td>
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
                      name="contactNumber"
                      value={editFormData.contactNumber}
                      onChange={handleInputChange}
                    />
                  ) : (
                    student.contactNumber
                  )}
                </td>
                <td>
                  {editRowId === student.id ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    student.email
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
  );
};

export default ListOfStudentsComponent;
