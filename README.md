# VitePress Valence

![GitHub license](https://img.shields.io/github/license/cynber/vitepress-valence)
<!-- [![GitHub release](https://img.shields.io/github/v/release/cynber/vitepress-valence)]
[![GitHub issues](https://img.shields.io/github/issues/cynber/vitepress-valence)]
[![GitHub pull requests](https://img.shields.io/github/issues-pr/cynber/vitepress-valence)]
[![GitHub contributors](https://img.shields.io/github/contributors/cynber/vitepress-valence)]
[![GitHub forks](https://img.shields.io/github/forks/cynber/vitepress-valence)]
[![GitHub stars](https://img.shields.io/github/stars/cynber/vitepress-valence)] -->
![NPM version](https://img.shields.io/npm/v/@cynber/vitepress-valence)
![NPM downloads](https://img.shields.io/npm/dt/@cynber/vitepress-valence)


Get even more out of VitePress with **VitePress Valence**, a comprehensive suite of components that add additional functionality, style, and customization to your VitePress projects.

## Guides, Demo, and Documentation:
### [cynber.dev/projects/vitepress-valence](https://cynber.dev/projects/vitepress-valence/)

## Development

**In this repository:**

Install dependencies:

```bash
pnpm install
```

Link the package locally:

```bash
pnpm link --global
```

**In your VitePress project:**

Link the package:

```bash
pnpm link --global @cynber/vitepress-valence
```

### Rebuid on changes

**In this repository:**

```bash
pnpm build
```

**In your VitePress project:**

You may need to wipe the cache and restart the dev server in your VitePress project to see changes.

For example:

```bash
rm -rf docs/.vitepress/cache
pnpm docs:dev
```
