import React, { useEffect } from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import MapPage from "./MapPage";

const LocalPage = () => {
  const [locals, setLocals] = useState([]);
  const [query, setQuery] = useState("인하대");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [is_end, setIs_end] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();
    getLocal();
  };

  const getLocal = async () => {
    const url = "https://dapi.kakao.com/v2/local/search/keyword.json";
    const config = {
      headers: { Authorization: "KakaoAK 62d1651fe45fa7781380543145cdd1c6" },
      params: { query: query, page: page, size: 5 },
    };

    const result = await axios.get(url, config);
    console.log(result);

    setLocals(result.data.documents);
    setTotal(result.data.meta.pageable_count);
    setIs_end(result.data.meta.is_end);
  };

  useEffect(() => {
    getLocal();
  }, [page]);

  return (
    <Row>
      <Row>
        <Col>
          <h1 className="text-center mx-5">지역검색</h1>

          <Row className="my-2">
            <Col md={5} xs={6}>
              <Form onSubmit={onSearch}>
                <Form.Control
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  placeholder="검색어"
                />
              </Form>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <td>장소명</td>
                <td>주소</td>
                <td>전화번호</td>
                <td>지도</td>
              </tr>
            </thead>
            <tbody>
              {locals.map((local) => (
                <tr key={local.id}>
                  <td>{local.place_name}</td>
                  <td>{local.address_name}</td>
                  <td>{local.phone}</td>
                  <td>
                    <MapPage local={local} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Button
              disabled={page == 1}
              onClick={() => setPage(page - 1)}
              className="text-center my-2"
            >
              이전
            </Button>
            <span className="mx-3">{page}</span>
            <Button
              disabled={is_end}
              onClick={() => setPage(page + 1)}
              className="text-center my-2"
            >
              다음
            </Button>
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default LocalPage;
