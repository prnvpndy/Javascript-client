import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody,
  TableSortLabel, TablePagination, IconButton,
} from '@material-ui/core';
import { hoc } from '../HOC/index';
import useStyles from './style';

function TableComponent(props) {
  const {
    classes, data, column, order, orderBy, onSort, onSelect, count, page, actions,
    rowsPerPage, onChangePage, onChangeRowsPerPage,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {column.map((Data) => (
              <TableCell
                className={classes.header}
                align={Data.align}
                sortDirection={orderBy === Data.label ? order : false}
              >
                <TableSortLabel
                  active={orderBy === Data.label}
                  direction={orderBy === Data.label ? order : 'asc'}
                  onClick={onSort(Data.label)}
                >
                  {Data.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((element) => (
            <TableRow
              key={element.id}
              className={classes.root}
            >
              {column.map(({ field, align, format }) => (
                <TableCell onClick={(event) => onSelect(event, element.name)} align={align} component="th" scope="row" order={order} orderBy={orderBy}>
                  {format !== undefined
                    ? format(element[field])
                    : element[field]}
                </TableCell>
              ))}
              {actions.map(({ icon, handler }) => (
                <IconButton onClick={handler(element)} className={classes.action}>
                  {icon}
                </IconButton>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={0}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableContainer>
  );
}
TableComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSort: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
  onSort: () => {},
};
export default withStyles(useStyles)(hoc(TableComponent));
