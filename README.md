# devops-and-suffering

A dark, minimal, technical Ghost theme for **DevOps and Suffering**. JetBrains
Mono for headings/chrome, Inter Tight for body text, one amber accent color,
and an original terminal-style typewriter animation on the homepage hero
(cycles through a handful of mock status lines — no JS dependency, respects
`prefers-reduced-motion`).

This theme was written from scratch — inspired by the general aesthetic of
dark/editorial Ghost themes, but no code was copied from any other theme.

## Structure

```
default.hbs           ← base HTML layout (fonts, screen.css, main.js)
index.hbs              ← home page (hero + terminal + post list)
post.hbs                ← single post
page.hbs                 ← static pages (About, etc.)
tag.hbs, author.hbs       ← archive views
error.hbs                  ← 404 / 5xx

partials/
  site-header.hbs           ← logo, tagline, nav
  site-footer.hbs             ← copyright, secondary nav
  post-card.hbs                 ← post list item

assets/
  css/screen.css                  ← the whole design system
  js/main.js                        ← terminal typewriter effect

package.json                          ← Ghost theme metadata
```

## Installing

Upload via Ghost Admin (**Settings → Design → Change theme → Upload theme**)
after zipping this repo's contents (not the repo folder itself — the zip's
root must contain `package.json` directly), or deploy it with
[`@aaronge/ghost-site`](https://github.com/aaron-dernley/ghost-site):

```sh
swamp model method run blog-site uploadTheme --input zipPath=./devops-and-suffering.zip --json
swamp model method run blog-site activateTheme --input name=devops-and-suffering --json
```

## Local development

```sh
npm install -g ghost-cli
mkdir -p ~/ghost-local && cd ~/ghost-local
ghost install local
ln -s "$(pwd -P)/../devops-and-suffering" content/themes/devops-and-suffering
ghost restart
# then Design → Change theme → devops-and-suffering in http://localhost:2368/ghost
```

## Validating

Ghost validates every theme upload server-side with `gscan`; you can also run
it locally before uploading:

```sh
npx -y gscan .
```
