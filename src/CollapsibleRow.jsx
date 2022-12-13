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
import { useEffect, useRef, useState } from 'react'


function CollapsibleRow(props) {
  const numColumns = 14;
  const { entrant, teamData } = props;
  const [open, setOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState(new Array(numColumns).fill(0));
  const columnWidthRef = useRef([]);

  // Effect used to make the cells inside the collapsible row the same size as the parent
  useEffect(() => {
    for (let index=0; index<numColumns; index++) {
      const width = columnWidthRef.current[index].offsetWidth;
      setColumnWidths(oldColumnWidths => {
        return [...oldColumnWidths.slice(0, index), width, ...oldColumnWidths.slice(index + 1)];
      });
    }
  }, []);
  
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell ref={el => columnWidthRef.current[0] = el}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[1] = el} align="center">
            <Typography>{entrant.position}</Typography>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[2] = el}>
            <Typography>{entrant.name}</Typography>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[3] = el}>
            <Stack direction="row" spacing={2}>
                <Flag code={teamData.find(country => country.name == entrant.pick1)?.countryCode} width="30" />
                <Typography>{entrant.pick1}</Typography>
            </Stack>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[4] = el} align="center">
            <Typography>{entrant.pick1Points}</Typography>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[5] = el}>
            <Stack direction="row" spacing={2}>
                <Flag code={teamData.find(country => country.name == entrant.pick2)?.countryCode} width="30" />
                <Typography>{entrant.pick2}</Typography>
            </Stack>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[6] = el} align="center">
            <Typography>{entrant.pick2Points}</Typography>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[7] = el}>
            <Stack direction="row" spacing={2}>
                <Flag code={teamData.find(country => country.name == entrant.pick3)?.countryCode} width="30" />
                <Typography>{entrant.pick3}</Typography>
            </Stack>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[8] = el} align="center">
            <Typography>{entrant.pick3Points}</Typography>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[9] = el}>
            <Stack direction="row" spacing={2}>
              <Flag code={teamData.find(country => country.name == entrant.pick4)?.countryCode} width="30" />
              <Typography>{entrant.pick4}</Typography>
            </Stack>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[10] = el} align="center">
            <Typography>{entrant.pick4 ? entrant.pick4Points : ""}</Typography>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[11] = el}>
            <Stack direction="row" spacing={2}>
              <Flag code={teamData.find(country => country.name == entrant.pick5)?.countryCode} width="30" />
              <Typography>{entrant.pick5}</Typography>
            </Stack>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[12] = el} align="center">
            <Typography>{entrant.pick5 ? entrant.pick5Points : ""}</Typography>
          </TableCell>
          <TableCell ref={el => columnWidthRef.current[13] = el} align="center">
            <Typography>{entrant.totalPoints}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={numColumns} style={{ padding: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: columnWidths[0] }}/>
                    <TableCell sx={{ width: columnWidths[1] }}/>
                    <TableCell sx={{ width: columnWidths[2] }}/>
                    <TableCell sx={{ width: columnWidths[3] }}>GF: {teamData.find(country => country.name == entrant.pick1).goalsForward}</TableCell>
                    <TableCell sx={{ width: columnWidths[4] }}/>
                    <TableCell sx={{ width: columnWidths[5] }}>GF: {teamData.find(country => country.name == entrant.pick2).goalsForward}</TableCell>
                    <TableCell sx={{ width: columnWidths[6] }}/>
                    <TableCell sx={{ width: columnWidths[7] }}>GF: {teamData.find(country => country.name == entrant.pick3).goalsForwardR16}</TableCell>
                    <TableCell sx={{ width: columnWidths[8] }}/>
                    <TableCell sx={{ width: columnWidths[9] }}>GF: {teamData.find(country => country.name == entrant.pick4)?.goalsForwardQF}</TableCell>
                    <TableCell sx={{ width: columnWidths[10] }}/>
                    <TableCell sx={{ width: columnWidths[11] }}>GF: {teamData.find(country => country.name == entrant.pick5)?.goalsForwardSF}</TableCell>
                    <TableCell sx={{ width: columnWidths[12] }}/>
                    <TableCell sx={{ width: columnWidths[13] }} align="center">TGF: {entrant.goalsForward}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
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