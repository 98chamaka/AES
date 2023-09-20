import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function MarkEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mark, setMark] = useState({
      _id: "",
      studentId: "",
      subjectId: "",
      subjectName: "",
      mark: "",
      grade: ""
  });

  useEffect(() => {
      getMark();
  }, []); // Include `id` as a dependency

  function getMark() {
    axios.get(`http://localhost:80/api/mark/${id}`).then(function(response) {
        console.log('API response:', response.data);
        const markToUpdate = response.data.find(mark => mark._id.$oid === id);
        setMark(markToUpdate);
    });
}



  const handleChange = (event) => {
      const { name, value } = event.target;
      setMark((prevMark) => ({
          ...prevMark,
          [name]: value
      }));
  };

  const handleSubmit = (event) => {
      event.preventDefault();

      const { _id, ...markToUpdate } = mark; // Exclude _id property

      axios.put(`http://localhost:80/api/mark/${mark._id.$oid}`, mark)
      .then(function(response) {
          console.log(response.data);
          navigate("/");
      });
      
  };

    return (
        <div>
            <h1>Edit Mark</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                        <th>
                                <label>Student ID: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="studentId"
                                    value={mark.studentId}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                        <th>
                                <label>Subject ID: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="subjectId"
                                    value={mark.subjectId}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                        <th>
                                <label>Subject Name: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={mark.subjectName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                        <tr>
                        <th>
                                <label>Mark: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="mark"
                                    value={mark.mark}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                        <th>
                                <label>Grade: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="grade"
                                    value={mark.grade}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                            <td colSpan="2" align="right">
                                <button type="submit">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
