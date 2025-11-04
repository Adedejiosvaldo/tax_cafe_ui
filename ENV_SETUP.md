# Environment Variables Setup

## Required Environment Variables

### 1. `AGENT_OS_URL` (Required)
The URL of your AgentOS backend server.

**Example:**
```bash
AGENT_OS_URL=http://localhost:7777
# or
AGENT_OS_URL=https://your-agentos-backend.com
```

**Alternative names (checked in order):**
- `AGENT_OS_URL` (server-side only)
- `NEXT_PUBLIC_AGENT_OS_URL` (accessible on client-side)
- `CHAT_API_URL` (fallback)
- `NEXT_PUBLIC_CHAT_API_URL` (fallback, client-accessible)

## Optional Environment Variables

### 2. `DEFAULT_AGENT_ID` (Optional)
Default agent ID to use if no agent_id is provided in the request.

**Example:**
```bash
DEFAULT_AGENT_ID=tax-cafe-assistant
```

**Note:** If not provided, the API will attempt to:
1. Get agent_id from request body/query params
2. Fetch available agents from AgentOS and use the first one
3. Use DEFAULT_AGENT_ID if configured
4. Return an error if none of the above work

### 3. `NEXT_PUBLIC_AGENT_ID` (Optional)
Agent ID accessible on the client-side (for frontend use).

**Example:**
```bash
NEXT_PUBLIC_AGENT_ID=tax-cafe-assistant
```

### 4. `NEXT_PUBLIC_API_URL` (Optional)
Custom API endpoint URL for the frontend to use.

**Example:**
```bash
NEXT_PUBLIC_API_URL=/api/chat
```

**Default:** `/api/chat`

## Setup Instructions

1. Create a `.env.local` file in the root of your project:
```bash
AGENT_OS_URL=http://localhost:7777
DEFAULT_AGENT_ID=tax-cafe-assistant
```

2. For production, set these in your deployment platform (Vercel, etc.)

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Variables without `NEXT_PUBLIC_` are only available on the server-side
- The API route will auto-detect agents if `agent_id` is not provided
- Agent ID can also be passed via URL query params: `?agent=agent-id`
