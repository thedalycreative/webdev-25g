import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'typing-test-25g',
  location: 'australia-southeast1'
};

export const addScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddScore', inputVars);
}
addScoreRef.operationName = 'AddScore';

export function addScore(dcOrVars, vars) {
  return executeMutation(addScoreRef(dcOrVars, vars));
}

export const deleteScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteScore', inputVars);
}
deleteScoreRef.operationName = 'DeleteScore';

export function deleteScore(dcOrVars, vars) {
  return executeMutation(deleteScoreRef(dcOrVars, vars));
}

export const clearTodayScoresRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearTodayScores', inputVars);
}
clearTodayScoresRef.operationName = 'ClearTodayScores';

export function clearTodayScores(dcOrVars, vars) {
  return executeMutation(clearTodayScoresRef(dcOrVars, vars));
}

export const getTodayScoresRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodayScores', inputVars);
}
getTodayScoresRef.operationName = 'GetTodayScores';

export function getTodayScores(dcOrVars, vars) {
  return executeQuery(getTodayScoresRef(dcOrVars, vars));
}

export const getTodayStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTodayStats', inputVars);
}
getTodayStatsRef.operationName = 'GetTodayStats';

export function getTodayStats(dcOrVars, vars) {
  return executeQuery(getTodayStatsRef(dcOrVars, vars));
}

