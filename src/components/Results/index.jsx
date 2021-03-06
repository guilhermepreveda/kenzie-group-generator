import {
  Container,
  ContentContainer,
  GroupCards,
  GroupCard,
  DownloadButton,
} from "./styles";

const Results = ({ membersInformations, groups, exportFunction }) => {
  return (
    !!groups.length && (
      <Container>
        <ContentContainer>
          <DownloadButton onClick={() => exportFunction()}>
            Baixar arquivo CSV
          </DownloadButton>
          <details open>
            <summary>Grupos criados</summary>

            <GroupCards>
              {groups.map((group, groupIndex) => (
                <GroupCard key={groupIndex}>
                  <h3>Grupo {groupIndex + 1}</h3>
                  {!!group.techLeader && (
                    <>
                      <h4>Tech Leader:</h4>
                      <p>{group.techLeader}</p>
                    </>
                  )}
                  {!!group.scrumMaster && (
                    <>
                      <h4>Scrum Master:</h4>
                      <p>{group.scrumMaster}</p>
                    </>
                  )}

                  {(!!group.techLeader || !!group.scrumMaster) && (
                    <h4>Time de QA:</h4>
                  )}
                  {group.members.map((member, memberIndex) => (
                    <p key={memberIndex}>{member}</p>
                  ))}
                </GroupCard>
              ))}
            </GroupCards>
          </details>
        </ContentContainer>
      </Container>
    )
  );
};

export default Results;
