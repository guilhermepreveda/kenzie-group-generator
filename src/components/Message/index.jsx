import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";

import { Container, ContentContainer, DetailsContainer } from "./styles";

import { Fragment } from "react";

const Message = ({ groups }) => {
  const copyText = (event) => {
    if (event.currentTarget.querySelector("button") === event.target) {
      const text = event.currentTarget.querySelector("p").innerText;
      const textArea = document.createElement("textarea");
      document.body.appendChild(textArea);
      textArea.value = text;
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Mensagem copiada!");
    }
  };

  return (
    !!groups.length && (
      <Container>
        <ContentContainer>
          <details>
            <summary>Mensagem para Slack</summary>
            <DetailsContainer onClick={copyText}>
              <button>
                Copiar mensagem <MdOutlineContentCopy />
              </button>

              <mark>
                <strong>Copie</strong> a mensagem abaixo, <strong>cole</strong>{" "}
                no Slack e <strong>clique em aplicar formatação</strong> (no
                popup que aparecerá na caixa de mensagem)
              </mark>

              <p>
                @channel Aqui estão as *equipes para a entrega dessa semana*
                ([&lt;Nome da
                entrega&gt;](https://alunos.kenzie.com.br/courses/&lt;id_do_modulo&gt;/assignments/&lt;id_da_entrega&gt;)):
                <br />
                <br />
                {groups.map((group, groupIndex) => (
                  <Fragment key={groupIndex}>
                    *Grupo {groupIndex + 1}*
                    <br />
                    {!!group.techLeader && (
                      <>
                        _Tech Leader:_
                        <br />
                        &gt;{group.techLeader}
                      </>
                    )}
                    {!!group.scrumMaster && (
                      <>
                        <br />
                        _Scrum Master:_
                        <br />
                        &gt;{group.scrumMaster}
                      </>
                    )}
                    {(!!group.techLeader || !!group.scrumMaster) && (
                      <>
                        <br />
                        _Time de QA:_
                        <br />
                      </>
                    )}
                    {group.members.map((member, memberIndex) => (
                      <Fragment key={memberIndex}>
                        &gt;{member}
                        <br />
                      </Fragment>
                    ))}
                    <br />
                  </Fragment>
                ))}
                <br />
                :redsiren: *IMPORTANTE: Apenas um integrante faz o envio da
                entrega, ele deverá colocar o nome do(s) colega(s) nos
                comentários da entrega!*
                <br />
                <br />
                `Haaaaappy hacking! ;)`
              </p>
            </DetailsContainer>
          </details>
        </ContentContainer>
      </Container>
    )
  );
};

export default Message;
