import { Container, Group } from "./styles";

import { ExportToCsv } from "export-to-csv";

import { useEffect } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import Results from "../../components/Results";
import Message from "../../components/Message";
import { useState } from "react";

import groupCreator from "../../services/groupCreator";

const Dashboard = () => {
  const [membersInformations, setMembersInformations] = useState({});
  const [groups, setGroups] = useState([]);

  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    title: "Generated groups",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  useEffect(() => {
    if (membersInformations?.members) {
      groupCreator(membersInformations, setGroups);
    }
  }, [membersInformations]);

  const csvExporter = new ExportToCsv(options);

  const exportResults = () => {
    let groupsExport = groups;
    if (
      groups.some(
        (group) => group.scrumMaster === null && group.techLeader === null
      )
    ) {
      groupsExport = [];

      groups.forEach((group) => {
        if (group.scrumMaster === null && group.techLeader === null) {
          groupsExport.push([...group.members]);
        }
      });
    }
    csvExporter.generateCsv(groupsExport);
  };

  return (
    <Container>
      <Group>
        <Header />
        <Form setMembersInformations={setMembersInformations} />!
        <Results
          membersInformations={membersInformations}
          groups={groups}
          exportFunction={exportResults}
        />
        <Message groups={groups} />
      </Group>

      <Footer />
    </Container>
  );
};

export default Dashboard;
