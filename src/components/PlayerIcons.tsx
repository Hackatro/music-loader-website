interface IconProps {
  color?: string
}

export function PrevIcon({ color = 'white' }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="2.5" height="14" rx="1" />
      <polygon points="17,3 7,10 17,17" />
    </svg>
  )
}

export function NextIcon({ color = 'white' }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <rect x="14.5" y="3" width="2.5" height="14" rx="1" />
      <polygon points="3,3 13,10 3,17" />
    </svg>
  )
}

export function PlayIcon({ color = 'white' }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <polygon points="4,2 18,10 4,18" />
    </svg>
  )
}

export function PauseIcon({ color = 'white' }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="4" height="14" rx="1" />
      <rect x="12" y="3" width="4" height="14" rx="1" />
    </svg>
  )
}
