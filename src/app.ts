/// <reference path="./module.d.ts" />
import express from 'express'
import { router } from '@/router'
import { baseURL, port } from '@/config'

export const app = express()

app.use(baseURL, router)

import.meta.env.PROD && app.listen(port)