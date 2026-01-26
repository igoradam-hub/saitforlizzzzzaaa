const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS - разрешаем запросы с основного сайта
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (admin panel and uploaded images)
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

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
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
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
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images allowed'));
        }
    }
});

// Content file
const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Default content
const defaultContent = {
    hero: {
        badge: "II Открытый студенческий конкурс 2025",
        title: "Кубок МГУ по <span>земельному</span> и <span>градостроительному</span> праву",
        subtitle: "Командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства",
        name: "имени О.И. Крассова",
        date: "12 апреля 2025",
        location: "МГУ им. М.В. Ломоносова"
    },
    about: {
        title: "О конкурсе",
        text1: "<strong>Кубок МГУ по земельному и градостроительному праву</strong> — это командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства.",
        text2: "Конкурс проводится при поддержке Юридического факультета МГУ имени М.В. Ломоносова и Коллегии адвокатов «Регионсервис»."
    },
    goals: [
        { icon: "trophy", title: "Практический опыт", text: "Решение реальных кейсов из судебной практики" },
        { icon: "users", title: "Командная работа", text: "Развитие навыков работы в команде юристов" },
        { icon: "star", title: "Экспертная оценка", text: "Обратная связь от ведущих практиков" },
        { icon: "award", title: "Карьерные возможности", text: "Стажировки в ведущих юридических компаниях" }
    ],
    winners: [
        { place: "1", team: "Команда «Правовой навигатор»", university: "МГУ имени М.В. Ломоносова" },
        { place: "2", team: "Команда «Lex Urbana»", university: "СПбГУ" },
        { place: "3", team: "Команда «Территория права»", university: "МГЮА" }
    ],
    stats: [
        { number: "10+", label: "Регионов России" },
        { number: "200+", label: "Участников" },
        { number: "15", label: "Команд в финале" },
        { number: "5", label: "Экспертов жюри" }
    ],
    quote: {
        text: "Конкурс даёт студентам уникальную возможность погрузиться в реальную юридическую практику.",
        author: "Профессор О.И. Крассов",
        position: "Основатель конкурса"
    },
    finals: {
        date: "12 апреля 2025 года",
        location: "Юридический факультет МГУ им. М.В. Ломоносова, г. Москва",
        format: "Очное командное соревнование с решением практических кейсов",
        jury: "Экспертное жюри из ведущих практикующих юристов и преподавателей"
    },
    contacts: {
        address: "г. Москва, Ленинские горы, д. 1, стр. 13\nЮридический факультет МГУ",
        email: "urbanlawcup@law.msu.ru",
        phone: "+7 (495) 939-10-00",
        telegram: "https://t.me/urbanlawcup",
        vk: "https://vk.com/urbanlawcup"
    },
    cta: {
        title: "Готовы принять участие?",
        text: "Присоединяйтесь к лучшим студентам-юристам России"
    }
};

// Initialize content file
if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
}

// ============ API Routes ============

// Get content (public - для основного сайта)
app.get('/api/content', (req, res) => {
    try {
        const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
        res.json(content);
    } catch (error) {
        res.json(defaultContent);
    }
});

// Update content (protected)
app.post('/api/content', authMiddleware, (req, res) => {
    try {
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2), 'utf8');
        res.json({ success: true, message: 'Content updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save' });
    }
});

// Upload image (protected)
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file' });
        }
        // Return full URL for the uploaded image
        const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
            ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
            : `http://localhost:${PORT}`;
        const imagePath = `${baseUrl}/uploads/${req.file.filename}`;
        res.json({ success: true, path: imagePath, filename: req.file.filename });
    } catch (error) {
        res.status(500).json({ error: 'Upload failed' });
    }
});

// Get images list
app.get('/api/images', (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            return res.json([]);
        }
        const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
            ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
            : `http://localhost:${PORT}`;
        const images = fs.readdirSync(uploadsDir)
            .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
            .map(f => ({
                name: f,
                path: `${baseUrl}/uploads/${f}`,
                filename: f
            }));
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list images' });
    }
});

// Auth check
app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: ADMIN_PASSWORD });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Serve admin panel (redirect root to admin)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Admin server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to access admin panel`);
});
