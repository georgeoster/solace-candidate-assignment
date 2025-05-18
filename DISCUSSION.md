## Fix: Wrap `<th>` Elements in `<tr>`

### Problem
The initial table had `<th>` elements directly inside `<thead>`. This is semantically wrong and also causes hydration errors.

### What I Did
Wrapped all `<th>` elements in a `<tr>`.

---

## Fix: Missing `key` props
### Problem
There were two `.map()` calls rendering lists without supplying a key prop. React requires keys to reconcile list updates. However, neither the advocate records nor the specialties arrays being iterated on included a guaranteed unique id.

### What I Did
For the list of advocates I used `advocate.phoneNumber` as a fallback key. It is not guaranteed to be unique, but it is stable and reliable enough for this dataset. In a production setting, I would recommend each record have a true id field from the database and include it in the API response.


For the list of specialties per advocate, I used index as the key. This is acceptable in this case because the list is short, static, unfiltered and the order of the elements will not change.

I also renamed the variables in the .map() callback from `s, i` to `specialty, index`.
I did this to improve readability and self-documentation..
Terse variable names like `s` are acceptable for quick iteration, but meaningful names like `specialty` make it easier for teammates and reviewers to understand the code at a glance.

---
## Fix: Direct DOM Mutation

### Problem  
There was a line in the `onChange` handler doing this:

```ts
document.getElementById("search-term").innerHTML = searchTerm;
```
That kind of direct DOM manipulation is outside of React’s rendering flow.

### What I Did
Replaced the manual DOM update with a useState variable (searchTerm) and let React handle rendering it. So now instead of targeting the element by ID and setting its innerHTML directly, I just store the value in state and render it where I need it.

I also renamed the `filteredAdvocates` variable inside the `onChange` handler to just `filtered`. Having it named the same as the state setter (`setFilteredAdvocates`) felt confusing and made the code harder to follow.

## Fix: Search Functionality

### Problem  
`advocate.yearsOfExperience` was a number, and we were calling `.includes()` directly on it. Numbers don't have `.includes()`, so this was breaking the search.
While fixing that, I also noticed the search was case-sensitive, which felt like a UX problem. For example, searching for "phd" wouldn't return "PhD" and that’s not great for a user experience.
I also noticed the speciaties search wasn't working the way I as a user would expect it to.

### What I Did  
Converted `yearsOfExperience` to a string before calling `.includes()`.
Converted all searchable fields (firstName, lastName, city, degree, specialties) to lowercase before comparing. This makes search case-insensitive, which is more intuitive for users.
Used `.some()` for specialties instead of comparing the whole array. which makes the match logic more accurate and efficient.

## Fix: Search Debounce

### Problem  
The search was firing on every single keystroke, which felt a little jittery and unnecessary. 
The filters were running for empty strings.
There was no message being displayed when no advocates were found.

### What I Did  
Added a 300ms debounce.
Made the filter logic skip `.filter()` entirely when the input is empty.
Added a 'No advocates found' message. 

## Fix: No Advocates Found Message

### Problem  
The "No advocates found" message was being rendered as a `<p>` tag directly inside the `<tbody>`. 

### What I Did  
Replaced the `<p>` with a `<tr>` containing a single `<td>` that spans all columns (`colSpan={7}`) and centers the message.

## Refactor: Create `AdvocatesTable` Component

### What I Did  
Moved the entire table into its own component: `AdvocatesTable.tsx`. Passed `filteredAdvocates` as a prop, and kept the render logic exactly the same. The goal here was just better structure and separation of concerns. The table had nothing to do with searching or fetching data, so it didn’t belong in the `Home` component.

I also created a shared `Advocate` interface in `types/advocate.ts` to keep the type logic centralized.

No visual or behavior changes — just moving logic into a more appropriate place.

## Refactor: Create `SearchBar` Component

### What I Did  
Moved the search input, label, and reset button into their own component: `SearchBar.tsx`. State management and filtering still live in the `Home` component. I wanted this SearchBar to be reusable and not have knowledge of what it was being used for.

Also renamed the handlers from `onChange` and `onClick` to `handleSearchInputChange` and `handleSearchReset`. The old names were too generic and started feeling ambiguous once they got passed down as props. More descriptive names make the code easier to follow when jumping between components.

No visual or behavior changes.

## Style: Page Layout

### What I Did  
Replaced all the `<br/>` tags and inline margin styling with Tailwind classes.

Centered layout and padding.
Vertical spacing between sections.
Clean, readable typographic hierarchy.
Easier to maintain layout going forward

## Style: Search Bar

### What I Did  
Styled the input and button with Tailwind.

Added vertical spacing.  
Used a label for accessibility.  
Gave focus and hover indicators to the input and button.  
Moved the “Searching for:” text *below* the input instead of between the label and input — it felt visually out of place where it was before.

No changes to functionality.

## Style: Advocates Table

### What I Did  
Applied Tailwind styling to the table for visual clarity and usability.

Full-width layout with scrollable overflow for smaller screens
Zebra striping and row separation
Formatted phone numbers to `(555) 555-5555`
Row hover state for a touch of interactivity

No changes to functionality.

## Fix: API use DB

### Problem
API was returning seed data instead of querying the database.
The `/api/advocates` route was returning a static array from `advocateData`, which meant records had no `id` or `createdAt` fields.

### What I Did
I updated the route to pull real records from the database:

```ts
const data = await db.select().from(advocates);
```

Now we have consistent, persisted data across the app and a proper `id` for the frontend to use as a key.
