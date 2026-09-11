// Search matches stored values, but people type what the table shows: a
// date rendered as "Nov 20/25" or a number as "1,234". searchNeedles turns
// the query into every stored form it could mean; a cell matches when it
// contains any of them. The backend applies the same rules for server-paged
// tables (datasources/search_needles.go), so both paths agree.

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

function monthIndex(name: string): number {
  if (name.length < 3) return -1;
  return MONTHS.findIndex((m) => m.startsWith(name));
}

// Two-digit years follow the same rule as Go's time.Parse: 69-99 → 19xx.
function year4(y: string): number {
  if (y.length === 4) return Number(y);
  const n = Number(y);
  return n >= 69 ? 1900 + n : 2000 + n;
}

const pad = (n: number) => String(n).padStart(2, '0');

function isoDay(y: number, m: number, d: number): string | null {
  if (m < 0) return null;
  const dt = new Date(Date.UTC(y, m, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m || dt.getUTCDate() !== d) return null;
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function isoMonth(y: number, m: number): string | null {
  if (m < 0 || m > 11) return null;
  return `${y}-${pad(m + 1)}-`;
}

export function searchNeedles(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const out = new Set<string>([q]);
  const add = (n: string | null) => { if (n) out.add(n); };
  let m: RegExpMatchArray | null;

  // "nov 20/25", "nov 20/2025", "nov 20, 2025", "november 20 2025"
  if ((m = q.match(/^([a-z]{3,9})\.?\s+(\d{1,2})(?:\/|,\s*|\s+)(\d{2}|\d{4})$/))) {
    add(isoDay(year4(m[3]), monthIndex(m[1]), Number(m[2])));
  }
  // "20 nov 2025", "20 nov 25", "20 november 2025"
  if ((m = q.match(/^(\d{1,2})\s+([a-z]{3,9})\.?\s+(\d{2}|\d{4})$/))) {
    add(isoDay(year4(m[3]), monthIndex(m[2]), Number(m[1])));
  }
  // "2025-11-20", "2025/11/20"
  if ((m = q.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/))) {
    add(isoDay(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  }
  // "11/20/2025" or "20/11/2025": both readings, the table's format decides which shows
  if ((m = q.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/))) {
    add(isoDay(Number(m[3]), Number(m[1]) - 1, Number(m[2])));
    add(isoDay(Number(m[3]), Number(m[2]) - 1, Number(m[1])));
  }
  // Month granularity: "nov 2025", "nov 25", "2025-11", "11/2025"
  if ((m = q.match(/^([a-z]{3,9})\.?\s+(\d{2}|\d{4})$/))) add(isoMonth(year4(m[2]), monthIndex(m[1])));
  if ((m = q.match(/^(\d{4})-(\d{1,2})$/))) add(isoMonth(Number(m[1]), Number(m[2]) - 1));
  if ((m = q.match(/^(\d{1,2})\/(\d{4})$/))) add(isoMonth(Number(m[2]), Number(m[1]) - 1));

  // A date still being typed: "nov 20", "nov 20/2", "20 nov", "11/20" match
  // that month and day in any year via the "-MM-DD" fragment of a stored date.
  add(partialDateNeedle(q));

  // "1,234.5" → "1234.5"
  if (q.includes(',') && /^-?[\d,]+(\.\d+)?$/.test(q)) out.add(q.replace(/,/g, ''));

  return [...out];
}

// True when the cell's text contains any needle.
export function matchesSearch(value: unknown, needles: string[]): boolean {
  if (value == null || needles.length === 0) return false;
  const text = String(value).toLowerCase();
  return needles.some((n) => text.includes(n));
}


function partialDateNeedle(q: string): string | null {
  let month = 0;
  let day = 0;
  let m: RegExpMatchArray | null;
  if ((m = q.match(/^([a-z]{3,9})\.?\s+(\d{1,2})(?:[/,\s]+(\d{0,4}))?$/))) {
    if (m[3] && (m[3].length === 2 || m[3].length === 4)) return null; // a complete year is a full date
    month = monthIndex(m[1]) + 1;
    day = Number(m[2]);
  } else if ((m = q.match(/^(\d{1,2})\s+([a-z]{3,9})\.?$/))) {
    month = monthIndex(m[2]) + 1;
    day = Number(m[1]);
  } else if ((m = q.match(/^(\d{1,2})\/(\d{1,2})$/))) {
    month = Number(m[1]);
    day = Number(m[2]);
    if (month > 12 && day <= 12) [month, day] = [day, month];
  } else {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return `-${pad(month)}-${pad(day)}`;
}
