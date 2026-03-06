/**
 * Formula evaluator for totalAgg expressions like "=sum(col_a) / sum(col_b) - 1"
 *
 * Supports:
 * - Aggregation functions: sum, mean, median, min, max, count, countDistinct
 * - Bare column references (uses that column's totalAgg or default 'sum')
 * - Arithmetic: + - * / ( )
 */

import type { TableColumnConfig, ColumnSummaryItem } from '../types/table.types';
import { aggregateColumn } from './tableUtils';

const SUPPORTED_AGGS = ['sum', 'mean', 'median', 'min', 'max', 'count', 'countDistinct'] as const;
type SupportedAgg = (typeof SUPPORTED_AGGS)[number];

export function isFormula(totalAgg: string | undefined): totalAgg is string {
  return typeof totalAgg === 'string' && totalAgg.startsWith('=');
}

/**
 * Evaluates a formula string against data rows.
 * Returns the computed numeric result, or null on error.
 */
export function evaluateFormula(
  formula: string,
  data: Record<string, unknown>[],
  columns: TableColumnConfig[],
  columnSummary: ColumnSummaryItem[],
): number | null {
  try {
    const expr = formula.slice(1).trim(); // strip leading '='
    const resolved = resolveReferences(expr, data, columns, columnSummary);
    if (resolved === null) return null;
    return evalArithmetic(resolved);
  } catch {
    console.warn(`[formulaUtils] Failed to evaluate formula: ${formula}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Reference resolution
// ---------------------------------------------------------------------------

/**
 * Replaces `agg(column_id)` and bare `column_id` tokens with numeric values.
 * Returns a string containing only numbers and arithmetic operators, or null on failure.
 */
function resolveReferences(
  expr: string,
  data: Record<string, unknown>[],
  columns: TableColumnConfig[],
  columnSummary: ColumnSummaryItem[],
): string | null {
  // Build a set of known column ids for matching
  const columnIds = new Set(columnSummary.map((c) => c.id));

  // 1) Replace agg(column_id) patterns – e.g. sum(current_ggr)
  const aggPattern = new RegExp(
    `(${SUPPORTED_AGGS.join('|')})\\(\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\)`,
    'g',
  );

  let result = expr.replace(aggPattern, (_match, agg: string, colId: string) => {
    const val = computeAgg(agg as SupportedAgg, colId, data, columnSummary);
    if (val === null) return 'NaN';
    return String(val);
  });

  // 2) Replace remaining bare column identifiers
  //    We match word-boundary-delimited identifiers that are known column ids
  //    but NOT preceded by a digit (to avoid matching parts of numbers).
  const barePattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
  result = result.replace(barePattern, (match, colId: string) => {
    if (!columnIds.has(colId)) return match; // leave unknown tokens (could be leftover from agg names – shouldn't happen)
    // Use the column's own totalAgg, default to 'sum'
    const colConfig = columns.find((c) => c.id === colId);
    const agg = (colConfig?.totalAgg && !isFormula(colConfig.totalAgg) ? colConfig.totalAgg : 'sum') as SupportedAgg;
    const val = computeAgg(agg, colId, data, columnSummary);
    if (val === null) return 'NaN';
    return String(val);
  });

  // Validate: only numbers, operators, parens, whitespace, dots, minus signs, NaN
  if (/[a-df-zA-DF-Z_]/.test(result.replace(/NaN/g, ''))) {
    console.warn(`[formulaUtils] Unresolved tokens in expression: ${result}`);
    return null;
  }

  if (result.includes('NaN')) return null;

  return result;
}

function computeAgg(
  agg: SupportedAgg,
  colId: string,
  data: Record<string, unknown>[],
  columnSummary: ColumnSummaryItem[],
): number | null {
  const colSummary = columnSummary.find((c) => c.id === colId);
  const colType = colSummary?.type ?? 'number';
  const val = aggregateColumn(data, colId, agg, colType);
  if (val === null || val === undefined || val === '-') return null;
  return Number(val);
}

// ---------------------------------------------------------------------------
// Safe arithmetic evaluator (recursive descent parser)
// Supports: + - * / ( ) and unary minus
// ---------------------------------------------------------------------------

function evalArithmetic(expr: string): number {
  const tokens = tokenize(expr);
  let pos = 0;

  function peek(): string | undefined {
    return tokens[pos];
  }

  function consume(expected?: string): string {
    const tok = tokens[pos];
    if (expected && tok !== expected) {
      throw new Error(`Expected '${expected}' but got '${tok}'`);
    }
    pos++;
    return tok;
  }

  // expr = term (('+' | '-') term)*
  function parseExpr(): number {
    let val = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseTerm();
      val = op === '+' ? val + right : val - right;
    }
    return val;
  }

  // term = factor (('*' | '/') factor)*
  function parseTerm(): number {
    let val = parseFactor();
    while (peek() === '*' || peek() === '/') {
      const op = consume();
      const right = parseFactor();
      val = op === '*' ? val * right : val / right;
    }
    return val;
  }

  // factor = NUMBER | '(' expr ')' | unary-minus factor
  function parseFactor(): number {
    if (peek() === '(') {
      consume('(');
      const val = parseExpr();
      consume(')');
      return val;
    }
    if (peek() === '-') {
      consume();
      return -parseFactor();
    }
    const tok = consume();
    const num = Number(tok);
    if (isNaN(num)) throw new Error(`Invalid number: ${tok}`);
    return num;
  }

  const result = parseExpr();
  if (pos < tokens.length) {
    throw new Error(`Unexpected token: ${tokens[pos]}`);
  }
  return result;
}

/**
 * Tokenizes an arithmetic expression into numbers and operator tokens.
 */
function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, '');

  while (i < s.length) {
    const ch = s[i];

    if ('+-*/()'.includes(ch)) {
      // Handle negative numbers: a '-' is part of a number if it's at the start
      // or follows an operator or '('
      if (
        ch === '-' &&
        (tokens.length === 0 || '+-*/('.includes(tokens[tokens.length - 1]))
      ) {
        // Read as negative number
        let num = '-';
        i++;
        while (i < s.length && (s[i] >= '0' && s[i] <= '9' || s[i] === '.' || s[i] === 'e' || s[i] === 'E')) {
          num += s[i];
          i++;
        }
        if (num === '-') {
          // It's a unary minus not followed by a number – push as operator
          tokens.push('-');
        } else {
          tokens.push(num);
        }
      } else {
        tokens.push(ch);
        i++;
      }
    } else if ((ch >= '0' && ch <= '9') || ch === '.') {
      let num = '';
      while (i < s.length && (s[i] >= '0' && s[i] <= '9' || s[i] === '.' || s[i] === 'e' || s[i] === 'E')) {
        num += s[i];
        i++;
      }
      tokens.push(num);
    } else {
      // Skip unexpected chars
      i++;
    }
  }

  return tokens;
}
