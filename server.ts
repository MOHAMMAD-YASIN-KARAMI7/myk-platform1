import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { dbRepository } from './src/database/index.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database Repository (SQLite)
  try {
    await dbRepository.init();
    console.log('[MYK DB] SQLite database repository initialized successfully.');
  } catch (err) {
    console.error('[MYK DB] Database initialization error:', err);
  }

  // Middleware
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Request Sanitization Helper to prevent XSS
  const sanitize = (str: string): string => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim();
  };

  // Simple Email Regex Validation
  const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // ----------------------------------------------------
  // API ROUTES
  // ----------------------------------------------------

  // Health Check Endpoint
  app.get('/api/health', async (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      platform: 'MYK Platform v1.0',
      owner: 'Mohammad Yasin Karami',
      timestamp: new Date().toISOString(),
      database: 'SQLite (Prisma-Ready Abstracted Repository)',
    });
  });

  // POST Contact Message Endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          error: 'All fields (name, email, subject, message) are required.',
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
      }

      const clientIp =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.socket.remoteAddress ||
        '127.0.0.1';

      // Sanitize inputs
      const sanitizedName = sanitize(name);
      const sanitizedEmail = sanitize(email);
      const sanitizedSubject = sanitize(subject);
      const sanitizedMessage = sanitize(message);

      // Save to SQLite via abstracted repository
      const newMessage = await dbRepository.createContactMessage({
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        ipAddress: clientIp,
      });

      console.log(`[MYK Contact] New message received from ${sanitizedEmail} (${newMessage.id})`);

      return res.status(201).json({
        success: true,
        message: 'Message stored successfully.',
        data: newMessage,
      });
    } catch (error) {
      console.error('[MYK Contact] Error saving message:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to process message in database.',
      });
    }
  });

  // GET All Contact Messages (Database Inspection)
  app.get('/api/contact', async (req: Request, res: Response) => {
    try {
      const messages = await dbRepository.getContactMessages();
      return res.json({
        success: true,
        count: messages.length,
        messages,
      });
    } catch (error) {
      console.error('[MYK Contact] Error fetching messages:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch contact messages.',
      });
    }
  });

  // PATCH Message Status (Mark Read/Unread)
  app.patch('/api/contact/:id/status', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['UNREAD', 'READ', 'ARCHIVED'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status value.' });
      }

      const updated = await dbRepository.updateContactMessageStatus(id, status);
      return res.json({ success: true, data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to update message status.' });
    }
  });

  // POST Admin Login Authentication
  app.post('/api/admin/login', async (req: Request, res: Response) => {
    try {
      const { email, passcode } = req.body;
      if (passcode === '1390') {
        return res.json({
          success: true,
          message: 'Admin authenticated successfully.',
          role: 'ADMIN',
          adminEmail: email || 'officiallcapitanyasin@gmail.com',
        });
      }
      return res.status(401).json({
        success: false,
        error: 'اطلاعات ورودی یا رمز عبور مدیر نامعتبر است.',
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Server authentication error.' });
    }
  });

  // Serve static public assets explicitly if requested
  app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
  });

  app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'manifest.json'));
  });

  // Vite Middleware for development vs. Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MYK Platform] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
