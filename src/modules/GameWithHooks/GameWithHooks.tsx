import { Wrapper } from '../../components/Game/Wrapper'
import { Top } from '../../components/Top/Top'
import {
  generateFieldWithDefaultState,
  CellState,
  Field,
  Coords,
  fieldGenerator,
} from './../../helpers/Field'
import { GameArea } from '../../components/Game/GameArea'
import { Scoreboard } from '../../components/Scoreboard/Scoreboard'
import { Grid } from '../../components/Grid/Grid'
import { GameOver } from '../../components/Game/GameOver'
import { GameLevels, LevelNames, GameSettings } from '../GameSettings'
import { useState } from 'react'
import { openCell } from './../../helpers/CellsManipulator'

export const GameWithHooks = () => {
  const [level, setLevel] = useState<LevelNames>('beginner')

  const [size, bombs] = GameSettings[level]

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  )

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  )

  const onClick = (coords: Coords) => {
    const newPlayerField = openCell(coords, playerField, gameField)
    setPlayerField([...newPlayerField])
  }

  const onChangeLevel = ({
    target: { value: level },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(level as LevelNames)
    const newSettings = GameSettings[level as LevelNames]

    resetHandler(newSettings)
  }

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size))
    const newPlayerField = generateFieldWithDefaultState(size, CellState.hidden)

    setGameField([...newGameField])
    setPlayerField([...newPlayerField])
  }

  const onReset = () => resetHandler([size, bombs])

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="right click" secondAction="">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time="0"
          mines="10"
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onReset={onReset}
          onChangeLevel={onChangeLevel}
        ></Scoreboard>
        <GameOver onClick={() => null} isWin={true} />
        <Grid onClick={onClick} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  )
}
