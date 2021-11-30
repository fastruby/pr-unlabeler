# PR Unlabeler

by FastRuby.io

# How to:

If you want to remove the `ready-to-qa` label when the `ready-to-merge` label is added to a PR:

```yml
# .github/workflows/unlabel.yml

name: Unlabel
on:
  pull_request:
    types: [labeled]

jobs:
  create-review-app:
    if: ${{ github.event.label.name == 'ready-to-merge' }}
    runs-on: ubuntu-latest

    steps:
      - uses: fastruby/pr-unlabeler@v1
        with:
          label-to-remove: "ready-to-qa"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

# Configuration

## Inputs:

### `label-to-remove`

Any string that would match a valid label in the repo.

# How to contribute:

- Run `npm install` to get the needed dependencies
- Before committing changes, remember to rebuild the final .js file with `npm run prepare`
- Always commit the `dist/*` files
- After pushing the changes, make a new release in GitHub so you can target that version in the workflow config

> To show debug messages in the action's log, you can add a repo secret with the key `ACTIONS_STEP_DEBUG` and the value `true`

TODO:

- Only allow interactions of collaborators to trigger the actions to prevent abuse.
- Add linter/prettier
