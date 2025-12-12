# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetTodayScores*](#gettodayscores)
  - [*GetTodayStats*](#gettodaystats)
- [**Mutations**](#mutations)
  - [*AddScore*](#addscore)
  - [*DeleteScore*](#deletescore)
  - [*ClearTodayScores*](#cleartodayscores)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@typing-test/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@typing-test/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@typing-test/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetTodayScores
You can execute the `GetTodayScores` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [js/index.d.ts](./index.d.ts):
```typescript
getTodayScores(vars: GetTodayScoresVariables): QueryPromise<GetTodayScoresData, GetTodayScoresVariables>;

interface GetTodayScoresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodayScoresVariables): QueryRef<GetTodayScoresData, GetTodayScoresVariables>;
}
export const getTodayScoresRef: GetTodayScoresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTodayScores(dc: DataConnect, vars: GetTodayScoresVariables): QueryPromise<GetTodayScoresData, GetTodayScoresVariables>;

interface GetTodayScoresRef {
  ...
  (dc: DataConnect, vars: GetTodayScoresVariables): QueryRef<GetTodayScoresData, GetTodayScoresVariables>;
}
export const getTodayScoresRef: GetTodayScoresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTodayScoresRef:
```typescript
const name = getTodayScoresRef.operationName;
console.log(name);
```

### Variables
The `GetTodayScores` query requires an argument of type `GetTodayScoresVariables`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTodayScoresVariables {
  date: DateString;
}
```
### Return Type
Recall that executing the `GetTodayScores` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTodayScoresData`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTodayScores`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTodayScores, GetTodayScoresVariables } from '@typing-test/dataconnect';

// The `GetTodayScores` query requires an argument of type `GetTodayScoresVariables`:
const getTodayScoresVars: GetTodayScoresVariables = {
  date: ..., 
};

// Call the `getTodayScores()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTodayScores(getTodayScoresVars);
// Variables can be defined inline as well.
const { data } = await getTodayScores({ date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTodayScores(dataConnect, getTodayScoresVars);

console.log(data.typingScores);

// Or, you can use the `Promise` API.
getTodayScores(getTodayScoresVars).then((response) => {
  const data = response.data;
  console.log(data.typingScores);
});
```

### Using `GetTodayScores`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTodayScoresRef, GetTodayScoresVariables } from '@typing-test/dataconnect';

// The `GetTodayScores` query requires an argument of type `GetTodayScoresVariables`:
const getTodayScoresVars: GetTodayScoresVariables = {
  date: ..., 
};

// Call the `getTodayScoresRef()` function to get a reference to the query.
const ref = getTodayScoresRef(getTodayScoresVars);
// Variables can be defined inline as well.
const ref = getTodayScoresRef({ date: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTodayScoresRef(dataConnect, getTodayScoresVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.typingScores);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.typingScores);
});
```

## GetTodayStats
You can execute the `GetTodayStats` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [js/index.d.ts](./index.d.ts):
```typescript
getTodayStats(vars: GetTodayStatsVariables): QueryPromise<GetTodayStatsData, GetTodayStatsVariables>;

interface GetTodayStatsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTodayStatsVariables): QueryRef<GetTodayStatsData, GetTodayStatsVariables>;
}
export const getTodayStatsRef: GetTodayStatsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTodayStats(dc: DataConnect, vars: GetTodayStatsVariables): QueryPromise<GetTodayStatsData, GetTodayStatsVariables>;

interface GetTodayStatsRef {
  ...
  (dc: DataConnect, vars: GetTodayStatsVariables): QueryRef<GetTodayStatsData, GetTodayStatsVariables>;
}
export const getTodayStatsRef: GetTodayStatsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTodayStatsRef:
```typescript
const name = getTodayStatsRef.operationName;
console.log(name);
```

### Variables
The `GetTodayStats` query requires an argument of type `GetTodayStatsVariables`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTodayStatsVariables {
  date: DateString;
}
```
### Return Type
Recall that executing the `GetTodayStats` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTodayStatsData`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTodayStatsData {
  typingScores: ({
    wpm: number;
    accuracy: number;
  })[];
}
```
### Using `GetTodayStats`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTodayStats, GetTodayStatsVariables } from '@typing-test/dataconnect';

// The `GetTodayStats` query requires an argument of type `GetTodayStatsVariables`:
const getTodayStatsVars: GetTodayStatsVariables = {
  date: ..., 
};

// Call the `getTodayStats()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTodayStats(getTodayStatsVars);
// Variables can be defined inline as well.
const { data } = await getTodayStats({ date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTodayStats(dataConnect, getTodayStatsVars);

console.log(data.typingScores);

// Or, you can use the `Promise` API.
getTodayStats(getTodayStatsVars).then((response) => {
  const data = response.data;
  console.log(data.typingScores);
});
```

### Using `GetTodayStats`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTodayStatsRef, GetTodayStatsVariables } from '@typing-test/dataconnect';

// The `GetTodayStats` query requires an argument of type `GetTodayStatsVariables`:
const getTodayStatsVars: GetTodayStatsVariables = {
  date: ..., 
};

// Call the `getTodayStatsRef()` function to get a reference to the query.
const ref = getTodayStatsRef(getTodayStatsVars);
// Variables can be defined inline as well.
const ref = getTodayStatsRef({ date: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTodayStatsRef(dataConnect, getTodayStatsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.typingScores);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.typingScores);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddScore
You can execute the `AddScore` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [js/index.d.ts](./index.d.ts):
```typescript
addScore(vars: AddScoreVariables): MutationPromise<AddScoreData, AddScoreVariables>;

interface AddScoreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddScoreVariables): MutationRef<AddScoreData, AddScoreVariables>;
}
export const addScoreRef: AddScoreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addScore(dc: DataConnect, vars: AddScoreVariables): MutationPromise<AddScoreData, AddScoreVariables>;

interface AddScoreRef {
  ...
  (dc: DataConnect, vars: AddScoreVariables): MutationRef<AddScoreData, AddScoreVariables>;
}
export const addScoreRef: AddScoreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addScoreRef:
```typescript
const name = addScoreRef.operationName;
console.log(name);
```

### Variables
The `AddScore` mutation requires an argument of type `AddScoreVariables`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddScoreVariables {
  name: string;
  wpm: number;
  accuracy: number;
  date: DateString;
  time: string;
}
```
### Return Type
Recall that executing the `AddScore` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddScoreData`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddScoreData {
  typingScore_insert: TypingScore_Key;
}
```
### Using `AddScore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addScore, AddScoreVariables } from '@typing-test/dataconnect';

// The `AddScore` mutation requires an argument of type `AddScoreVariables`:
const addScoreVars: AddScoreVariables = {
  name: ..., 
  wpm: ..., 
  accuracy: ..., 
  date: ..., 
  time: ..., 
};

// Call the `addScore()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addScore(addScoreVars);
// Variables can be defined inline as well.
const { data } = await addScore({ name: ..., wpm: ..., accuracy: ..., date: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addScore(dataConnect, addScoreVars);

console.log(data.typingScore_insert);

// Or, you can use the `Promise` API.
addScore(addScoreVars).then((response) => {
  const data = response.data;
  console.log(data.typingScore_insert);
});
```

### Using `AddScore`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addScoreRef, AddScoreVariables } from '@typing-test/dataconnect';

// The `AddScore` mutation requires an argument of type `AddScoreVariables`:
const addScoreVars: AddScoreVariables = {
  name: ..., 
  wpm: ..., 
  accuracy: ..., 
  date: ..., 
  time: ..., 
};

// Call the `addScoreRef()` function to get a reference to the mutation.
const ref = addScoreRef(addScoreVars);
// Variables can be defined inline as well.
const ref = addScoreRef({ name: ..., wpm: ..., accuracy: ..., date: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addScoreRef(dataConnect, addScoreVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.typingScore_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.typingScore_insert);
});
```

## DeleteScore
You can execute the `DeleteScore` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [js/index.d.ts](./index.d.ts):
```typescript
deleteScore(vars: DeleteScoreVariables): MutationPromise<DeleteScoreData, DeleteScoreVariables>;

interface DeleteScoreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteScoreVariables): MutationRef<DeleteScoreData, DeleteScoreVariables>;
}
export const deleteScoreRef: DeleteScoreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteScore(dc: DataConnect, vars: DeleteScoreVariables): MutationPromise<DeleteScoreData, DeleteScoreVariables>;

interface DeleteScoreRef {
  ...
  (dc: DataConnect, vars: DeleteScoreVariables): MutationRef<DeleteScoreData, DeleteScoreVariables>;
}
export const deleteScoreRef: DeleteScoreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteScoreRef:
```typescript
const name = deleteScoreRef.operationName;
console.log(name);
```

### Variables
The `DeleteScore` mutation requires an argument of type `DeleteScoreVariables`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteScoreVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteScore` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteScoreData`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteScoreData {
  typingScore_delete?: TypingScore_Key | null;
}
```
### Using `DeleteScore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteScore, DeleteScoreVariables } from '@typing-test/dataconnect';

// The `DeleteScore` mutation requires an argument of type `DeleteScoreVariables`:
const deleteScoreVars: DeleteScoreVariables = {
  id: ..., 
};

// Call the `deleteScore()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteScore(deleteScoreVars);
// Variables can be defined inline as well.
const { data } = await deleteScore({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteScore(dataConnect, deleteScoreVars);

console.log(data.typingScore_delete);

// Or, you can use the `Promise` API.
deleteScore(deleteScoreVars).then((response) => {
  const data = response.data;
  console.log(data.typingScore_delete);
});
```

### Using `DeleteScore`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteScoreRef, DeleteScoreVariables } from '@typing-test/dataconnect';

// The `DeleteScore` mutation requires an argument of type `DeleteScoreVariables`:
const deleteScoreVars: DeleteScoreVariables = {
  id: ..., 
};

// Call the `deleteScoreRef()` function to get a reference to the mutation.
const ref = deleteScoreRef(deleteScoreVars);
// Variables can be defined inline as well.
const ref = deleteScoreRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteScoreRef(dataConnect, deleteScoreVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.typingScore_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.typingScore_delete);
});
```

## ClearTodayScores
You can execute the `ClearTodayScores` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [js/index.d.ts](./index.d.ts):
```typescript
clearTodayScores(vars: ClearTodayScoresVariables): MutationPromise<ClearTodayScoresData, ClearTodayScoresVariables>;

interface ClearTodayScoresRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearTodayScoresVariables): MutationRef<ClearTodayScoresData, ClearTodayScoresVariables>;
}
export const clearTodayScoresRef: ClearTodayScoresRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
clearTodayScores(dc: DataConnect, vars: ClearTodayScoresVariables): MutationPromise<ClearTodayScoresData, ClearTodayScoresVariables>;

interface ClearTodayScoresRef {
  ...
  (dc: DataConnect, vars: ClearTodayScoresVariables): MutationRef<ClearTodayScoresData, ClearTodayScoresVariables>;
}
export const clearTodayScoresRef: ClearTodayScoresRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the clearTodayScoresRef:
```typescript
const name = clearTodayScoresRef.operationName;
console.log(name);
```

### Variables
The `ClearTodayScores` mutation requires an argument of type `ClearTodayScoresVariables`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClearTodayScoresVariables {
  date: DateString;
}
```
### Return Type
Recall that executing the `ClearTodayScores` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClearTodayScoresData`, which is defined in [js/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClearTodayScoresData {
  typingScore_deleteMany: number;
}
```
### Using `ClearTodayScores`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, clearTodayScores, ClearTodayScoresVariables } from '@typing-test/dataconnect';

// The `ClearTodayScores` mutation requires an argument of type `ClearTodayScoresVariables`:
const clearTodayScoresVars: ClearTodayScoresVariables = {
  date: ..., 
};

// Call the `clearTodayScores()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await clearTodayScores(clearTodayScoresVars);
// Variables can be defined inline as well.
const { data } = await clearTodayScores({ date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await clearTodayScores(dataConnect, clearTodayScoresVars);

console.log(data.typingScore_deleteMany);

// Or, you can use the `Promise` API.
clearTodayScores(clearTodayScoresVars).then((response) => {
  const data = response.data;
  console.log(data.typingScore_deleteMany);
});
```

### Using `ClearTodayScores`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, clearTodayScoresRef, ClearTodayScoresVariables } from '@typing-test/dataconnect';

// The `ClearTodayScores` mutation requires an argument of type `ClearTodayScoresVariables`:
const clearTodayScoresVars: ClearTodayScoresVariables = {
  date: ..., 
};

// Call the `clearTodayScoresRef()` function to get a reference to the mutation.
const ref = clearTodayScoresRef(clearTodayScoresVars);
// Variables can be defined inline as well.
const ref = clearTodayScoresRef({ date: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = clearTodayScoresRef(dataConnect, clearTodayScoresVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.typingScore_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.typingScore_deleteMany);
});
```

