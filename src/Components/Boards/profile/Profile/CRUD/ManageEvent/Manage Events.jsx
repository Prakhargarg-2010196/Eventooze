import { Col, Container, Row } from "react-bootstrap";
import React, { Component } from "react";

import Button from "@mui/material/Button";
import CrudService from "../../../../../../api/services/crud-service";
import { NavBar } from "../../../../../Layout/Home/NavBar/NavBar";
import Paper from "@mui/material/Paper";
import { SideBar } from "../../SideBar/sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./ManageEvents.module.css";

export default class ManageEvent extends Component {
	defaultState = {
		events: [],
	};

	constructor(props) {
		super(props);

		this.state = this.defaultState;
	}
	async componentDidMount() {
		await CrudService.ReadEvents().then((response) => {
			this.setState({ events: response.data });
			console.log(response.data);
		});
	}
	render() {
		return (
			<>
				<div className={styles.container}>
					<NavBar />
					<Container fluid>
						<Row>
							<Col md={2} className={styles.SideBar}>
								<SideBar />
							</Col>
							<Col md={10}>
								<Container>
									<Row>
										<h1 className="text-center mt-4">View Events</h1>
									</Row>
									<Row>
										<TableContainer component={Paper}>
											<Table sx={{ minWidth: 650 }} aria-label="simple table">
												<TableHead>
													<TableRow>
														<TableCell align="left">Event Name</TableCell>
														<TableCell align="center">Category</TableCell>
														<TableCell align="right">Cost</TableCell>
														<TableCell align="right">Date & Time</TableCell>
														<TableCell align="center">Edit</TableCell>
														<TableCell align="center">Delete</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{this.state.events.map((event) => (
														<TableRow
															key={event._id}
															sx={{
																"&:last-child td, &:last-child th": {
																	border: 0,
																},
															}}
														>
															<TableCell component="th" scope="row">
																{event.title}
															</TableCell>
															<TableCell align="center">
																{event.category.join(",")}
															</TableCell>
															<TableCell align="center"></TableCell>
															<TableCell align="center"></TableCell>
															<TableCell align="center">
																<Button variant="contained">Edit</Button>
															</TableCell>
															<TableCell align="center">
																<Button variant="contained">Delete</Button>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</Row>
								</Container>
							</Col>
						</Row>
					</Container>
				</div>
			</>
		);
	}
}
