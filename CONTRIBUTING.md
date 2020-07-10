
# Contributing to Rasterkhann

When contributing, please keep these things in mind:

## Starting Development

_Please_ reach out before you start development on a feature! This makes it easier to make sure we're on the same page. I would hate to have a fantastic PR but having it not be aligned with the games goals.

## Developing

* Some imports are very specific to avoid circular import errors. If you get circular import errors, make your `helper`/`static` imports more specific.

## Committing Code

Commits use [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) as a base. Please follow these guidelines:

* `fix(bug-category): specific bug fixed`
* `feat(feat-category): new feature added`

When a new version is created (`npm run bump:[major|minor|patch]`) a changelog will be created automatically.