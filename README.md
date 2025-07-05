# MCP Streamable HTTP Transport Migration Guide

## Overview

This document outlines the changes required to migrate from the legacy HTTP+SSE transport (MCP 2024-11-05) to the new Streamable HTTP transport (MCP 2025-06-18) while maintaining backwards compatibility.

## Current State Analysis

### Legacy Transport Architecture
- **Separate Endpoints**: Uses `/sse` for SSE connections and `/messages/` for POST requests
- **Query Parameter Sessions**: Session IDs passed via query parameters
- **Manual Protocol Handling**: No automatic protocol version detection
- **Limited Resumability**: Basic SSE connection management

### Target Architecture  
- **Unified Endpoint**: Single endpoint handles both GET and POST requests
- **Header-based Sessions**: Uses `Mcp-Session-Id` headers for session management
- **Protocol Version Detection**: Automatic routing based on `MCP-Protocol-Version` headers
- **Enhanced Resumability**: SSE event ID tracking for connection recovery

## Required Implementation Changes

### 1. Create New StreamableHttpTransport Class

**Purpose**: Implement the MCP 2025-06-18 Streamable HTTP specification

**Key Requirements**:
- Unified endpoint handling for both GET (SSE) and POST (messages)
- Header-based session management using `Mcp-Session-Id`
- SSE event ID tracking for resumability
- Proper connection lifecycle management
- Session cleanup on client disconnect

**Implementation Details**:
```python
class StreamableHttpTransport:
    def __init__(self, session_manager):
        self.session_manager = session_manager
        self.active_connections = {}
    
    async def handle_request(self, request):
        # Protocol version already validated at routing level
        if request.method == "GET":
            return await self.handle_sse_connection(request)
        elif request.method == "POST":
            return await self.handle_message(request)
        elif request.method == "DELETE":
            return await self.handle_session_cleanup(request)
```

### 2. Enhance Existing SseServerTransport

**Purpose**: Add unified endpoint support while maintaining backwards compatibility

**Required Changes**:
- Add `handle_unified_request()` method for protocol version routing
- Implement header-based session management alongside existing query parameter support
- Add DELETE method support for session cleanup
- Maintain existing SSE and message handling logic

**New Methods to Add**:
```python
async def handle_unified_request(self, request):
    # Route based on protocol version (determined at routing level)
    protocol_version = request.headers.get("MCP-Protocol-Version", "2025-03-26")
    
    if protocol_version == "2025-06-18":
        # Use Streamable HTTP transport
        return await self.streamable_transport.handle_request(request)
    else:
        # Use legacy HTTP+SSE transport
        return await self.handle_legacy_request(request)
```

### 3. Implement Protocol Version Detection

**Purpose**: Automatically detect and route requests based on MCP protocol version

**Required Logic**:
- **No Header Present**: Default to `2025-03-26` (legacy HTTP+SSE)
- **`2025-06-18` Header**: Use Streamable HTTP transport
- **Any Other Version**: Use legacy HTTP+SSE transport

**Implementation Location**: Add to routing middleware or endpoint handlers

### 4. Update OAuth Handler

**Purpose**: Support protocol version detection in OAuth authentication flow

**Required Changes**:
- Add protocol version detection in `OAuthSSEHandler`
- Route to appropriate transport based on detected version
- Maintain existing OAuth token validation logic
- Support both query parameter and header-based sessions

### 5. Modify Main Server Routing

**Purpose**: Update Starlette routing to support unified endpoints

**Required Changes**:
- Update existing `/sse` and `/messages/` endpoints to support unified handling
- Add protocol version detection middleware
- Maintain backwards compatibility with existing endpoint structure
- Add proper error handling for unsupported protocol versions

### 6. Implement Enhanced Session Management

**Purpose**: Add robust session lifecycle management with header support

**Required Features**:
- **Session Creation**: Support both query parameters and headers
- **Session Tracking**: Monitor active connections and their protocol versions
- **Session Cleanup**: Handle DELETE requests for explicit session termination
- **Connection Recovery**: Support SSE event ID-based resumability


## Implementation Strategy

### Phase 1: Core Transport Layer
1. Create `StreamableHttpTransport` class with unified request handling
2. Implement header-based session management
3. Add SSE event ID tracking for resumability

### Phase 2: Protocol Detection
1. Add protocol version detection middleware
2. Update existing `SseServerTransport` with unified endpoint support
3. Implement routing logic between transport types

### Phase 3: Integration
1. Update OAuth handler for protocol version awareness
2. Modify main server routing to support unified endpoints
3. Add session lifecycle management (DELETE support)

### Phase 4: Compatibility & Testing
1. Ensure backwards compatibility with existing clients
2. Test with various MCP clients (Claude Desktop, others)
3. Verify tool filtering works correctly with empty claims

## Expected Client Behavior

### Legacy Clients (Claude Desktop)
- **Protocol Version**: Send no `MCP-Protocol-Version` header
- **Default Handling**: Will be routed to legacy HTTP+SSE transport
- **Session Management**: Continue using query parameter sessions
- **Endpoints**: Continue using `/sse` and `/messages/` endpoints

### New Clients (Future)
- **Protocol Version**: Send `MCP-Protocol-Version: 2025-06-18`
- **Transport**: Will use Streamable HTTP transport
- **Session Management**: Use `Mcp-Session-Id` headers
- **Endpoints**: Use unified endpoint structure

## Testing Requirements

### Compatibility Testing
- Verify existing Claude Desktop integration continues working
- Test with different MCP client implementations
- Validate OAuth authentication flow with both transports

### Protocol Version Testing
- Test behavior with no protocol version header
- Test with `2025-06-18` protocol version
- Test with unsupported protocol versions

### Session Management Testing
- Verify session creation with both query parameters and headers
- Test session cleanup on client disconnect
- Validate resumability with SSE event IDs
