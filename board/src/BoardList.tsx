import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// 게시판 아이템 타입 정의
interface BoardItem {
  BOARD_ID: number;
  BOARD_TITLE: string;
  BOARD_CONTENT: string;
  REGISTER_ID: string;
  REGISTER_DATE: string;
}

// 게시판 아이템을 출력하는 컴포넌트
const Board: React.FC<{
  id: number;
  title: string;
  content: string;
  registerId: string;
  registerDate: string;
}> = ({ id, title, content, registerId, registerDate }) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

// 게시판 목록을 보여주는 컴포넌트
const BoardList: React.FC = () => {
  // 게시판 목록을 담는 상태
  const [boardList, setBoardList] = useState<BoardItem[]>([]);

  // 게시판 목록을 서버로부터 받아오는 함수
  const getList = useCallback(() => {
    Axios.get<BoardItem[]>("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        setBoardList(data);
        console.log(data);
      })
      .catch((e) => {
        console.error(e);

      });
  }, []);

  // 컴포넌트가 마운트되면 게시판 목록을 받아옴
  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div>
      <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((v) => (
              <Board
                id={v.BOARD_ID}
                title={v.BOARD_TITLE}
                content={v.BOARD_CONTENT}
                registerId={v.REGISTER_ID}
                registerDate={v.REGISTER_DATE}
                key={v.BOARD_ID}
              />
            ))}
          </tbody>
        </Table>

        <div style={{ float: "right" }}>
          <Button variant="primary">글쓰기</Button>
        </div>
      </Container>
    </div>
  );
};

export default BoardList;
