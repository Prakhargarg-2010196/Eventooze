import "react-toastify/dist/ReactToastify.css";

import { Button, FloatingLabel, Form } from "react-bootstrap";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

import AuthService from "../../../../api/services/auth.service";
import CalendarMobile from "../../../../assets/CalendarMobile.svg";
import { DefaultNavbar } from "../../DefaultNavbar";
import { Image } from "react-bootstrap";
import Logo from "../../../../assets/logo.png";
import styles from "./OtpPasswordReset.module.css";

const links = {
	home: "/",
	secondLink: "/SignUpPage",
	secondLinkName: "signup",
};
const style = {
	Navbar: styles.Navbar,
	navLinks: styles.navLinks,
};
const image = {
	src: Logo,
	width: 40,
};
class OtpPasswordReset extends Component {
	defaultState = {
		otp: "",
		otpErr: "",
		message: "",
		successful: false,
	};
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = this.defaultState;
		this.handleResendOtp = this.handleResendOtp.bind(this);
	}

	handleChange(e) {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value,
		});
	}
	handleBlurOtp() {
		const regOtp = /\d*/;
		let otpErr = "";

		if (!this.state.otp || regOtp.test(this.state.otp) === false)
			otpErr = "otp is invalid";
		if (this.state.otp.length !== 6 && this.state.otp)
			otpErr = "otp is invalid";
		if (!this.state.otp) otpErr = "otp is required";
		this.setState({
			...this.state,

			otpErr,
		});
	}

	handleResendOtp = async (e) => {
		e.preventDefault();
		this.handleKeyPress(e);
		const user = {
			email: this.props.history.location.state.email,
		};
		await AuthService.ResetPass(user).then(
			(res) => {this.setState({message:res.data})},
			(error) => {
				let resMessage = "";
				if (!error.response) {
					resMessage = JSON.stringify(error.message).replace(/^"|"$/g, "");
				} else resMessage = error.response.data;
				this.setState({
					message: resMessage,
					successful: false,
				});
				toast.error(this.state.message, {
					position: "bottom-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					style: { background: "pink", color: "black" },
				});
			}
			);
			toast.success(this.state.message)
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		this.handleKeyPress(e);
		const otp = {
			otp: this.state.otp,
			email: this.props.history.location.state.email,
		};
		const details = {
			email: this.props.history.location.state.email,
		};

		AuthService.VerifyResetPassOtp(otp).then(
			(response) => {
				if (response.status === 200) {
					this.setState({
						message: response.data,
						successful: true,
					});
				}

				if (this.state.successful) {
					this.props.history.push({
						pathname: "/ChangePass",
						state: details,
					});
				}
			},
			(error) => {
				let resMessage = "";
				if (!error.response) {
					resMessage = JSON.stringify(error.message).replace(/^"|"$/g, "");
					this.setState({
						message: resMessage,
						successful: false,
					});
				} else if (error.response.status === 401) {
					this.setState({
						message: error.response.data,
						successful: false,
					});
				} else if (error.response.status === 402) {
					this.setState({
						message: error.response.data + "\nEnter Again",
						successful: false,
					});
				} else {
					resMessage = error.response.data;
					this.setState({
						message: resMessage,
						successful: false,
					});
				}
				toast.error(this.state.message, {
					position: "bottom-center",
					autoClose: 3000,
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
	handleKeyPress(e) {
		if (e.key === "Enter") e.preventDefault();
	}

	render() {
		return (
			<div className={styles.container}>
				<DefaultNavbar style={style} image={image} links={links} />
				<Image src={CalendarMobile} className={styles.calendarImage}></Image>
				{!this.state.successful && (
					<Form className={styles.form}>
						<h2 className="text-center">OTP</h2>
						<Form.Group className={styles.formGroup} controlId="formBasicOtp">
							<FloatingLabel controlId="floatingInput" label="otp">
								<Form.Control
									type="password"
									placeholder="otp"
									name="otp"
									className="form-control"
									onBlur={() => this.handleBlurOtp()}
									onChange={(e) => this.handleChange(e)}
								/>
								<span className="text-danger">{this.state.otpErr}</span>
							</FloatingLabel>
						</Form.Group>

						<Button
							variant="primary"
							className={styles.buttonSignUp}
							onClick={(e) => this.handleSubmit(e)}
							onKeyPress={(e) => this.handleKeyPress(e)}
						>
							Confirm
						</Button>
						<Button
							variant="primary"
							className={styles.buttonSignUp}
							onClick={(e) => this.handleResendOtp(e)}
							onKeyPress={(e) => this.handleKeyPress(e)}
						>
							resend otp
						</Button>
						
						
					</Form>
				)}
				{this.state.message && (
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
			</div>
		);
	}
}

export default OtpPasswordReset;
