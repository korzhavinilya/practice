/**
 * Incremental Static Regeneration (ISR)
 * Данные запрашиваются один раз и кешируются на этапе сборки, но обновляются через определенный интервал.
 */
export default async function ISRPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/3', {
      next: { revalidate: 60 } // Пересоберет страницу максимум раз в 60 секунд
    });
    const data = await res.json();
  
    return <div><h1>ISR Page: {data.title}</h1></div>;
  }