import React, { useState, useEffect } from "react";
import { Table, Container, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import moment from "moment";

function UserDetail({ match }) {
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [user, setUser] = useState({
    id: "",
    login: "",
    profileUrl: "",
    createdAt: ""
  });
  const [repos, setRepos] = useState([]);

  const fetchData = () => {
    axios.get(`/api/users/${match.params.login}/details`).then(res => {
      setUser(res.data);
    });
    axios.get(`/api/users/${match.params.login}/repos`).then(res => {
      setRepos(res.data);
    });
  };

  return (
    <Container>
      <h1>User Detail</h1>
      <Form>
        <FormGroup>
          <Label for="userId">Id</Label>
          <Input id="userId" value={user.id} readOnly />

          <Label for="login">Login</Label>
          <Input id="login" value={user.login} readOnly />

          <Label for="url">Profile URL</Label>
          <Input id="url" value={user.profileUrl} readOnly />

          <Label for="createdAt">Created at</Label>
          <Input
            id="createdAt"
            value={moment(user.createdAt).format("YYYY-MM-DD")}
            readOnly
          />
        </FormGroup>
      </Form>

      <h2>User Repositories</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {repos.map(({ id, name, url }) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>{url}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserDetail;
