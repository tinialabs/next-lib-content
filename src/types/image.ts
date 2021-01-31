export type SizeHintType =
  | 'avatarSmall'
  | 'avatarMedium'
  | 'avatarLarge'
  | 'full'
  | 'narrow'
  | 'regular'
  | 'seo'

export interface INovelaImage {
  src: string
  alt: string
  width?: number
  height?: number
  sizeHint?: SizeHintType
  aspectRatio?:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'widescreen'
    | 'panorama'
    | number
}
