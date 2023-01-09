import {
  Field,
  generateFieldWithDefaultState,
  CellState,
  fieldGenerator,
  Coords,
} from '../../core/Field'
import { useState } from 'react'
import { LevelNames } from 'src/modules/GameSettings'
import { openCell } from '../../core/openCell'
import { setFlag } from '../../core/setFlag'
import { useTime } from './useTime'
import { useStatus } from './useStatus'
import { useSettings } from './useSettings'
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
  const {
    isGameStarted,
    isWin,
    isGameOver,
    setNewGame,
    setInProgress,
    setGameWin,
    setGameLoose,
  } = useStatus()

  const {
    settings: [size, bombs],
    level,
    setLevel,
  } = useSettings()

  const [time, resetTime] = useTime(isGameStarted, isGameOver)
  const [flagCounter, setFlagCounter] = useState(0)

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  )

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  )

  const onClick = (coords: Coords) => {
    !isGameStarted && setInProgress()

    try {
      const [newPlayerField, isSolved] = openCell(
        coords,
        playerField,
        gameField
      )
      if (isSolved) {
        setGameWin()
      }
      setPlayerField([...newPlayerField])
    } catch (e) {
      setPlayerField([...gameField])
      setGameLoose()
    }
  }

  const onContextMenu = (coords: Coords) => {
    !isGameStarted && setInProgress()

    const [newPlayerField, isSolved, newFlagCounter] = setFlag(
      coords,
      playerField,
      gameField,
      flagCounter,
      bombs
    )

    setFlagCounter(newFlagCounter)

    if (isSolved) {
      setGameWin()
    }
    setPlayerField([...newPlayerField])
  }

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size))
    const newPlayerField = generateFieldWithDefaultState(size, CellState.hidden)

    setGameField([...newGameField])
    setPlayerField([...newPlayerField])
    setNewGame()
    resetTime()
  }

  const onChangeLevel = (level: LevelNames) => {
    const newSettings = setLevel(level)
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
