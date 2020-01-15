const ResultFunctions = {
  textRenderer: (resultValue, selectedEntity) => {
    let tmp_index = 0,
      textRender = "",
      entityList = {};

    if (!Object.keys(resultValue).length) return {};
    resultValue.ents.forEach(e => {
      let entityId = e.link.substr(44),
        entityValue = resultValue.text.substr(e.start, e.end - e.start);
      textRender +=
        resultValue.text.substr(tmp_index, e.start - tmp_index) +
        "<a class='" +
        entityId +
        (selectedEntity.indexOf(entityId) > -1 ? " focus" : "") +
        "' href='" +
        e.link +
        "' key='" +
        Date() +
        "' target='_blank'>" +
        entityValue +
        "</a>";
      tmp_index = e.end;
      if (!entityList[entityId])
        entityList[entityId] = {
          id: entityId,
          value: resultValue.text.substr(e.start, e.end - e.start),
          nb: 1
        };
      else
        entityList[entityId] = {
          ...entityList[entityId],
          value:
            entityValue.length > entityList[entityId].value.length
              ? entityList[entityId].value
              : entityValue,
          nb: entityList[entityId].nb + 1
        };
    });
    textRender += resultValue.text.substr(tmp_index);
    return { newTextRender: textRender, newEntityList: entityList };
  },
  loadTextAndEntity: (
    resultValue,
    selectedEntities,
    textRender,
    entityList,
    setTextRender,
    setEntityList,
    textRenderer
  ) => {
    const { newTextRender, newEntityList } = textRenderer(
      resultValue,
      selectedEntities
    );
    if (textRender !== newTextRender) setTextRender(newTextRender);
    if (!Object.keys(entityList).length && Object.keys(newEntityList).length)
      setEntityList(newEntityList);
    return { newTextRender: newTextRender, newEntityList: newEntityList };
  },
  loadSelectedEntities: (entityId, selectedEntities, setSelectedEntities) => {
    if (!selectedEntities.includes(entityId))
      setSelectedEntities([...selectedEntities, entityId]);
    else
      setSelectedEntities(selectedEntities.filter(elem => elem !== entityId));
  },
  loadGraphData: (entityList, setGraphData) => {
    let datas = Object.values(entityList).sort((a, b) => b.nb - a.nb);
    setGraphData({
      labels: [...datas.map(a => a.value)],
      datasets: [
        {
          label: "Apparition",
          data: [...datas.map(a => a.nb)],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    });
  }
};

export default ResultFunctions;