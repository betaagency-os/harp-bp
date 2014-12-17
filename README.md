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

 Подводные камни
- при использовании instantclick - необходимо явно отправлять статистику посещений в google analytics (src/_instantclick.jade)
- при использовании instantclick - необходимо явно инициализировать angular на каждой странице (src/form.jade)

