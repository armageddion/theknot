export const SECTIONS = ['welcome', 'where', 'when', 'what', 'gift', 'rsvp'] as const
export const IMAGES = Array.from({ length: 35 }, (_, i) => `/media/md/${i + 1}.jpg`)
export const VIDEOS = Array.from({ length: 7 }, (_, i) => `/media/lg/${99 - i}.mp4`)

export const venmo = 'https://venmo.com/u/Armageddion'
export const paypal = 'https://www.paypal.com/qrcodes/p2pqrc/VZAZRNJESBTX2'
