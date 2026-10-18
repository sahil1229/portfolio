import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Hi, I’m Sahil. I build things. They work. Usually.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const font = (file: string) => readFile(join(process.cwd(), 'assets/fonts', file))

export default async function OpengraphImage() {
  const [bold, regular] = await Promise.all([font('GeistMono-Bold.ttf'), font('GeistMono-Regular.ttf')])

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
          background: '#fff',
          color: '#000',
          borderLeft: '32px solid #000',
          fontFamily: 'Geist Mono',
        }}
      >
        <div style={{ fontSize: 140, fontWeight: 700, lineHeight: 1, letterSpacing: -7 }}>HI, I&apos;M</div>
        <div style={{ fontSize: 140, fontWeight: 700, lineHeight: 1, letterSpacing: -7 }}>SAHIL.</div>
        <div style={{ fontSize: 40, marginTop: 44, letterSpacing: -1 }}>I BUILD THINGS. THEY WORK. USUALLY.</div>
        <div style={{ fontSize: 28, marginTop: 28, opacity: 0.55 }}>SDE 1 @ AMAZON · SAHILSHAH.IN</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist Mono', data: bold, weight: 700, style: 'normal' },
        { name: 'Geist Mono', data: regular, weight: 400, style: 'normal' },
      ],
    },
  )
}
