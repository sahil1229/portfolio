import { ogCard, ogSize } from '@/lib/og'

export const alt = 'Hi, I’m Sahil. I build things. They work. Usually.'
export const size = ogSize
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard({
    big: ["HI, I'M", 'SAHIL.'],
    tagline: 'I BUILD THINGS. THEY WORK. USUALLY.',
    footer: 'SDE 1 @ AMAZON · SAHILSHAH.IN',
  })
}
