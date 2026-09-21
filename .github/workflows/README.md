# Workflows in a shop fork

The fork runs code checks and compilation without PlentyONE's internal test shop,
release credentials or documentation infrastructure. CI installations use npm
11.19.0, the version used to validate `package-lock.json`.

| Workflow                                                                                              | Fork behaviour                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Integration Gates                                                                                     | Runs on pushes to `meinelampe`, pull requests and merge queues targeting `main` or `meinelampe`, and manual dispatch. Keeps formatting, lint, type checks, unit tests and a Linux build.                                             |
| Dependency review                                                                                     | Runs for pull requests in public repositories. Private repositories can opt in with `ENABLE_DEPENDENCY_REVIEW=true` when the feature is available. Does not post PR comments.                                                        |
| Windows Build                                                                                         | Runs on pushes to `main` or `meinelampe` and manual dispatch. Installs dependencies once and compiles without shop secrets.                                                                                                          |
| Coverage                                                                                              | Tests the exact PR head commit. Publishes artifacts and a job summary with read-only permissions, including for Dependabot and external contributors. Test failures still fail the job.                                              |
| Coverage comparison                                                                                   | Optional in forks: set `ENABLE_COVERAGE_COMPARISON=true`. Uses the actual base repository and commit, not an assumed `main` branch in the contributor's repository. An unavailable baseline does not block the head tests or report. |
| Weekly SonarQube                                                                                      | Disabled in forks unless `ENABLE_SONAR=true`. Then requires the secrets `SONAR_TOKEN`, `SONAR_HOST_URL` and `SONAR_PROJECT_KEY`. Scans the default branch.                                                                           |
| Acceptance, smoke tests, Semgrep policy, documentation publishing, PR metadata and release generation | Remain restricted to `plentymarkets/plentyshop-pwa`. These jobs use upstream infrastructure or policies.                                                                                                                             |
| New release app                                                                                       | The existing `ORIGINAL_OWNER/ORIGINAL_REPO` guard remains in place; automatic publishing is not enabled.                                                                                                                             |

Set opt-in variables under **Settings → Secrets and variables → Actions → Variables**.
Normal fork builds need no API token or live shop. They use `https://shop.invalid`
and `FETCH_REMOTE_CONFIG=0` in a generated `.env` solely to check compilation;
this is not a deployable shop configuration or an end-to-end checkout test.

Scheduled workflows are read from the repository's default branch. If that is
still `main`, merge these workflow changes into `main` as well before expecting
the recurring SonarQube failures to stop. Changing `meinelampe` alone does not
update the scheduled workflow on `main`.

The initial-setup workflow is a one-time template cleanup. Its existing
repository-name/run-number guard is unchanged; forks named `plentyshop-pwa`
normally skip it.

These changes remove infrastructure assumptions. Application test failures,
formatting violations, dependency problems and actual build errors still fail CI.
