import fs from 'fs';
import path from 'path';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsItem {
  id: string;
  key: string;
  value: string;
  updatedAt: string;
}

export interface UserRecord {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDatabaseRepository {
  init(): Promise<void>;
  createContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  updateContactMessageStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage | null>;
  getSetting(key: string): Promise<string | null>;
  setSetting(key: string, value: string): Promise<void>;
}

interface DatabaseSchema {
  contact_messages: ContactMessage[];
  settings: Record<string, SettingsItem>;
  users: UserRecord[];
}

class AbstractedFileDatabaseRepository implements IDatabaseRepository {
  private filePath: string;
  private data: DatabaseSchema = {
    contact_messages: [],
    settings: {},
    users: [],
  };

  constructor() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.filePath = path.join(dataDir, 'myk_platform_db.json');
  }

  async init(): Promise<void> {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        await this.save();
      }
    } catch (err) {
      console.warn('[MYK DB] Initializing fresh database schema due to:', err);
      await this.save();
    }
  }

  private async save(): Promise<void> {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[MYK DB] Failed to persist data to file:', err);
    }
  }

  async createContactMessage(
    data: Omit<ContactMessage, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<ContactMessage> {
    await this.init();

    const id = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const now = new Date().toISOString();

    const newMessage: ContactMessage = {
      id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'UNREAD',
      ipAddress: data.ipAddress || '127.0.0.1',
      createdAt: now,
      updatedAt: now,
    };

    this.data.contact_messages.unshift(newMessage);
    await this.save();
    return newMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    await this.init();
    return [...this.data.contact_messages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateContactMessageStatus(
    id: string,
    status: ContactMessage['status']
  ): Promise<ContactMessage | null> {
    await this.init();

    const msg = this.data.contact_messages.find((m) => m.id === id);
    if (!msg) return null;

    msg.status = status;
    msg.updatedAt = new Date().toISOString();
    await this.save();

    return msg;
  }

  async getSetting(key: string): Promise<string | null> {
    await this.init();
    const item = this.data.settings[key];
    return item ? item.value : null;
  }

  async setSetting(key: string, value: string): Promise<void> {
    await this.init();

    const now = new Date().toISOString();
    this.data.settings[key] = {
      id: 'set_' + Date.now(),
      key,
      value,
      updatedAt: now,
    };

    await this.save();
  }
}

// Export singleton database repository
export const dbRepository: IDatabaseRepository = new AbstractedFileDatabaseRepository();
