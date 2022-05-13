import toast from "react-hot-toast";

const groupCreator = (membersInformations, setGroups) => {
  const groups = [];

  // Coloca todos os membros dentro de um array
  let membersArray = membersInformations.members?.includes(",")
    ? membersInformations.members?.trim().split(",")
    : membersInformations.members?.trim().split("\n");

  membersArray = membersArray.map((member) => member.trim());

  // Coloca todos os tech leaders, se existirem, dentro de um array
  let techLeadersArray = membersInformations.techLeader
    ? membersInformations.techLeaders?.includes(",")
      ? membersInformations.techLeaders?.trim().split(",")
      : membersInformations.techLeaders?.trim().split("\n")
    : [];

  techLeadersArray = techLeadersArray.map((member) => member.trim());

  // Coloca todos os scrum masters, se existirem, dentro de um array
  let scrumMastersArray = membersInformations.scrumMaster
    ? membersInformations.scrumMasters?.includes(",")
      ? membersInformations.scrumMasters?.trim().split(",")
      : membersInformations.scrumMasters?.trim().split("\n")
    : [];

  scrumMastersArray = scrumMastersArray.map((member) => member.trim());

  /* Validação de nomes duplicados */

  const allMembersArray = [
    ...scrumMastersArray,
    ...techLeadersArray,
    ...membersArray,
  ];

  /* Dados úteis para comparações */

  const membersNumber = () => membersArray.length;

  const totalMembersNumber = () =>
    membersArray.length + techLeadersArray.length + scrumMastersArray.length;

  const mustHaveTechLeaders = membersInformations.techLeader;
  const techLeaderOnGroup = membersInformations.techLeader ? 1 : 0;
  const techLeadersNumber = () => techLeadersArray.length;

  const mustHaveScrumMasters = membersInformations.scrumMaster;
  const scrumMasterOnGroup = membersInformations.scrumMaster ? 1 : 0;
  const scrumMastersNumber = () => scrumMastersArray.length;

  const membersPerGroup = Number(membersInformations.membersNumber);

  const randomIndexChooser = (array) =>
    Math.floor(Math.random() * array.length);

  /* Preparação do número de grupos */
  let groupsNumber = Math.floor(totalMembersNumber() / membersPerGroup);

  if (mustHaveTechLeaders || mustHaveScrumMasters) {
    groupsNumber =
      techLeadersNumber() === groupsNumber ||
      scrumMastersNumber() === groupsNumber
        ? Math.floor(totalMembersNumber() / membersPerGroup)
        : techLeadersNumber() > scrumMastersNumber()
        ? techLeadersNumber()
        : scrumMastersNumber();
  }

  if (groupsNumber === 0) {
    groupsNumber = 1;
  }

  let alreadyUsedGroups = [];

  /* Remanejador de devs restantes */
  const remainingDevsPlacer = () => {
    let groupIndex = randomIndexChooser(groups);
    const memberIndex = randomIndexChooser(membersArray);

    if (alreadyUsedGroups.length === groups.length) {
      alreadyUsedGroups = [];
    }

    while (alreadyUsedGroups.includes(groupIndex)) {
      groupIndex = randomIndexChooser(groups);
    }

    alreadyUsedGroups.push(groupIndex);

    groups[groupIndex].members.push(membersArray[memberIndex]);
    membersArray.splice(memberIndex, 1);
  };

  /* Geração dos grupos */
  for (let index = 0; index < groupsNumber; index++) {
    const currentGroup = { techLeader: null, scrumMaster: null, members: [] };

    if (
      (mustHaveTechLeaders &&
        techLeadersNumber() > 0 &&
        membersNumber() === 0) ||
      (mustHaveScrumMasters &&
        scrumMastersNumber() > 0 &&
        membersNumber() === 0) ||
      (mustHaveTechLeaders &&
        techLeadersNumber() === 0 &&
        mustHaveScrumMasters &&
        scrumMastersNumber() > 0) ||
      (mustHaveTechLeaders &&
        techLeadersNumber() > 0 &&
        mustHaveScrumMasters &&
        scrumMastersNumber() === 0)
    ) {
      membersArray = [
        ...membersArray,
        ...techLeadersArray,
        ...scrumMastersArray,
      ];

      techLeadersArray = [];
      scrumMastersArray = [];

      continue;
    }

    if (mustHaveTechLeaders && techLeadersNumber() > 0 && membersNumber() > 0) {
      const techLeaderIndex = randomIndexChooser(techLeadersArray);
      currentGroup.techLeader = techLeadersArray[techLeaderIndex];

      techLeadersArray.splice(techLeaderIndex, 1);
    }

    if (
      mustHaveScrumMasters &&
      scrumMastersNumber() > 0 &&
      membersNumber() > 0
    ) {
      const scrumMasterIndex = randomIndexChooser(scrumMastersArray);
      currentGroup.scrumMaster = scrumMastersArray[scrumMasterIndex];

      scrumMastersArray.splice(scrumMasterIndex, 1);
    }

    let remainingSlots = () =>
      membersPerGroup -
        currentGroup.members.length -
        techLeaderOnGroup -
        scrumMasterOnGroup <
      0
        ? 0
        : membersPerGroup -
          currentGroup.members.length -
          techLeaderOnGroup -
          scrumMasterOnGroup;

    if (
      remainingSlots() > 0 &&
      ((mustHaveScrumMasters && !!currentGroup.scrumMaster) ||
        (mustHaveTechLeaders && !!currentGroup.techLeader) ||
        (!mustHaveScrumMasters && !currentGroup.scrumMaster) ||
        (!mustHaveTechLeaders && !currentGroup.techLeader))
    ) {
      while (remainingSlots() > 0) {
        const memberIndex = randomIndexChooser(membersArray);
        currentGroup.members.push(membersArray[memberIndex]);

        membersArray.splice(memberIndex, 1);
      }
      groups.push(currentGroup);
    } else if (
      remainingSlots() === 0 &&
      ((mustHaveScrumMasters && !!currentGroup.scrumMaster) ||
        (mustHaveTechLeaders &&
          !!currentGroup.techLeader &&
          currentGroup.members > 0))
    ) {
      groups.push(currentGroup);
      continue;
    }
  }

  if (totalMembersNumber() > 0 && groups.length > 0) {
    while (totalMembersNumber() > 0) {
      //console.log(membersArray, techLeadersArray, scrumMastersArray);
      remainingDevsPlacer();
    }
  }

  // console.log(groups, membersArray);
  setGroups(groups);
  toast.success("Grupos criados com sucesso!");
};

export default groupCreator;
