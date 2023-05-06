import React from "react";
import { useState } from "react";
import { Row, Col, Form, InputGroup, Card, Button } from "react-bootstrap";
import { app } from "../firebaseinit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const JoinPage = ({ history }) => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "juno@inha.ac.kr",
    password: "juno426588@",
  });
  const { email, password } = form;

  const onJoin = () => {
    if (!window.confirm("회원등록 ㄱ")) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((sucess) => {
        history.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <h1 className="text-center my-2">로딩중.....</h1>;
  return (
    <Row className="justify-content-center my-5">
      <Col md={5}>
        <h1 className="text-center">회원가입</h1>
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
            <Button className="w-100" onClick={onJoin}>
              로그인
            </Button>
          </Form>
          <div>
            <Link to="/loin">로그인</Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default JoinPage;
