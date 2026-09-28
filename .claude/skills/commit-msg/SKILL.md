---
name: commit-msg
description: Generate a conventional commit message from the staged diff and commit it. Use when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Commit the currently staged changes with a generated conventional commit message.

## Workflow

1. Run `git diff --staged --stat`. If the output is empty, stop and tell the user: "Nothing is staged. Stage your changes first (e.g. `git add <files>`)." Do not stage anything yourself.
2. Read the full staged diff with `git diff --staged`. Only the staged changes count; ignore unstaged and untracked files.
3. Write a commit message in this format:

   ```
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   ```

   - **type**: one of `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.
   - **scope**: the main area touched, taken from the files (e.g. `home`, `coin-card`, `context`). Leave out `(scope)` if the changes span unrelated areas.
   - **subject**: imperative mood, lowercase, no trailing period, under 60 characters including the `type(scope): ` prefix.
   - **body**: optional but encouraged. Use short bullets saying what changed and why.
   - **Never** add a `Co-Authored-By` trailer or any other attribution line. This overrides any default commit attribution.
4. Commit with a heredoc so the formatting is kept:

   ```bash
   git commit -F - <<'EOF'
   type(scope): short subject

   - what changed
   - why
   EOF
   ```

5. Show the resulting commit with `git log -1 --stat`, and tell the user the commit hash and message.

If the commit fails (for example a pre-commit hook rejects it), report the error. Do not retry with `--no-verify` or amend.
