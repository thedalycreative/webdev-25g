const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'typing-test-25g',
  location: 'australia-southeast1'
};
exports.connectorConfig = connectorConfig;

const addScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddScore', inputVars);
}
addScoreRef.operationName = 'AddScore';
exports.addScoreRef = addScoreRef;

exports.addScore = function addScore(dcOrVars, vars) {
  return executeMutation(addScoreRef(dcOrVars, vars));
};

const deleteScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteScore', inputVars);
}
deleteScoreRef.operationName = 'DeleteScore';
exports.deleteScoreRef = deleteScoreRef;

exports.deleteScore = function deleteScore(dcOrVars, vars) {
  return executeMutation(deleteScoreRef(dcOrVars, vars));
};

const clearTodayScoresRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearTodayScores', inputVars);
}
clearTodayScoresRef.operationName = 'ClearTodayScores';
exports.clearTodayScoresRef = clearTodayScoresRef;

exports.clearTodayScores = function clearTodayScores(dcOrVars, vars) {
  return executeMutation(clearTodayScoresRef(dcOrVars, vars));
};

const getTodayScoresRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodayScores', inputVars);
}
getTodayScoresRef.operationName = 'GetTodayScores';
exports.getTodayScoresRef = getTodayScoresRef;

exports.getTodayScores = function getTodayScores(dcOrVars, vars) {
  return executeQuery(getTodayScoresRef(dcOrVars, vars));
};

const getTodayStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodayStats', inputVars);
}
getTodayStatsRef.operationName = 'GetTodayStats';
exports.getTodayStatsRef = getTodayStatsRef;

exports.getTodayStats = function getTodayStats(dcOrVars, vars) {
  return executeQuery(getTodayStatsRef(dcOrVars, vars));
};
