const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// Simple auth middleware (в продакшене используйте более надежную аутентификацию!)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'msu2025admin';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Multer config for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'images', 'uploads');
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
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Content file path
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
        location: "МГУ им. М.В. Ломоносова",
        backgroundImage: "images/photos/0450.jpg"
    },
    about: {
        title: "О конкурсе",
        text1: "<strong>Кубок МГУ по земельному и градостроительному праву</strong> — это командное соревнование студентов по разработке решений спорных правовых ситуаций, связанных с актуальными проблемами применения земельного и градостроительного законодательства.",
        text2: "Конкурс проводится при поддержке Юридического факультета МГУ имени М.В. Ломоносова и Коллегии адвокатов «Регионсервис». Участники получают уникальную возможность применить теоретические знания на практике и получить обратную связь от ведущих экспертов отрасли.",
        image: "images/photos/0D3A6970.jpg"
    },
    goals: [
        { icon: "trophy", title: "Практический опыт", text: "Решение реальных кейсов из судебной практики" },
        { icon: "users", title: "Командная работа", text: "Развитие навыков работы в команде юристов" },
        { icon: "star", title: "Экспертная оценка", text: "Обратная связь от ведущих практиков" },
        { icon: "award", title: "Карьерные возможности", text: "Стажировки в ведущих юридических компаниях" }
    ],
    winners: [
        { place: "1", team: "Команда «Правовой навигатор»", university: "МГУ имени М.В. Ломоносова", image: "images/photos/0440.jpg" },
        { place: "2", team: "Команда «Lex Urbana»", university: "СПбГУ", image: "images/photos/0069.jpg" },
        { place: "3", team: "Команда «Территория права»", university: "МГЮА", image: "images/photos/0195.jpg" }
    ],
    stats: [
        { number: "10+", label: "Регионов России" },
        { number: "200+", label: "Участников" },
        { number: "15", label: "Команд в финале" },
        { number: "5", label: "Экспертов жюри" }
    ],
    quote: {
        text: "Конкурс даёт студентам уникальную возможность погрузиться в реальную юридическую практику и понять, как работают механизмы земельного и градостроительного права в современных условиях.",
        author: "Профессор О.И. Крассов",
        position: "Основатель конкурса"
    },
    finals: {
        date: "12 апреля 2025 года",
        location: "Юридический факультет МГУ им. М.В. Ломоносова, г. Москва",
        format: "Очное командное соревнование с решением практических кейсов",
        jury: "Экспертное жюри из ведущих практикующих юристов и преподавателей",
        image: "images/photos/0D3A6970.jpg"
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
        text: "Присоединяйтесь к лучшим студентам-юристам России и покажите свои знания в области земельного и градостроительного права"
    }
};

// Initialize content file if doesn't exist
if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
}

// API Routes

// Get all content
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
        const newContent = req.body;
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(newContent, null, 2), 'utf8');
        res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// Update specific section (protected)
app.patch('/api/content/:section', authMiddleware, (req, res) => {
    try {
        const { section } = req.params;
        const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
        content[section] = { ...content[section], ...req.body };
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
        res.json({ success: true, message: `Section "${section}" updated` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update section' });
    }
});

// Upload image (protected)
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imagePath = `images/uploads/${req.file.filename}`;
        res.json({ success: true, path: imagePath });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Get list of uploaded images
app.get('/api/images', (req, res) => {
    try {
        const uploadsDir = path.join(__dirname, 'images', 'uploads');
        const photosDir = path.join(__dirname, 'images', 'photos');

        let images = [];

        if (fs.existsSync(uploadsDir)) {
            const uploads = fs.readdirSync(uploadsDir)
                .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
                .map(f => ({ name: f, path: `images/uploads/${f}`, type: 'upload' }));
            images = images.concat(uploads);
        }

        if (fs.existsSync(photosDir)) {
            const photos = fs.readdirSync(photosDir)
                .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
                .map(f => ({ name: f, path: `images/photos/${f}`, type: 'original' }));
            images = images.concat(photos);
        }

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

// Serve admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Main site: http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
