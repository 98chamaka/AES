import { useState, useEffect } from "react";
import axios from "axios";

export default function ResultViewPage() {
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


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map((mark, key) => (
                        <tr key={key}>
                            <td>{mark.subjectId}</td>
                            <td>{mark.subjectName}</td>
                            <td>{mark.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
