import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Comments</h1>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="comment">{comment.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
