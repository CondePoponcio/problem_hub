
import React, { useState, useEffect } from "react";
import './../../static/css/inicio.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AccessAlarm, ThreeDRotation, HouseIcon, CodeIcon } from '@material-ui/icons';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#233442',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, titulo, dificultad, categoria) {
  return { id: id, titulo: titulo, dificultad: dificultad, categoria: categoria };
}

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function Tabla(props) {
  const classes = useStyles();
    const [datos, setDatos] = useState([])
    useEffect(()=>{
        if(props.problemas){
            setDatos(props.problemas.map(item => {
                var cat = (item.categoria.length > 0)?item.categoria[0]:'No disponible'
                console.log("hey hey",cat, item.categoria, item.categoria.lenght > 0)
                return createData(item.id, item.titulo, item.dificultad, cat)
            }))
        }
    },[props.problemas])
  return (
    <div className="table-container-pope">
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Título</StyledTableCell>
                <StyledTableCell >Dificultad</StyledTableCell>
                <StyledTableCell >Categoría</StyledTableCell>
                <StyledTableCell >Acciones</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {datos.map((row) => (
                <StyledTableRow key={row.id} >
                <StyledTableCell>
                    {row.titulo}
                </StyledTableCell>
                <StyledTableCell >{row.dificultad}</StyledTableCell>
                <StyledTableCell >{row.categoria}</StyledTableCell>
                <StyledTableCell className="button-table-min-width">
                    <a className="action" href={"/problema/" + row.id}  >
                        Ver Ejercicio
                    </a>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    
    </div>
    );
}
