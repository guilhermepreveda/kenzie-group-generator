import { Container } from "./styles";

import { useEffect } from "react";

import Header from "../../components/Header";
import Form from "../../components/Form";
import Results from "../../components/Results";
import Message from "../../components/Message";
import { useState } from "react";

import groupCreator from "../../services/groupCreator";

const Dashboard = () => {
  const [membersInformations, setMembersInformations] = useState({});
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (membersInformations?.members)
      groupCreator(membersInformations, setGroups);
  }, [membersInformations]);

  return (
    <Container>
      <Header />
      <Form setMembersInformations={setMembersInformations} />
      <Results membersInformations={membersInformations} groups={groups} />
      <Message groups={groups} />
    </Container>
  );
};

export default Dashboard;
