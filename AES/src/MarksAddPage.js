import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MarksAdd() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        studentId: "",
        subjectId: "",
        subjectName: "",
        mark: "",
        grade: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:80/api/mark/lecturerMarkSave.php", inputs)
            .then(function (response) {
                console.log(response.data);
                navigate("/");
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Add Mark</h1>
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
                                    value={inputs.studentId}
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
                                    value={inputs.subjectId}
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
                                    value={inputs.subjectName}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Mark: </label>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    name="mark"
                                    value={inputs.mark}
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
                                    value={inputs.grade}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
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
