import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

type Comment = {
  id: number;
  name: string;
  body: string;
};

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<Comment>({
    id: 0,
    name: '',
    body: '',
  });

  useEffect(() => {
    axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = () => {
    axios.post<Comment>('https://jsonplaceholder.typicode.com/comments', newComment)
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment({
          id: 0,
          name: '',
          body: '',
        });
        console.log('Comment added:', response.data);
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  function handleDelete(id: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="App">
      <h1 className="app-header">API</h1>
      <div className="comment-form">
        <h2 className="form-header">Add Comment</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            value={newComment.name}
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Comment"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            className="input-field"
          />
          <button type="button" onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <h3 className="comment-title">{comment.name}</h3>
            <p className="comment-body">{comment.body}</p>
            <button
              type="button"
              onClick={() => handleDelete(comment.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
