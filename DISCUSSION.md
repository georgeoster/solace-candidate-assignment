## Fix: Wrap `<th>` Elements in `<tr>`

### Problem
The initial table had `<th>` elements directly inside `<thead>`. This is semantically wrong and also causes hydration errors.

### What I Did
Wrapped all `<th>` elements in a `<tr>`.

---

