
# Rasterkhann

Rasterkhann is a game about building a powerful town and a legendary assortment of heroes to accomplish impossible tasks.

## Join Up

You can join [the Discord](https://discord.gg/MG8cNts) to suggest features, report bugs, or anything of the sort!

## Developing

* `npm start` to run the game locally
* `npm run build` to build a production copy of the game
* `npm run test` to run any tests

## Committing

Commits use [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) as a base. Please follow these guidelines:

* `fix(bug-category): specific bug fixed`
* `feat(feat-category): new feature added`

When a new version is created (`npm run bump:[major|minor|patch]`) a changelog will be created automatically.

### Notes

* Some imports are very specific to avoid circular import errors. If you get circular import errors, make your `helper`/`static` imports more specific.

## New Features

Please run your feature ideas past me first! I would hate to have a fantastic PR but having it not be aligned with the games goals.

## Design

WIP Design [in this Google Doc](https://docs.google.com/document/d/1Pecc--sRZj-DKdZyzmnUy1wXZyEDoUtYtG7Mtt0ZdqU/edit).

## Art Credits

* 7Soul (Humble Bundle): Hero sprites, weapon sprites, armor sprites, skill sprites, potion sprites
* Wonderdot (Humble Bundle): Town sprites