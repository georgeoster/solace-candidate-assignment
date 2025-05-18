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
