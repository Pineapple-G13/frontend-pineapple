import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import logoHome from '../../img/logoHome.svg'
import './Login.css'

const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container className="cont">
            <Row className="float-sm-center">
                <Col md="8">
                    <form >
                        <img src={logoHome} class="img-responsive" className="loginLogo" alt="logoHome" />
                        <div className="form-item">
                            <label>User</label><br />
                            <input type="text" onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <br></br>
                        <div className="form-item">
                            <label>Password</label><br />
                            <input type="password" onChange={e => setPassword(e.target.value)}/>
                        </div><br />
                        <div>
                            <Button className="btnLogin" type="submit" disabled={username.length === 0 || password.length === 0} >
                                LOG IN
                            </Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
