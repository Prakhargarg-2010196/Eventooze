import "react-toastify/dist/ReactToastify.css";

import { Button, Col, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import { BaseUrl } from "api/services/BaseUrl";
import { DragNDrop } from "../DragNDrop/DragNDrop";
import { Loader } from "Components/Layout/Loader/Loader";
import crudService from "api/services/crud-service";
import postsService from "api/services/posts.service";
import styles from "./UpdateImagesEvent.module.css";
import { useParams } from "react-router-dom";

const UpdateImagesEvent = () => {
	const [Files, setFilesArray] = useState([]);
	const [result, setResult] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [isAdded, setAdded] = useState(false);
	const [message, setMessage] = useState("");
	let imgPath = [];
	let imageUrlUpdate = [];
	const { id } = useParams();
	useEffect(() => {
		async function getAllimages() {
			await crudService.Read(id).then(
				(response) => {
					setResult(response.data.post);
					setLoading(false);
				},
				(error) => {
					let resMessage = "";
					if (!error.response) {
						resMessage = JSON.stringify(error.message).replace(/^"|"$/g, "");
					} else resMessage = error.response.data;
					setMessage(resMessage);
					toast.error(message, {
						position: "bottom-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						style: { background: "pink", color: "black" },
					});
				}
			);
		}
		getAllimages();
	}, [message,id]);


	if (result.imageUrl) {
		imgPath = result.imageUrl;
		imageUrlUpdate = imgPath.map((img) => `${BaseUrl()}${img}`);
	}

	const handleDelete = async (e, id, imageUrl) => {
		e.preventDefault();
		await postsService.DeleteImage(id, imageUrl).then(
			(res) => {},
			(error) => {
				let resMessage = "";
				if (!error.response) {
					resMessage = JSON.stringify(error.message).replace(/^"|"$/g, "");
					
				} else resMessage = error.response.data;
				setMessage(resMessage);
				toast.error(message, {
					position: "bottom-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					style: { background: "pink", color: "black" },
				});
			}
		);
		// imageUrlUpdate.filter((image) =>image !==imageUrl )
		 await crudService.Read(id).then(
			(response) => {
				if(response.data.post){
					setResult(response.data.post)
				}
			},
			(error) => {
				let resMessage = "";
				if (!error.response) {
					resMessage = JSON.stringify(error.message).replace(/^"|"$/g, "");
					
				} else resMessage = error.response.data;
				setMessage(resMessage);
				toast.error(message, {
					position: "bottom-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					style: { background: "pink", color: "black" },
				});
			}
		);
	};

	const handleAdd = async (e, id) => {
		e.preventDefault();
		var FileData = new FormData();
		if(Files)
		{Files.forEach((file) => {
			FileData.append("files", file);
		});}
		setLoading(true);
		await postsService.AddImage(id, FileData).then(
			(response) => {},
			(error) => {
				let resMessage = "";
				if (!error.response) {
					console.log(JSON.stringify(error.message));
				} else resMessage = error.response.data;
				setMessage(resMessage);
				toast.error(message, {
					position: "bottom-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					style: { background: "pink", color: "black" },
				});
			}
		);
		 await crudService.Read(id).then(
			(response) => {
				if(response.data.post){
					setResult(response.data.post)
				}
			},
			(error) => {
				let resMessage = "";
				if (!error.response) {
					resMessage = JSON.stringify(error.message).replace(/^"|"$/g, "");
					
				} else resMessage = error.response.data;
				setMessage(resMessage);
				toast.error(message, {
					position: "bottom-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					style: { background: "pink", color: "black" },
				});
			}
		);
		
		setAdded(true);
		setLoading(false);
	};
	return (
		<>
			{isLoading ? (
				<Loader message={"Your Images are Updating"} />
			) : (
				<Form>
					<Row>
						<Col>
							<Form.Label className={styles.requiredField}>
								Your Images
							</Form.Label>
							<div className="d-flex flex-wrap justify-content-between m-2">
								{imageUrlUpdate.map((image, index) => (
									<div key={index} className="m-3 d-flex flex-column justify-content-center">
										<img
											src={image}
											width={100}
											style={{ margin: "auto" }}
											alt=""
										/>
										<Button
											style={{ width: "100%", marginTop: "10px" }}
											onClick={(e) => {
												window.confirm(
													"Are you sure you wish to delete this image?"
												) &&
												handleDelete(e, id, image);
											}}
										>
											{" "}
											Delete
										</Button>
									</div>
								))}
							</div>
						</Col>
						<Col>
							<Form.Label className={styles.requiredField}>
								Browse select one at a time or select multiple or drop multiple{" "}
							</Form.Label>
							<DragNDrop
								imagesLength={imageUrlUpdate.length}
								onGet={setFilesArray}
								isAdded={isAdded}
							/>
							<Button
								className="w-100"
								onClick={(e) => {
									handleAdd(e, id);
								}}
								disabled={Files.length===0}
								
							>	
								Add images
							</Button>
						</Col>
					</Row>
				
				</Form>
			)}
				{message && (
						<ToastContainer
							position="bottom-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					)}
		</>
	);
	/* DragDrop END */
};
export default UpdateImagesEvent;
