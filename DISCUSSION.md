# Discussion

Here are some other changes I would make to this project given more time:

### Component restructuring and cleanup

I would break up the `Home` component into components such as `Header`, `Search`, `AdvocatesTable`, `AdvocateRow`, and so on. Each component would be defined in individual modules in a `components` folder in `src/app/`. Logic that is currently inline in the rendered element could be moved outside of the component, allowing to be tested in isolation and making it possible to be composed in future logic.

For example, `components/advocates-table.tsx` would contain the `AdvocatesTable` component that accepts `props.searchTerm` and renders the filtered advocates based on that search term. It would also contain `filterAdvocates` outside of the component which could be tested apart from the component.

Unfortunately I ran into issues when moving `src/app/page.tsx`, which NextJS seems to require to be present, and abandoned this effort to focus on other concerns.

### Use database and resolve issue

I opened issue #2 because quieting logging related to React `key` prop meant using the indices of the items in the rendered array, which can lead to odd edge cases. I wanted to avoid alert fatigue while making sure this could be handled later.

I'm interested in setting up and seeding the database to better understand why the `api/seed/route.ts` module was failing to typecheck. Presumably this is not a problem intended as part of this project.

I also suspect that there may be a way to avoid manually writing out the `Advocate` type after setting up the database.

### UI/UX

I did not have time to make improvements to the UI/UX given other priorities. Since I have not used Tailwind before, I am split on the approach I would use for styling: I would make quicker progress using CSS modules in the context of a time-boxed project, but I would rather invest in learning and using Tailwind, which addresses multiple pain points I've experienced and observed in a frontend architecture of any significant scale.

Beyond styling, I see other potential UX improvements:

- Debouncing the input of the search query so that the filtering occurs after a brief delay, mitigating risk of overloading API.
- Formatting phone numbers by converting to string and inserting dashes; could also render as link using `tel:` protocol.
- Remove filtering on phone number, since this makes searching for years of experience more difficult. May also represent a privacy issue.
- Paginating the list of advocates to anticipate searching through a database hundreds or thousands of items.
- Adding sort functions by clicking table header cells for name, city, and years of experience.
- Adding UI to filter by one or multiple specialties, assuming these are pre-defined.
- Adding UI to set a range of years of experience, rather than requiring this to be input as a search term.
