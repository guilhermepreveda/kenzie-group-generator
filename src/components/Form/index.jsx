import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { RiAlertLine } from "react-icons/ri";
import { MdConstruction } from "react-icons/md";

import {
  Container,
  ContentContainer,
  FormContainer,
  Label,
  InputContainer,
  InformationsContainer,
  InfoContainer,
} from "./styles";

const Form = ({ setMembersInformations }) => {
  const [hasTechLeader, setHasTechLeader] = useState(false);
  const [hasScrumMaster, setHasScrumMaster] = useState(false);

  const schema = yup.object().shape({
    membersNumber: yup.string().required("Campo obrigatório"),
    techLeader: yup.boolean(),
    techLeaders: yup.string().when("techLeader", {
      is: (techLeader) => techLeader === true,
      then: yup.string().required("Campo obrigatório"),
    }),
    scrumMaster: yup.boolean(),
    scrumMasters: yup.string().when("scrumMaster", {
      is: (scrumMaster) => scrumMaster === true,
      then: yup.string().required("Campo obrigatório"),
    }),

    members: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    setMembersInformations(data);
  };

  return (
    <Container>
      <ContentContainer>
        <InformationsContainer>
          <h2>
            <AiOutlineQuestionCircle />
            Como usar
          </h2>
          <ol>
            <li>
              Preencha o <strong>número de devs por grupos</strong>
            </li>
            <li>
              Marque as caixas se quiser{" "}
              <strong>incluir Tech Leaders e Scrum Masters</strong>
              &nbsp;nos grupos
            </li>
            <li>
              Coloque os <strong>devs nas caixas de texto</strong>, separando
              eles por vírgula ou com ENTER
            </li>
            <li>
              Veja o resultado dos grupos e{" "}
              <strong>copie a mensagem pré-pronta para o Slack</strong>
            </li>
          </ol>
          <mark>
            Você pode <strong>copiar os nomes da planilha de avaliação</strong>{" "}
            da sua turma (ex.:{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1H7lbXL6Vwntd4DAq5rMOoN-J9g-CwqrgISigEmuVI4M/"
              target="_blank"
              rel="noreferrer"
            >
              Avaliação M2 - Turma 11
            </a>
            ) e <strong>colar nas caixas de texto!</strong>
          </mark>

          <InfoContainer title="Ainda em desenvolvimento!">
            <p>
              <MdConstruction />
              Ao colocar um&nbsp;<strong>* no final do nome</strong>&nbsp; de um
              dev, você&nbsp;
              <strong>
                priorizará ele para ficar em um grupo com mais devs
              </strong>
            </p>
          </InfoContainer>
        </InformationsContainer>

        <FormContainer onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>
            <HiOutlinePencil />
            Formulário
          </h2>
          <InputContainer>
            <Label htmlFor="membersNumber">
              <p>
                <strong>Número de devs</strong>&nbsp;por grupo *
              </p>
              <input
                {...register("membersNumber")}
                type="number"
                placeholder="2"
                defaultValue={2}
                step={1}
                min={2}
                max={99}
              />
            </Label>
            {errors.membersNumber?.message && (
              <span>
                <RiAlertLine /> {errors.membersNumber?.message} *
              </span>
            )}
          </InputContainer>

          <InputContainer>
            <Label htmlFor="techLeader">
              <p>
                Terá&nbsp;<strong>Tech Leader?</strong>
              </p>
              <input
                {...register("techLeader")}
                type="checkbox"
                onChange={(event) => setHasTechLeader(event.target.checked)}
              />
            </Label>
            {errors.techLeader?.message && (
              <span>
                <RiAlertLine /> {errors.techLeader?.message} *
              </span>
            )}
          </InputContainer>

          {hasTechLeader && (
            <InputContainer>
              <Label htmlFor="techLeaders" textarea>
                <p>
                  <strong>Tech Leaders dos grupos</strong>&nbsp;(separados por
                  vírgula ou ENTER) *
                </p>
                <textarea
                  {...register("techLeaders")}
                  placeholder="Victor, Hudson, Gabriel"
                  defaultValue={"Victor, Hudson, Gabriel"}
                />
              </Label>
              {errors.techLeaders?.message && (
                <span>
                  <RiAlertLine /> {errors.techLeaders?.message} *
                </span>
              )}
            </InputContainer>
          )}

          <InputContainer>
            <Label htmlFor="scrumMaster">
              <p>
                Terá&nbsp;<strong>Scrum Master?</strong>
              </p>

              <input
                {...register("scrumMaster")}
                type="checkbox"
                onChange={(event) => setHasScrumMaster(event.target.checked)}
              />
            </Label>
            {errors.scrumMaster?.message && (
              <span>
                <RiAlertLine /> {errors.scrumMaster?.message} *
              </span>
            )}
          </InputContainer>

          {hasScrumMaster && (
            <InputContainer>
              <Label htmlFor="scrumMasters" textarea>
                <p>
                  <strong>Scrum Masters dos grupos</strong>&nbsp;(separados por
                  vírgula ou ENTER) *
                </p>

                <textarea
                  {...register("scrumMasters")}
                  placeholder="Jardel, Pedro, Heric"
                  defaultValue={"Jardel, Pedro, Heric"}
                />
              </Label>
              {errors.scrumMasters?.message && (
                <span>
                  <RiAlertLine /> {errors.scrumMasters?.message} *
                </span>
              )}
            </InputContainer>
          )}

          <InputContainer>
            <Label htmlFor="members" textarea>
              <p>
                <strong>Membros dos grupos</strong>&nbsp;(separados por vírgula
                ou ENTER) *
              </p>
              <textarea
                {...register("members")}
                placeholder="Lucas, Maria, Caique"
                defaultValue={"Lucas, Maria, Caique"}
              />
            </Label>
            {errors.members?.message && (
              <span>
                <RiAlertLine /> {errors.members?.message} *
              </span>
            )}
          </InputContainer>

          <button type="submit">Gerar grupos</button>
        </FormContainer>
      </ContentContainer>
    </Container>
  );
};

export default Form;
