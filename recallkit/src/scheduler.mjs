/** RecallKit review scheduler: intentionally small, explainable, and dependency free. */
export function todayISO(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}
function isValidISODate(iso) {
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [year, month, day] = iso.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= days[month - 1];
}
export function addDays(iso, days) {
  if (!isValidISODate(iso)) throw new TypeError('Invalid ISO date');
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new TypeError('Invalid date');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
const VALID_RATINGS = new Set(['again', 'hard', 'good', 'easy']);
const FIELD_LIMITS = { subject: 60, question: 600, answer: 4000 };
function trimmed(value, name) {
  if (typeof value !== 'string') throw new TypeError(`${name} must be a string`);
  const result = value.trim();
  if (!result || result.length > FIELD_LIMITS[name]) throw new RangeError(`Invalid ${name} length`);
  return result;
}
export function createCard({ id, subject, question, answer }, date = todayISO()) {
  if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{6,100}$/.test(id)) throw new TypeError('Invalid ID');
  return {id, subject: trimmed(subject, 'subject'), question: trimmed(question, 'question'),
    answer: trimmed(answer, 'answer'), createdAt: date, updatedAt: date, due: date,
    interval: 0, streak: 0, reviews: 0, lastRating: null, history: []};
}
export function isDue(card, date = todayISO()) { return card.due <= date; }
export function dueCards(cards, date = todayISO()) {
  return cards.filter(card => isDue(card, date)).sort((a,b) => a.due.localeCompare(b.due) || a.createdAt.localeCompare(b.createdAt));
}
/** A transparent interval scheduler, not a claim of equivalence with FSRS/SM-2. */
export function scheduleReview(card, rating, date = todayISO()) {
  if (!VALID_RATINGS.has(rating)) throw new TypeError('Invalid rating');
  const previous = Math.max(0, Number(card.interval) || 0);
  const interval = rating === 'again' ? 0 : rating === 'hard' ? 1
    : rating === 'good' ? (previous ? Math.max(previous + 1, Math.ceil(previous * 1.8)) : 3)
    : (previous ? Math.max(previous + 1, Math.ceil(previous * 2.3)) : 7);
  const streak = rating === 'again' ? 0 : (Number(card.streak) || 0) + 1;
  const history = [...(Array.isArray(card.history) ? card.history : []), {date, rating}].slice(-200);
  return {...card, interval, due: addDays(date, interval), streak,
    reviews: (Number(card.reviews) || 0) + 1, lastRating: rating, updatedAt: date, history};
}
export function validateCards(data) {
  if (!Array.isArray(data) || data.length > 20000) throw new TypeError('Expected an array of up to 20000 cards');
  const ids = new Set();
  return data.map(raw => {
    if (!raw || typeof raw !== 'object') throw new TypeError('Invalid card');
    const createdAt = isValidISODate(raw.createdAt) ? raw.createdAt : todayISO();
    const card = createCard(raw, createdAt);
    if (ids.has(card.id)) throw new TypeError('Duplicate card ID');
    ids.add(card.id);
    if (raw.due !== undefined && !isValidISODate(raw.due)) throw new TypeError('Invalid due date in imported card');
    const due = raw.due === undefined ? card.due : raw.due;
    const history = Array.isArray(raw.history) ? raw.history.filter(v => v && isValidISODate(v.date) && VALID_RATINGS.has(v.rating)).slice(-200) : [];
    return {...card, due, interval: Number.isSafeInteger(raw.interval) && raw.interval >= 0 ? raw.interval : 0,
      streak: Number.isSafeInteger(raw.streak) && raw.streak >= 0 ? raw.streak : 0,
      reviews: Number.isSafeInteger(raw.reviews) && raw.reviews >= 0 ? raw.reviews : 0,
      updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : card.updatedAt,
      lastRating: VALID_RATINGS.has(raw.lastRating) ? raw.lastRating : null, history};
  });
}
