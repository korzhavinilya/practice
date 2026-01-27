import Comments from './components/Comments/Comments';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Comment from './components/Comment/Comment';

function App() {
  return (
    <BrowserRouter>
      <Link to="/comments">Comments</Link>
      <Routes>
        <Route path="/comments" element={<Comments />} />
        <Route path="/comments/:id" element={<Comment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
