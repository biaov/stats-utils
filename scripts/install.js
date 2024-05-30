import { existsSync, cpSync } from 'fs'
import { resolve } from 'path'

const { dirname } = import.meta

const srcPath = resolve(dirname, '../.env')
const destPath = resolve(dirname, '../.env.development')
existsSync(srcPath) && !existsSync(destPath) && cpSync(srcPath, destPath)
