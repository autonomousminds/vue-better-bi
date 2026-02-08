const KEYWORDS = new Set([
  'import', 'export', 'from', 'const', 'let', 'var', 'function',
  'default', 'return', 'ref', 'true', 'false', 'null', 'undefined',
]);

const VUE_TAGS = new Set([
  'script', 'template', 'style', 'setup',
]);

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function wrap(cls: string, text: string): string {
  return `<span class="tok-${cls}">${esc(text)}</span>`;
}

/**
 * Simple tokenizer that splits a line into typed tokens.
 * Processes left-to-right so tokens never overlap.
 */
interface Token {
  type: 'keyword' | 'tag' | 'attr' | 'string' | 'number' | 'comment' | 'plain' | 'punctuation';
  text: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    // Single-line comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', text: line.slice(i) });
      return tokens;
    }

    // Strings (single or double quotes)
    if (line[i] === "'" || line[i] === '"') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++; // skip escaped
        j++;
      }
      j++; // include closing quote
      tokens.push({ type: 'string', text: line.slice(i, j) });
      i = j;
      continue;
    }

    // Template literal backticks
    if (line[i] === '`') {
      let j = i + 1;
      while (j < line.length && line[j] !== '`') {
        if (line[j] === '\\') j++;
        j++;
      }
      j++;
      tokens.push({ type: 'string', text: line.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      // Make sure it's not part of an identifier
      if (j < line.length && /[a-zA-Z_]/.test(line[j])) {
        // Part of identifier, treat as plain
        while (j < line.length && /\w/.test(line[j])) j++;
        tokens.push({ type: 'plain', text: line.slice(i, j) });
      } else {
        tokens.push({ type: 'number', text: line.slice(i, j) });
      }
      i = j;
      continue;
    }

    // Words (identifiers and keywords)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\w$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', text: word });
      } else if (VUE_TAGS.has(word)) {
        tokens.push({ type: 'tag', text: word });
      } else {
        tokens.push({ type: 'plain', text: word });
      }
      i = j;
      continue;
    }

    // HTML/Vue tags: < or </ or />
    if (line[i] === '<') {
      // Could be <ComponentName or </template> etc.
      const isClosing = line[i + 1] === '/';
      const start = i;
      i += isClosing ? 2 : 1;

      // Read tag name
      let tagName = '';
      while (i < line.length && /[\w-]/.test(line[i])) {
        tagName += line[i];
        i++;
      }
      if (tagName) {
        tokens.push({ type: 'punctuation', text: line.slice(start, start + (isClosing ? 2 : 1)) });
        tokens.push({ type: 'tag', text: tagName });
        continue;
      }
      // Not a tag, just a < character
      tokens.push({ type: 'plain', text: line[start] });
      i = start + 1;
      continue;
    }

    // Vue binding attributes :prop= or @event=
    if ((line[i] === ':' || line[i] === '@') && /[a-zA-Z]/.test(line[i + 1] || '')) {
      let j = i;
      while (j < line.length && /[\w.:@-]/.test(line[j])) j++;
      tokens.push({ type: 'attr', text: line.slice(i, j) });
      i = j;
      continue;
    }

    // /> closing
    if (line[i] === '/' && line[i + 1] === '>') {
      tokens.push({ type: 'punctuation', text: '/>' });
      i += 2;
      continue;
    }

    // > closing
    if (line[i] === '>') {
      tokens.push({ type: 'punctuation', text: '>' });
      i++;
      continue;
    }

    // Default: single character as plain
    tokens.push({ type: 'plain', text: line[i] });
    i++;
  }

  return tokens;
}

function renderTokens(tokens: Token[]): string {
  return tokens.map(t => {
    switch (t.type) {
      case 'keyword': return wrap('keyword', t.text);
      case 'tag': return wrap('tag', t.text);
      case 'attr': return wrap('attr', t.text);
      case 'string': return wrap('string', t.text);
      case 'number': return wrap('number', t.text);
      case 'comment': return wrap('comment', t.text);
      default: return esc(t.text);
    }
  }).join('');
}

/**
 * Highlight a Vue SFC code string.
 * Returns HTML with <span class="tok-*"> wrapped tokens.
 */
export function highlightVueSFC(code: string): string {
  return code
    .split('\n')
    .map(line => renderTokens(tokenizeLine(line)))
    .join('\n');
}
