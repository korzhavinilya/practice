/**
 * Server Side Rendering (Dynamic Rendering)
 * Данные запрашиваются при каждом визите.
 */
export default async function SSRPage() {
  // { cache: 'no-store' } — заставляет Next делать запрос каждый раз
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store'
  });
  const data = await res.json();

  return (
    <div>
      <h1>SSR Page (Dynamic)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
