declare module 'liquid-glass-react' {
  import { ReactNode, RefObject } from 'react'

  interface LiquidGlassProps {
    children?: ReactNode
    displacementScale?: number
    blurAmount?: number
    saturation?: number
    aberrationIntensity?: number
    elasticity?: number
    cornerRadius?: number
    padding?: string
    mouseContainer?: RefObject<HTMLElement> | null
    onClick?: (e: React.MouseEvent) => void
    style?: React.CSSProperties
    className?: string
  }

  const LiquidGlass: React.FC<LiquidGlassProps>
  export default LiquidGlass
}
