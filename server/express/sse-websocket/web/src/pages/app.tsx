import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LongPolling from './long-polling';
import ServerSentEvent from './sse';
import Websocket from './websocket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lp" element={<LongPolling />} />
        <Route path="/sse" element={<ServerSentEvent />} />
        <Route path="/ws" element={<Websocket />} />
        {/* <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
