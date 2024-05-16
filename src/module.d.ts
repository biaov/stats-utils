/**
 * 选项
 */
interface Option {
  label: string
  value: string | number
}

namespace Utils {
  export interface TextStyle {
    fontSize: number
    fontFamily: string
  }
}

namespace ExpressHTTP {
  export type { Request, Response } from 'express'
}
