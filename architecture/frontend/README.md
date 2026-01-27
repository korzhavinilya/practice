source https://www.youtube.com/watch?v=c3JGBdxfYcU&t=241s&ab_channel=UlbiTV

started reading https://habr.com/ru/articles/726354/

What is architecture?

It's interaction of modules with each other. On frontend it's UI components e.g. page, buttons, etc

What is a module?

it's a UI component and its business logic e.g. a redux reducer

# Frontend architecture

## Classic (without architecture)

type: Destructive decoupling

Folder structure don't set an architecture

### cons

- one components rely on another, it's difficult to understand what can be changed, deleted
- UI components (button, input, link) are merge with business logic components (edit profile modal, city selector)
- components becomes a trash folder soon
- someone doesn't find a required component, he creates a new one, and so on several times. We have a lot of components with a small difference
- отсутствие модулей, есть набор компонентов, редьюсеров, хелперов которые между собой взаимодействуют

### when to use

- use it when there are less than 3 dev
- mvp prototype
- admin apps
- internet shops

## Basic Module

type: close to Ideal

Layers:

- ui - это ui кит, кнопки, модалки, тултипы, селекты
- components - менее самостоятельные куски кода, карточка от товара
- modules - связка стора, вызов апи, обработка ошибок, компоненты и хелпери. Выполняют одну задачу. Не может содержать внутри себя другой модуль
- pages - модули верхнего уровня, хранят специфичные для этой страницы апи, компоненты (хедер, комменты). Отличие от модулей, страница должна содержать только перечисление модулей и компонентов

чтобы не вернуться к первому варианту, нужно запретить импортировать компоненты (чекбокс, валидация, хелперы) из этого модуля и предусмотреть public api. Работать только с апи, можно запретить обращаться внутрь модуля линтером

### pros

- модули решают одну задачу

### cons

- не всегда ясно, когда выносить модули, а когда в компоненты
- что делать, если модуль нужно использовать в другом модуле. Группировать на уровне страницы и приходится делать дублирующую работу
- где хранить бизнес сущьности (типы, компоненты). Всё равно будет образовываться свалка
- неявные связи будут образовываться в глобальных функциях, данных
- не подходит для продукта со сложной бизнес логикой и большим количеством бизнес сущностей и фичей. Неявные связи начнут появляться

### when to use

- 99% лучше чем первый
- 3-6 человек

## Atomic Design

type: Ideal

App is devided into 5 layers

- atoms - label, input, button
- molecules - more complex components without business logic, e.g. searchbar (label + input + button)
- organisms - modules with business logic, e.g. navbar (icon, links, searchbar)
- templates - it sets layout and structure of a page without any logic
- pages - organisms are fit to templates to get a page

### pros

- the same as the basic module has

### cons

- the same as the basic module has
- there's no business termins, using chemicals abstract atoms, molecules etc

## Feature Sliced Design

type: Ideal

the best methodology for now

Чем ниже расположен модуль - тем опаснее вносить в него изменения, тк используется в большем количестве мест

### Layers (responsibility scopes):

- app - инициальзируюшая логика приложения (providers, routers, styles, type declaration)
- processes - (Опц.) процессы приложения (многоэтапная регистрация, заполненеие одной формы, потом следующей и тд)
- pages - страницы приложения
- widgets - Самостоятельные блоки для страниц, PostCard карточка поста с лайками, дизлайками и комментами. Header открытие уведомлений, дропдауна для перехода на страницу профиля, ссылки
- features - (Опц.) обрабатываемые пользовательские сценарии, которые несут ценность. (подписка на пользователя, поставить лайк, оценка товара)
- entities - (Опц.) безнес сущности. Всё что связано с конкретной сущьностью (товар, заказ, корзина, пользователь, комментарий)
- shared - переиспользуемые модули, без безнес логики (кнопки, модалки, хелперы, конфигурация приложения). Можно перенести это в другое приложение без проблем.

### Slices (business logic things)

- user
- post
- comment

### Segments:

- ui - components
- model - business logic, redux communication (selectors, actions)
- lib - helpers/utils
- config - rare used, Module configuration
- api - server requests
- constants
- assets

### Концепция ООП

#### Абстракция / Полиморфизм

достигаем за счёт слоёв

#### Инкапсуляция

достигаем за счёт piblic api модуля. Нельзя экспортировать из вне этого апи

#### Наследование

достигаем за счёт слоёв

### How to determine the scope of responsibility

- shared - Это не относится к БЛ и является общим переиспользуемым служебным кодом?
- entities - Это относится непосредственно к бизнес сущьности? (хелпер \ компонент который относится к товару, заказу или пользователю)
- features - Это относится к действию пользователя представляющую бизнес ценность? ()
- widgets - Это самостоятельный и полноценный блок страницы с конкретными действиями?
- pages - Это относится к конкретной странице?
- processes - Это относится к конкретному юзкейсу, протекающему через несколько страниц?
- app - Это общая инициализирующая логика? (провайдеры, декораторы, врапперы, роутеры, стили)
