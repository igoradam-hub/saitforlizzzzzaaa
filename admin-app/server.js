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

// CORS - разрешаем запросы с основного сайта
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
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
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
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

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Default content
const defaultContent = {
    hero: {
        badge: "II Открытый студенческий конкурс 2026",
        title: "Кубок МГУ по земельному и градостроительному праву",
        subtitle: "Командное соревнование студентов по разработке решений спорных правовых ситуаций",
        name: "имени О.И. Крассова",
        date: "18 апреля 2026",
        location: "МГУ им. М.В. Ломоносова"
    },
    stats: [
        { number: "14", label: "Регионов России" },
        { number: "170+", label: "Участников" },
        { number: "58", label: "Команд" },
        { number: "22", label: "Вуза" }
    ]
};

// Initialize files
if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
}
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Helper functions
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

// ============ API Routes ============

// Get content (public)
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

// ============ SUBMISSIONS API ============

// Submit registration (public - from main site)
app.post('/api/submissions', (req, res) => {
    try {
        const submissions = getSubmissions();
        const newSubmission = {
            id: Date.now().toString(),
            ...req.body,
            status: 'new',
            createdAt: new Date().toISOString(),
            notes: ''
        };
        submissions.unshift(newSubmission);
        saveSubmissions(submissions);
        res.json({ success: true, message: 'Заявка отправлена!', id: newSubmission.id });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сохранения заявки' });
    }
});

// Get all submissions (protected)
app.get('/api/submissions', authMiddleware, (req, res) => {
    try {
        const submissions = getSubmissions();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load submissions' });
    }
});

// Update submission status (protected)
app.patch('/api/submissions/:id', authMiddleware, (req, res) => {
    try {
        const submissions = getSubmissions();
        const index = submissions.findIndex(s => s.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        submissions[index] = { ...submissions[index], ...req.body };
        saveSubmissions(submissions);
        res.json({ success: true, submission: submissions[index] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

// Delete submission (protected)
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

// Get submissions stats (protected)
app.get('/api/submissions/stats', authMiddleware, (req, res) => {
    try {
        const submissions = getSubmissions();
        const stats = {
            total: submissions.length,
            new: submissions.filter(s => s.status === 'new').length,
            reviewed: submissions.filter(s => s.status === 'reviewed').length,
            approved: submissions.filter(s => s.status === 'approved').length,
            rejected: submissions.filter(s => s.status === 'rejected').length
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get stats' });
    }
});

// Export submissions as CSV (protected)
app.get('/api/submissions/export', authMiddleware, (req, res) => {
    try {
        const submissions = getSubmissions();
        const headers = ['ID', 'Дата', 'Команда', 'Email', 'Телефон', 'Вуз', 'Капитан', 'Участник 2', 'Участник 3', 'Участник 4', 'Тренер', 'Статус'];
        const rows = submissions.map(s => [
            s.id,
            new Date(s.createdAt).toLocaleString('ru-RU'),
            s.teamName || '',
            s.email || '',
            s.phone || '',
            s.university || '',
            s.captain || '',
            s.member2 || '',
            s.member3 || '',
            s.member4 || '',
            s.coach || '',
            s.status
        ]);

        const csv = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');
        res.send('\uFEFF' + csv); // BOM for Excel
    } catch (error) {
        res.status(500).json({ error: 'Export failed' });
    }
});

// ============ IMAGES API ============

// Upload image (protected)
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file' });
        }
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
        if (!fs.existsSync(UPLOADS_DIR)) {
            return res.json([]);
        }
        const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
            ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
            : `http://localhost:${PORT}`;
        const images = fs.readdirSync(UPLOADS_DIR)
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

// ============ AUTH API ============

app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: ADMIN_PASSWORD });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Reset content (protected)
app.post('/api/reset', authMiddleware, (req, res) => {
    try {
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
        res.json({ success: true, message: 'Content reset', content: defaultContent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset' });
    }
});

// Serve admin panel
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Admin server running on port ${PORT}`);
    console.log(`Data directory: ${DATA_DIR}`);
    console.log(`Uploads directory: ${UPLOADS_DIR}`);
});
