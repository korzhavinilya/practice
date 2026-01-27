import './App.css';
import axios from 'axios';

const url = 'http://localhost:3001';

function App() {
  async function fetchAxiosData() {
    const request = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'value'
      }
    });
    const data = request.data;
    console.log('data', data);
  }

  async function createAxiosData() {
    const request = await axios.post(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'value'
        }
      }
    );
    const data = request.data;
    console.log('data', data);
  }

  async function fetchData() {
    const request = await fetch(url, {
      method: 'GET'
    });
    const data = await request.json();
    console.log('data', data);
  }

  async function getCookie() {
    const request = await fetch(`${url}/cookie`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await request.json();
    console.log('data', data);
  }

  async function setCookie() {
    const request = await fetch(`${url}/cookie`, {
      method: 'POST',
      credentials: 'include'
    });
    const data = await request.json();
    console.log('data', data);
  }

  async function deleteCookie() {
    const request = await fetch(`${url}/cookie`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await request.json();
    console.log('data', data);
  }

  return (
    <>
      <div className="card">
        <button onClick={fetchAxiosData}>fetch axios data</button>
      </div>

      <div className="card">
        <button onClick={createAxiosData}>create axios data</button>
      </div>

      <div className="card">
        <button onClick={fetchData}>fetch data</button>
      </div>

      <div className="card">
        <button onClick={getCookie}>get cookie</button>
      </div>

      <div className="card">
        <button onClick={setCookie}>set cookie</button>
      </div>

      <div className="card">
        <button onClick={deleteCookie}>delete cookie</button>
      </div>
    </>
  );
}

export default App;
