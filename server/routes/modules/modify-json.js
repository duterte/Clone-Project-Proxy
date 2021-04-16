function modifyJSON(json) {
  for (const item of json.licenses) {
    delete item.evaluationOpportunitySize;
  }
  return json;
}

module.exports = modifyJSON;
