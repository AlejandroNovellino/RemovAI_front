// react imports
import { useState } from "react";
// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// react player
import ReactPlayer from "react-player/lazy";
// user form
import { useForm } from "react-hook-form";
// react router
import { useNavigate } from "react-router-dom";
// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
import MyAlert from "../components/MyAlert";
// redux exports
import { useLoginMutation } from "../../../application/api/apiSlice";

function Landing() {
	// form hook
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			video: null,
			videoUrl: null,
		},
	});
	// redux login hook
	const [login, { isLoadingLogin }] = useLoginMutation();
	// react router
	const navigate = useNavigate();
	// state for alert
	const [showAlert, setShowAlert] = useState(false);

	// user inputs
	const video = watch("video");
	const videoUrl = watch("videoUrl");

	if (video) {
		console.log(`🚀 ~ Landing ~ video:`, video);
		console.log(`🚀 ~ Landing ~ video[0]:`, video[0]);
	}

	// login helper, onsubmit function
	const onSubmitDeleteBackground = async () => {
		if (!isLoadingLogin) {
			try {
				// use the kook to login
				await login({
					video: video,
					videoUrl: videoUrl,
				}).unwrap();
				// set error to false
				setShowAlert(false);
				// login possible so go to home
				navigate("/home");
			} catch (err) {
				// print the error
				console.error("Could not login: ", err);
				setShowAlert(true);
			}
		}
	};

	return (
		<Container fluid className="vh-100 px-4">
			<MyNavbar />
			<div className="m-0 p-0">
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
			</div>
			<Container fluid>
				<Row>
					<p className="fs-1 hover-effect">Welcome to your video assistant!</p>
				</Row>
				<Row>
					<p className="fs-3">
						Upload a video or a URL for removing the background
					</p>
				</Row>
				<Row className="justify-content-md-center">
					<Col xs={6}>
						<Card className="tw-backdrop-blur-sm tw-bg-gray-400/5 tw-shadow-md tw-shadow-indigo-500/50">
							<Card.Body>
								<Card.Title className="text-center">
									Your uploaded video
								</Card.Title>
								<Container className="mb-3 rounded-5">
									{(video || videoUrl) && (
										<ReactPlayer
											className="rounded"
											width="100%"
											height="100%"
											controls={true}
											loop={true}
											url={videoUrl || URL.createObjectURL(video[0])}
										/>
									)}
								</Container>
								<Container>
									<Form onSubmit={handleSubmit(onSubmitDeleteBackground)}>
										<Form.Group className="mb-3" controlId="video">
											<Form.Control
												{...register("video", {
													required: {
														value: true,
														message: "A video must be uploaded",
													},
												})}
												type="file"
												placeholder="Enter your video"
												isInvalid={errors.video?.message}
												isValid={
													!Object.hasOwn(errors, "video") && video !== null
												}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.video?.message}
											</Form.Control.Feedback>
										</Form.Group>

										<Form.Group className="mb-3" controlId="videoUrl">
											<Form.Control
												{...register("videoUrl", {
													required: {
														value: true,
														message: "A video URL is necessary",
													},
												})}
												type="text"
												placeholder="Video url"
												isInvalid={errors.videoUrl?.message}
												isValid={
													!Object.hasOwn(errors, "videoUrl") &&
													videoUrl !== null
												}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.videoUrl?.message}
											</Form.Control.Feedback>
										</Form.Group>
										<div className="d-grid gap-2 my-3 ">
											<Button type="submit" variant="light">
												{"Delete background"}
											</Button>
										</div>
									</Form>
								</Container>
							</Card.Body>
						</Card>
					</Col>
					<Col xs={6}>
						<Card className="tw-backdrop-blur-sm tw-bg-gray-400/5 tw-shadow-md tw-shadow-indigo-500/50">
							<Card.Body>
								<Card.Title className="text-center">
									Your modified video
								</Card.Title>
								<Container></Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default Landing;
