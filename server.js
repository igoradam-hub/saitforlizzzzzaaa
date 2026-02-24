const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Persistent storage paths (Railway Volume support)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');

// File paths
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// Debug logging for deployment issues
console.log('=== STORAGE CONFIG ===');
console.log('DATA_DIR:', DATA_DIR);
console.log('UPLOADS_DIR:', UPLOADS_DIR);
console.log('CONTENT_FILE:', CONTENT_FILE);
console.log('SUBMISSIONS_FILE:', SUBMISSIONS_FILE);
console.log('DATA_DIR exists:', fs.existsSync(DATA_DIR));
console.log('======================');

// CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve admin panel at /admin
app.use('/admin', express.static(path.join(__dirname, 'admin-app', 'public')));

// Serve main site static files from root
app.use(express.static(__dirname));

// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// Auth
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'msu2025admin';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        cb(null, extname && mimetype);
    }
});

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
    console.log('Creating DATA_DIR:', DATA_DIR);
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
    console.log('Creating UPLOADS_DIR:', UPLOADS_DIR);
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Log existing files in DATA_DIR
try {
    const files = fs.readdirSync(DATA_DIR);
    console.log('Files in DATA_DIR:', files);
} catch (e) {
    console.log('Cannot read DATA_DIR:', e.message);
}

// Complete default content for ALL site sections
const defaultContent = {
    hero: {
        badge: "III ОТКРЫТЫЙ СТУДЕНЧЕСКИЙ КОНКУРС 2026",
        mobile: {
            title: "MSU<br>Open Urban<br><span class=\"t-cover__title-green\">Law Cup</span>",
            subtitle: "Третий открытый студенческий конкурс по земельному законодательству и законодательству о градостроительной деятельности имени О.И. Крассова",
            description: "Командное соревнование студентов по разработке решений спорных правовых ситуаций"
        },
        desktop: {
            title: "Третий открытый студенческий конкурс по земельному законодательству и законодательству о градостроительной деятельности имени О.И. Крассова",
            subtitle: "Командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства",
            description: ""
        },
        highlightTitle: "Победители II конкурса!",
        finalsDate: "18 апреля 2026",
        finalsLocation: "МГУ им. М.В. Ломоносова",
        backgroundImage: "images/photos/90922-moskovskij_gosudarstvennyj_universi-dostoprimechatelnost-spiral-neboskreb-stolica-3840x2160.jpg"
    },
    about: {
        label: "О мероприятии",
        title: "О конкурсе",
        text1: "<strong>Кубок МГУ по земельному и градостроительному праву</strong> — это командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства.",
        text2: "Конкурс проводится при поддержке кафедры экологического и земельного права Юридического факультета МГУ имени М.В. Ломоносова и Коллегии адвокатов «Регионсервис».",
        text3: "За два года существования конкурса, в нем приняли участие более полусотни команд из Екатеринбурга, Иркутска, Томска, Кемерова, Уфы, Калининграда, Владивостока, Санкт-Петербурга и Москвы.",
        image: "images/photos/0424.jpg"
    },
    goals: {
        label: "Миссия",
        title: "Цели конкурса",
        items: [
            { icon: "trophy", title: "Практический опыт", text: "Решение реальных кейсов из судебной практики" },
            { icon: "users", title: "Командная работа", text: "Развитие навыков работы в команде юристов" },
            { icon: "star", title: "Экспертная оценка", text: "Обратная связь от ведущих практиков" },
            { icon: "award", title: "Карьерные возможности", text: "Стажировки в ведущих юридических компаниях" }
        ]
    },
    results: {
        label: "Итоги 2025",
        title: "Результаты конкурса",
        winners: [
            { place: "1", team: "Команда «Правовой навигатор»", university: "МГУ имени М.В. Ломоносова" },
            { place: "2", team: "Команда «Lex Urbana»", university: "СПбГУ" },
            { place: "3", team: "Команда «Территория права»", university: "МГЮА" }
        ]
    },
    stats: {
        items: [
            { number: "14", label: "Регионов России" },
            { number: "170+", label: "Участников" },
            { number: "58", label: "Команд" },
            { number: "22", label: "Вуза" }
        ]
    },
    schedule: {
        title: "График конкурса 2026",
        stages: [
            {
                name: "Отборочный этап",
                period: "Февраль — Март 2026",
                items: [
                    "Открытие регистрации участников: 23 января 2026 г.",
                    "Закрытие регистрации участников: 23 февраля 2026 г.",
                    "Публикация задания отборочного этапа: 24 февраля 2026 г.",
                    "Приём решений задания отборочного этапа: до 16 марта 2026 г.",
                    "Объявление результатов отборочного этапа: 31 марта 2026 г."
                ]
            },
            {
                name: "Заключительный этап",
                period: "Апрель 2026",
                items: [
                    "Проведение заключительного этапа: 18 апреля 2026 г.",
                    "Место проведения: Юридический факультет МГУ им. М.В. Ломоносова.",
                    "Объявление результатов заключительного этапа, награждение победителей и призёров конкурса."
                ]
            }
        ]
    },
    jury: {
        label: "Эксперты",
        title: "Члены Жюри",
        description: "Ведущие эксперты в области земельного права и законодательства о градостроительной деятельности",
        members: [
            { name: "Максим Галь", position: "Заместитель директора департамента комплексного развития территорий Минстроя России", photo: "" },
            { name: "Анна Жолобова", position: "Управляющий партнер московского офиса КА «Регионсервис», член Комитета НОСТРОЙ, LL.M.", photo: "" },
            { name: "Алексей Бутовецкий", position: "Статс-секретарь — заместитель руководителя Росреестра", photo: "" },
            { name: "Михаил Губин", position: "Директор по развитию ГК «Малышева 73»", photo: "" },
            { name: "Павел Мельников", position: "Директор по развитию московского подразделения ПАО «Группа ЛСР»", photo: "" },
            { name: "Мария Сафарова", position: "Доцент Высшей школы урбанистики НИУ ВШЭ, к.э.н.", photo: "" },
            { name: "Максим Попов", position: "Советник ALUMNI Partners, к.ю.н.", photo: "" },
            { name: "Сергей Григорьев", position: "Директор по развитию «Группы Голос», депутат Челябинской городской думы", photo: "" },
            { name: "Илья Рябов", position: "Директор департамента имущества ГК «Галс-Девелопмент»", photo: "" },
            { name: "Алексей Башарин", position: "Референт Образовательного Фонда «Талант и успех», лектор СПбГУ, НИУ ВШЭ", photo: "" }
        ],
        scientificAdvisors: [
            { name: "Леонид Бандорин", position: "Доцент кафедры экологического и земельного права Юридического факультета МГУ, к.ю.н.", photo: "" },
            { name: "Надежда Заславская", position: "Профессор кафедры экологического и земельного права Юридического факультета МГУ, д.ю.н.", photo: "" },
            { name: "Андрей Переладов", position: "Сопредседатель КА «Регионсервис», управляющий партнер офиса в г. Кемерово", photo: "" }
        ]
    },
    organizers: {
        label: "Команда",
        title: "Оргкомитет",
        members: [
            { name: "Сидорова Анна", position: "Председатель оргкомитета", photo: "" }
        ]
    },
    partners: {
        organizators: {
            title: "Организаторы",
            items: [
                { name: "Юридический факультет МГУ", logo: "images/partners/yuridicheskiy-fakultet.webp" },
                { name: "Регионсервис", logo: "images/partners/regionservis.webp" }
            ]
        },
        support: {
            title: "При поддержке",
            items: [
                { name: "Правительство Москвы", logo: "images/partners/pravitelstvo.webp" },
                { name: "Минстрой", logo: "images/partners/minstroy.webp" },
                { name: "Росреестр", logo: "images/partners/rosreestr.webp" }
            ]
        },
        partners: {
            title: "Партнеры конкурса",
            items: [
                { name: "ГАЛС", logo: "images/partners/gals.svg" },
                { name: "Гринвич", logo: "images/partners/grinvich.webp" },
                { name: "ГОЛОС", logo: "images/partners/golos.webp" },
                { name: "ЛСР", logo: "images/partners/lsr.webp" },
                { name: "Малышева 73", logo: "images/partners/malysheva.webp" },
                { name: "Сбер", logo: "images/partners/sber.webp" },
                { name: "ЛЕТО впереди", logo: "images/partners/leto.webp" }
            ]
        },
        infoPartnerMain: {
            title: "Генеральный информационный партнер",
            items: [
                { name: "Право.ru", logo: "images/partners/pravo.webp" }
            ]
        },
        infoPartners: {
            title: "Информационные партнеры",
            items: [
                { name: "3К", logo: "images/partners/3k.webp" },
                { name: "Legal Business Forum", logo: "images/partners/legal-business-forum.webp" },
                { name: "РАСО", logo: "images/partners/raso.webp" },
                { name: "Правовая беседа", logo: "images/partners/pravovaya-beseda.webp" }
            ]
        }
    },
    contacts: {
        telegram1: { name: "@evaevance", url: "https://t.me/evaevance" },
        telegram2: { name: "@Anastasia_timurovna", url: "https://t.me/Anastasia_timurovna" }
    },
    registration: {
        title: "Примите участие в конкурсе!",
        subtitle: "Зарегистрируйте свою команду и вступите в борьбу за главный приз!",
        note: "Нажимая кнопку \"Зарегистрироваться\" вы даете согласие на обработку персональных данных"
    },
    countdown: {
        title: "До конца регистрации осталось",
        endDate: "2026-02-23T00:00:00+03:00"
    },
    documents: [
        { title: "Положение о Конкурсе", url: "https://disk.yandex.ru/i/7K_tD0mIpfgGXw" },
        { title: "Положение об Оргкомитете", url: "https://disk.yandex.ru/i/ztpNNRaV6HWR-Q" },
        { title: "Положение о Жюри Конкурса", url: "https://disk.yandex.ru/i/UiwqZeksiVzF1w" },
        { title: "Справка о Конкурсе", url: "https://disk.yandex.ru/i/Sw4wOXbQA8uGNA" }
    ],
    universities: {
        title: "Среди вузов-участников",
        logos: [
            { name: "ВШЭ", logo: "images/logos/HSE.webp" },
            { name: "МГУ", logo: "images/logos/MSU.webp" },
            { name: "МГЮА", logo: "images/logos/MGUA.webp" },
            { name: "УрГЮУ", logo: "images/logos/URGU.webp" },
            { name: "СПбГУ", logo: "images/logos/спбгу.png" },
            { name: "РГУП", logo: "images/logos/ргуп.jpg" },
            { name: "РАНХиГС", logo: "images/logos/logo-ranhigs.png" },
            { name: "МИИГАиК", logo: "images/logos/Логотип_МИИГАиК.png" },
            { name: "КемГУ", logo: "images/logos/Логотип_КемГУ.png" }
        ]
    },
    gallery: {
        label: "Фотоотчёт",
        title: "Галерея",
        photos: [
            { src: "images/photos/0450.jpg", alt: "Финал конкурса MSU Urban Law Cup" },
            { src: "images/photos/0440.jpg", alt: "Награждение победителей" },
            { src: "images/photos/0069.jpg", alt: "Участники конкурса" },
            { src: "images/photos/0195.jpg", alt: "Жюри конкурса" },
            { src: "images/photos/0066.jpg", alt: "Выступление участников" },
            { src: "images/photos/0424.jpg", alt: "Мероприятие конкурса" },
            { src: "images/photos/0430.jpg", alt: "Участники финала" },
            { src: "images/photos/0432.jpg", alt: "Работа жюри" },
            { src: "images/photos/0433.jpg", alt: "Презентация решений" },
            { src: "images/photos/0D3A6970.jpg", alt: "Церемония награждения" }
        ]
    },
    faq: {
        label: "FAQ",
        title: "Вопросы и ответы",
        items: [
            { question: "Насколько строгим является требование к количеству символов? Можно ли его превысить?", answer: "Требование о количестве знаков, установленном в Положении о Конкурсе, является обязательным. Допускается превышение установленного Положением о Конкурсе предельного количества знаков на 10%. При превышении командой 33 000 знаков Оргкомитет вычитает 1 балл за каждые 500 знаков сверх установленного лимита.<br><br>Работа, содержащая более 38 000 знаков, не допускается Оргкомитетом для дальнейшего оценивания Жюри. В этом случае Оргкомитет выставляет за представленную работу 0 баллов." },
            { question: "Возможно ли оформление задания в том числе с использованием таблиц и/или графиков?", answer: "Да, участники имеют право выбрать любую форму изложения решения задания. При этом любые таблицы и/или графики должны быть созданы с помощью текстового редактора и не могут быть включены в файл как изображения.<br><br>Скриншоты Публичной кадастровой карты, иные картографические или графические материалы допустимо включать непосредственно в текст решения задания или в форме приложения к нему." },
            { question: "Нужно ли для выполнения задания анализировать существующие права третьих лиц на земельный участок, возможные договоры аренды и сервитуты, а также учитывать нахождение на них объектов недвижимости?", answer: "Пределы анализа участка и содержание заключения устанавливаются командами самостоятельно. Оценивание проходит в том числе по критерию полноты раскрытия вопросов, указанных в задании." },
            { question: "Что указывать на титульном листе, если существует требование о соблюдении анонимности?", answer: "Наличие титульного листа при оформлении решения не является обязательным. Присутствующий в решении задания титульный лист не должен содержать указание на название команды, имена ее участников, наименование учебного заведения. На титульном листе могут быть графические изображения, в том числе символика Конкурса, а также надписи и заголовки, не нарушающие анонимность работы. Напоминаем, что в силу п. 3.14 Положения о Конкурсе нарушение требований об анонимности работы влечёт за собой возможность её аннулирования." },
            { question: "Срок направления работы считается по московскому времени?", answer: "Да, срок направления решения заданий определен до 16 марта, 23:59 по московскому времени." }
        ]
    },
    requirements: {
        title: "Основные требования к выполнению задания",
        subtitle: "Полная информация о правилах и требованиях отражена в положениях конкурса",
        docs: [
            { title: "Положение о Конкурсе", url: "положения/Положение о Конкурсе_2026.pdf" },
            { title: "Положение об Оргкомитете", url: "положения/Положение об оргкомитете-2026.pdf" },
            { title: "Положение о Жюри", url: "положения/Положение_о_членах_жюри_конкурса_2026.pdf" },
            { title: "Справка о Конкурсе", url: "положения/Справка о Конкурсе - 2026.pdf" }
        ],
        items: [
            { title: "Формат файлов", text: "Решение команды должно быть представлено <strong>в двух форматах: Word и Pdf</strong>. Файлы должны быть идентичны по своему содержанию." },
            { title: "Шрифт", text: "<strong>Основной текст:</strong> Times New Roman, кегль – 12, обычного начертания.<br><strong>Сноски:</strong> Times New Roman, кегль – 10, обычного начертания." },
            { title: "Объем - 30 000 знаков", text: "Не учитываются сноски, пробелы, титульный лист, перечень сокращений.<br><br>При превышении требований к количеству знаков в работе Оргкомитет оставляет за собой право аннулировать результаты работы команды или применить иные санкции в виде снижения общего балла за работу." },
            { title: "Поля и абзацы", text: "Интервал междустрочный основного текста – 1,5; сносок – 1,15; отступ первой строки абзаца – 1 см, без интервалов между абзацами.<br><br>Требования к параметрам страницы: поля: верхнее – 1,5 см, нижнее – 1 см, левое – 2 см, правое – 1 см." },
            { title: "Наименования документов и письма", text: "Тема письма:<br><strong>РЕШЕНИЕ ЗАДАНИЯ. Название команды</strong><br>Названия документов:<br><strong>«Название команды. Решение отборочного этапа»</strong>" },
            { title: "Анонимность работы", text: "Участникам запрещается обозначать в тексте работы название команды, наименование учебного учреждения, имена участников или каким-либо иным образом нарушать анонимность представленного ответа." },
            { title: "Изображения", text: "<strong>Допускается</strong> включение в текст решения изображений, например: картографических материалов, схемы и иные похожие графические элементы.<br><br><strong>Не допускается</strong> включение в текст решения работы изображений, на которых будет присутствовать текст, непосредственно относящийся к решению командой задания." },
            { title: "Самостоятельность работы", text: "Работа должна быть подготовлена каждой командой самостоятельно, заимствование решений у других команд недопустимо.<br><br>В заключительный этап проходят пять команд, набравшие наибольшее количество баллов по итогам отборочного этапа." }
        ]
    }
};

// Initialize files
if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
}
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Deep merge: ensures nested objects (hero.desktop, hero.mobile, etc.) are preserved
function deepMerge(defaults, overrides) {
    const result = { ...defaults };
    for (const key of Object.keys(overrides)) {
        if (
            overrides[key] && typeof overrides[key] === 'object' && !Array.isArray(overrides[key]) &&
            defaults[key] && typeof defaults[key] === 'object' && !Array.isArray(defaults[key])
        ) {
            result[key] = deepMerge(defaults[key], overrides[key]);
        } else if (overrides[key] === '' && defaults[key] && defaults[key] !== '') {
            // Don't let empty saved strings overwrite non-empty defaults
            result[key] = defaults[key];
        } else if (Array.isArray(overrides[key]) && overrides[key].length === 0 && Array.isArray(defaults[key]) && defaults[key].length > 0) {
            // Don't let empty saved arrays overwrite non-empty default arrays
            result[key] = defaults[key];
        } else {
            result[key] = overrides[key];
        }
    }
    return result;
}

// Helper functions
function getContent() {
    try {
        const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
        // Deep merge with defaults to ensure ALL nested fields exist
        const result = deepMerge(defaultContent, content);
        // Always use default partners (logos are bundled with the code, not editable via admin)
        result.partners = defaultContent.partners;
        return result;
    } catch {
        return defaultContent;
    }
}

function saveContent(data) {
    console.log('Saving content to:', CONTENT_FILE);
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('Content saved successfully');
}

function getSubmissions() {
    try {
        return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
    } catch {
        return [];
    }
}

function saveSubmissions(data) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ============ CONTENT API ============

app.get('/api/content', (req, res) => {
    res.json(getContent());
});

app.post('/api/content', authMiddleware, (req, res) => {
    try {
        saveContent(req.body);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save' });
    }
});

app.get('/api/default', (req, res) => {
    res.json(defaultContent);
});

app.post('/api/reset', authMiddleware, (req, res) => {
    try {
        saveContent(defaultContent);
        res.json({ success: true, content: defaultContent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset' });
    }
});

// ============ SUBMISSIONS API ============

app.post('/api/submissions', (req, res) => {
    try {
        const submissions = getSubmissions();
        const newSubmission = {
            id: Date.now().toString(),
            ...req.body,
            status: 'new',
            createdAt: new Date().toISOString()
        };
        submissions.unshift(newSubmission);
        saveSubmissions(submissions);
        res.json({ success: true, id: newSubmission.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save submission' });
    }
});

app.get('/api/submissions', authMiddleware, (req, res) => {
    res.json(getSubmissions());
});

app.patch('/api/submissions/:id', authMiddleware, (req, res) => {
    try {
        const submissions = getSubmissions();
        const index = submissions.findIndex(s => s.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Not found' });
        submissions[index] = { ...submissions[index], ...req.body };
        saveSubmissions(submissions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

app.delete('/api/submissions/:id', authMiddleware, (req, res) => {
    try {
        let submissions = getSubmissions();
        submissions = submissions.filter(s => s.id !== req.params.id);
        saveSubmissions(submissions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

app.get('/api/submissions/export', authMiddleware, (req, res) => {
    const submissions = getSubmissions();
    const headers = ['ID', 'Дата', 'Команда', 'Email', 'Телефон', 'Вуз', 'Капитан', 'Участник 2', 'Участник 3', 'Участник 4', 'Тренер', 'Статус'];
    const rows = submissions.map(s => [
        s.id, new Date(s.createdAt).toLocaleString('ru-RU'),
        s.teamName || '', s.email || '', s.phone || '', s.university || '',
        s.captain || '', s.member2 || '', s.member3 || '', s.member4 || '', s.coach || '', s.status
    ]);
    const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');
    res.send('\uFEFF' + csv);
});

// ============ IMAGES API ============

app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : `http://localhost:${PORT}`;
    res.json({ success: true, path: `/uploads/${req.file.filename}`, url: `${baseUrl}/uploads/${req.file.filename}` });
});

app.get('/api/images', (req, res) => {
    try {
        const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
            ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
            : `http://localhost:${PORT}`;
        const images = fs.existsSync(UPLOADS_DIR)
            ? fs.readdirSync(UPLOADS_DIR).filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)).map(f => ({
                name: f, path: `/uploads/${f}`, url: `${baseUrl}/uploads/${f}`
            }))
            : [];
        res.json(images);
    } catch (error) {
        res.json([]);
    }
});

// ============ AUTH ============

app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: ADMIN_PASSWORD });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-app', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Data: ${DATA_DIR}, Uploads: ${UPLOADS_DIR}`);
});
