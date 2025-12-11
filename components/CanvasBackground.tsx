'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface Candlestick {
  x: number
  open: number
  close: number
  high: number
  low: number
  width: number
  isBullish: boolean
  isNew: boolean
  targetAmplitude: number
  currentStep: number
  stepValues: number[]
  stepStartTime: number
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const isDark = theme === 'dark'
    const backgroundColor = isDark ? '#0a1628' : '#B8C5D1'
    const gridColor = isDark ? 'rgba(100, 110, 130, 0.15)' : 'rgba(150, 160, 175, 0.25)'
    const redColor = isDark ? '#ff4444' : '#DC143C'
    const greenColor = isDark ? '#00ff88' : '#00c853'
    const glowColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.15)'

    const candlesticks: Candlestick[] = []
    const candlestickWidth = 30
    const spacing = 30
    const chartPadding = 80
    const chartHeight = canvas.height - chartPadding * 2
    const chartWidth = canvas.width - chartPadding * 2
    const maxCandlesticks = Math.min(30, Math.floor(chartWidth / (candlestickWidth + spacing)))
    const centerY = canvas.height / 2
    const rightMargin = canvas.width / 6

    let backgroundCanvas: HTMLCanvasElement | null = null
    let backgroundCtx: CanvasRenderingContext2D | null = null
    let lastBackgroundSize = { width: 0, height: 0 }

    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
    const createBackground = () => {
      if (
        backgroundCanvas &&
        lastBackgroundSize.width === canvas.width &&
        lastBackgroundSize.height === canvas.height
      ) {
        return
      }

      if (!backgroundCanvas) {
        backgroundCanvas = document.createElement('canvas')
        backgroundCtx = backgroundCanvas.getContext('2d', { alpha: false })
        if (!backgroundCtx) return
      }
      
      if (!backgroundCtx) return

      backgroundCanvas.width = canvas.width
      backgroundCanvas.height = canvas.height
      lastBackgroundSize = { width: canvas.width, height: canvas.height }

      backgroundCtx.fillStyle = backgroundColor
      backgroundCtx.fillRect(0, 0, canvas.width, canvas.height)

      const glowGradient = backgroundCtx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        Math.max(canvas.width, canvas.height) * 0.8
      )
      glowGradient.addColorStop(0, glowColor)
      glowGradient.addColorStop(0.5, isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.05)')
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      backgroundCtx.fillStyle = glowGradient
      backgroundCtx.fillRect(0, 0, canvas.width, canvas.height)

      backgroundCtx.strokeStyle = gridColor
      backgroundCtx.lineWidth = 1
      backgroundCtx.setLineDash([2, 4])

      for (let i = 0; i <= 5; i++) {
        const y = chartPadding + (chartHeight / 5) * i
        backgroundCtx.beginPath()
        backgroundCtx.moveTo(chartPadding, y)
        backgroundCtx.lineTo(canvas.width - chartPadding, y)
        backgroundCtx.stroke()
      }

      backgroundCtx.setLineDash([])
    }

    const initializeCandlesticks = () => {
      candlesticks.length = 0
      let currentPrice = centerY

      for (let i = 0; i < maxCandlesticks; i++) {
        const x = chartPadding + i * (candlestickWidth + spacing)
        const isBullish = Math.random() > 0.5
        const priceChange = (Math.random() - 0.5) * 135
        const open = currentPrice
        const close = currentPrice + priceChange
        const high = Math.max(open, close) + Math.random() * 67.5
        const low = Math.min(open, close) - Math.random() * 67.5

        candlesticks.push({
          x,
          open,
          close,
          high,
          low,
          width: candlestickWidth,
          isBullish,
          isNew: false,
          targetAmplitude: 0,
          currentStep: 5,
          stepValues: [close, close, close, close, close, close],
          stepStartTime: 0,
        })

        currentPrice = close
      }
    }

    initializeCandlesticks()
    createBackground()

    const drawCandlesticks = () => {
      const bullishCandles = candlesticks.filter(c => c.isBullish)
      const bearishCandles = candlesticks.filter(c => !c.isBullish)

      const drawWicks = (candles: Candlestick[], color: string) => {
        if (candles.length === 0) return
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        candles.forEach(candle => {
          ctx.moveTo(candle.x + candle.width / 2, candle.low)
          ctx.lineTo(candle.x + candle.width / 2, candle.high)
        })
        ctx.stroke()
      }

      drawWicks(bullishCandles, redColor)
      drawWicks(bearishCandles, greenColor)

      const drawBodies = (candles: Candlestick[], color: string, stroke: boolean) => {
        ctx.fillStyle = color
        if (stroke) {
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
        }
        candles.forEach(candle => {
          const bodyTop = Math.min(candle.open, candle.close)
          const bodyBottom = Math.max(candle.open, candle.close)
          const bodyHeight = Math.max(bodyBottom - bodyTop, 3)
          ctx.fillRect(candle.x, bodyTop, candle.width, bodyHeight)
          if (stroke) ctx.strokeRect(candle.x, bodyTop, candle.width, bodyHeight)
        })
      }

      drawBodies(bullishCandles, redColor, false)
      drawBodies(bearishCandles, greenColor, true)
    }

    let scrollAccumulator = 0
    const scrollStep = candlestickWidth + spacing

    const scrollCandlesticks = (deltaTime: number) => {
      scrollAccumulator += 0.12 * deltaTime
      
      if (scrollAccumulator >= scrollStep) {
        scrollAccumulator = 0
        
        candlesticks.forEach((candle) => {
          candle.x -= scrollStep
        })

        while (candlesticks.length > 0 && candlesticks[0].x + candlesticks[0].width < chartPadding) {
          candlesticks.shift()
        }
      }
    }

    let animationFrame: number
    let lastFrameTime = performance.now()
    let lastCandleCreationTime = performance.now()
    const candleCreationInterval = 125

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastFrameTime, 16)
      lastFrameTime = currentTime

      if (backgroundCanvas) {
        ctx.drawImage(backgroundCanvas, 0, 0)
      } else {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      const minY = canvas.height / 6
      const maxY = canvas.height * 5 / 6

      if (currentTime - lastCandleCreationTime >= candleCreationInterval) {
        const targetX = canvas.width - rightMargin
        const lastCandle = candlesticks.length > 0 ? candlesticks[candlesticks.length - 1] : null
        
        if (candlesticks.length === 0 || (lastCandle && lastCandle.x < targetX - 50)) {
          let open = lastCandle ? lastCandle.close : centerY
          const marginThreshold = (maxY - minY) * 0.1
          const touchTopMargin = lastCandle && (lastCandle.close >= maxY || lastCandle.close > (maxY - marginThreshold))
          const touchBottomMargin = lastCandle && (lastCandle.close <= minY || lastCandle.close < (minY + marginThreshold))
          
          let isBullish: boolean
          let targetAmplitude: number
          
          if (touchTopMargin) {
            open = clamp(lastCandle.close, minY, maxY)
            isBullish = !lastCandle.isBullish
            const maxAmplitude = (maxY - minY) * 0.15
            targetAmplitude = -Math.random() * maxAmplitude
          } else if (touchBottomMargin) {
            open = clamp(lastCandle.close, minY, maxY)
            isBullish = !lastCandle.isBullish
            const maxAmplitude = (maxY - minY) * 0.15
            targetAmplitude = Math.random() * maxAmplitude
          } else {
            open = clamp(open, minY, maxY)
            const maxAmplitude = (maxY - minY) * 0.15
            targetAmplitude = (Math.random() - 0.5) * maxAmplitude * 2
            isBullish = targetAmplitude > 0
          }
          
          const stepValues: number[] = []
          for (let i = 0; i < 5; i++) {
            const randomValue = targetAmplitude > 0 ? Math.random() * targetAmplitude : Math.random() * Math.abs(targetAmplitude) + targetAmplitude
            stepValues.push(clamp(open + randomValue, minY, maxY))
          }
          stepValues.push(clamp(open + targetAmplitude, minY, maxY))

          candlesticks.push({
            x: targetX, open, close: open, high: open, low: open, width: candlestickWidth, isBullish,
            isNew: true, targetAmplitude, currentStep: 0, stepValues, stepStartTime: currentTime,
          })
        }
        lastCandleCreationTime = currentTime
      }

      scrollCandlesticks(deltaTime)

      candlesticks.forEach((candle) => {
        if (candle.isNew && candle.currentStep < 6) {
          const stepDuration = 15.625
          if (currentTime - candle.stepStartTime >= stepDuration) {
            candle.currentStep++
            if (candle.currentStep < 6) {
              candle.stepStartTime = currentTime
              const newClose = clamp(candle.stepValues[candle.currentStep], minY, maxY)
              candle.close = newClose
              candle.isBullish = newClose > candle.open
              candle.high = clamp(Math.max(candle.open, newClose) + Math.random() * 30, minY, maxY)
              candle.low = clamp(Math.min(candle.open, newClose) - Math.random() * 30, minY, maxY)
            } else {
              candle.isNew = false
              candle.currentStep = 5
            }
          }
        }
        candle.open = clamp(candle.open, minY, maxY)
        candle.close = clamp(candle.close, minY, maxY)
        candle.high = clamp(candle.high, minY, maxY)
        candle.low = clamp(candle.low, minY, maxY)
      })

      drawCandlesticks()
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [theme])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: theme === 'dark' ? 0.7 : 0.85,
          filter: 'blur(20px)',
          WebkitFilter: 'blur(20px)',
        }}
      />
    </div>
  )
}
