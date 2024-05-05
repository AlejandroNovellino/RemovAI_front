// react bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// user form
import { useForm } from "react-hook-form";
// react router
import { useNavigate } from "react-router-dom";
// import styles
import "../styles/Landing.css";
// import custom components
import MyNavbar from "../components/MyNavbar";
import { strongPasswordRegex } from "../utils/regex";
// redux exports
import { useSignInMutation } from "../../../application/api/apiSlice";

function SignIn() {
	// form hook
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			username: "",
			password: "",
		},
	});
	// redux sign-in hook
	const [signIn, { isLoadingSignIn }] = useSignInMutation();
	// react router
	const navigate = useNavigate();

	// user inputs
	const email = watch("email");
	const username = watch("username");
	const password = watch("password");

	// login helper, onsubmit function
	const onSubmitSignIn = async () => {
		if (!isLoadingSignIn) {
			try {
				// use the kook to login
				await signIn({
					email: email,
					username: username,
					password: password,
					role: "usuario",
				}).unwrap();
				// sig-in possible so go to welcome
				navigate("/welcome");
			} catch (err) {
				// print the error
				console.error("Could not sign-in: ", err);
			}
		}
	};

	return (
		<Container className="vh-100">
			<MyNavbar />
			<br />
			<div className="m-0 p-0">
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
				<div className="cube"></div>
			</div>
			<Container>
				<Row className="justify-content-md-center">
					<Col xs={6}>
						<Card className="tw-backdrop-blur-sm tw-bg-gray-400/5 tw-shadow-md tw-shadow-indigo-500/50">
							<Card.Body>
								<Card.Title className="text-center">
									Create your free account
								</Card.Title>

								<hr></hr>
								<Container>
									<Form onSubmit={handleSubmit(onSubmitSignIn)}>
										<Form.Group className="mb-3" controlId="formBasicEmail">
											<Form.Label className="fs-5 fw-light">
												Email address
											</Form.Label>
											<Form.Control
												{...register("email", {
													required: {
														value: true,
														message: "Email is obligatory",
													},
												})}
												type="email"
												placeholder="Enter email"
												isInvalid={errors.email?.message}
												isValid={
													!Object.hasOwn(errors, "email") && email !== ""
												}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.email?.message}
											</Form.Control.Feedback>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicUsername">
											<Form.Label className="fs-5 fw-light">
												Username
											</Form.Label>
											<Form.Control
												{...register("username", {
													required: {
														value: true,
														message: "Username is obligatory",
													},
												})}
												placeholder="Enter username"
												isInvalid={errors.username?.message}
												isValid={
													!Object.hasOwn(errors, "username") && username !== ""
												}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.username?.message}
											</Form.Control.Feedback>
										</Form.Group>

										<Form.Group className="mb-3" controlId="formBasicPassword">
											<Form.Label className="fs-5 fw-light">
												Password
											</Form.Label>
											<Form.Control
												{...register("password", {
													required: {
														value: true,
														message: "Password is obligatory",
													},
													pattern: {
														value: strongPasswordRegex,
														message:
															"The password must be at least 8 characters long, have at least one lowercase, one uppercase, one  digit and one special character from !@#$%^&*",
													},
												})}
												type="password"
												placeholder="Password"
												isInvalid={errors.password?.message}
												isValid={
													!Object.hasOwn(errors, "password") && password !== ""
												}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.password?.message}
											</Form.Control.Feedback>
										</Form.Group>
										<div className="d-grid gap-2 my-3 ">
											<Button type="submit" variant="light">
												<i className="bi bi-box-arrow-in-right"></i>
												{" Sign in"}
											</Button>
										</div>
									</Form>
								</Container>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default SignIn;
