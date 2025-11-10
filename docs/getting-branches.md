# Getting Additional Branches After Forking

When you fork a repository, GitHub only includes the `main` branch by default. This guide shows you how to get the other branches from the original repository.

## Fetch All Branches from Upstream

1. **Add the original repository as an upstream remote** (if you haven't already):
   ```bash
   git remote add upstream https://github.com/cloudadoption/eds-masterclass.git
   ```

2. **Fetch all branches from upstream:**
   ```bash
   git fetch upstream
   ```

3. **Checkout the branch you need, and push to your fork**
   ```bash
   git checkout -b performance upstream/performance
   git push origin performance
   ```