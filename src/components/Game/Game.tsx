import { Wrapper } from './Wrapper'
import { Top } from './../Top/Top'
import { Field } from '@helpers/Field'
import { GameArea } from './GameArea'
import { Scoreboard } from './../Scoreboard/Scoreboard'
import { Grid } from './../Grid/Grid'
import { GameOver } from './GameOver'

interface GameProps {
  children: Field
}

export const Game = ({ children }: GameProps) => (
  <Wrapper>
    <Top feature="Flag" firstAction="right click" secondAction="">
      Minesweeper
    </Top>
    <GameArea>
      <Scoreboard
        time="0"
        mines="10"
        levels={['beginner', 'intermediate', 'expert']}
        onReset={() => null}
        onChangeLevel={() => null}
      ></Scoreboard>
      <GameOver onClick={() => null} isWin={true} />
      <Grid onClick={() => null} onContextMenu={() => null}>
        {children}
      </Grid>
    </GameArea>
  </Wrapper>
)
