// import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif'],
  },
  sassOptions: {
    includePaths: ['./src'],
    additionalData: `@use 'app/(my-app)/_variables' as *;`,
  },
}

// export default withPayload(nextConfig)
export default nextConfig
