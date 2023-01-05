import {
  Field,
  generateFieldWithDefaultState,
  CellState,
  fieldGenerator,
  Coords,
} from '../../core/Field'
import { useEffect, useState } from 'react'
import { LevelNames, GameSettings } from 'src/modules/GameSettings'
import { openCell } from '../../core/openCell'
import { setFlag } from '../../core/setFlag'
interface ReturnType {
  level: LevelNames
  isGameOver: boolean
  isWin: boolean
  settings: [number, number]
  playerField: Field
  gameField: Field
  time: number
  flagCounter: number
  onClick: (coords: Coords) => void
  onContextMenu: (coords: Coords) => void
  onChangeLevel: (level: LevelNames) => void
  onReset: () => void
}

export const useGame = (): ReturnType => {
  const [level, setLevel] = useState<LevelNames>('beginner')

  const [isGameOver, setIsGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [time, setTime] = useState(0)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [flagCounter, setFlagCounter] = useState(0)

  const setGameOver = (isSolved = false) => {
    setIsGameOver(true)
    setIsWin(isSolved)
  }

  const [size, bombs] = GameSettings[level]

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  )

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  )

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isGameStarted) {
      interval = setTimeout(() => {
        setTime(time + 1)
      }, 1000)

      if (isGameOver) {
        clearInterval(interval)
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [isGameOver, isGameStarted, time])

  const onClick = (coords: Coords) => {
    !isGameStarted && setIsGameStarted(true)

    try {
      const [newPlayerField, isSolved] = openCell(
        coords,
        playerField,
        gameField
      )
      if (isSolved) {
        setGameOver(isSolved)
      }
      setPlayerField([...newPlayerField])
    } catch (e) {
      setPlayerField([...gameField])
      setGameOver(false)
    }
  }

  const onContextMenu = (coords: Coords) => {
    !isGameStarted && setIsGameStarted(true)

    const [newPlayerField, isSolved, newFlagCounter] = setFlag(
      coords,
      playerField,
      gameField,
      flagCounter,
      bombs
    )

    setFlagCounter(newFlagCounter)

    if (isSolved) {
      setGameOver(isSolved)
    }
    setPlayerField([...newPlayerField])
  }

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size))
    const newPlayerField = generateFieldWithDefaultState(size, CellState.hidden)

    setGameField([...newGameField])
    setPlayerField([...newPlayerField])
    setIsGameOver(false)
    setIsWin(false)
    setIsGameStarted(false)
    setTime(0)
  }

  const onChangeLevel = (level: LevelNames) => {
    setLevel(level)
    const newSettings = GameSettings[level]
    resetHandler(newSettings)
  }

  const onReset = () => resetHandler([size, bombs])

  return {
    level,
    isGameOver,
    isWin,
    settings: [size, bombs],
    playerField,
    gameField,
    time,
    flagCounter,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset,
  }
}
