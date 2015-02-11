# Базовый шаблон для создания сайтов

Тут собраны все инструменты, что используются для сборки сайтов в [http://betaagency.ru](http://betaagency.ru).

# Как начать работать

1. Устанавливаем [node.js](http://nodejs.org/)
2. Устанавливаем ruby
3. Устанавливаем php
4. Устанавливаем зависимости

   ```sh
   npm install -g harp foreman gulp bower
   gem install compass
   ```

5. Создаём проект, устанавливаем его зависимости, запускаем

   ```sh
   mkdir newproject
   cd newproject
   harp init -b betaagency-os/harp-bp
   npm install
   nf start
   ```

6. Открываем адрес [http://local.bubujka.org:3000](http://local.bubujka.org:3000)

# Зависимости

Для начала работы нужно удостовериться чтоо установлены следующие вещи:

- harp.js
- compass
- foreman
- gulp
- php-cli (5.4+)
- bower (по желанию)

# Что тут есть

- Сборка сайта командой ./bin/compile
- Создание zip-архива сайта ./bin/archive
- livereload для всего сайта
- изображения из папки src/_images минифицируются в build/images
- png изображения минифицируются с потерей качества (зато намного эффективнее)
- минифицируются только новые изображения
- jade, markdown, лаяуты, инклуды
- объединение css, js в файлы src/build/vendor.{js,css} (но нужно исправлять gulpfile.js для этого)
- Добавляется временная метка к адресам статичных файлов
- Есть [bemto](https://github.com/kizu/bemto) для удобной вёрстки по BEM в jade
- [InstantClick](http://instantclick.io/) для повышения отзывчивости сайта
- Сброшены различия стилей у браузеров с помощью [normalize.css](https://github.com/necolas/normalize.css/)
- Для компиляции шаблонов используется [harp.js](http://harpjs.com/)
- Можно писать api на php
- Список файлов по адресу [http://local.bubujka.org:3000/files.html](http://local.bubujka.org:3000/files.html)
- Возможность деплоить папки www на github pages через команду ./bin/gh-pages

# Структура файлов

- src/ - исходный код сайта
- src/_vendor - папка для внешних зависимостей что используются на сайте.
- src/_images - изображения которые будут обработаны с помощью imagemin
- gulpfile.js - конфиг gulp
- CNAME - домен для сайта (используется при разворачивании сайта с помощью [sakura](https://github.com/bubujka/sakura)
- nginx - настройки nginx для sakura
- config.rb - настройки для compass
- bin/ - команды для работы с проектом
- bin/compile - скомпилировать проект и получить папку www готовую для разворачиванияjjjj
- php/ - php файлы проекта. Доступны из javascript как API_URL+'/{file.php}'
- php/form.php - Пример реализации формы
- src/form.jade - Пример реализации формы с использованием angular.js
- src/_harp.json - Настройки окружений для работы сайта
- src/share/ - каталог для Open Graph
- src/share/img.jpg - картинка для шаринга
- src/share/_data.json - описание og тэгов


 Подводные камни
- при использовании instantclick - необходимо явно отправлять статистику посещений в google analytics (src/_instantclick.jade)
- при использовании instantclick - необходимо явно инициализировать angular на каждой странице (src/form.jade)


# Рецепты
## Разворачивание проекта на Github pages

Проект сделанный с помощью данного шаблона можно развернуть на github.

Для этого единожды:

- прописываем origin на github

  ```sh
  git remote add origin git@github.com:username/repository.git
  ```
- настраиваем [A-записи](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/) у нужного домена

  - 192.30.252.153
  - 192.30.252.154

- Вписываем домен в файл CNAME

И чтобы скомпилировать и пролить - выполняем:
```sh
./bin/gh-pages
```

Данная команда компилирует сайт и папку www отправляет в ветку gh-pages.

## Переменные доступные в проекте

В файле **src/_layout.jade** есть заккоментированный инклуд файла **_debug.jade**.
Если его раскрыть - можно посмотреть какие доступны переменные на этапе компиляции.

## Список всех файлов

Его выводит файл http://local.bubujka.org:3000/files.html.

## Шаринг

Для шаринга доступен объект Share со следующими методами:
- vk - Вконтакте
- ok - одноклассники
- fb - Фэйсбук
- mailru - моймир
- tw - шарим текст в твиттере

К примеру:
```js
function send_to_vk(){
  // ...

  Share.vk(APIURL+'/share-vk.php?work=1');
}
```

Так же все элементы что содержат аттрибуты **data-share** и **data-share-url** выполняют шаринг при клике:
```html
<div data-share='fb' data-share-url='http://.................../'>Поделиться в фэйсбук</div>
```

Если **data-share-url** не будет указан - шарится текущая страница.

Можно указывать **data-share-url** по ключу из файла **src/share/_data.url** - он автоматически сформирует ссылку на него:
```html
<div data-share='fb' data-share-url='quest?utm_source=fb-share-quest'>Поделиться квестом в фэйсбук</div>
```


### Настройка

Нужно отредактировать файл **src/_harp.json** и указать правильный **baseurl** для шаринга.

### Дефолтный шаринг

На все страницы проставляется информация для шаринга взятая из блока **default** файла
**src/share/_data.json**.

### Создание нового типа шаринга

1. Добавляем блок с изменёнными переменными в файл **src/share/_data.json**
2. Создаём пустой файл по названию этого блока в папке src/share (к приемеру src/share/quest.json)
3. Вызываем шаринг по этому имени

## Сбор статистики

При разработке сайта, на все динамические кнопки, стоит заранее добавлять следующие аттрибуты:

- data-ss-category **обязательно** - название группы событий (к примеру Video, Forms, Share)
- data-ss-action **обязательно** - название типа события в группе (Play, Stop, Submit, Vk, Fb)
- data-ss-label - расшифровка конкретного события (название видео, какая форма, что шарится)
- data-ss-value - дополнительная информация для события

Данные аттрибуты будут переданы в подключённый на сайт google analytics автоматически при клике.

```html
<a href='#'
   onclick='playVideo("Wul32cP3_3Y")'
   data-ss-category='Videos'
   data-ss-action='Play'
   data-ss-label='Weird Owl'
   data-ss-value='Wul32cP3_3Y'>Play video</a>
```

Возможна короткая запись:

```html
<a href='#'
   onclick='playVideo("Wul32cP3_3Y")'
   data-ss='Videos,Play,Weird Owl'>Play video</a>
```

Из javascript доступна глобальная функция SS для отправки статистики:

```javascript
SS('Videos','Play','Weird Owl');
```

## Работа сайта из подкаталога

При указании ссылок на все статичные файлы - нужно указывать префикс **STATICURL**.
Так же можно указывать суффикс **?V** - в котором содержится время компиляции сайта.

```jade
a(href=STATICURL+'/')
  img(src=STATICURL+'/build/images/logo.png?v='+V)
```

### Тестирование

Проверить отображение сайта, если он будет раздаваться из подкаталога,
можно по адресу [http://local.bubujka.org:3002/www](http://local.bubujka.org:3002/www).

Для этого сайт нужно предварительно скомпилировать:

```sh
./bin/compile
```

