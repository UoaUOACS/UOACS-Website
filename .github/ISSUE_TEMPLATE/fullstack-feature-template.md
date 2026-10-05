---
name: Full-stack feature template
about: Features spanning the frontend and backend
title: "[FULLSTACK] "
type: Feature
labels: fullstack
assignees: ''
---

### Is your feature request related to a problem? Please describe
<!-- A clear and concise description of what the problem is. Ex. I'm always frustrated when [...] -->

### Describe the solution you'd like
<!-- A clear and concise description of what you want to happen. Mention which apps are affected (website, playground, auth). -->

### Describe alternatives you've considered
<!-- A clear and concise description of any alternative solutions or features you've considered, if applicable. -->

### Additional context
<!-- Add any other context or screenshots about the feature request here, if applicable. -->

### Acceptance Criteria
<!-- Define the acceptance criteria for the feature -->

### BEFORE MERGING

- [ ] Acceptance criteria met
- [ ] Integration test written for services
- [ ] Code generation run (*hint*: `pnpm types:generate`)
- [ ] Storybooks created where possible
- [ ] Tests written for critical interactions
- [ ] Appropriate mocks created where possible
- [ ] PR Reviewed (For non-trivial changes)
- [ ] Changes tested after rebasing on main or merging in main (*hint*: `git fetch origin main`, then `git rebase main` or `git merge main`)
- [ ] All required PR checks passing
