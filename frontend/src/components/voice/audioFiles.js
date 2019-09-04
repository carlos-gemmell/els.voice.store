import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

class AudioFiles extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			page: 0,
			rowsPerPage: 10,
			rowsPerPageOptions:[10,25,100],
		}
	}
	render(){
		console.log("files:" , this.props.files);
		return (
			<div style={{"width":"100%","height":"80%","overflow":"auto"}}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Date Created</TableCell>
							<TableCell align="right">ID</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.files.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(file => (
							<TableRow key={file.name}>
								<TableCell component="th">Date</TableCell>
								<TableCell align="right">{file.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={this.state.rowsPerPageOptions}
					component="div"
					count={this.props.files.length}
					rowsPerPage={this.state.rowsPerPage}
					page={this.state.page}
					backIconButtonProps={{
					  'aria-label': 'previous page',
					}}
					nextIconButtonProps={{
					  'aria-label': 'next page',
					}}
					onChangePage={(event, newPage) => this.setState({page: newPage}) }
					onChangeRowsPerPage={(event) => this.setState({page: 0,rowsPerPage:+event.target.value})}
				/>
			</div>
		);
	}
}

export default AudioFiles;
