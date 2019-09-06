import React from "react";
import { lighten, makeStyles } from '@material-ui/core/styles';
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
	selectFile(index){
		console.log("index of selected file",index);
		let selected = this.props.files[index];
		let fetchFileUrl = [location.protocol, '//', location.host,"/get_audio"].join('');
		fetch(fetchFileUrl, { method: 'post', 
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json', 
				'Authorization':'Bearer ' + this.props.jwt
			},
			body: JSON.stringify({file_name:selected.name})
		}).then(response => response.json())
			.then(json => {
				selected["url"] = json.download_url;
				selected["uploaded"] = true;
				this.props.selectFile(selected, index);
				console.log(json);
			})
			.catch(error => console.log("load file error", selected.name , error));
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
						{this.props.files.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((file,i) => {
							console.log("index",i);	
							return (
							<TableRow style={{backgroundColor:"white"}} 
								key={file.name}
								onClick={() => this.selectFile(this.state.page * this.state.rowsPerPage + i)}
							>
								<TableCell component="th">Date</TableCell>
								<TableCell align="right">{file.name}</TableCell>
							</TableRow>
							);
						})}
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
