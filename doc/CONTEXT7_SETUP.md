# Context7 MCP Server Setup

## Configuration

The Context7 MCP server has been configured in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

## Next Steps

1. **Restart Cursor** - The MCP server configuration requires a restart to take effect
   - Close and reopen Cursor, or
   - Reload the window (Cmd+Shift+P → "Developer: Reload Window")

2. **Verify Installation** - After restarting, the Context7 MCP server should be available

## Testing Context7

Once Cursor has restarted, you can test Context7 by using it in your prompts:

### Example Test Queries

1. **Basic test:**
   ```
   How do I create a React component with TypeScript? use context7
   ```

2. **Library-specific test:**
   ```
   Show me how to use fetch API with error handling in TypeScript. use context7
   ```

3. **With specific library:**
   ```
   How do I set up Express.js middleware? use library /expressjs/express for API and docs. use context7
   ```

## Optional: API Key Setup

For higher rate limits, you can get a free API key at [context7.com/dashboard](https://context7.com/dashboard) and update the configuration:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

## Auto-Invoke Rule ✅ (Configured)

The auto-invoke rule has been added to `.cursorrules` in the project root. This means Context7 will automatically be used when you need library/API documentation, code generation, setup or configuration steps - no need to type `use context7` in every prompt.

The rule is:
> "Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask."

## What Context7 Does

Context7 MCP provides up-to-date, version-specific documentation and code examples directly in your prompts. It helps avoid:
- ❌ Outdated code examples
- ❌ Hallucinated APIs that don't exist
- ❌ Generic answers for old package versions

Instead, you get:
- ✅ Up-to-date documentation
- ✅ Version-specific examples
- ✅ Real API references
