const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const LISTS_FILE = path.join(DATA_DIR, 'lists.json');
const TEMP_FILE = path.join(DATA_DIR, 'lists.tmp.json');

const DEFAULT_LISTS = {
  theme: ['Faerie', 'Circus', 'Steampunk'],
  style: ['Fourrure', 'Sportwear', 'Gothique'],
  color: ['Gold', 'Néon', 'Pastel'],
  twist: ['Sneakers only', 'Cheveux courts', 'En 2 pièces'],
};

const VALID_LISTS = ['theme', 'style', 'color', 'twist'];

class ListService {
  constructor() {
    this.lists = this.loadLists();
  }

  loadLists() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LISTS_FILE)) {
      this.saveLists(DEFAULT_LISTS);
      return { ...DEFAULT_LISTS };
    }
    const data = fs.readFileSync(LISTS_FILE, 'utf-8');
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('lists.json is corrupted, falling back to defaults:', e);
      this.saveLists(DEFAULT_LISTS);
      return { ...DEFAULT_LISTS };
    }
  }

  saveLists(lists) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(TEMP_FILE, JSON.stringify(lists || this.lists, null, 2));
    fs.renameSync(TEMP_FILE, LISTS_FILE);
  }

  getAll() {
    return this.lists;
  }

  getList(name) {
    return this.lists[name] || null;
  }

  addItem(list, item) {
    if (!VALID_LISTS.includes(list)) return false;
    this.lists[list].push(item);
    this.saveLists();
    return true;
  }

  removeItem(list, item) {
    if (!VALID_LISTS.includes(list)) return false;
    const index = this.lists[list].findIndex(
      (entry) => entry.toLowerCase() === item.toLowerCase()
    );
    if (index === -1) return false;
    this.lists[list].splice(index, 1);
    this.saveLists();
    return true;
  }

  findItem(item) {
    const found = [];
    for (const [listName, entries] of Object.entries(this.lists)) {
      if (entries.some((entry) => entry.toLowerCase() === item.toLowerCase())) {
        found.push(listName);
      }
    }
    return found;
  }

  getRandomCombo() {
    for (const name of VALID_LISTS) {
      if (!this.lists[name] || this.lists[name].length === 0) {
        return null;
      }
    }
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    return {
      theme: pick(this.lists.theme),
      style: pick(this.lists.style),
      color: pick(this.lists.color),
      twist: pick(this.lists.twist),
    };
  }
}

module.exports = ListService;
