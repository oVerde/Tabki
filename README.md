# Tabki

Below are concrete steps to integrate the listed concepts and advanced topics into your current Firefox extension project, or a similar personal project. The idea is to take what you’re already building—the “Tabki” extension—and enhance it in ways that help you practice and internalize the skills mentioned. You don’t need to do them all at once; pick a few areas at a time and iterate.

### 1. Data Structures and Algorithmic Thinking

**What to do:**

- **Caching and Pre-Fetching:**  
  Suppose the extension queries Anki deck names every time the new tab is opened. You can optimize this by implementing a caching layer using a `Map` to store deck names fetched from AnkiConnect. This gives you a scenario to think about how to store and retrieve data quickly.
- **Optimizing Search/Filtering:**  
  If you decide to allow the user to filter through a large list of decks or notes, you could implement different data structures (e.g., a `Set` for quick membership checks or a `Map` keyed by deck name for O(1) lookups). Think about time complexity and comment on why you chose one structure over another.

**Practice:**

- Add a feature where the user can type a few letters to quickly find a deck. Measure and compare using an array filter vs. using a `Set` or `Map`.
- Document the Big-O complexity of these lookups in the code comments.

### 2. Advanced TypeScript Features

**What to do:**

- **Generics for Data Fetching:**  
  Create a generic fetch function that can handle different data types—decks, cards, etc.—and uses TypeScript’s `generic` constraints. For instance:
  ```typescript
  async function fetchFromAnki<T>(action: string, params?: object): Promise<T> { ... }
  ```
- **Mapped and Conditional Types:**  
  If you have different response shapes from AnkiConnect, define type transformations. For example, if you have a type `Card` and want a readonly version of it, use mapped types.
- **Discriminated Unions for State Management:**  
  If you introduce a small state machine for loading states (`loading`, `success`, `error`), use a discriminated union to type states and ensure the compiler catches missing cases.

**Practice:**

- Add a `State` type for the new tab page that can be `{"status": "loading"}`, `{"status": "error", "message": string}`, or `{"status": "success", "data": Card}`. Use a discriminated union to ensure all states are handled in the UI logic.
- Implement a generic `storage` utility function that can get/set typed objects in `browser.storage`, using advanced TypeScript features for stricter type checking.

### 3. Functional Programming Patterns in JavaScript

**What to do:**

- **Immutability:**  
  When updating your cached deck list or card state, do it immutably. Avoid mutating arrays and objects directly.
- **Currying and Composition:**  
  Write a small utility that fetches data and processes it. For example, a function `fetchDecks` that returns a promise, and then use composition to transform the results.
- **Partial Application:**  
  If you often call a function with the same parameters, create a partially applied version for convenience, like a partially applied fetch function that already knows the base URL or version number.

**Practice:**

- Refactor some logic so that you have a pipeline: `fetchDecks() -> filterDecks() -> renderDecks()` using composition functions rather than inline loops.
- Curried functions for generating a fetch request function with fixed parameters.

### 4. Advanced React Patterns and Hooks (If You Ever Reintroduce React)

Since you’ve chosen not to use React, you can skip this for now. But if you ever decide to use a small React component for part of your extension’s configuration or a potential dashboard, you can:

- Use `useReducer` for complex state transitions.
- Optimize performance with `useMemo`/`useCallback`.
- Handle concurrency in data fetching with React Suspense (in a future scenario).

### 5. Generators and Advanced Iteration Techniques

**What to do:**

- **Async Generators for Streaming Data:**  
  If you decide to integrate a feature that fetches a large number of notes and yields them as they come in, implement an async generator to fetch a batch of cards at a time.
- **Iterators for Complex Data Processing:**  
  Before rendering decks, create a custom iterator that yields decks meeting certain criteria. This might be overkill for a small project, but it’s good practice.

**Practice:**

- Implement a generator that simulates walking through all cards in a deck, yielding one at a time, and use this in your UI to practice advanced iteration.

### 6. Asynchronous and Concurrency Patterns

**What to do:**

- **Promise.race / Promise.all:**  
  If you fetch multiple resources (e.g., deck names and card templates), use `Promise.all` or `Promise.race` to handle concurrency.
- **Retry or Timeout Logic:**  
  Implement a timeout wrapper that rejects a fetch if AnkiConnect doesn’t respond in time, and handle it gracefully. This shows complexity handling and async patterns.

**Practice:**

- Write a small wrapper for `ankiConnect` calls that times out after 2 seconds and retries once, applying advanced async logic.

### 7. Tooling and Build Processes

**What to do:**

- **Integrate Linting and Formatting:**  
  Add ESLint and Prettier to your project to ensure code quality.
- **Experiment with Different Bundlers:**  
  Try using SWC or a different bundler than esbuild for comparison.
- **Tree-shaking and Code Splitting:**  
  If the project grows, split the code into modules and ensure the bundler only includes what’s needed. Test that unused code is tree-shaken out.

**Practice:**

- Configure a stricter `tsconfig.json` (enable `noImplicitAny`, `strictNullChecks`, etc.) and fix all resulting errors.
- Add ESLint rules to catch common performance pitfalls or style issues and fix them.

### 8. Testing and Code Quality Approaches

**What to do:**

- **Unit Tests:**  
  Write unit tests for your `ankiClient.ts` using Jest or Vitest. This helps you think about how to structure code for testability.
- **Property-Based Testing:**  
  Experiment with property-based testing for some part of your logic (e.g., deck filtering) to strengthen your algorithmic thinking.

**Practice:**

- Create a `tests` folder and add tests for fetching decks, ensuring no decks break the logic.
- Test error handling when AnkiConnect is not available.

### 9. Domain-Driven Design and Architectural Patterns

**What to do:**

- **Clean Architecture Layers:**  
  Separate your code into layers:
  - `ankiClient` as a data access layer,
  - `newtab`/`options` code as presentation layer,
  - Some state management code or service layer that decides which data to fetch and when.
- **Meaningful Types for Domains:**  
  Create types that represent the domain (e.g., `type DeckName = string; type Card = { question: string; answer: string }`) and enforce them throughout.

**Practice:**

- Introduce a small state manager that orchestrates data fetching and state transitions, documented with clear domain concepts. Even if small, this trains you to think architecturally.

---

**How to Learn and Train:**

1. **Incremental Adoption:**  
   Don’t try everything at once. Pick one or two areas at a time. For example, first focus on advanced TypeScript features and data structures. Once comfortable, move on to async patterns or tooling.

2. **Reflect and Document:**
   After implementing a new feature or refactoring, write down what you learned, what patterns you used, and why. Treat this as a learning journal.

3. **Set Challenges:**
   If you have colleagues or friends who also code, ask them to review your code. Or, set specific challenges for yourself, like “Implement a timeout-and-retry logic using async/await and test it thoroughly.”

4. **Compare Before and After:**
   Measure performance or bundle size before and after certain optimizations. This helps you understand the real-world impact of your changes.

5. **Look for Inspiration in Real Code:**
   Review open-source projects that use advanced TypeScript features, functional programming patterns, or complex build setups. Compare their approaches with yours.

By applying these steps and patterns, you’ll be practicing the advanced concepts mentioned in the provided summary, all within the context of your current project. Over time, you’ll naturally internalize these skills and be better prepared for senior-level challenges.Below are concrete steps to integrate the listed concepts and advanced topics into your current Firefox extension project, or a similar personal project. The idea is to take what you’re already building—the “Tabki” extension—and enhance it in ways that help you practice and internalize the skills mentioned. You don’t need to do them all at once; pick a few areas at a time and iterate.
