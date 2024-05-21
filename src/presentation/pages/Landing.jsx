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
import {
	useDeleteBackgroundFromUrlMutation,
	useDeleteBackgroundFromFileMutation,
} from "../../application/api/apiSlice";
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
			videoFile: null,
			videoUrl: null,
		},
	});
	// redux
	// from file
	const [
		deleteFileBackground,
		{
			data: videoFileData,
			isLoading: isLoadingVideoFile,
			isError: isErrorVideoFile,
			isSuccess: isSuccessVideoFile,
		},
	] = useDeleteBackgroundFromFileMutation();
	// from url
	const [
		deleteUrlBackground,
		{
			data: videoUrlData,
			isLoading: isLoadingVideoUrl,
			isError: isErrorVideoUrl,
			isSuccess: isSuccessVideoUrl,
		},
	] = useDeleteBackgroundFromUrlMutation();
	// state for alert
	const [showAlert, setShowAlert] = useState(false);
	// error message
	let [errorMessage, setErrorMessage] = useState("Oh no something happened");

	// user inputs
	const videoFile = watch("videoFile");
	const videoUrl = watch("videoUrl");

	// login helper, onsubmit function
	const onSubmitDeleteBackground = async () => {
		if (!videoFile && !videoUrl) {
			// print the error
			console.error("Please select something to upload");
			setErrorMessage("Please select something to upload");
			setShowAlert(true);
			return;
		}

		if (!isLoadingVideoFile || isLoadingVideoUrl) {
			try {
				// verify if the video is a file or a url
				if (videoFile) {
					// video is from file
					// use the kook to
					await deleteFileBackground(videoFile[0]).unwrap();
				} else if (videoUrl) {
					// video is from url
					// use the kook to
					await deleteUrlBackground(videoUrl).unwrap();
				}
				// set error to false
				setShowAlert(false);
			} catch (err) {
				// print the error
				console.error("Could not delete background: ", err);
				setShowAlert(true);
			}
		}
	};

	// container design
	let container_design = !videoFile && !videoUrl ? "vh-100" : "v-100";

	// print video info
	console.log(`🚀 ~ Landing ~ videoFileData:`, videoFileData);
	console.log(`🚀 ~ Landing ~ videoUrlData:`, videoUrlData);
	console.log(videoFileData?.output_url || videoUrlData?.output_url);

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
			<Container fluid className="pb-5">
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
									{(videoFile || videoUrl) && (
										<ReactPlayer
											className="rounded"
											width="100%"
											height="100%"
											controls={true}
											loop={true}
											url={videoUrl || URL.createObjectURL(videoFile?.item(0))}
										/>
									)}
								</Container>
								<Container>
									<Form onSubmit={handleSubmit(onSubmitDeleteBackground)}>
										<Form.Group className="mb-3" controlId="videoFile">
											<Form.Control
												{...register("videoFile")}
												type="file"
												placeholder="Enter your video"
												isInvalid={errors.videoFile?.message}
												isValid={
													!Object.hasOwn(errors, "videoFile") &&
													videoFile !== null
												}
												name="videoFile"
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
										{!isLoadingVideoFile &&
											!isErrorVideoFile &&
											!isLoadingVideoUrl &&
											!isErrorVideoUrl && (
												<Col xs={12}>
													<ReactPlayer
														className="rounded"
														width="100%"
														height="100%"
														controls={true}
														loop={true}
														url={
															videoFileData?.output_url ||
															videoUrlData?.output_url
														}
													/>
												</Col>
											)}
										{(isLoadingVideoFile || isLoadingVideoUrl) && (
											<Col xs={2} className="mt-4">
												<l-squircle
													size="60"
													stroke="7"
													stroke-length="0.15"
													bg-opacity="0.15"
													speed="01"
													color="white"></l-squircle>
											</Col>
										)}
										{isErrorVideoFile && (
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
