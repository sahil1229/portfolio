import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

const font = (file: string) => readFile(join(process.cwd(), 'assets/fonts', file))

/** Shared link-preview card: two big lines, a tagline and a footer, in Geist Mono. */
export async function ogCard({ big, tagline, footer }: { big: [string, string]; tagline: string; footer: string }) {
  const [bold, regular] = await Promise.all([font('GeistMono-Bold.ttf'), font('GeistMono-Regular.ttf')])
  const bigStyle = { fontSize: 140, fontWeight: 700, lineHeight: 1, letterSpacing: -7 }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 88px',
          background: '#f2f0eb',
          color: '#000',
          borderLeft: '32px solid #000',
          fontFamily: 'Geist Mono',
        }}
      >
        <div style={bigStyle}>{big[0]}</div>
        <div style={bigStyle}>{big[1]}</div>
        <div style={{ fontSize: 40, marginTop: 44, letterSpacing: -1 }}>{tagline}</div>
        <div style={{ fontSize: 28, marginTop: 28, opacity: 0.55 }}>{footer}</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Geist Mono', data: bold, weight: 700, style: 'normal' },
        { name: 'Geist Mono', data: regular, weight: 400, style: 'normal' },
      ],
    },
  )
}
