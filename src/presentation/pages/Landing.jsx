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
// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
import MyAlert from "../components/MyAlert";
// redux exports
import { useDeleteBackgroundFromUrlMutation } from "../../application/api/apiSlice";
// loaders
import { squircle } from "ldrs";

//
squircle.register();

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
	//const [backgroundDelete, { isLoadingBackgroundDelete }] =
	const [deleteBackground, { data, isLoading, isSuccess, isError, error }] =
		useDeleteBackgroundFromUrlMutation();
	// state for alert
	const [showAlert, setShowAlert] = useState(false);
	// error message
	let [errorMessage, setErrorMessage] = useState("Oh no something happened");
	// state for result video
	//const [resultVideo, setResultVideo] = useState(null);

	// user inputs
	const video = watch("video");
	const videoUrl = watch("videoUrl");

	if (video) {
		console.log(`🚀 ~ Landing ~ video:`, video);
		console.log(`🚀 ~ Landing ~ video[0]:`, video[0]);
	}

	// login helper, onsubmit function
	const onSubmitDeleteBackground = async () => {
		if (!video && !videoUrl) {
			// print the error
			console.error("Please select something to upload");
			setErrorMessage("Please select something to upload");
			setShowAlert(true);
			return;
		}
		if (!isLoading) {
			try {
				// get the element
				let input = video || videoUrl;
				// use the kook to login
				await deleteBackground(input).unwrap();
				// set error to false
				setShowAlert(false);
			} catch (err) {
				// print the error
				console.error("Could not delete background: ", err);
				setShowAlert(true);
			}
		}
	};

	let container_design = !video && !videoUrl ? "vh-100" : "v-100";

	return (
		<Container fluid className={`${container_design} px-4`}>
			<MyNavbar />
			<div className="m-0 p-0">
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
			</div>
			<Container fluid className="py-5">
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
												{...register("video")}
												type="file"
												placeholder="Enter your video"
												isInvalid={errors.video?.message}
												isValid={
													!Object.hasOwn(errors, "video") && video !== null
												}
												name="video"
											/>
											<Form.Control.Feedback type="invalid">
												{errors.video?.message}
											</Form.Control.Feedback>
										</Form.Group>

										<Form.Group className="mb-3" controlId="videoUrl">
											<Form.Control
												{...register("videoUrl")}
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
									<Row>
										<Col xs={12}>
											{showAlert && (
												<MyAlert
													headingMessage={"Oh no!"}
													message={errorMessage}
													setShow={setShowAlert}
												/>
											)}
										</Col>
									</Row>
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
								<Container className="mb-3 rounded-5">
									<Row className="justify-content-md-center">
										{!isLoading && !isError && (
											<Col xs={12}>
												<ReactPlayer
													className="rounded"
													width="100%"
													height="100%"
													controls={true}
													loop={true}
													url={data?.output_url}
												/>
											</Col>
										)}
										{isLoading && (
											<Col xs={3} className="mt-4">
												<l-squircle
													size="60"
													stroke="7"
													stroke-length="0.15"
													bg-opacity="0.15"
													speed="01"
													color="white"></l-squircle>
											</Col>
										)}
										{isError && (
											<Col xs={8}>
												<p className="h4">
													Something bad happened in our end :c
												</p>
											</Col>
										)}
									</Row>
								</Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default Landing;
