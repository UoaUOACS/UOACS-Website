# How to contribute to this project

There are some basic guidelines to be adhered to when contributing to this project. Please read the following sections
carefully.

## Pull Requests

**All** changes to the project must be made through a pull request. This includes changes to the documentation, code, and tests. The reason for this is to ensure that all changes are reviewed by at least one other person before they are merged in, and to make sure that our `main` branch is always in a healthy state.

When raising a PR the following is a good read for a _good_ PR:
[Atlassian Guide to Pull Requests](https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests)

## Issues

All code, with the exception of emergency fixes should come from an [issue](http://aha.io/roadmapping/guide/agile/what-is-issue-tracking). This is to ensure that the work being done is being tracked and it is clear what the purpose of the needed code changes are. We provide issue templates for (frontend, backend, and devops) feature requests and bug reports to help you simplify the experience.

## Branches

When working on a new feature or bug fix, you should always create a new branch from the `main` branch. Generally the workflow for this will be something like:

```bash
git checkout main
git pull
git branch <branch-name>
git switch <branch-name>
```

When naming branches, please use the following conventions:

- Branches with an issue number: `<purpose>/<issue-number>-<short-description>`
  - Example: `feat/123-add-login-button`
- Branches without an issue number: `<purpose>/<short-description>`
  - Example: `bug/fix-header-alignment`

## Commit Messages

When committing changes, you should ideally be using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style commit messages. This helps us to keep our commit history clean and makes it easier to generate changelogs.
Examples of good commit messages:

```
feat(components): add new Button component
fix(api): correct user authentication bug
refactor(utils): improve performance of data processing
chore(deps): update dependency versions
docs(readme): update installation instructions
```
