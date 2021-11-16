import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import logoHome from '../../img/logoHome.svg'
import './SignIn.css'

const SignIn = () => {
    /*  const authContext = React.useContext(CartContext);
      */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    /* const submit = event => {
        event.preventDefault();
        // connect to /login api
        authService.signIn(username, password)
        .then((response) => {
          if (response.id) {
            authContext.login();
            history.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } */

    return (
        <Container className="cont">
            <Row className="float-sm-center">
                <Col md="5">
                    <form /* onSubmit={submit} */>
                        <img src={logoHome} class="img-responsive" className="loginLogo" alt="logoHome" />
                        <div className="form-item">
                            <label>User</label><br />
                            <input
                                type="text"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <div className="form-item">
                            <label>Password</label><br />
                            <input
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div><br />
                        <div>
                            <Button
                                className="btnLogin"
                                type="submit"
                                // variant="primary"
                                disabled={username.length === 0 || password.length === 0}
                            >
                                LOG IN
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignIn
