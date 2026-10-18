import { ogCard, ogSize } from '@/lib/og'

export const alt = 'Hi, I’m Donna. Sahil’s AI assistant.'
export const size = ogSize
export const contentType = 'image/png'

export default function OpengraphImage() {
  return ogCard({
    big: ["HI, I'M", 'DONNA.'],
    tagline: "SAHIL'S AI ASSISTANT. I MAKE THE CALLS.",
    footer: 'DONNAPAULSON@SAHILSHAH.IN',
  })
}
