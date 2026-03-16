import { BrowserRouter, Routes, Route } from 'react-router-dom';
import A from './pages/A';
import B from './pages/B';
import C from './pages/C';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<A />} />
          <Route path="/b" element={<B />} />
          <Route path="/c" element={<C />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
