/**
 * Streaming
 * Данные загружаются постепенно, а не одновременно.
 */
import { Suspense } from 'react';

/**
 * Гипотетическая функция запроса к БД
 */
async function getSlowDataFromDb() {
  // await db.query('SELECT * FROM users'); 
  await new Promise((res) => setTimeout(res, 3000)); // Имитация долгого запроса
  return { message: "Данные из БД получены!" };
}

async function SlowComponent() {
  const data = await getSlowDataFromDb();
  return <div className="p-4 bg-green-100">{data.message}</div>;
}

export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Эта часть страницы загрузится мгновенно.</p>
      
      {/* Стриминг: пока SlowComponent грузится, юзер видит fallback */}
      <Suspense fallback={<p>Загрузка данных из БД...</p>}>
        <SlowComponent />
      </Suspense>
    </main>
  );
}