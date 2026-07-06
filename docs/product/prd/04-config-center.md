# PRD 04 — Config Center (shared foundation)

- **Owner:** (you)
- **Status:** Approved
- **Last updated:** 2026-07-05
- **Source:** PRODUCT_SPEC_v4.md §4.4
- **Line:** Shared foundation · **Roadmap:** Phase 1
- **Consumed by:** all modules (external capabilities are integrated here)

## User story

I want to configure the external capabilities my team needs — Jira, Confluence,
log queries, notifications, etc. — letting each team define which systems to
connect and where results sync to.

## Core capabilities

- **MCP server config**: external capabilities are integrated uniformly through
  MCP. Teams add, configure, and enable MCP servers (e.g. Jira, Confluence, log
  queries) in the Config Center. Modules call the configured MCP capabilities as
  needed.
- **Notification channel config**: configure email and webhook destinations for
  async flows.
- **Isolation**: each team / workspace configures independently, without
  interference.
- **Connection test**: verify that MCP servers and notification channels work.

## Business rules

- Config is isolated per team; credentials are stored securely (Principle 3: team
  autonomy; risk: MCP credential security).
- Adding a new external capability = configuring an MCP server, not hardcoding an
  adapter into the product (Principle 4: unified extension integration).
- At the product level we only define the contract "external capabilities are
  integrated by configuring an MCP server and called by modules"; the MCP
  server's own implementation and runtime are technical-design matters, out of
  this PRD's scope.

## Acceptance criteria

- [ ] Supports adding, configuring, and enabling/disabling MCP servers.
- [ ] Modules can call the team's configured MCP capabilities.
- [ ] Supports configuring email and webhook notification channels.
- [ ] Config is isolated per team; credentials stored securely.
- [ ] Provides a connection test.
