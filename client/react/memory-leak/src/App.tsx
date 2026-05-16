import { useState, useEffect, useRef } from "react";

function LeakyComponent() {
  // Используем объект, чтобы V8 было сложнее оптимизировать
  const [heavyData] = useState({
    labels: new Array(1000000).fill('Leak!'),
    timestamp: Date.now()
  });
  
  const divRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // ВАЖНО: Обращаемся к heavyData внутри функции. 
      // Теперь V8 ОБЯЗАН сохранить этот объект в замыкании.  
      console.log('Утечка в деле:', heavyData.labels[0]);
      console.log('Элемент:', divRef.current);
    };

    window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, [heavyData]); 
  return <div ref={divRef}>Я — компонент с тяжелым замыканием</div>;
}

function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: "50px" }}>
      <h1>Memory Leak Demo</h1>
      <button onClick={() => setShow(!show)}>
        {show ? "Удалить компонент" : "Создать компонент"}
      </button>
      <hr />
      {show && <LeakyComponent />}
    </div>
  );
}

export default App;
