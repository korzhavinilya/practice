import './App.css';

const realUI = 'http://localhost:5173/';
const realAPI = 'http://localhost:3001';

function App() {
  async function fetchData() {
    const request = await fetch(realAPI, {
      method: 'GET'
    });
    const data = await request.json();
    console.log('data', data);
  }

  return (
    <>
      <h3>This App</h3>
      <div className="card">
        <button onClick={fetchData}>fetch data</button>
      </div>
      <h3>Iframe</h3>
      <iframe src={realUI} width={1000} height={500}></iframe>
    </>
  );
}

export default App;
