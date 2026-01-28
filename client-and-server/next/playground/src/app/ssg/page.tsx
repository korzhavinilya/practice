/**
 * Static Site Generation (Static Generation)
 * Данные запрашиваются один раз и кешируются на этапе сборки.
 */
export default async function SSGPage() {
    // По умолчанию в Next.js fetch кеширует результат (force-cache)
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/2');
    const data = await res.json();
  
    return (
      <div>
        <h1>SSG Page (Static)</h1>
        <p>{data.title}</p>
      </div>
    );
  }