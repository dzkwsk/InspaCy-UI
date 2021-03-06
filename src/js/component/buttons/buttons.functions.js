import ResultFunctions from "../result/result.functions";

const ButtonFunctions = {
  launchProcess: async (
    setResultValue,
    entityList,
    textValue,
    setGraphData,
    selectedEntities,
    textRender,
    setTextRender,
    setEntityList,
    setServerError
  ) => {
    const url = window._env_.API_URL || process.env.REACT_APP_API_URL;
    if (!url) {
      throw new Error(
        "Needing REACT_APP_API_URL for knowing which is API's endpoint"
      );
    }
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: textValue
        })
      });
      const newResultValue = await response.json();
      setResultValue(newResultValue);
      const { newEntityList } = ResultFunctions.loadTextAndEntity(
        newResultValue,
        selectedEntities,
        textRender,
        entityList,
        setTextRender,
        setEntityList,
        ResultFunctions.textRenderer
      );
      if (
        Object.keys(newResultValue).includes("ents") &&
        newResultValue.ents.length
      ) {
        ResultFunctions.loadGraphData(newEntityList, setGraphData);
      }
    } catch (err) {
      setServerError(true);
      console.error("The server didn't answer");
      console.error(err);
      setTimeout(() => setServerError(false), 1000);
    }
  },

  downloadFile: () => {
    alert("downloadFile");
  }
};

export default ButtonFunctions;
