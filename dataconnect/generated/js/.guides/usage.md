# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addScore, deleteScore, clearTodayScores, getTodayScores, getTodayStats } from '@typing-test/dataconnect';


// Operation AddScore:  For variables, look at type AddScoreVars in ../index.d.ts
const { data } = await AddScore(dataConnect, addScoreVars);

// Operation DeleteScore:  For variables, look at type DeleteScoreVars in ../index.d.ts
const { data } = await DeleteScore(dataConnect, deleteScoreVars);

// Operation ClearTodayScores:  For variables, look at type ClearTodayScoresVars in ../index.d.ts
const { data } = await ClearTodayScores(dataConnect, clearTodayScoresVars);

// Operation GetTodayScores:  For variables, look at type GetTodayScoresVars in ../index.d.ts
const { data } = await GetTodayScores(dataConnect, getTodayScoresVars);

// Operation GetTodayStats:  For variables, look at type GetTodayStatsVars in ../index.d.ts
const { data } = await GetTodayStats(dataConnect, getTodayStatsVars);


```