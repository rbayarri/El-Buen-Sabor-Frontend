import FormLogin from "../../components/Auth/FormLogin"
import { Col, Row, Card } from "react-bootstrap";
import GoogleOneTapButton from "../../components/Auth/GoogleButton";
import { Link } from "react-router-dom";

export const LoginPage = () => {

  return (
    <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">Brand</h2>
                <GoogleOneTapButton clientId="884827796185-0a0kvmu2gj381vvnfmh7ekd8j3a2o613.apps.googleusercontent.com" />
                <p className=" mb-5">Please enter your email and password!</p>
                <div className="mb-3">
                  <FormLogin/>
                <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-primary fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  )

}