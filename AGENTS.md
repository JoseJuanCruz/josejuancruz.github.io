# AGENTS.md

Guidelines for agentic coding agents working in this repository.

## Project Overview

This is **al-folio**, a Jekyll-based static website theme for academics. It uses:

- **Jekyll** - Ruby static site generator
- **Liquid** - Templating language (`.liquid` files)
- **Kramdown** - Markdown processor with GFM support
- **SCSS** - CSS preprocessor
- **BibTeX** - Bibliography management via jekyll-scholar

## Build Commands

### Local Development (Docker - Recommended)

```bash
docker compose pull
docker compose up
```

Site runs at `http://localhost:8080`

### Local Development (Native Ruby)

```bash
bundle install
bundle exec jekyll serve --livereload
```

Site runs at `http://localhost:4000`

### Production Build

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Output goes to `_site/` directory.

### Purge Unused CSS (Post-build)

```bash
purgecss -c purgecss.config.js
```

## Lint/Format Commands

### Prettier (Required before committing)

```bash
npx prettier . --check
npx prettier . --write
```

Uses `@shopify/prettier-plugin-liquid` for Liquid templates.

### Pre-commit Hooks

Pre-commit hooks are configured in `.pre-commit-config.yaml`:

- trailing-whitespace
- end-of-file-fixer
- check-yaml
- check-added-large-files

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

- **deploy.yml** - Builds and deploys to GitHub Pages on push to main/master
- **prettier.yml** - Checks code formatting on PRs
- **broken-links.yml** - Checks for broken links

## Code Style Guidelines

### Liquid Templates (`.liquid`)

```liquid
{%- comment -%}Use hyphens to strip whitespace: {%- and -%}{%- endcomment -%}

{%- if condition -%}
  {{ variable }}
{%- endif -%}

{%- for item in collection -%}
  {{ item.property }}
{%- endfor -%}

{%- include filename.liquid param=value -%}

{%- assign my_var = 'value' -%}
```

- Use `{%- -%}` syntax to strip whitespace
- Use `{{- -}}` for output tags when needed
- Indent with 2 spaces inside control structures
- Use `relative_url` filter for internal links
- Use `prepend` and `append` filters for path construction

### Markdown Files (`.md`)

Front matter is required:

```yaml
---
layout: post
title: "Post Title"
date: 2024-01-15 10:00:00
description: "Brief description"
tags: tag1 tag2
categories: category-name
---
```

Common layouts: `post`, `page`, `default`, `bib`, `distill`

Special front matter options:

- `toc: true` or `toc: { sidebar: left/right }` - Table of contents
- `math: true` - Enable MathJax
- `chartjs: true`, `echarts: true`, `mermaid: true` - Enable charts
- `code_diff: true` - Enable diff2html
- `images: { compare: true, lightbox2: true, photoswipe: true }`
- `redirect: /new/path/` or `redirect: https://external.com`

### SCSS (`.scss`)

- Use CSS custom properties for theming (defined in `_sass/_themes.scss`)
- Theme colors defined in `_sass/_variables.scss`
- Main theme color: `$purple-color` (light), `$cyan-color` (dark)
- Use `!default` flag for overridable variables
- Import order matters - variables before usage

```scss
@use "sass:color";

.component {
  color: var(--global-text-color);
  background: var(--global-bg-color);
}
```

### JavaScript

- ES6+ syntax
- Theme switching handled in `assets/js/theme.js`
- Use `const` and `let` (not `var`)
- Arrow functions for callbacks
- Initialize theme in `<head>` to prevent flicker

```javascript
const myFunction = () => {
  const element = document.querySelector(".selector");
  if (!element) return;
  element.classList.add("active");
};
```

### YAML Configuration

`_config.yml` structure:

- Site settings at top (title, url, baseurl)
- Theme settings (colors, repo_theme)
- Plugin configurations
- Third-party library versions

Key settings:

- `url` - Base hostname (e.g., `https://username.github.io`)
- `baseurl` - Subpath or empty for root
- `collections` - Define content types (news, projects, books)
- `scholar` - Bibliography settings

### BibTeX Files

Located in `_bibliography/papers.bib`:

- Standard BibTeX format
- Custom fields: `abbr`, `preview`, `pdf`, `arxiv`, `code`, `blog`, `slides`, `video`, `award`, `selected`, `bibtex_show`
- Use `@string` for publisher abbreviations

```bibtex
@article{key2024,
  abbr={CONF},
  title={Paper Title},
  author={Last, First and Other, Author},
  journal={Journal Name},
  year={2024},
  pdf={paper.pdf},
  arxiv={2401.12345},
  selected={true}
}
```

### Data Files (YAML in `_data/`)

- `cv.yml` - CV/resume data (time_table, map, nested_list types)
- `coauthors.yml` - Coauthor URLs keyed by lowercase last name
- `repositories.yml` - GitHub users/repos for display
- `venues.yml` - Venue abbreviations with colors/URLs

## File Organization

```
_config.yml           # Main configuration
_bibliography/        # BibTeX files
_books/              # Books collection
_data/               # YAML data files
_includes/           # Liquid partials (reusable components)
_layouts/            # Page templates
_news/               # News collection
_pages/              # Static pages
_posts/              # Blog posts (YYYY-MM-DD-title.md)
_projects/           # Projects collection
_sass/               # SCSS stylesheets
assets/              # Static assets (img, js, css, pdf, etc.)
bin/                 # Build/deploy scripts
```

## Key Conventions

### Naming

- Files: lowercase with hyphens (`my-post.md`, `header.liquid`)
- YAML keys: snake_case
- CSS classes: kebab-case
- Liquid variables: snake_case

### Imports/Includes

Liquid includes:

```liquid
{%- include filename.liquid -%}
{%- include filename.liquid param1=value param2="string" -%}
```

SCSS imports:

```scss
@use "sass:color";
@use "variables" as *;
```

### Error Handling

- Use `{% if variable %}` checks before accessing
- Use `| default: "fallback"` filter for optional values
- Check `site.enable_*` flags before rendering features

### Performance

- Use `defer` attribute on CSS links where possible
- Enable lazy loading: `lazy_loading_images: true`
- Use `bust_file_cache` filter for cache-busting

## Testing

No automated tests. Verify by:

1. Running locally with `bundle exec jekyll serve`
2. Checking browser console for errors
3. Validating HTML structure
4. Testing all pages render correctly

## Deployment

Automatic deployment via GitHub Actions:

1. Push to `main` branch
2. `deploy.yml` workflow builds site
3. Deploys to `gh-pages` branch
4. GitHub Pages serves from `gh-pages`

Manual deployment:

```bash
./bin/deploy
```

## Common Tasks

### Add a new blog post

Create `_posts/YYYY-MM-DD-title.md` with appropriate front matter.

### Add a new project

Create `_projects/N_project.md` (N is order number).

### Add a publication

Add entry to `_bibliography/papers.bib`.

### Modify theme colors

Edit `_sass/_themes.scss` and `_sass/_variables.scss`.

### Add a new page

Create in `_pages/` with `layout: page` and add to `_config.yml` includes.

## Multilingual Support (i18n)

This site supports English (en) and Spanish (es) using **jekyll-polyglot**.

### Configuration

Languages are configured in `_config.yml`:

```yaml
languages: ["en", "es"]
default_lang: "en"
```

### Translation Strings

UI strings are in `_data/en/strings.yml` and `_data/es/strings.yml`.
Access them in templates using:

```liquid
{{ site.data[site.active_lang].strings.key_name | default: 'Fallback' }}
```

### Creating Translated Content

- Pages: Create Spanish versions in `_pages/es/` with `lang: es` front matter
- Posts: Add `lang: es` to front matter for Spanish posts
- CV data: `_data/en/cv.yml` and `_data/es/cv.yml`

### URL Structure

```
/              → English (default)
/es/           → Spanish homepage
/projects/     → English projects
/es/projects/  → Spanish projects
```

### Language Switcher

The switcher is in `_includes/header.liquid` - toggles between EN/ES.

### Adding a New Language

1. Add language code to `languages` array in `_config.yml`
2. Create `_data/{lang}/strings.yml` with translations
3. Create translated pages in `_pages/{lang}/`
4. Update header.liquid switcher logic
