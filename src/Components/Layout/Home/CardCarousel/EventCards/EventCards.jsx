import "react-toastify/dist/ReactToastify.css";

import * as React from "react";

import { Button, CardActionArea } from "@mui/material";

import { BaseUrl } from "api/services/BaseUrl";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import authService from "api/services/auth.service";
import crudService from "api/services/crud-service";
import postsService from "api/services/posts.service";
import {toast} from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function EventCards(props) {
	const [favorite, setFavorite] = React.useState();
	const [favoriteList, setFavoriteList] = React.useState([]);
	const [message, setMessage] = React.useState("");
	var isPresent = favoriteList.some((el) => el._id === props.id);
	const history = useHistory();
	const imgPath = props.img;
	const imageUrl = `${BaseUrl()}${imgPath}`;
	console.log(imageUrl);
	React.useEffect(() => {
		const getBookmarked = async () => {
			await crudService.BookMarkedEvents().then(
				(response) => {
					if (response.data) setFavoriteList(response.data);
				},
				(error) => {
					let resMessage = "";
					if (!error.response || !BaseUrl()) {
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
		if(authService.isAuthenticated())
		getBookmarked();
	}, [message]);
	const handleClickEvent = () => {
		history.push({ pathname: `/EventPage/${props.id}` });
	};

	const handleFavoritism = async () => {
			if (!isPresent && !favorite) {
				setFavorite(true);
				await postsService.FavoritePost(props.id).then(
					(res) => {},
					(error) => {
						let resMessage = "";
						if (!error.response || !BaseUrl()) {
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
				alert("Bookmarked");
			} else {
				setFavorite(false);
				await postsService.UnFavoritePost(props.id).then(
					(res) => {},
					(error) => {
						let resMessage = "";
						if (!error.response || !BaseUrl()) {
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
				alert("UnBookmarked");
			}
			await crudService.BookMarkedEvents().then(
				(response) => {
					if (response.data) setFavoriteList(response.data);
				},
				(error) => {
					let resMessage = "";
					if (!error.response || !BaseUrl()) {
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

	return (
		<>
			<Card
				sx={{ maxWidth: 650, border: "solid 0.5px grey", margin: "30px 0px" }}
			>
				<CardHeader title={props.title} />
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image={imageUrl}
						alt=""
						onClick={() => {
							handleClickEvent();
						}}
					/>

					<CardActions disableSpacing>
						{console.log(favorite)}

						<Button
							onClick={() => {
								handleFavoritism();
							}}
						>
		 
							{authService.isAuthenticated()?(favorite || isPresent ? (
								<FavoriteIcon color="secondary" />
							) : (
								<FavoriteBorderIcon />
							)):""}
						</Button>
					</CardActions>
				</CardActionArea>
			</Card>
		</>
	);
}
