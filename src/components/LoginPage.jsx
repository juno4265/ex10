import React from "react";
import { useState } from "react";
import { Row, Col, Form, InputGroup, Card, Button } from "react-bootstrap";
import { app } from "../firebaseinit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const LoginPage = ({ history }) => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "juno@inha.ac.kr",
    password: "juno426588@",
  });
  const { email, password } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((sucess) => {
        alert("로그인성공");
        setLoading(false);
        sessionStorage.setItem("email", email);
        history.push("/");
      })
      .catch((error) => {
        alert("로그인 에러임:" + error.message);
        console.log(error);
        setLoading(false);
      });
  };

  if (loading) return <h1 className="text-center my-2">로딩중.....</h1>;
  return (
    <Row className="justify-content-center my-5">
      <Col md={5}>
        <h1 className="text-center">로그인</h1>
        <Card className="p-3">
          <Form>
            <InputGroup className="my-2">
              <InputGroup.Text>이메일</InputGroup.Text>
              <Form.Control value={email} onChange={onChange} name="email" />
            </InputGroup>

            <InputGroup className="my-2">
              <InputGroup.Text>비밀번호</InputGroup.Text>
              <Form.Control
                value={password}
                type="password"
                onChange={onChange}
                name="password"
              />
            </InputGroup>
            <Button className="w-100" onClick={onLogin}>
              로그인
            </Button>
          </Form>
          <div>
            <Link to="/join">회원가입</Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
