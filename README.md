<div align="center">

# Alfred - Advance Search Over Your File System

<br>

[![Latest Version Downloads](https://img.shields.io/github/downloads/avivbens/alfred-advance-fs-search/latest/total?label=Latest%20Version%20Downloads&color=green)](https://github.com/avivbens/alfred-advance-fs-search/releases/latest)
[![Latest Version](https://img.shields.io/github/v/release/avivbens/alfred-advance-fs-search?label=Latest%20Version&color=green)](https://github.com/avivbens/alfred-advance-fs-search/releases/latest)
[![Total Downloads](https://img.shields.io/github/downloads/avivbens/alfred-advance-fs-search/total?label=Total%20Downloads&color=blue)](https://github.com/avivbens/alfred-advance-fs-search/releases)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/kcao7snkgx)

</div>

## :warning: Deprecated Repository Notice

> **Important:** This repository is now deprecated. We have moved all our Alfred workflows into a unified monorepo for better maintenance and collaboration.
>
> [Avivbens/alfredo](https://github.com/Avivbens/alfredo?tab=readme-ov-file)

---

## Unified Alfred Workflows Monorepo

We've consolidated all of our Alfred workflows into a single, streamlined monorepo. This centralized repository makes it easier to explore, update, and contribute to a variety of workflows—all in one place.

Feel free to open issues, submit pull requests, and stay tuned for further updates as we continue enhancing our Alfred workflows!

## Description

Search over your file system with [Alfred](https://www.alfredapp.com/).

### Install via GitHub Releases :sparkles:

```bash
repo_name="Avivbens/alfred-advance-fs-search"
download_url=$(curl -s "https://api.github.com/repos/$repo_name/releases/latest" | grep "browser_download_url.*alfredworkflow" | cut -d '"' -f 4)

curl -fsSLk $download_url -o ~/Desktop/alfred-advance-fs-search.alfredworkflow
open ~/Desktop/alfred-advance-fs-search.alfredworkflow
```

## Usage

1. Configure your search settings over the workflow settings.
1. Use the keywords you've configured to open the results via VSCode / your selected Terminal ✨

## Configuration

![Configuration](https://raw.githubusercontent.com/avivbens/alfred-advance-fs-search/HEAD/demo/settings.png)

![Workflow](https://raw.githubusercontent.com/avivbens/alfred-advance-fs-search/HEAD/demo/workflow.png)
