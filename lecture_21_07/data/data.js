import path from "path"
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

export const findPath = () => path.resolve(__dirname, 'data.js');

// __dirname - где лежит теукущий файл
// process.cwd() - откуда запустили программу
// path.resolve() - построй абсолютный путь (по умолчанию начиная от process.cwd())
