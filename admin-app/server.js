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

// Serve static files
app.use(express.static('public'));
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
        badge: "II Открытый студенческий конкурс 2026",
        title: "MSU Open Urban Law Cup",
        subtitle: "Кубок МГУ по земельному и градостроительному праву имени О.И. Крассова",
        description: "Командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства",
        finalsDate: "18 апреля 2026",
        finalsLocation: "МГУ им. М.В. Ломоносова",
        backgroundImage: "images/photos/0430.jpg"
    },
    about: {
        label: "О мероприятии",
        title: "О конкурсе",
        text1: "<strong>Кубок МГУ по земельному и градостроительному праву</strong> — это командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства.",
        text2: "Конкурс проводится при поддержке Юридического факультета МГУ имени М.В. Ломоносова и Коллегии адвокатов «Регионсервис».",
        image: "images/photos/0480.jpg"
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
        title: "Жюри конкурса",
        members: [
            { name: "Иванов Иван Иванович", position: "Профессор МГУ", photo: "" },
            { name: "Петров Пётр Петрович", position: "Партнёр Регионсервис", photo: "" }
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
                { name: "Юридический факультет МГУ", logo: "images/partners/юридический факультет.webp" },
                { name: "Регионсервис", logo: "images/partners/регионсервис.webp" }
            ]
        },
        support: {
            title: "При поддержке",
            items: [
                { name: "Правительство Москвы", logo: "images/partners/правительство.webp" },
                { name: "Минстрой", logo: "images/partners/минстрой.webp" },
                { name: "Росреестр", logo: "images/partners/росреестр.webp" }
            ]
        },
        partners: {
            title: "Партнёры конкурса",
            items: []
        },
        infoPartnerMain: {
            title: "Генеральный информационный партнёр",
            items: [
                { name: "Право.ru", logo: "images/partners/право.webp" }
            ]
        },
        infoPartners: {
            title: "Информационные партнёры",
            items: []
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
    }
};

// Initialize files
if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
}
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Helper functions
function getContent() {
    try {
        const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
        // Merge with defaults to ensure all fields exist
        return { ...defaultContent, ...content };
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Admin server running on port ${PORT}`);
    console.log(`Data: ${DATA_DIR}, Uploads: ${UPLOADS_DIR}`);
});
