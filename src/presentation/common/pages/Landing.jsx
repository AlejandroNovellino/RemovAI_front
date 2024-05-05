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
			email: "",
			password: "",
		},
	});
	// redux login hook
	const [login, { isLoadingLogin }] = useLoginMutation();
	// react router
	const navigate = useNavigate();

	// user inputs
	const email = watch("email");
	const password = watch("password");

	// login helper, onsubmit function
	const onSubmitLogin = async () => {
		if (!isLoadingLogin) {
			try {
				// use the kook to login
				await login({
					email: email,
					password: password,
				}).unwrap();
				// login possible so go to home
				navigate("/home");
			} catch (err) {
				// print the error
				console.error("Could not login: ", err);
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
				<Row>
					<Col xs={6} className="pe-5 me-2">
						<Container fluid>
							<Row>
								<Col>
									<p className="fs-1 hover-effect">Welcome to Janna!</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<p className="fs-5 fw-light">
										Start your personalize experience with our different AIs
										functionalities
									</p>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="d-grid gap-2">
										<Button
											variant="light"
											onClick={() => navigate("/sign-in")}>
											{" Start for free"}
										</Button>
									</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="d-grid gap-2 mt-3">
										<Button variant="outline-light">
											{"Have an account already? Login"}
										</Button>
									</div>
								</Col>
							</Row>
						</Container>
					</Col>
					<Col xs={5}>
						<Card className="tw-backdrop-blur-sm tw-bg-gray-400/5 tw-shadow-md tw-shadow-indigo-500/50">
							<Card.Body>
								<Card.Title className="text-center">
									Login into your account
								</Card.Title>
								<div className="d-grid gap-2 my-3">
									<Button variant="outline-light">
										<i className="bi bi-google"></i>
										{" Google"}
									</Button>
								</div>
								<hr></hr>
								<Container>
									<Form onSubmit={handleSubmit(onSubmitLogin)}>
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
												{"Login"}
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

export default Landing;
