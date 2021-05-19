import { List, Row, Col } from "antd";
import { CSSProperties } from "react";
import UserListItem from "./UserListItem";

export default function UserList() {
  const users = [
    {
      firstname: "Maria",
      lastname: "Norén",
      email: "marialinder97@hotmail.com",
      password: "123",
      role: "admin" as "admin",
    },
    {
      firstname: "Maria2",
      lastname: "Norén2",
      email: "marialinder97@hotmail.com2",
      password: "1232",
      role: "customer" as "customer",
    },
  ];

  return (
    <Row style={containerStyle}>
      <Col style={columnStyle}>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => <UserListItem user={user} />}
        ></List>
      </Col>
    </Row >

  );
}

const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '8rem',
  textAlign: 'left',
}

const columnStyle: CSSProperties = {
  marginTop: '8rem',
  width: '80%'
}
