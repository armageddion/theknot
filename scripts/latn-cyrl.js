import fs from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from 'yaml'

const map = { A: 'А', a: 'а', B: 'Б', b: 'б', V: 'В', v: 'в', G: 'Г', g: 'г', D: 'Д', d: 'д', Đ: 'Ђ', đ: 'ђ', E: 'Е', e: 'е', Ž: 'Ж', ž: 'ж', Z: 'З', z: 'з', I: 'И', i: 'и', J: 'Ј', j: 'ј', K: 'К', k: 'к', L: 'Л', l: 'л', Lj: 'Љ', lj: 'љ', M: 'М', m: 'м', N: 'Н', n: 'н', Nj: 'Њ', nj: 'њ', O: 'О', o: 'о', P: 'П', p: 'п', R: 'Р', r: 'р', S: 'С', s: 'с', T: 'Т', t: 'т', Ć: 'Ћ', ć: 'ћ', U: 'У', u: 'у', F: 'Ф', f: 'ф', H: 'Х', h: 'х', C: 'Ц', c: 'ц', Č: 'Ч', č: 'ч', Dž: 'Џ', dž: 'џ', Š: 'Ш', š: 'ш' }

const __dirname = dirname(fileURLToPath(import.meta.url))

const path = type => join(__dirname, '../locales', `sr-${type}-RS.yml`)

const latn = parse(fs.readFileSync(path('Latn'), 'utf8'))

const cyrl = recursiveReplace(latn)

fs.writeFileSync(path('Cyrl'), stringify(cyrl))

function recursiveReplace(obj) {
  const result = {}
  for (const key in obj) {
    if (typeof obj[key] === 'string')
      result[key] = obj[key].split('').map(char => map[char] || char).join('')
    else
      result[key] = recursiveReplace(obj[key])
  }
  return result
}
