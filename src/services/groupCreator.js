const groupCreator = (membersInformations, setGroups) => {
  const groups = [];

  const membersArray = membersInformations.members?.includes(",")
    ? membersInformations.members?.split(",")
    : membersInformations.members?.split("\n");

  const techLeadersArray = membersInformations.techLeaders?.includes(",")
    ? membersInformations.techLeaders?.split(",")
    : membersInformations.techLeaders?.split("\n");
  const scrumMastersArray = membersInformations.scrumMasters?.includes(",")
    ? membersInformations.scrumMasters?.split(",")
    : membersInformations.scrumMasters?.split("\n");

  membersInformations.membersNumber =
    membersArray.length +
      (membersInformations.techLeader ? techLeadersArray.length : 0) +
      (membersInformations.scrumMaster ? scrumMastersArray.length : 0) >
      Number(membersInformations.membersNumber) ||
    membersArray.length +
      Math.floor(
        (membersInformations.techLeader ? techLeadersArray.length : 0) +
          (membersInformations.scrumMaster ? scrumMastersArray.length : 0) /
            Number(membersInformations.membersNumber)
      ) >
      Number(membersInformations.membersNumber)
      ? Number(membersInformations.membersNumber)
      : 1;

  let groupsNumber = Math.floor(
    (membersArray.length +
      (membersInformations.techLeader ? techLeadersArray.length : 0) +
      (membersInformations.scrumMaster ? scrumMastersArray.length : 0)) /
      membersInformations.membersNumber
  );

  let ignoredGroupsIndex = [];

  const randomGroupPlacer = () => {
    if (ignoredGroupsIndex.length === groups.length) {
      ignoredGroupsIndex = [];
    }

    let selectedGroupIndex = Math.floor(Math.random() * groups.length);

    while (ignoredGroupsIndex.includes(selectedGroupIndex)) {
      selectedGroupIndex = Math.floor(Math.random() * groups.length);
    }

    ignoredGroupsIndex.push(selectedGroupIndex);
    const selectedGroup = groups[selectedGroupIndex];

    if (
      membersInformations.scrumMaster &&
      membersArray.length === 0 &&
      scrumMastersArray !== 0
    ) {
      const scrumMasterIndex = Math.floor(
        Math.random() * scrumMastersArray.length
      );
      membersArray.push(scrumMastersArray[scrumMasterIndex]);
      scrumMastersArray.splice(scrumMasterIndex, 1);
    }

    if (
      membersInformations.techLeader &&
      membersArray.length === 0 &&
      techLeadersArray !== 0
    ) {
      const techLeaderIndex = Math.floor(
        Math.random() * techLeadersArray.length
      );
      membersArray.push(techLeadersArray[techLeaderIndex]);
      techLeadersArray.splice(techLeaderIndex, 1);
    }

    const memberIndex = Math.floor(Math.random() * membersArray.length);

    if (membersArray[memberIndex].includes("*")) {
      membersArray[memberIndex] = membersArray[memberIndex].split("*")[0];
    }

    selectedGroup.members.push(membersArray[memberIndex]);
    membersArray.splice(memberIndex, 1);
  };

  const groupCreatorFunction = () => {
    if (
      membersArray.length +
        (membersInformations.techLeader ? techLeadersArray.length : 0) +
        (membersInformations.scrumMaster ? scrumMastersArray.length : 0) <
        membersInformations.membersNumber ||
      membersArray.length === 0
    ) {
      randomGroupPlacer();
    } else {
      const group = { members: [] };

      if (membersArray.length === 0) {
        return randomGroupPlacer();
      }

      if (membersInformations.techLeader) {
        const techLeaderIndex = Math.floor(
          Math.random() * techLeadersArray.length
        );

        group.techLeader = techLeadersArray[techLeaderIndex];
        techLeadersArray.splice(techLeaderIndex, 1);
      }

      if (membersInformations.scrumMaster) {
        const scrumMasterIndex = Math.floor(
          Math.random() * scrumMastersArray.length
        );

        group.scrumMaster = scrumMastersArray[scrumMasterIndex];
        scrumMastersArray.splice(scrumMasterIndex, 1);
      }

      const membersLeftOnGroup = () =>
        membersInformations.membersNumber -
        group.members.length -
        (membersInformations.scrumMaster ? 1 : 0) -
        (membersInformations.techLeader ? 1 : 0);

      if (
        (membersInformations.scrumMaster &&
          !group.scrumMaster &&
          scrumMastersArray.length === 0) ||
        (membersInformations.techLeader &&
          !group.techLeader &&
          techLeadersArray.length === 0)
      ) {
        return randomGroupPlacer();
      }

      while (membersLeftOnGroup() !== 0) {
        const memberIndex = Math.floor(Math.random() * membersArray.length);

        if (membersArray[memberIndex].includes("*")) {
          continue;
        }

        if (membersArray[memberIndex].includes("*")) {
          membersArray[memberIndex] = membersArray[memberIndex].split("*")[0];
        }

        group.members.push(membersArray[memberIndex]);
        membersArray.splice(memberIndex, 1);
      }
      groups.push(group);
      groupsNumber--;
    }
  };

  for (let i = 0; i < groupsNumber; i++) {
    groupCreatorFunction();
  }

  while (true) {
    if (
      membersArray.length +
      (membersInformations.techLeader ? techLeadersArray.length : 0) +
      (membersInformations.scrumMaster ? scrumMastersArray.length : 0)
    ) {
      groupCreatorFunction();
    } else {
      break;
    }
  }

  setGroups(groups);
};

export default groupCreator;
