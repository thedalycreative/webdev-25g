import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddScoreData {
  typingScore_insert: TypingScore_Key;
}

export interface AddScoreVariables {
  name: string;
  wpm: number;
  accuracy: number;
  date: DateString;
  time: string;
}

export interface ClearTodayScoresData {
  typingScore_deleteMany: number;
}

export interface ClearTodayScoresVariables {
  date: DateString;
}

export interface DeleteScoreData {
  typingScore_delete?: TypingScore_Key | null;
}

export interface DeleteScoreVariables {
  id: UUIDString;
}

export interface GetTodayScoresData {
  typingScores: ({
    id: UUIDString;
    name: string;
    wpm: number;
    accuracy: number;
    time: string;
    date: DateString;
    createdAt: TimestampString;
  } & TypingScore_Key)[];
}

export interface GetTodayScoresVariables {
  date: DateString;
}

export interface GetTodayStatsData {
  typingScores: ({
    wpm: number;
    accuracy: number;
  })[];
}

export interface GetTodayStatsVariables {
  date: DateString;
}

export interface TypingScore_Key {
  id: UUIDString;
  __typename?: 'TypingScore_Key';
}

interface AddScoreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddScoreVariables): MutationRef<AddScoreData, AddScoreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddScoreVariables): MutationRef<AddScoreData, AddScoreVariables>;
  operationName: string;
}
export const addScoreRef: AddScoreRef;

export function addScore(vars: AddScoreVariables): MutationPromise<AddScoreData, AddScoreVariables>;
export function addScore(dc: DataConnect, vars: AddScoreVariables): MutationPromise<AddScoreData, AddScoreVariables>;

interface DeleteScoreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScoreVariables): MutationRef<DeleteScoreData, DeleteScoreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteScoreVariables): MutationRef<DeleteScoreData, DeleteScoreVariables>;
  operationName: string;
}
export const deleteScoreRef: DeleteScoreRef;

export function deleteScore(vars: DeleteScoreVariables): MutationPromise<DeleteScoreData, DeleteScoreVariables>;
export function deleteScore(dc: DataConnect, vars: DeleteScoreVariables): MutationPromise<DeleteScoreData, DeleteScoreVariables>;

interface ClearTodayScoresRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearTodayScoresVariables): MutationRef<ClearTodayScoresData, ClearTodayScoresVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClearTodayScoresVariables): MutationRef<ClearTodayScoresData, ClearTodayScoresVariables>;
  operationName: string;
}
export const clearTodayScoresRef: ClearTodayScoresRef;

export function clearTodayScores(vars: ClearTodayScoresVariables): MutationPromise<ClearTodayScoresData, ClearTodayScoresVariables>;
export function clearTodayScores(dc: DataConnect, vars: ClearTodayScoresVariables): MutationPromise<ClearTodayScoresData, ClearTodayScoresVariables>;

interface GetTodayScoresRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodayScoresVariables): QueryRef<GetTodayScoresData, GetTodayScoresVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTodayScoresVariables): QueryRef<GetTodayScoresData, GetTodayScoresVariables>;
  operationName: string;
}
export const getTodayScoresRef: GetTodayScoresRef;

export function getTodayScores(vars: GetTodayScoresVariables): QueryPromise<GetTodayScoresData, GetTodayScoresVariables>;
export function getTodayScores(dc: DataConnect, vars: GetTodayScoresVariables): QueryPromise<GetTodayScoresData, GetTodayScoresVariables>;

interface GetTodayStatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodayStatsVariables): QueryRef<GetTodayStatsData, GetTodayStatsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTodayStatsVariables): QueryRef<GetTodayStatsData, GetTodayStatsVariables>;
  operationName: string;
}
export const getTodayStatsRef: GetTodayStatsRef;

export function getTodayStats(vars: GetTodayStatsVariables): QueryPromise<GetTodayStatsData, GetTodayStatsVariables>;
export function getTodayStats(dc: DataConnect, vars: GetTodayStatsVariables): QueryPromise<GetTodayStatsData, GetTodayStatsVariables>;

