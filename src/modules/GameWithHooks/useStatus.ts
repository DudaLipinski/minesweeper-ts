import { useState } from 'react'

export interface Return {
  isGameOver: boolean
  isGameStarted: boolean
  isWin: boolean
  setNewGame: () => void
  setInProgress: () => void
  setGameWin: () => void
  setGameLoose: () => void
}

export enum GameStatuses {
  newGame,
  inProgress,
  Win,
  Loose,
}

export const useStatus = (): Return => {
  const { newGame, inProgress, Win, Loose } = GameStatuses

  const [isGameOver, setIsGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)

  const setGameStatus = (status: GameStatuses) => {
    setIsGameStarted(status === inProgress)
    setIsWin(status === Win)
    setIsGameOver([Win, Loose].includes(status))
  }

  const setNewGame = () => setGameStatus(newGame)
  const setInProgress = () => setGameStatus(inProgress)
  const setGameWin = () => setGameStatus(Win)
  const setGameLoose = () => setGameStatus(Loose)

  return {
    isGameStarted,
    isWin,
    isGameOver,
    setNewGame,
    setInProgress,
    setGameWin,
    setGameLoose,
  }
}
