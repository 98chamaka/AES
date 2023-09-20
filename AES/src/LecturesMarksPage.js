import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MarkPage() {
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        getMarks();
    }, []);

    function getMarks() {
        axios.get('http://localhost:80/api/mark/').then(function(response) {
            console.log(response.data);
            setMarks(response.data);
            
        });
    }

    const deleteMark = (id) => {
        axios.delete(`http://localhost:80/api/mark/${id}`).then(function(response){
            console.log(response.data);
            getMarks();
            
        });
    }

    return (
        <div>
            <Link to={"MarksAddPage"}><button>Insert</button></Link>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Mark</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map((mark, key) => (
                        <tr key={key}>
                            <td>{mark.studentId}</td>
                            <td>{mark.subjectId}</td>
                            <td>{mark.subjectName}</td>
                            <td>{mark.mark}</td>
                            <td>{mark.grade}</td>
                            <td>
                            <Link to={`mark/${mark._id.$oid}/MarkEditPage`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteMark(mark._id.$oid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
