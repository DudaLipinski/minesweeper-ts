import { GameOver } from './GameOver'
import { Grid } from './Grid'
import { Scoreboard } from './Scoreboard'

export const GameWithReactRedux = () => {
  return (
    <>
      <Scoreboard />
      <GameOver />
      <Grid />
    </>
  )
}
