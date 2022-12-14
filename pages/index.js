import clientPromise from '../lib/mongodb'
import CollapsibleRow from '../src/CollapsibleRow'
import Flag from 'react-world-flags'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import styles from '../styles/Home.module.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'


const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function Home({ teamData, entrantData, inProgressTeams }) {
  const numColumns = 14;

  return (
    <div className={styles.container}>
      <Head>
        <title>2022 World Cup Pool</title>
        <meta name="description" content="A simple dashboard for World Cup pools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center">2022 World Cup Pool</Typography>  
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table title="Pool Entrants">
                <caption>
                  <Typography>Group Stage Points: 3 points for a win, 1 point for a draw, 1 point for each goal scored.</Typography>
                  <Typography>Knockout Stage Points: 5 points for a win, 1 point for each goal scored.</Typography>
                  <Typography>Tie-Breaker: Goals scored by teams/picks in their respective tournament stage.</Typography>
                </caption>
                <TableHead>
                  <TableRow key="Header1">
                    <TableCell align="center" colSpan={numColumns}>
                      <Typography variant="h5">Group and Knockout Stage Standings</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow key="Header2">
                    <TableCell />
                    <TableCell>
                      <Tooltip title="Position" placement="top" arrow>
                        <Typography>POS</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Typography>NAME</Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Group stage 1st pick" placement="top" arrow>
                        <Typography>PICK #1</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Group stage 1st pick points" placement="top" arrow>
                        <Typography>PTS</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Group stage 2nd pick" placement="top" arrow>
                        <Typography>PICK #2</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Group stage 2nd pick points" placement="top" arrow>
                        <Typography>PTS</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Round of 16 pick" placement="top" arrow>
                        <Typography>PICK R16</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                    <Tooltip title="Round of 16 pick points" placement="top" arrow>
                        <Typography>PTS</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Quarter-final pick" placement="top" arrow>
                        <Typography>PICK QF</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Quarter-final pick points" placement="top" arrow>
                        <Typography>PTS</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Semi-final pick" placement="top" arrow>
                        <Typography>PICK SF</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Semi-final pick points" placement="top" arrow>
                        <Typography>PTS</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Total points from group stage and knockout round" placement="top" arrow>
                        <Typography>TOTAL</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entrantData.map((entrant) => (
                    <CollapsibleRow key={entrant.name} entrant={entrant} teamData={teamData} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

        {groups.map((groupName) => (
          <Grid key={groupName} item xs={12} md={9}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow key="Header">
                    <TableCell colSpan={9}>
                      <Typography variant="h4">Group {groupName}</Typography>  
                    </TableCell>  
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography>TEAM</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Matches played" placement="top" arrow>
                        <Typography>MP</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Wins" placement="top" arrow>
                        <Typography>W</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Draws" placement="top" arrow>
                        <Typography>D</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Losses" placement="top" arrow>
                        <Typography>L</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Goals forward" placement="top" arrow>
                        <Typography>GF</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Goals against" placement="top" arrow>
                        <Typography>GA</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Goal difference" placement="top" arrow>
                        <Typography>GD</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Points" placement="top" arrow>
                        <Typography>PTS</Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(teamData.filter(team => team.group == groupName)).map((country) => (
                    <TableRow key={country.name} sx={{ textTransform: 'uppercase' }}>
                      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <Stack direction="row" spacing={2}>
                          <Flag code={country.countryCode} width="30" />
                          <Typography>{country.name} {inProgressTeams.includes(country.name) && <LinearProgress color="secondary"/>}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{country.matchesPlayed}</TableCell>
                      <TableCell align="center">{country.wins}</TableCell>
                      <TableCell align="center">{country.draws}</TableCell>
                      <TableCell align="center">{country.losses}</TableCell>
                      <TableCell align="center">{country.goalsForward}</TableCell>
                      <TableCell align="center">{country.goalsAgainst}</TableCell>
                      <TableCell align="center">{country.goalDifference}</TableCell>
                      <TableCell align="center">{country.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
        </Grid>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", process.env.FOOTBALL_API_KEY);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const apiEndpoint = "https://v3.football.api-sports.io/fixtures?league=1&season=2022"
  const res = await fetch(apiEndpoint, requestOptions)
  const fixtures = await res.json()

  const client = await clientPromise
  const db = client.db("world-cup-pools")
  const entrants = await db.collection('2022').find({}).toArray()

  function createEntrant(name, seed, pick1, pick2, pick3, pick4, pick5) {
    return {
      name,
      seed,
      pick1,
      pick2,
      pick3,
      pick4: pick4 ?? null,
      pick5: pick5 ?? null,
      pick1Points: 0,
      pick2Points: 0,
      pick3Points: 0,
      pick4Points: 0,
      pick5Points: 0,
      totalPoints: 0,
      position: 0,
      goalsForward: 0
    }
  }

  let entrantData = entrants.map((entrant) => {
    return createEntrant(entrant.name, entrant.seed, entrant.pick1, entrant.pick2, entrant.pick3, entrant.pick4, entrant.pick5);
  });

  function createCountry(name, countryCode, group) {
    return { 
      name,
      countryCode,
      group,
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsForward: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      goalsForwardR16: 0,
      goalsForwardQF: 0,
      goalsForwardSF: 0
    };
  }

  let teamData = [
    createCountry('Ecuador', 'ECU', 'A'),
    createCountry('Senegal', 'SEN', 'A'),
    createCountry('Netherlands', 'NLD', 'A'),
    createCountry('Qatar', 'QAT', 'A'),
    createCountry('England', 'GB_ENG', 'B'),
    createCountry('Wales', 'GB_WLS', 'B'),
    createCountry('USA', 'USA', 'B'),
    createCountry('Iran', 'IRN', 'B'),
    createCountry('Argentina', 'ARG', 'C'),
    createCountry('Mexico', 'MEX', 'C'),
    createCountry('Poland', 'POL', 'C'),
    createCountry('Saudi Arabia', 'SAU', 'C'),
    createCountry('Australia', 'AUS', 'D'),
    createCountry('Denmark', 'DNK', 'D'),
    createCountry('France', 'FRA', 'D'),
    createCountry('Tunisia', 'TUN', 'D'),
    createCountry('Costa Rica', 'CRI', 'E'),
    createCountry('Germany', 'DEU', 'E'),
    createCountry('Japan', 'JPN', 'E'),
    createCountry('Spain', 'ESP', 'E'),
    createCountry('Belgium', 'BEL', 'F'),
    createCountry('Canada', 'CAN', 'F'),
    createCountry('Croatia', 'HRV', 'F'),
    createCountry('Morocco', 'MAR', 'F'),
    createCountry('Brazil', 'BRA', 'G'),
    createCountry('Cameroon', 'CMR', 'G'),
    createCountry('Serbia', 'SRB', 'G'),
    createCountry('Switzerland', 'CHE', 'G'),
    createCountry('Ghana', 'GHA', 'H'),
    createCountry('South Korea', 'KOR', 'H'),
    createCountry('Portugal', 'PRT', 'H'),
    createCountry('Uruguay', 'URY', 'H')
  ];

  let inProgressTeams = [];
  const knockoutWinPoints = 5;

  fixtures.response.forEach((fixture) => {
    const homeTeam = fixture.teams.home.name;
    const awayTeam = fixture.teams.away.name;
    const homeGoals = fixture.goals.home;
    const awayGoals = fixture.goals.away;
    let homeTeamObj = teamData.find(country => country.name == homeTeam);
    let awayTeamObj = teamData.find(country => country.name == awayTeam);

    // Mark if game is in progress
    if (['LIVE', '1H', 'HT', '2H'].includes(fixture.fixture.status.short)) {
      inProgressTeams.push(homeTeam, awayTeam);
    }

    // Mark the round of the competition
    let round = fixture.league.round;
    if (round.includes("Group Stage")) {
      round = "Group Stage"; 
    }

    switch(round) {
      case "Group Stage":
        let homeEntrantGS1 = entrantData.find(entrant => entrant.pick1 == homeTeam);
        let homeEntrantGS2 = entrantData.find(entrant => entrant.pick2 == homeTeam);
        let awayEntrantGS1 = entrantData.find(entrant => entrant.pick1 == awayTeam);
        let awayEntrantGS2 = entrantData.find(entrant => entrant.pick2 == awayTeam);

        // Mark home and away goals scored and conceded in group stage
        homeTeamObj.goalsForward += homeGoals;
        homeTeamObj.goalsAgainst += awayGoals;
        awayTeamObj.goalsForward += awayGoals;
        awayTeamObj.goalsAgainst += homeGoals;
    
        if (homeGoals != null && awayGoals != null) {
          // Mark draw
          if (homeGoals == awayGoals) {
            homeTeamObj.draws++;
            awayTeamObj.draws++;
          // Mark home win
          } else if (homeGoals > awayGoals) {
            homeTeamObj.wins++;
            awayTeamObj.losses++;
          // Mark away win
          } else if (awayGoals > homeGoals) {
            awayTeamObj.wins++;
            homeTeamObj.losses++;
          }
        }
        // Compute matches played and points totals
        [homeTeamObj, awayTeamObj].forEach((team) => {
          team.matchesPlayed = team.wins + team.draws + team.losses;
          team.points = 3 * team.wins + team.draws;
          team.goalDifference = team.goalsForward - team.goalsAgainst;
        });
        // Sort teams based on points total
        teamData.sort((a, b) => {
          if (b.points > a.points) return 1;
          if (b.points < a.points) return -1;
          if (b.goalDifference > a.goalDifference) return 1;
          if (b.goalDifference < a.goalDifference) return -1;
        });

        if (homeEntrantGS1) {
          homeEntrantGS1.pick1Points = homeTeamObj.points + homeTeamObj.goalsForward;
        } else if (homeEntrantGS2) {
          homeEntrantGS2.pick2Points = homeTeamObj.points + homeTeamObj.goalsForward;
        }

        if (awayEntrantGS1) {
          awayEntrantGS1.pick1Points = awayTeamObj.points + awayTeamObj.goalsForward;
        } else if (awayEntrantGS2) {
          awayEntrantGS2.pick2Points = awayTeamObj.points + awayTeamObj.goalsForward;
        }
        break;

      case "Round of 16":
        let homeEntrant16 = entrantData.find(entrant => entrant.pick3 == homeTeam);
        let awayEntrant16 = entrantData.find(entrant => entrant.pick3 == awayTeam);

        // Add goals scored to team data
        homeTeamObj.goalsForwardR16 = homeGoals;
        awayTeamObj.goalsForwardR16 = awayGoals;

        // Add goals scored and wins to entrant points tally
        homeEntrant16.pick3Points = homeGoals;
        awayEntrant16.pick3Points = awayGoals;
        if (fixture.teams.home.winner) homeEntrant16.pick3Points += knockoutWinPoints;
        if (fixture.teams.away.winner) awayEntrant16.pick3Points += knockoutWinPoints;
        homeEntrant16.totalPoints += homeEntrant16.pick3Points;
        awayEntrant16.totalPoints += awayEntrant16.pick3Points;
        break;
        
      case "Quarter-finals":
        let homeEntrantQF = entrantData.find(entrant => entrant.pick4 == homeTeam);
        let awayEntrantQF = entrantData.find(entrant => entrant.pick4 == awayTeam);

        // Add goals scored to team data
        homeTeamObj.goalsForwardQF = homeGoals;
        awayTeamObj.goalsForwardQF = awayGoals;
        
        // Add goals scored and wins to entrant points tally
        homeEntrantQF.pick4Points = homeGoals ?? 0;
        awayEntrantQF.pick4Points = awayGoals ?? 0;
        if (fixture.teams.home.winner) homeEntrantQF.pick4Points += knockoutWinPoints;
        if (fixture.teams.away.winner) awayEntrantQF.pick4Points += knockoutWinPoints;
        homeEntrantQF.totalPoints += homeEntrantQF.pick4Points;
        awayEntrantQF.totalPoints += awayEntrantQF.pick4Points;
        break;

      case "Semi-finals":
        let homeEntrantSF = entrantData.find(entrant => entrant.pick5 == homeTeam);
        let awayEntrantSF = entrantData.find(entrant => entrant.pick5 == awayTeam);

        // Add goals scored to team data
        homeTeamObj.goalsForwardSF = homeGoals;
        awayTeamObj.goalsForwardSF = awayGoals;
        
        // Add goals scored and wins to entrant points tally
        homeEntrantSF.pick5Points = homeGoals ?? 0;
        awayEntrantSF.pick5Points = awayGoals ?? 0;
        if (fixture.teams.home.winner) homeEntrantSF.pick5Points += knockoutWinPoints;
        if (fixture.teams.away.winner) awayEntrantSF.pick5Points += knockoutWinPoints;
        homeEntrantSF.totalPoints += homeEntrantSF.pick5Points;
        awayEntrantSF.totalPoints += awayEntrantSF.pick5Points;
        break;
    }
  });

  // Update entrant data
  entrantData.forEach((entrant) => {
    const pick1Obj = teamData.find(country => country.name == entrant.pick1);
    const pick2Obj = teamData.find(country => country.name == entrant.pick2);
    const pick3Obj = teamData.find(country => country.name == entrant.pick3);
    const pick4Obj = teamData.find(country => country.name == entrant.pick4);
    const pick5Obj = teamData.find(country => country.name == entrant.pick5);
    entrant.goalsForward = pick1Obj.goalsForward + pick2Obj.goalsForward + pick3Obj.goalsForwardR16 + (pick4Obj?.goalsForwardQF ?? 0) + (pick5Obj?.goalsForwardSF ?? 0);
    entrant.totalPoints = entrant.pick1Points + entrant.pick2Points + entrant.pick3Points + entrant?.pick4Points + entrant?.pick5Points;
  });

  // Sort entrant data by total points then by goals scored by picks
  entrantData.sort((a, b) => {
    if (b.totalPoints > a.totalPoints) return 1;
    if (b.totalPoints < a.totalPoints) return -1;
    if (b.goalsForward > a.goalsForward) return 1;
    if (b.goalsForward < a.goalsForward) return -1;
  });

  // Assign entrant ranking
  entrantData.forEach((entrant, index) => {
    entrant.position = index + 1;
  });

  return {
    props: {
      teamData,
      entrantData,
      inProgressTeams,
    },
    revalidate: 1200, // In seconds
  }
}