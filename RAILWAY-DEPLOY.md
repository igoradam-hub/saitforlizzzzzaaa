# КАК ЗАГРУЗИТЬ САЙТ НА RAILWAY

## Супер простая инструкция для чайников!

---

## ЧТО ТАКОЕ RAILWAY?

Railway - это бесплатный хостинг для сайтов.
- Бесплатно: $5 кредитов в месяц (хватит!)
- Быстро: сайт будет онлайн за 2 минуты
- Просто: без настройки серверов

---

## СПОСОБ 1: ЧЕРЕЗ GITHUB (РЕКОМЕНДУЮ!)

### Шаг 1: Зарегистрируйся на GitHub
1. Открой https://github.com
2. Нажми "Sign up"
3. Создай аккаунт

### Шаг 2: Создай репозиторий
1. Нажми "+" → "New repository"
2. Название: `msu-urban-law-cup`
3. Тип: Public
4. Нажми "Create repository"

### Шаг 3: Загрузи файлы
1. На странице репозитория нажми "uploading an existing file"
2. Перетащи ВСЕ файлы из папки проекта:
   - index.html
   - package.json
   - railway.json
   - папку images/
3. Нажми "Commit changes"

### Шаг 4: Подключи Railway
1. Открой https://railway.app
2. Нажми "Start a New Project"
3. Выбери "Deploy from GitHub repo"
4. Войди через GitHub
5. Выбери репозиторий `msu-urban-law-cup`
6. Railway автоматически задеплоит сайт!

### Шаг 5: Получи ссылку
1. После деплоя нажми на проект
2. Перейди в "Settings" → "Domains"
3. Нажми "Generate Domain"
4. Получишь ссылку типа: `msu-urban-law-cup-xxx.up.railway.app`

**ГОТОВО! Сайт онлайн!**

---

## СПОСОБ 2: ЧЕРЕЗ RAILWAY CLI (для продвинутых)

### Шаг 1: Установи Railway CLI

**Windows (PowerShell):**
```powershell
iwr https://raw.githubusercontent.com/railwayapp/cli/master/install.ps1 -useb | iex
```

**Mac/Linux:**
```bash
curl -fsSL https://railway.app/install.sh | sh
```

### Шаг 2: Войди в аккаунт
```bash
railway login
```
Откроется браузер - войди в Railway

### Шаг 3: Создай проект
```bash
cd путь/к/папке/saitforlizzzzzaaa
railway init
```
Введи название: `msu-urban-law-cup`

### Шаг 4: Задеплой
```bash
railway up
```

### Шаг 5: Получи ссылку
```bash
railway domain
```

**ГОТОВО!**

---

## СПОСОБ 3: ЧЕРЕЗ ВЕБ-ИНТЕРФЕЙС (без GitHub)

### Шаг 1: Зарегистрируйся
1. Открой https://railway.app
2. Нажми "Login"
3. Войди через email или GitHub

### Шаг 2: Создай проект
1. Нажми "New Project"
2. Выбери "Empty Project"

### Шаг 3: Добавь сервис
1. Нажми "+ New"
2. Выбери "GitHub Repo" или "Empty Service"

### Шаг 4: Настрой деплой
Если выбрал Empty Service:
1. Перейди в "Settings"
2. В "Source" выбери "Upload"
3. Загрузи ZIP-архив с проектом

### Шаг 5: Добавь домен
1. "Settings" → "Domains"
2. "Generate Domain"

---

## ФАЙЛЫ КОТОРЫЕ НУЖНЫ ДЛЯ RAILWAY

Убедись что в папке есть:

```
saitforlizzzzzaaa/
├── index.html          ← Главная страница
├── package.json        ← Конфиг Node.js (уже создан!)
├── railway.json        ← Конфиг Railway (уже создан!)
└── images/             ← Все картинки
    ├── photos/
    ├── logos/
    └── partners/
```

---

## КАК ЭТО РАБОТАЕТ?

1. Railway видит `package.json`
2. Запускает `npm install` (устанавливает serve)
3. Запускает `npm start` (запускает сервер)
4. Сервер отдаёт `index.html` и картинки
5. Сайт работает!

---

## ЧАСТЫЕ ВОПРОСЫ

### Сколько стоит?
- $5 бесплатных кредитов в месяц
- Этого хватит на ~500 часов работы
- Для простого сайта - БЕСПЛАТНО!

### Как обновить сайт?
**Через GitHub:**
- Измени файлы в репозитории
- Railway автоматически обновит сайт

**Через CLI:**
```bash
railway up
```

### Как добавить свой домен?
1. Купи домен (например на reg.ru)
2. В Railway: Settings → Domains → Custom Domain
3. Введи свой домен
4. Добавь CNAME запись в настройках домена

### Почему сайт не работает?
1. Проверь что есть `package.json`
2. Проверь что есть `index.html`
3. Посмотри логи в Railway Dashboard

---

## ПОШАГОВЫЙ ЧЕКЛИСТ

- [ ] Зарегистрировался на GitHub
- [ ] Создал репозиторий
- [ ] Загрузил все файлы
- [ ] Зарегистрировался на Railway
- [ ] Подключил репозиторий
- [ ] Дождался деплоя
- [ ] Получил ссылку на сайт
- [ ] Проверил что сайт работает

---

## ПОЛЕЗНЫЕ ССЫЛКИ

- Railway: https://railway.app
- Документация: https://docs.railway.app
- GitHub: https://github.com
- Статус Railway: https://status.railway.app

---

## НУЖНА ПОМОЩЬ?

- Discord Railway: https://discord.gg/railway
- Документация: https://docs.railway.app

---

**Удачи! Сайт будет онлайн через 5 минут!** 🚀
