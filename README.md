
# Internship React Task Suite

This project is a high-quality single-page application built to fulfill five core frontend engineering tasks.

## Technical Details
- **Node Version:** 18+ (Required for modern React APIs and tooling)
- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Mobile-First approach)
- **Icons:** Lucide React

## Installation Steps
1. Ensure you have Node.js 18.x installed.
2. Run `npm install` to install dependencies.
3. Run `npm start` or `npm run dev` to launch the local server.
4. Open the provided localhost URL in your browser.

## Assumptions & Implementation Logic

### Task 1: Todo List
- Persists to `localStorage` using a custom `useLocalStorage` hook.
- Filtering is handled in-memory using `useMemo` for performance.
- Priorities are color-coded for visual hierarchy.

### Task 2: Form Handling
- Implements a single object state `formData` for all inputs.
- Real-time validation clearing on input change.
- Submit only triggers if all validation checks (regex for email, length for password) pass.

### Task 3: Progress Bars
- Dynamic input generation allows up to 5 metrics.
- Color transitions are handled via Tailwind classes based on value thresholds (<40, >70).
- The main bar calculates the mathematical average of all active sub-inputs.

### Task 4: Countdown Timer
- **End Timestamp Logic:** When the timer starts, we calculate `Date.now() + duration` and store that in `localStorage`.
- On page refresh, the app compares the current time to the stored `endTime` to resume exactly where it should be, maintaining millisecond precision.
- Uses `setInterval` with a 33ms cycle for smooth rendering of fractional seconds.

### Task 5: Live Search
- Case-insensitive filtering.
- Regex splitting `text.split(new RegExp('(' + search + ')', 'gi'))` ensures all matching segments are wrapped in highlighted tags without losing the original case.

## Architecture
- `src/hooks/`: Contains the generic `useLocalStorage` hook.
- `src/components/`: Modular component design (one file per task).
- `src/types.ts`: Centralized TypeScript definitions to ensure type safety across the suite.
