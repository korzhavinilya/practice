import './App.css';
import WindowScrollInfinite from './components/ContainerScrollInfinite';
import ObserverInfiniteScroll from './components/ObserverInfiniteScroll';
import PackageScrollComponent from './components/PackageScrollComponent';

function App() {
  return (
    <div className="app-container">
      {/* <WindowScrollInfinite /> */}
      {/* <ObserverInfiniteScroll /> */}
      <PackageScrollComponent />
    </div>
  );
}

export default App;
