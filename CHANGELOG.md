# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

<!-- 

Types of changes

    `Added` for new features.
    `Changed` for changes in existing functionality.
    `Deprecated` for soon-to-be removed features.
    `Removed` for now removed features.
    `Fixed` for any bug fixes.
    `Security` in case of vulnerabilities.

 -->

## [0.1.13] - 2025-02-19

### Added

- ImageCardVertical component, for use with the gallery component

### Changed

- ImageGallery now has options for vertical layout in addition to the default grid
- ImageGallery now supports direct image URLs
- ImageGallery now supports a time value, and a description of the date and time display (ex. 'Last Updated:')

## [0.1.12] - 2025-02-02

### Added

- Export of HeaderCard component\

## [0.1.11] - 2025-01-30

### Removed

- Removed attempt to fix BlogPostList component, updating guides to manage this issue through data loader client project side

## [0.1.10] - 2025-01-30

### Fixed

- Testing a fix with BlogPostList component and base path detection when using GitHub Pages

## [0.1.9] - 2025-01-30

### Added

- Added HeaderBar component with title, titleLines, Link, and date props, intended for use within other components

### Changed

- Extracted HeaderBar code from ImageGallery component and added it as a standalone component
- Added support for HeaderBar in Lemmy embed component

### Fixed

- Fixed hydration issue with ImageGallery component which prevented PhotoSwipe from working when page was loaded from a link. It now waits for the page to fully load before initializing PhotoSwipe

## [0.1.8] - 2025-01-29

### Added

- Added the ability to call the image gallery component with file paths and/or folders, by implementing a data loader client side
- Integrated photoswipe package to allow for zoom, swipe, and lightbox functionality in the image gallery component
- Added notes on documentation site and removed the component from the 'coming soon' section

### Changed

- Updated Lemmy embed styles to indicate which elements are clickable
- Minor layout improvements for Lemmy embed



## [0.1.7] - 2025-01-28

### Added
- Added ability to override default export keys for posts and authors data in blog setup
- Introduced two new props in relevant blog components to allow for customizing the default export keys

### Changed
- Layout improvements for Lemmy and Mailchimp embed components