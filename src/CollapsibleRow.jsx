import * as React from 'react'
import PropTypes from 'prop-types'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Flag from 'react-world-flags'
import Stack from '@mui/material/Stack'


function CollapsibleRow(props) {
    const { entrant, teamData } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">
            <Typography>{entrant.position}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{entrant.name}</Typography>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={2}>
                <Flag code={teamData.find(country => country.name == entrant.pick1)?.countryCode} width="30" />
                <Typography>{entrant.pick1}</Typography>
            </Stack>
          </TableCell>
          <TableCell align="center">
            <Typography>{entrant.pick1Points}</Typography>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={2}>
                <Flag code={teamData.find(country => country.name == entrant.pick2)?.countryCode} width="30" />
                <Typography>{entrant.pick2}</Typography>
            </Stack>
          </TableCell>
          <TableCell align="center">
            <Typography>{entrant.pick2Points}</Typography>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={2}>
                <Flag code={teamData.find(country => country.name == entrant.pick3)?.countryCode} width="30" />
                <Typography>{entrant.pick3}</Typography>
            </Stack>
          </TableCell>
          <TableCell align="center">
            <Typography>{entrant.pick3Points}</Typography>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={2}>
              <Flag code={teamData.find(country => country.name == entrant.pick4)?.countryCode} width="30" />
              <Typography>{entrant.pick4}</Typography>
            </Stack>
          </TableCell>
          <TableCell align="center">
            <Typography>{entrant.pick4Points}</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography>{entrant.totalPoints}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={12} style={{ padding: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }}>
                <TableBody>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell>GF: {teamData.find(country => country.name == entrant.pick1).goalsForward}</TableCell>
                    <TableCell />
                    <TableCell>GF: {teamData.find(country => country.name == entrant.pick2).goalsForward}</TableCell>
                    <TableCell />
                    <TableCell>GF: {teamData.find(country => country.name == entrant.pick3).goalsForwardR16}</TableCell>
                    <TableCell />
                    <TableCell>GF: {teamData.find(country => country.name == entrant.pick4)?.goalsForwardQF}</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  CollapsibleRow.propTypes = {
    entrant: PropTypes.shape({
      name: PropTypes.string.isRequired,
      seed: PropTypes.number.isRequired,
      pick1: PropTypes.string.isRequired,
      pick2: PropTypes.string.isRequired,
      pick3: PropTypes.string.isRequired,
      pick1Points: PropTypes.number.isRequired,
      pick2Points: PropTypes.number.isRequired,
      pick3Points: PropTypes.number.isRequired,
      totalPoints: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired
    }).isRequired,
  };

  export default CollapsibleRow