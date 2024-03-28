import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from 'yaml'

const chars = { Lj: 'Љ', lj: 'љ', Nj: 'Њ', nj: 'њ', Dž: 'Џ', dž: 'џ', A: 'А', a: 'а', B: 'Б', b: 'б', V: 'В', v: 'в', G: 'Г', g: 'г', D: 'Д', d: 'д', Đ: 'Ђ', đ: 'ђ', E: 'Е', e: 'е', Ž: 'Ж', ž: 'ж', Z: 'З', z: 'з', I: 'И', i: 'и', J: 'Ј', j: 'ј', K: 'К', k: 'к', L: 'Л', l: 'л', M: 'М', m: 'м', N: 'Н', n: 'н', O: 'О', o: 'о', P: 'П', p: 'п', R: 'Р', r: 'р', S: 'С', s: 'с', T: 'Т', t: 'т', Ć: 'Ћ', ć: 'ћ', U: 'У', u: 'у', F: 'Ф', f: 'ф', H: 'Х', h: 'х', C: 'Ц', c: 'ц', Č: 'Ч', č: 'ч', Š: 'Ш', š: 'ш' }
const lock = [
  'meta.title',
  'where.links.gpx',
  'where.links.gmaps',
  'when.age',
  'when.descriptionA',
  'rsvp.title',
]
const __dirname = dirname(fileURLToPath(import.meta.url))
const path = type => join(__dirname, '../locales', `sr-${type}-RS.yml`)
const latn = parse(fs.readFileSync(path('Latn'), 'utf8'))
const orig = parse(fs.readFileSync(path('Cyrl'), 'utf8'))
const cyrl = recursiveReplace(latn)

fs.writeFileSync(path('Cyrl'), stringify(cyrl))

function recursiveReplace(obj, pk) {
  const result = {}
  for (const key in obj) {
    const parentKey = pk ? `${pk}.${key}` : key
    if (lock.includes(parentKey))
      result[key] = get(orig, parentKey)
    else if (typeof obj[key] === 'string')
      result[key] = convert(obj[key])
    else
      result[key] = recursiveReplace(obj[key], parentKey)
  }
  return result
}

function convert(str) {
  return str.replace(
    new RegExp(Object.keys(chars).join('|'), 'gi'),
    match => chars[match],
  )
}

function get(obj, path) {
  if (!path)
    return undefined
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  const result = pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj)
  return result
}
