# «мини-курс» по современному стеку: React + TypeScript + RTK

### 0. Как разделять store на модули

Store состоит из:

- state
- actions
- reducer
- selectors

Как разделять не нужно:

**high coupling**, слишком много связей между модулями

- store/
  -  store.ts
  -  types.ts
  -  reducers/
     -  users.ts
     -  counters.ts
  - actions.ts
  - selectors.ts

**low cohesion**, много actions которые вообще не связаны

- actions.ts
  -  createUser()
  -  updateUser()
  -  incrementCounter()
  -  decrementCounter()
  
Нужно пользоваться принципами Low coupling, high cohesion.

High cohesion and low coupling is a design principle in software engineering where modules are focused on a single purpose (high cohesion) and are independent of each other (low coupling). 

Меньше связей между модулями и реализация одной конкретной функциональности.

При уменьшении low coupling, автоматически уменьшается и high cohesion. В приложении где нету связей, всё является одним огромным модулем. Нужно искать баланс.

Как правильно? Разделять на slice. Между users и counters мало связей, но внутри они плотно взаимодействуют.

- store/
  - users.slice.ts
  - counters.slice.ts

Допускается разделять slice на файлы actions.ts, selectors.ts и тд.

Но в итоге приходим к тому

- store/
  - users.slice.ts
  - counters.slice.ts
- components/
  - users-list.tsx
  - counters.tsx

что между store и components, связей много, а внутри модулей store и components связей мало.

Можно улучшить:
  
- users/
  - users.slice.ts
  - users-list.tsx
- counters/
  - counters.slice.ts
  - counters.tsx

### 1. Slice (Слайс) vs Старый подход

Раньше: Ты создавал три файла: constants.js, actions.js, reducer.js. В редьюсере писал огромный switch, а состояние обновлял через ...state (spread operator), боясь случайно мутировать объект.

Сейчас (Slice): createSlice объединяет логику.

Immer.js внутри: Ты пишешь код так, будто мутируешь состояние (state.value = 1). RTK под капотом делает это иммутабельным.

Авто-экшены: Имя редьюсера становится типом экшена. Не нужно писать креаторы вручную.

```
// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Мутируем "напрямую" — спасибо Immer
      state.value += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Экшены генерируются автоматически
export const { increment, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### 2. Асинхронность: createAsyncThunk

Для сайд-эффектов (API) используем санки.

Раньше: Руками писали thunk-функцию, диспатчили START, SUCCESS, FAIL. Сейчас: createAsyncThunk генерирует эти 3 состояния (pending, fulfilled, rejected) автоматически.

```
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

// 1. Создаем санк
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount', // префикс типа экшена
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data; // Это попадет в action.payload
  }
);

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  // 2. Обрабатываем жизненный цикл санка
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});
```

#### 2.1 Не обрабатывать всё подряд

Ты не обязан обрабатывать все три состояния.

Если тебе не нужен спиннер загрузки для конкретного действия — не пиши pending.

Если ошибку ты показываешь через глобальные всплывашки (toasts) — не пиши rejected в слайсе (об этом ниже).

Часто нужен только fulfilled, чтобы сохранить данные.

#### 2.2 Использовать addMatcher (Best Practice)

Это самый мощный инструмент для сокращения кода. В extraReducers есть метод addMatcher, который работает как «фильтр». Ты можешь сказать: «Если летит ЛЮБОЙ экшен со статусом PENDING, сделай state.isLoading = true».

Это позволяет схлопнуть логику загрузки и обработки ошибок для 20 санков в один блок кода.

```
import { createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';

// Допустим, у нас есть Generic State для всех слайсов
interface GenericState {
  items: any[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: GenericState = {
  items: [],
  status: 'idle',
  error: null,
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 1. Сначала обрабатываем СПЕЦИФИЧНЫЕ кейсы (если нужны)
      .addCase(fetchSpecificData.fulfilled, (state, action) => {
         // Логика, уникальная только для этого санка
         state.items = action.payload;
      })

      // 2. В конце ставим ОБЩИЕ обработчики через addMatcher
      // isPending — это встроенная функция RTK, возвращает true для любых thunk-pending
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // isRejected — ловит любые ошибки санк
      .addMatcher(isRejected, (state, action) => {
        state.status = 'failed';
        // action.error содержит сообщение об ошибке
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
```

#### 2.3 Как сделать матчер более точным?

Функция isPending из примера выше будет срабатывать на вообще любые санки в приложении (если ты используешь этот слайс как корневой или комбинируешь их хитро). Но чаще всего мы хотим ловить pending только текущего слайса.

Можно написать свой предикат (функцию-фильтр):
```
import { AnyAction } from '@reduxjs/toolkit';

// Функция вернет true, только если тип экшена заканчивается на '/pending'
// И начинается с имени нашего слайса 'users'
function isUsersPending(action: AnyAction) {
  return action.type.startsWith('users/') && action.type.endsWith('/pending');
}

// В слайсе:
builder.addMatcher(isUsersPending, (state) => {
  state.status = 'loading';
})
```

#### 2.4 А если это просто CRUD... (RTK Query)

Если у тебя 20 санков, которые просто делают GET/POST/PUT и кладут данные в стейт — тебе вообще не нужны extraReducers.

Переход на RTK Query удалит 100% этого кода.

isLoading / isFetching даются из коробки в хуке.

error дается из коробки.

data дается из коробки.

Вам не нужно вручную переключать флажки true/false в редьюсерах.

#### 2.5 Для каких кейсов нужны санки если есть rtk query?

Если RTK Query — это специализированный инструмент для синхронизации данных с сервером (Data Fetching & Caching), то Async Thunks — это инструмент для произвольной асинхронной логики.

Вот основные кейсы, когда тебе нужны именно Санки, а не RTK Query:

-   Сложная бизнес-логика "Orchestration".
    Иногда одно действие пользователя должно вызывать цепочку событий, которая затрагивает разные части стора и разные API.

    Пример: Пользователь нажимает "Оформить заказ".

    Нужно проверить валидность корзины (локально).

    Отправить запрос на оплату (Stripe/PayPal).

    В случае успеха — очистить корзину (локальный слайс).

    Отправить запрос на создание заказа на бэкенде.

    Показать глобальный тост успеха.

    Сделать редирект.

    В RTK Query это запихнуть сложно (хотя можно через onQueryStarted, но это будет выглядеть грязно). В санке это выглядит как чистый async/await код.

    ```
    export const checkout = createAsyncThunk(
    'cart/checkout',
    async (payload, { dispatch, getState }) => {
        // 1. Доступ ко всему стейту
        const state = getState() as RootState;
        if (state.cart.items.length === 0) throw new Error("Cart empty");

        // 2. Сторонний API (не наш бэкенд)
        const paymentResult = await paymentService.charge(payload);

        // 3. Сайд-эффект в другом слайсе
        dispatch(clearCart());

        // 4. Наш API
        const order = await api.createOrder(paymentResult.id);

        return order;
    }
    );
    ```

-   Работа с браузерными API (не HTTP)

    RTK Query заточен под запросы (HTTP, GraphQL). Если асинхронность исходит не от сервера, нужен санк.

    Пример: Чтение больших файлов, работа с Bluetooth, Geolocation, IndexedDB.

    Сценарий: Ты хочешь прочитать файл, сжать картинку в браузере перед отправкой или сохранить черновик в localStorage асинхронно.

-   "Одноразовые" действия без кэширования (Отправка логов аналитики, нопка "Сброс пароля" (отправили email и забыли))

-   Аутентификация (сложные флоу)

    Хотя RTK Query может делать /login, часто процесс входа/выхода — это больше, чем запрос.

    - Записать токен в LocalStorage/Cookies.

    - Установить хедеры для axios (если используешь axios отдельно).

    - Открыть/закрыть сокет-соединение.

    - Сбросить вообще весь стейт приложения при логауте (rootReducer reset).

    Такую "грязную" работу удобнее инкапсулировать в санке login или logout.

-   Взаимодействие с другими библиотеками

    Если нужно вызвать метод императивной библиотеки (например, Google Maps API, Chart.js, сложная библиотека анимаций), которая требует асинхронной инициализации, и положить флаг "ready" в стор.

#### 2.6 Современная альтернатива Санкам: Listener Middleware

Кстати, в Redux Toolkit появился еще более мощный инструмент для сложной логики, который постепенно вытесняет сложные санки — Listener Middleware.

Это как useEffect, только внутри Redux. "Если случился экшен cart/itemAdded, подожди 500мс, а потом отправь аналитику и обнови счетчик".   

Пример из игры. Сценарий:

- Герой получает опыт (hero/addXp).
- Мы хотим автоматически проверить, хватает ли опыта на новый уровень.
- Если хватает — проиграть звук и отправить запрос на сохранение.

```
// store/listenerMiddleware.ts

import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addXp, levelUp } from './heroSlice';
import { RootState } from './store';

// 1. Создаем инстанс
export const listenerMiddleware = createListenerMiddleware();

// 2. Добавляем слушателя
listenerMiddleware.startListening({
  // КВО: Какой экшен слушать?
  actionCreator: addXp, 

  // ЧТО ДЕЛАТЬ: Эффект (async/await поддерживается)
  effect: async (action, listenerApi) => {
    // action — сам экшен {type: 'hero/addXp', payload: 50}
    // listenerApi — доступ к стору (dispatch, getState, etc.)
    
    // а) Читаем текущий стейт
    const state = listenerApi.getState() as RootState;
    const { currentXp, maxXp } = state.hero;

    // б) Проверяем условие (Бизнес-логика)
    if (currentXp >= maxXp) {
      // в) Диспатчим другое действие
      listenerApi.dispatch(levelUp());
      
      console.log('Ding! Level Up!');
      
      // г) Можно даже делать асинхронные запросы
      // await fetch('/api/save-progress', ...);
    }
  },
});

// store.ts

import { configureStore } from '@reduxjs/toolkit';
import heroReducer from './heroSlice';
import { listenerMiddleware } from './listenerMiddleware'; // Импортируем наш middleware

export const store = configureStore({
  reducer: {
    hero: heroReducer,
  },
  // Добавляем middleware в цепочку
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
```

(Debounce):

```
listenerMiddleware.startListening({
  actionCreator: updateDraftText,
  effect: async (action, listenerApi) => {
    // 1. Если придет новый экшен updateDraftText, 
    // эта задача отменится автоматически
    listenerApi.cancelActiveListeners();

    // 2. Ждем 1 секунду (встроенная утилита задержки)
    await listenerApi.delay(1000);

    // 3. Если за 1 сек. новых экшенов не было — сохраняем
    await saveToApi(action.payload);
  },
});
```

### 3. Селекторы и createSelector (Reselect)

Что это: Функции для вытаскивания данных из стейта в компоненты (useSelector).

Проблема обычных функций: Если ты делаешь сложные вычисления (фильтрация массива, маппинг) в обычном селекторе:

`const selectFilteredTodos = (state) => state.todos.filter(t => t.completed);`

...то этот фильтр будет запускаться при каждом рендере компонента или любом обновлении стора, создавая новую ссылку на массив, что вызывает лишние ререндеры.

Решение (createSelector): Это встроенная библиотека reselect. Она мемоизирует результат. Если входные данные (аргументы) не изменились, функция не выполняется, а возвращает кэшированный результат.

```
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// Базовые (input) селекторы
const selectAllTodos = (state: RootState) => state.todos;
const selectFilter = (state: RootState) => state.visibilityFilter;

// Мемоизированный селектор
export const selectVisibleTodos = createSelector(
  [selectAllTodos, selectFilter], // Зависимости
  (todos, filter) => {
    // Эта функция выполнится ТОЛЬКО если todos или filter изменились
    switch (filter) {
      case 'SHOW_COMPLETED':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }
);
```

#### 3.1 Если использовать useMemo, при анмаунте компонента вычисления теряются

1.  Жизненный цикл useMemo
    useMemo привязан к экземпляру компонента.

    Компонент смонтировался -> useMemo посчитал -> сохранил.

    Ты перешел на другую страницу (компонент размонтировался) -> Кэш уничтожен.

    Вернулся назад -> Компонент монтируется заново -> Пересчет заново.

    Это нормально для интерфейсных мелочей (сортировка списка из 50 элементов), но плохо для тяжелых данных, если пользователь часто бегает туда-сюда по вкладкам.

2.  Жизненный цикл createSelector (Reselect)

    Селекторы, созданные через createSelector, обычно объявляются вне компонента (в файле слайса или селекторов) как глобальные переменные.
    
    - Компонент смонтировался -> вызвал selectExpensiveTodos -> посчитал -> сохранил в замыкании функции.
    - Ты ушел со страницы (компонент умер) -> Селектор всё еще держит значение в памяти.
    - Вернулся назад -> Компонент вызвал селектор -> Входные данные (стейт) не менялись? -> Вернул мгновенно из кэша.

#### 3.2 Мемоизация в createSelector

createSelector делает две разные проверки по очереди. Он смотрит И на аргументы, И на возвращаемые значения input-селекторов.

Уровень 1: Проверка Аргументов (Внешний щит)
Когда ты вызываешь селектор в коде: selectUsers(state, filterId).

- Вопрос: "Пришли ли ко мне те же самые state и filterId, что и в прошлый раз?"
- Сравнение: prevArgs === nextArgs (поверхностное сравнение ссылок).
- Решение:
  - ✅ Да (Ссылки те же): СТОП. Даже не запускаем никаких функций. Возвращаем результат из кэша мгновенно.

  - ❌ Нет (Ссылки другие): Обычно state всегда новый объект. Проходим на Уровень 2.

Уровень 2: Проверка Результатов "Ингредиентов" (Внутренний щит)

Это "умная" часть, ради которой и используют createSelector. Так как аргументы изменились (Уровень 1 пробит), мы обязаны запустить все входные селекторы (Input Selectors).

```
// Входные селекторы
input1(state, props) -> возвращает Result_A
input2(state, props) -> возвращает Result_B
```

- Вопрос: "Я выполнил входные функции. Изменилось ли то, что они вернули, по сравнению с прошлым разом?"
- Сравнение: Result_A_New === Result_A_Old И Result_B_New === Result_B_Old.
- Решение:
  - ✅ Да (Данные те же): Ссылки на результаты старые. Значит, по сути ничего не поменялось. НЕ ЗАПУСКАЕМ тяжелую функцию-рецепт. Возвращаем старый результат рецепта.
  - ❌ Нет (Данные новые): Хотя бы один результат изменился. Придется пересчитывать. Запускаем Result Function (рецепт).

#### 3.3 Приход Reselect v5

Раньше (v4): По умолчанию был lruMemoize с maxSize: 1. (Помню только последнего).

Сейчас (v5): По умолчанию weakMapMemoize. (Помню всё, пока живы объекты-аргументы).

##### 3.3.1 Вначале объекты, потом примитивы

Когда reselect строит дерево кэша, он для каждого аргумента выбирает контейнер:

- Если аргумент Объект -> он создает WeakMap (Слабая ссылка. Если объект удалят, ветка исчезнет).

- Если аргумент Примитив -> он создает Map (Сильная ссылка. Живет вечно).

### 4. Entity Adapter (Нормализация)

Проблема: Хранить данные массивом объектов [{id: 1, ...}, {id: 2, ...}] неудобно. Чтобы найти/обновить элемент, нужно перебирать массив (O(n)).

Решение: Нормализация. Данные хранятся как "база данных":

```
{
  ids: [1, 2], // Порядок
  entities: {  // Словарь для быстрого доступа O(1)
    1: { id: 1, name: 'A' },
    2: { id: 2, name: 'B' }
  }
}
```

Это классическая структура нормализованного состояния. В базе данных это называется «Primary Key Index» (ids) и «Data Table» (entities).

-   entities (Словарь / Хэш-таблица)
    
    Роль: Мгновенный доступ к данным по ID (O(1)).

    Представь, что у тебя список из 10,000 товаров. Тебе нужно обновить название товара с id: 555.

    Без нормализации (Массив): Тебе пришлось бы бежать циклом по всему массиву:
    ```
    // O(N) — чем больше массив, тем медленнее
    const item = items.find(item => item.id === 555);
    ```
    
    С нормализацией (Entities): Ты просто берешь ключ объекта. Это происходит мгновенно, независимо от размера данных.

    ```
    // O(1) — мгновенно
    const item = state.entities[555];
    ```

-   ids (Массив идентификаторов)

    Роль: Хранение порядка (сортировки) и возможность итерации.

    Объекты в JavaScript (entities) не гарантируют порядок ключей (хотя современные браузеры стараются, на это нельзя полагаться при сложной сортировке). Массив ids жестко фиксирует, в какой последовательности элементы должны отображаться в UI.

    Главные задачи ids:

    -   Сортировка: Если ты используешь sortComparer в адаптере (например, сортировка по имени), RTK будет менять порядок в массиве ids ([2, 1]), но не будет трогать сами объекты в entities.

    -   Отрисовка списка: React любит массивы. Чтобы отрендерить список, тебе нужно по чему-то сделать .map().

Как они работают в связке (Паттерн работы)

Когда ты вызываешь селектор selectAll (который генерирует адаптер), он делает под капотом примерно следующее:

```
// Псевдокод того, что делает selectAll
const selectAll = (state) => {
  // 1. Берем порядок из ids
  return state.ids.map(id => {
    // 2. Подставляем данные из entities
    return state.entities[id];
  });
};
```

Пример из жизни: Библиотека

-   entities — Это Книжные полки. Ты знаешь, что книга с инвентарным номером "ID-123" стоит на полке 5. Ты идешь и берешь её сразу. Тебе не нужно перебирать все книги в библиотеке, чтобы найти одну.

- ids — Это Картотечный каталог. Карточки стоят в алфавитном порядке (или по жанрам). Каталог не содержит самих книг, он содержит только ссылки (номера) и определяет порядок, в котором книги представлены читателю.

В Entity Adapter все методы (addOne, removeOne, upsertMany) автоматически синхронизируют эти два поля за тебя, чтобы ты никогда не получил ситуацию, когда ID есть в списке, а объекта в entities нет.


createEntityAdapter делает это за тебя и дает готовые методы (CRUD).

```
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

interface User { id: string; name: string; }

// 1. Создаем адаптер
const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name), // Опционально: авто-сортировка
});

const usersSlice = createSlice({
  name: 'users',
  // usersAdapter.getInitialState() вернет { ids: [], entities: {} }
  initialState: usersAdapter.getInitialState(),
  reducers: {
    // 2. Используем готовые методы (CRUD)
    userAdded: usersAdapter.addOne,
    usersReceived: usersAdapter.setAll,
    userUpdated: usersAdapter.updateOne, // принимает { id, changes }
    userRemoved: usersAdapter.removeOne,
  },
});

// 3. Адаптер генерирует селекторы автоматически!
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export default usersSlice.reducer;
```

#### 4.1 Что такое Entity Adapter?

createEntityAdapter — это не хранилище и не отдельный слой, а утилита, которая:

- задаёт формат хранения данных (нормализованный вид: ids + entities)

- предоставляет готовые CRUD-операции (addOne, setAll, updateMany, removeOne, и т.д.)

- может генерировать селекторы, работающие с этим форматом

То есть: адаптер — это логика + функции, но НЕ сами данные.

Когда ты пишешь:

categoriesAdapter.getInitialState()

результат будет:

```
{
  ids: [],
  entities: {}
}
```

Данные попадают в Redux Store только тогда, когда ты:

вызываешь dispatch() ручного action-а

или когда RTK Query кладёт результат запроса в кеш

В твоём случае:

```
transformResponse: (response) => ({
  categories: categoriesAdapter.setAll(initialState.categories, categories)
})
```

setAll здесь НЕ мутирует стор, он возвращает новый объект состояния вида:

```
{
  ids: ['1', '2', '3'],
  entities: {
    "1": {...},
    "2": {...},
    "3": {...}
  }
}
```

И уже RTK Query кладёт этот результат в cache slice стора.

То есть момент попадания в стор — после выполнения transformResponse, когда RTK Query обновит кэш-состояние.

#### 4.2 Механика по шагам

Создание адаптера

```
export const categoriesAdapter = createEntityAdapter<Category>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});
```

Здесь настройки: как определять id (по умолчанию item.id) и как сортировать ids.

Начальное состояние

```
initialResourcesState.categories = categoriesAdapter.getInitialState();
```

Хранилище ещё пустое.

RTK Query запрос и нормализация

```
categoriesAdapter.setAll(initialResourcesState.categories, categoriesWithSlugs)
```

Состояние кладётся в стор (автоматически RTK Query). Ты не видишь dispatch, потому что RTK Query делает это сам.

Селекторы

```
export const {
  selectAll: selectAllCategories,
  selectEntities: selectCategoryEntities,
} = categoriesAdapter.getSelectors(...);
```

Эти селекторы знают, что в категории хранятся как ids + entities, и возвращают данные в удобном виде:

- selectAll → массив объектов (сортированный благодаря sortComparer)
- selectEntities → объект Record<ID, Entity>

он сам ничего не хранит и никуда ничего не пишет. 
Он просто предоставляет удобные функции для работы с нормализованными коллекциями.

#### 4.3 Как изменять стор?

Entity Adapter не мутирует стор и сам по себе НЕ изменяет состояние.

Он работает как "pure function":
все его методы (setAll, removeOne, updateOne, addMany и т.д.) возвращают новое состояние, но не изменяют существующее.


```
categoriesAdapter.removeOne(
  selectResourcesData(store.getState()).categories,
  1,
);
```

просто создаёт новый объект.

Правильный вариант с сохранением результата через store.dispatch или useDispatch
 
```
store.dispatch(categoriesAdapter.removeOne(
  selectResourcesData(store.getState()).categories,
  1,
));
```



### 5. Инфраструктурные проблемы в продакшене

#### 5.1 Typed Hooks (Типизация "один раз и навсегда")

```
// hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Используй эти хуки во всем приложении вместо обычных
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### 5.2 RTK Query: Теги (Cache Invalidation)

```
export const apiSlice = createApi({
  tagTypes: ['Post'], // Объявляем типы тегов
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      // Вешаем тег на этот список
      providesTags: ['Post'], 
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      // При успехе - инвалидируем тег 'Post'
      invalidatesTags: ['Post'], 
    }),
  }),
});
```

#### 5.3 Optimistic Updates (Оптимистичный UI)

- Обычно: Спиннер -> Запрос -> Ответ -> Закрасили сердечко. (Медленно).
- Оптимистично: Сразу закрасили сердечко -> Отправили запрос. Если ошибка — откатили назад.

```
updatePost: builder.mutation({
  query: ({ id, ...patch }) => ({ url: `posts/${id}`, method: 'PATCH', body: patch }),
  
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    // 1. Мгновенно обновляем кэш вручную, не дожидаясь сервера
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getPost', id, (draft) => {
        Object.assign(draft, patch); // Мутируем черновик (Immer)
      })
    );

    try {
      await queryFulfilled; // 2. Ждем реального ответа
    } catch {
      patchResult.undo(); // 3. Если ошибка — откатываем изменения
    }
  },
}),
```

#### 5.4 Проблема сериализации (Non-Serializable Data)

Redux ненавидит не-JSON данные в сторе.

- Можно хранить: объекты, массивы, строки, числа, null.

- НЕЛЬЗЯ хранить: new Date(), Map, Set, Классы, Функции.

Почему? Ломается Time Travel Debugging в DevTools. Частая ошибка: Пытаться запихнуть Date объект с бэкенда в стейт. Решение: Хранить даты как строки (ISO string) или timestamp (number), а в new Date() преобразовывать уже в компоненте или селекторе. Middleware редакса будет ругаться в консоль, если ты нарушишь это правило.

#### 5.5 Code Splitting (injectEndpoints)

Если приложение огромное, тянуть все API в одном файле apiSlice.ts — плохая идея (нарушается бандл-сплиттинг).

RTK позволяет разбивать API на кусочки и подгружать их лениво:

```
// features/users/usersApiSlice.ts
import { apiSlice } from '../../api/apiSlice'; // Пустой базовый API

// Расширяем базовый API
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({ ... }),
  }),
});
```

### 6. Dispatch

Многие думают, что dispatch просто берет объект и сует его в редьюсер. В ванильном Redux (5 лет назад) так и было. Но в Redux Toolkit функция dispatch — это перегруженный монстр, прошедший через цепочку Middleware (мидлваров).

#### 6.1 Конвейер (Pipeline)

В RTK dispatch — это не прямая функция, а вход в туннель.

Когда ты пишешь dispatch(action), данные летят не сразу в Reducer, а проходят через цепочку перехватчиков:

- RTK Serializability Middleware (проверяет, не засунул ли ты Date или Map в стейт).

- Thunk Middleware (проверяет, не является ли экшен функцией).

- RTK Query Middleware (если подключен, управляет кэшем).

- Твои кастомные middleware (логгеры, аналитика).

- ...И только в конце — сам Reducer.

#### 6.2 Два лица dispatch в RTK

Благодаря этому конвейеру, dispatch в RTK умеет переваривать два типа данных. Это реализовано через перегрузку типов TS и логику внутри redux-thunk.

Сценарий А: Обычный объект (Slice Action)

```
dispatch(counterActions.increment()) 
// payload: { type: 'counter/increment', payload: undefined }
```

- dispatch получает объект.

- Thunk Middleware смотрит: «Это функция? Нет, это объект». Пропускает дальше (next(action)).

- Действие долетает до Reducer.

- Стейт обновляется -> UI перерисовывается.

Сценарий Б: Санк / Асинхронщина

```
dispatch(fetchUserById(123))
// payload: function(dispatch, getState) { ... }
```

Здесь ты диспатчишь функцию, а не объект. Старый Redux сломался бы с ошибкой "Actions must be plain objects".

- dispatch получает функцию.

- Thunk Middleware смотрит: «Опа, это функция!».

- Он НЕ пропускает её дальше к редьюсеру (иначе редьюсер сойдет с ума).

- Вместо этого он вызывает эту функцию прямо здесь и сейчас, передавая ей в аргументы самого себя (dispatch) и getState.

```
// Упрощенная логика thunk middleware
if (typeof action === 'function') {
  return action(store.dispatch, store.getState);
}
```

#### 6.3 Как это выглядит "Под капотом" (Упрощенно)

Если выкинуть все проверки на ошибки и оптимизации, ядро Redux Store выглядит смехотворно просто. Это паттерн Observer (Наблюдатель).

Вот псевдокод того, что создает configureStore:

```
function createStore(reducer) {
  let state = reducer(undefined, {}); // 1. Инициализация стейта
  let listeners = []; // Подписчики (компоненты)

  return {
    getState: () => state,

    // Тот самый dispatch
    dispatch: (action) => {
      // 1. Скармливаем экшен редьюсеру, получаем НОВЫЙ стейт
      state = reducer(state, action);

      // 2. Оповещаем всех подписчиков (React)
      listeners.forEach(listener => listener());
    },

    subscribe: (listener) => {
      listeners.push(listener);
      return () => { /* логика отписки */ };
    }
  };
}
```

#### 6.4 Связь с React (useDispatch)

Сам хук useDispatch — это просто доступ к React Context. Где-то на самом верху приложения у тебя есть:

<Provider store={store}>
  <App />
</Provider>

Provider кладет объект store в контекст. useDispatch просто делает const store = useContext(ReactReduxContext) и возвращает store.dispatch. В нем нет никакой магии, вся магия внутри самого объекта store.

### 7. Вопросы

#### 7.1 Могут ли редьюсеры быть асинхронными, зачем тогда санки?

Краткий ответ: НЕТ. Редьюсеры обязаны быть синхронными.

Если ты напишешь async перед методом в reducers, твое приложение сломается.

Почему метод в reducers НЕ МОЖЕТ быть async?

Это фундаментальное правило Redux.

Техническая причина: Функция, помеченная как async, всегда возвращает Промис (Promise). Redux ожидает, что редьюсер вернет новое состояние (объект) здесь и сейчас. Редьюсер должен быть Чистой Функцией (Pure Function).

Представь, что происходит внутри Redux, когда ты делаешь async increment:

```
// Как работает Redux внутри (упрощенно):
currentState = reducer(currentState, action);

// Если твой редьюсер async, то он возвращает Promise:
currentState = Promise { <pending> } 

// В следующий миг React пытается отрисовать интерфейс:
// <div>{currentState.value}</div> -> ОШИБКА! У Промиса нет поля value.
```

Разница в ответственности. Представь себе ресторан:

-   Thunk (createAsyncThunk) — Это Официант/Курьер.

    -   Он может выйти из ресторана (сделать запрос на сервер).

    -   Он может ждать сколько угодно (await).

    -   Он не имеет права сам готовить еду (менять стейт).

    -   Когда он возвращается с продуктами (данными), он кричит повару: "Я принес!" (диспатчит экшен fulfilled).
-   Reducer — Это Повар.
    -   Он стоит на кухне (внутри стора).
    -   Он никуда не ходит (не делает запросов).
    -   Он работает мгновенно: получил продукты -> нарезал -> отдал блюдо (обновил стейт).
    -   Он работает синхронно.
  
Неправильно (твой пример):

```
reducers: {
  // ЭТО СЛОМАЕТ REDUX
  fetchUser: async (state) => {
    const data = await api.getUser(); // Redux не умеет ждать!
    state.user = data; 
  }
}
```

Правильно (Thunk + Reducer):

```
// 1. САНК (Курьер): Делает грязную асинхронную работу
export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const data = await api.getUser();
  return data; // Возвращает результат, который станет payload
});

// 2. СЛАЙС (Повар): Просто реагирует на результат
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Обычные синхронные редьюсеры
  },
  extraReducers: (builder) => {
    // Когда курьер вернулся успешно (fulfilled)
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload; // Синхронно обновляем стейт
    });
  }
});
```

#### 7.2 RTK Query + Entity Adapter: Когда скрещивать?

Совмещать их нужно не всегда. Это мощная комбинация, но она добавляет слой сложности (трансформация ответа).

Когда ИМЕЕТ смысл объединять:

- Крупные списки с CRUD-операциями. Если у тебя есть список задач, и ты хочешь обновлять/удалять одну задачу без перезапроса всего списка с сервера. Адаптер позволяет точечно менять сущности в кэше (adapter.updateOne, adapter.removeOne).

- Нужен быстрый поиск по ID. Если тебе нужно часто выбирать элементы по ID (state.entities[id]) в других местах приложения.

- Сложная сортировка/фильтрация на клиенте. Адаптер дает готовые селекторы selectAll, которые возвращают массив, гарантируя порядок ids.

- Infinite Scroll (Бесконечная лента). Адаптер идеально умеет "доливать" данные (adapter.addMany) к уже существующим, сохраняя старые.

Когда НЕТ смысла (Overkill):

- Маленькие, простые списки. Если это список из 5 пунктов меню или 10 последних новостей, которые только читаются (Read-only).
- Данные не имеют ID. Entity Adapter требует уникальный id.
- Ты всегда инвалидируешь всё целиком. Если при добавлении элемента ты просто делаешь invalidatesTags, и список перезапрашивается полностью — адаптер тебе не нужен, обычный массив Data[] подойдет лучше.

```
const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const apiSlice = createApi({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      // Самая магия здесь: трансформируем массив с бэка в формат { ids, entities }
      transformResponse: (responseData: User[]) => {
        return usersAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});
```

#### 7.3 "Независимый" Санк (Global Thunk)

Если мне нужен независимый санк... этот санк обязан же быть в каком-то своём редьюсере?

Ответ: НЕТ. Санк может быть абсолютно «бездомным».

createAsyncThunk — это просто функция-генератор экшенов. Она не привязана ни к какому слайсу в момент создания. Ты можешь создать файл store/globalThunks.ts и писать их там.

Ты создаешь санк сам по себе. А вот слушать его могут сколько угодно слайсов (редьюсеров). Это паттерн "Один ко многим".

Пример: Допустим, есть кнопка "Сбросить всё и обновить профиль". Это затрагивает UserSlice, NotificationsSlice и SettingsSlice.

Файл: globalActions.ts (или thunks.ts)

```
import { createAsyncThunk } from '@reduxjs/toolkit';

// Он существует отдельно, вне слайсов
export const globalReset = createAsyncThunk(
  'global/reset', 
  async (_, { dispatch }) => {
     await api.logout();
     return 'Goodbye';
  }
);
```

Вызов в компоненте:

```
// Импортируем и диспатчим как обычно
dispatch(globalReset());
```

Реакция в РАЗНЫХ слайсах:

```
// userSlice.ts
extraReducers: (builder) => {
  builder.addCase(globalReset.fulfilled, (state) => {
    state.user = null; // Юзер-слайс очистился
  });
}

// settingsSlice.ts
extraReducers: (builder) => {
  builder.addCase(globalReset.fulfilled, (state) => {
    state.theme = 'light'; // Настройки сбросились
  });
}
```

#### 7.4 Изменение данных RTK Query вручную (без тегов)

Можно ли из редьюсеров или санков менять данные полученые из rtk qeury, а инвалидировать теги?

Это делается через api.util.updateQueryData

Это часто нужно для мгновенного обновления UI (например, лайк, переименование), когда ты не хочешь ждать ответа от сервера или делать лишний GET-запрос.

```
// Где-то в thunk или компоненте
import { apiSlice } from './apiSlice';

const updatePostTitleThunk = (id, newTitle) => (dispatch) => {
  // 1. Диспатчим специальный экшен утилиты RTK Query
  dispatch(
    apiSlice.util.updateQueryData(
      'getPosts', // Имя эндпоинта, чей кэш правим
      undefined,  // Аргументы, с которыми был вызван getPosts (если были)
      (draftPosts) => {
        // 2. Получаем доступ к черновику кэша (Immer)
        const post = draftPosts.find(p => p.id === id);
        if (post) {
          post.title = newTitle; // 3. Мутируем данные напрямую!
        }
      }
    )
  );
};
```

А я могу инвализировать теги из санков?

```
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice'; // Импорт твоего API

export const handleWebSocketMessage = createAsyncThunk(
  'ws/messageReceived',
  async (message: any, { dispatch }) => {
    
    // 1. Какая-то логика обработки сообщения
    console.log('Пришел сигнал:', message);

    if (message.type === 'POSTS_UPDATED') {
      // 2. ПРИНУДИТЕЛЬНАЯ ИНВАЛИДАЦИЯ
      // Мы говорим RTK Query: "Тег 'Post' протух, перепроверь подписки"
      dispatch(apiSlice.util.invalidateTags(['Post']));
      
      // Можно инвалидировать конкретные ID
      // dispatch(apiSlice.util.invalidateTags([{ type: 'Post', id: 123 }]));
    }
    
  }
);
```

#### 7.5 Альтернатива: refetch (принудительный вызов)

Иногда тебе не нужны теги, а нужно просто сказать конкретному эндпоинту: "Запустись прямо сейчас". Это делается через initiate.

```
import { apiSlice } from './apiSlice';

// Внутри санка
dispatch(
  apiSlice.endpoints.getPosts.initiate(undefined, { 
    subscribe: false, // Мы не подписываемся, просто дергаем
    forceRefetch: true // Игнорировать кэш, качать заново
  })
);
```

В чем разница?

-   util.invalidateTags(['Post']) (Рекомендуемый способ):

    -   Это умный подход.

    -   Обновляет все эндпоинты, которые зависят от этого тега (например, и getPosts, и getPostById, и getFeed).

    -   Обновляет только то, что сейчас нужно пользователю (активные подписки).

-   endpoints.getPosts.initiate(...):

    -   Это точечный удар.

    -   Ты должен знать точное название эндпоинта и аргументы.

    -   Используется редко (обычно для предзагрузки данных — Prefetching).
  
#### 7.6 В чём разница между useSelector который вернёт state и store.getState()?

Разница не в том, что они возвращают, а когда и как обновляются.

store.getState():

- Это синхронный вызов метода Redux store.
- Он просто возвращает текущий снимок состояния на момент вызова.
- Он не подписывается на изменения.
- Если состояние позже изменится — результат store.getState() не обновится автоматически.

useSelector():

- Подписывается на изменения Redux store.
- Вызывает селектор каждый раз, когда store изменяется.
- Перерисовывает компонент, если результат селектора изменился (по === сравнению).