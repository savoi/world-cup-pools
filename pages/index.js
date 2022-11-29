import Grid from '@mui/material/Grid';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Flag from 'react-world-flags';
import { Tooltip, Typography } from '@mui/material';


const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function Home({ teamData, entrantData, inProgressTeams }) {

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
          <Grid item xs={12} md={9}>
            <TableContainer component={Paper}>
              <Table title="Pool Entrants">
                <TableHead>
                  <TableRow key="Header1">
                    <TableCell align="center" colSpan={7}>
                      <Typography variant="h5">Group Stage Standings</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow key="Header2">
                    <TableCell>
                      <Typography>Position</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Entrant</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>1st Pick</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>1st Pick Points</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>2nd Pick</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>2nd Pick Points</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Total Points</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entrantData.map((entrant, index) => (
                    <TableRow key={entrant.name}>
                      <TableCell align="center">
                        <Typography>{index + 1}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{entrant.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Flag code={teamData.find(country => country.name == entrant.pick1).countryCode} width="30" />
                          <Typography>{entrant.pick1} {inProgressTeams.includes(entrant.pick1) && <LinearProgress color="secondary"/>}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{entrant.pick1Points}</Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Flag code={teamData.find(country => country.name == entrant.pick2).countryCode} width="30" />
                          <Typography>{entrant.pick2} {inProgressTeams.includes(entrant.pick2) && <LinearProgress color="secondary"/>}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{entrant.pick2Points}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{entrant.totalPoints}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

        {groups.map((groupName) => (
          <Grid item xs={12} md={9}>
            <TableContainer key={groupName} component={Paper}>
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

  function createEntrant(name, seed, pick1, pick2) {
    return {
      name,
      seed,
      pick1,
      pick2,
      pick1Points: 0,
      pick2Points: 0,
      totalPoints: 0
    }
  }

  let entrantJSON = require('../config/groupStagePicks.json');
  let entrantData = entrantJSON.map((entrant) => {
    return createEntrant(entrant.name, entrant.seed, entrant.pick1, entrant.pick2);
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
      points: 0
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

    // Mark home and away goals scored and conceded
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
    teamData.forEach((team) => {
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

    // Update entrant data
    entrantData.forEach((entrant) => {
      const pick1Obj = teamData.find(country => country.name == entrant.pick1);
      const pick2Obj = teamData.find(country => country.name == entrant.pick2);
      entrant.pick1Points = pick1Obj.points + pick1Obj.goalsForward;
      entrant.pick2Points = pick2Obj.points + pick2Obj.goalsForward;
      entrant.totalPoints = entrant.pick1Points + entrant.pick2Points;
    });

    // Sort entrant data by total points
    entrantData.sort((a, b) => {
      return b.totalPoints - a.totalPoints;
    });
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