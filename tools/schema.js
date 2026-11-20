// A tiny schema checker for the site's YAML data (no dependencies). Each schema is a function
// (value, path, errors) => void that pushes { path, message } for every problem it finds, so the build can
// report all mistakes at once with the YAML line they're on. Schemas for each data file are in schemas.js.

const kind = (v) => (v === null ? 'null' : Array.isArray(v) ? 'list' : typeof v === 'object' ? 'mapping' : typeof v);
const show = (v) => (typeof v === 'string' ? JSON.stringify(v) : kind(v) === 'mapping' || kind(v) === 'list' ? `a ${kind(v)}` : String(v));
const fail = (errors, path, message) => errors.push({ path, message });

const OPTIONAL = Symbol('optional');

/** Any string, including "". */
export const str = (v, path, errors) => {
  if (typeof v !== 'string') fail(errors, path, `expected text, got ${show(v)}`);
};

/** A non-empty string without leading/trailing spaces (names, ids, labels). */
export const text = (v, path, errors) => {
  if (typeof v !== 'string') return fail(errors, path, `expected text, got ${show(v)}`);
  if (!v.trim()) return fail(errors, path, 'expected text, got an empty string');
  if (v !== v.trim()) fail(errors, path, `${show(v)} has leading or trailing spaces`);
};

/** Any number (integer or decimal, may be negative). */
export const num = (v, path, errors) => {
  if (typeof v !== 'number' || !Number.isFinite(v)) fail(errors, path, `expected a number, got ${show(v)}`);
};

/** A whole number ≥ 0 (amounts, counts, values in units). */
export const count = (v, path, errors) => {
  if (!Number.isInteger(v) || v < 0) fail(errors, path, `expected a whole number ≥ 0, got ${show(v)}`);
};

export const bool = (v, path, errors) => {
  if (typeof v !== 'boolean') fail(errors, path, `expected true or false, got ${show(v)}`);
};

/** One of a fixed set of values. */
export const oneOf = (...values) => (v, path, errors) => {
  if (!values.includes(v)) fail(errors, path, `expected one of ${values.map(show).join(', ')}, got ${show(v)}`);
};

/** `null` or the given schema. */
export const nullable = (schema) => (v, path, errors) => {
  if (v !== null) schema(v, path, errors);
};

/** Marks a field of `obj` as optional (it may be left out entirely). */
export const optional = (schema) => Object.assign((v, path, errors) => schema(v, path, errors), { [OPTIONAL]: true });

/** The first schema that accepts the value wins. */
export const either = (...schemas) => (v, path, errors) => {
  const tries = schemas.map((s) => {
    const e = [];
    s(v, path, e);
    return e;
  });
  if (tries.some((e) => !e.length)) return;
  errors.push(...tries.sort((a, b) => a.length - b.length)[0]);
};

/** A list whose items all match `schema`. */
export const list = (schema, { min = 0 } = {}) => (v, path, errors) => {
  if (!Array.isArray(v)) return fail(errors, path, `expected a list, got ${show(v)}`);
  if (v.length < min) fail(errors, path, `expected at least ${min} item${min === 1 ? '' : 's'}, got ${v.length}`);
  v.forEach((x, i) => schema(x, [...path, i], errors));
};

/** A fixed-length list, e.g. [name, amount] or [min, max]. */
export const tuple = (...schemas) => (v, path, errors) => {
  if (!Array.isArray(v)) return fail(errors, path, `expected a list of ${schemas.length}, got ${show(v)}`);
  if (v.length !== schemas.length) return fail(errors, path, `expected a list of ${schemas.length}, got ${v.length} items`);
  schemas.forEach((s, i) => s(v[i], [...path, i], errors));
};

/** A mapping with exactly these keys (missing required keys and unknown keys are errors). */
export const obj = (fields) => (v, path, errors) => {
  if (kind(v) !== 'mapping') return fail(errors, path, `expected a mapping with ${Object.keys(fields).join(', ')}, got ${show(v)}`);
  for (const [k, schema] of Object.entries(fields)) {
    if (k in v) schema(v[k], [...path, k], errors);
    else if (!schema[OPTIONAL]) fail(errors, path, `missing "${k}"`);
  }
  for (const k of Object.keys(v)) {
    if (!(k in fields)) fail(errors, [...path, k], `unknown key "${k}" (expected ${Object.keys(fields).join(', ')})`);
  }
};

/** A mapping with free-form keys whose values all match `schema` (optionally restricting the keys). */
export const record = (schema, keySchema = text) => (v, path, errors) => {
  if (kind(v) !== 'mapping') return fail(errors, path, `expected a mapping, got ${show(v)}`);
  for (const [k, x] of Object.entries(v)) {
    keySchema(k, [...path, k], errors);
    schema(x, [...path, k], errors);
  }
};

/** [item name, amount] pairs, used by every recipe / cost list. */
export const cost = list(tuple(text, count));

/** Validate a whole data file against its schema map ({ exportName: schema }). */
export function validateFile(data, fileSchema) {
  const errors = [];
  obj(fileSchema)(data, [], errors);
  return errors;
}
