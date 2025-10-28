import { ACCESS_TOKEN_KEY } from '@client/constants'
import { treaty } from '@elysiajs/eden'

import type { app } from '@server'
const domain = window.location.origin
export const api = treaty<typeof app>(domain, {
  onRequest() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    }
  }
})
