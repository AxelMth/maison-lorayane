/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const hostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined

const nextConfig = {
  images: {
    remotePatterns: hostname
      ? [
          {
            protocol: 'https',
            hostname,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['app', 'components', 'lib', 'pages', 'utils'],
  },
}

export default nextConfig
