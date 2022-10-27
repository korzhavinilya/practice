import { Routes, Route } from 'react-router-dom';
import Character from './Character';
import Characters from './Characters';
import Search from './common/Search';
import User from './User';
import Users from './Users';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/ricknmorty" element={<Characters />} />
        <Route path="/ricknmorty/:id" element={<Character />} />
        <Route path="/ricknmorty/search" element={<Search />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/:name" element={<User />} />
      </Routes>
    </main>
  );
}

export default App;
