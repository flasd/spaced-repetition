# spaced-repetition

Simple spaced-repetition algorithm based on supermemo 2.

[![Build Status](https://travis-ci.org/flasd/spaced-repetition.svg?branch=master)](https://travis-ci.org/flasd/spaced-repetition)
[![Coverage Status](https://coveralls.io/repos/github/flasd/spaced-repetition/badge.svg?branch=master)](https://coveralls.io/github/flasd/spaced-repetition?branch=master)
[![npm version](https://badge.fury.io/js/spaced-repetition.svg)](https://www.npmjs.com/package/@flasd/spaced-repetition)
[![npm downloads per month](https://img.shields.io/npm/dm/spaced-repetition.svg)](https://www.npmjs.com/package/@flasd/spaced-repetition)

## Installation

Install the latest version of spaced-repetition:

```
yarn add @flasd/spaced-repetition

// or

npm install @flasd/spaced-repetition --save
```

Now you can use it in your index.html

```html
<script
  type="text/javascript"
  src="./node_modules/@flasd/spaced-repetition/dist/index.umd.js"
></script>

const { SpacedRepetition, getDueCards } = window.SpacedRepetition;
```

Or import it as a module.

```javascript
const { SpacedRepetition } = require('@flasd/spaced-repetition');

// or, in ES6+

import { SpacedRepetition } from '@flasd/spaced-repetition';
```

This module is [UMD](https://github.com/umdjs/umd) compliant, therefore it's compatible with RequireJs, AMD, CommonJs 1 & 2, etc.

## API & Usage.

#### SpacedRepetition class

Method signature:

```typescript
new SpacedRepetition(): SpacedRepetition;
```

```javascript
import { SpacedRepetition } from '@flasd/spaced-repetition';

const sr = new SpacedRepetition();

// or

const sr = new SpacedRepetition({
  debug: false,
  nowFn: () => Date.now(),
});
```

`nowFunction` should be a function that returns a number in milliseconds. `debug`
flag will enable console.logs with extra information.

#### getDueCards();

Method signature:

```typescript
getDueCards(
  cards: ISpacedRepetitionCard[],
  reviews: ISpacedRepetitionReview[],
): Array<[ISpacedRepetitionCard, TRepetition]>;
```

This method returns a list of cards that are due (or overdue) for review:

```javascript
import { SpacedRepetition, getDueCards } from '@flasd/spaced-repetition';

const cards = [{ id: '1' }, { id: '2' }, { id: '3' }];

const reviews = [
  { card: '1', timestamp: Date.now(), difficulty: 1 },
  { card: '2', timestamp: Date.now(), difficulty: 2 },
  { card: '3', timestamp: Date.now(), difficulty: 3 },
];

new SpacedRepetition().getDueCards(cards, reviews);
// « [[{ id: '1' }, 18568], { id: '2' }, 18565]

getDueCards(cards, reviews);
// « [[{ id: '1' }, 18568], { id: '2' }, 18565]
```

The return value is a tupple `[ISpacedRepetitionCard, TRepetition]`, where TRepetition is the next day (counting since date epoch, as a integer) that this card should be repeated. Only cards with TRepetition <= today will be returned.

### Copyright & License

Copyright (c) 2020 [Marcel de Oliveira Coelho](https://github.com/flasd) under the [MIT License](https://github.com/flasd/spaced-repetition/blob/master/LICENSE.md). Go Crazy. :rocket:
