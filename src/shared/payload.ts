import config from '@/admin/payload.config'
import { getPayload } from 'payload'

export const getAppPayload = () => getPayload({ config })
