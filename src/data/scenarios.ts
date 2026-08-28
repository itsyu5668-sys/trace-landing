import { CrashScenario } from '../types';

export const CRASH_SCENARIOS: Record<string, CrashScenario> = {
  node: {
    id: 'node',
    label: 'Node.js (Knex Pool)',
    command: 'trace watch ./app',
    errorTitle: 'Uncaught Exception Detected',
    errorMessage: 'KnexTimeoutError: pool is full, timeout of 5000ms exceeded',
    errorLocation: 'at /app/node_modules/knex/lib/client.js:314:15\nat async getUserProfile (/app/src/db/users.ts:42:19)',
    codeSnippet: {
      file: '/app/src/db/users.ts',
      line: 42,
      lines: [
        { num: 40, code: 'export async function getUserProfile(userId: string) {' },
        { num: 41, code: '  const trx = await knex.transaction();' },
        { num: 42, code: '  const user = await trx("users").where({ id: userId }).first();', isError: true },
        { num: 43, code: '  // Missing trx.commit() or trx.rollback() causing leak' },
        { num: 44, code: '  return user;' },
      ],
    },
    scrubbedItems: [
      { original: 'DATABASE_URL="postgres://postgres:s3cr3t_pass@db.internal:5432/prod"', redacted: 'DATABASE_URL="postgres://postgres:[REDACTED]@db.internal:5432/prod"', type: 'DB Password' },
      { original: 'STRIPE_SECRET_KEY="sk_live_51N2x..."', redacted: 'STRIPE_SECRET_KEY="sk_live_[REDACTED]"', type: 'Stripe Secret' },
    ],
    llmPacket: `[TRACE EXCEPTION CAPTURED]
Type: KnexTimeoutError (Database Connection Pool Exhaustion)
Location: /app/src/db/users.ts:42:19
Message: pool is full, timeout of 5000ms exceeded

Stack Trace:
  KnexTimeoutError: pool is full, timeout of 5000ms exceeded
  at /app/node_modules/knex/lib/client.js:314:15
  at async getUserProfile (/app/src/db/users.ts:42:19)
  at async handleAuthRequest (/app/src/routes/auth.ts:18:9)

Surrounding Source Code (/app/src/db/users.ts:40-44):
  40 | export async function getUserProfile(userId: string) {
  41 |   const trx = await knex.transaction();
> 42 |   const user = await trx("users").where({ id: userId }).first();
  43 |   // Missing trx.commit() or trx.rollback() causing leak
  44 |   return user;

Environment:
  NODE_ENV=development
  DATABASE_URL=postgres://postgres:[REDACTED]@db.internal:5432/prod
  POOL_MAX=10 (Active connections: 10/10)

Agent Instruction:
Fix the unhandled database transaction leak in /app/src/db/users.ts by wrapping it in a try/finally block with trx.commit() and trx.rollback().`,
  },
  python: {
    id: 'python',
    label: 'Python (FastAPI Pydantic)',
    command: 'trace run uvicorn main:app --reload',
    errorTitle: 'Unhandled ValidationError',
    errorMessage: 'pydantic_core._pydantic_core.ValidationError: 1 validation error for AgentTaskPayload',
    errorLocation: 'at /backend/routes/agent.py:88 in process_task\nmodel_config -> timeout: Input should be a valid integer, unable to parse string as an integer',
    codeSnippet: {
      file: '/backend/routes/agent.py',
      line: 88,
      lines: [
        { num: 86, code: '@router.post("/execute")' },
        { num: 87, code: 'async def execute_agent(payload: AgentTaskPayload):' },
        { num: 88, code: '    task = await agent_runner.schedule(payload.dict())', isError: true },
        { num: 89, code: '    return {"task_id": task.id, "status": "queued"}' },
      ],
    },
    scrubbedItems: [
      { original: 'OPENAI_API_KEY="sk-proj-928491823..."', redacted: 'OPENAI_API_KEY="[REDACTED_API_KEY]"', type: 'OpenAI Secret' },
      { original: 'JWT_SECRET="super-secret-hex-key"', redacted: 'JWT_SECRET="[REDACTED]"', type: 'JWT Secret' },
    ],
    llmPacket: `[TRACE EXCEPTION CAPTURED]
Type: pydantic_core.ValidationError
Location: /backend/routes/agent.py:88
Message: 1 validation error for AgentTaskPayload: timeout must be int

Stack Trace:
  File "/backend/routes/agent.py", line 88, in process_task
    task = await agent_runner.schedule(payload.dict())
  File "/backend/services/runner.py", line 34, in schedule
    timeout_sec = int(data.get("timeout", "undefined"))

Sanitized Environment:
  ENV=local
  OPENAI_API_KEY=[REDACTED_API_KEY]

Agent Instruction:
Fix Pydantic validation parsing in /backend/services/runner.py to handle fallback default integer when timeout key is omitted.`,
  },
  go: {
    id: 'go',
    label: 'Go (Nil Pointer Panic)',
    command: 'trace run go run ./cmd/server',
    errorTitle: 'Runtime Panic: Nil Pointer Dereference',
    errorMessage: 'panic: runtime error: invalid memory address or nil pointer dereference',
    errorLocation: '[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x1048b92]\ngoroutine 41 [running]:\nmain.HandleMessage(0x14000192a00, 0x0)\n\t/workspace/internal/broker/handler.go:56 +0x118',
    codeSnippet: {
      file: '/workspace/internal/broker/handler.go',
      line: 56,
      lines: [
        { num: 54, code: 'func HandleMessage(ctx context.Context, msg *Message) error {' },
        { num: 55, code: '\tlogger := telemetry.FromContext(ctx)' },
        { num: 56, code: '\tpayloadID := msg.Header.ID // msg is nil on heartbeat tick', isError: true },
        { num: 57, code: '\treturn processPayload(ctx, payloadID)' },
      ],
    },
    scrubbedItems: [
      { original: 'AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"', redacted: 'AWS_SECRET_ACCESS_KEY="[REDACTED]"', type: 'AWS Key' },
    ],
    llmPacket: `[TRACE EXCEPTION CAPTURED]
Type: SIGSEGV (Nil Pointer Dereference)
Location: /workspace/internal/broker/handler.go:56
Goroutine: 41 [running]

Stack Trace:
  panic: runtime error: invalid memory address or nil pointer dereference
  main.HandleMessage(0x14000192a00, 0x0)
      /workspace/internal/broker/handler.go:56 +0x118
  main.(*Dispatcher).Start.func1()
      /workspace/internal/broker/dispatcher.go:112 +0x64

Surrounding Source Code (/workspace/internal/broker/handler.go:54-57):
  54 | func HandleMessage(ctx context.Context, msg *Message) error {
  55 | 	logger := telemetry.FromContext(ctx)
> 56 | 	payloadID := msg.Header.ID
  57 | 	return processPayload(ctx, payloadID)

Agent Instruction:
Add nil-check guard clause for 'msg' and 'msg.Header' in /workspace/internal/broker/handler.go line 56 before dereferencing ID.`,
  },
  rust: {
    id: 'rust',
    label: 'Rust (Unwrap Panic)',
    command: 'trace run cargo run',
    errorTitle: 'Thread Panic on unwrap()',
    errorMessage: "thread 'tokio-runtime-worker' panicked at 'called `Option::unwrap()` on a `None` value'",
    errorLocation: 'src/indexer/pipeline.rs:104:22\nstack backtrace:\n   0: rust_begin_unwind\n   1: core::panicking::panic_fmt\n   2: indexer::pipeline::parse_token_chunk',
    codeSnippet: {
      file: 'src/indexer/pipeline.rs',
      line: 104,
      lines: [
        { num: 102, code: 'pub async fn parse_token_chunk(chunk: Option<Vec<u8>>) -> Result<TokenDoc> {' },
        { num: 103, code: '    let raw_bytes = chunk.unwrap(); // Panics on EOF stream terminator', isError: true },
        { num: 104, code: '    let doc = TokenDoc::from_bytes(&raw_bytes)?;' },
        { num: 105, code: '    Ok(doc)' },
      ],
    },
    scrubbedItems: [
      { original: 'REDIS_AUTH="redis://:supersecretpass@127.0.0.1:6379"', redacted: 'REDIS_AUTH="redis://:[REDACTED]@127.0.0.1:6379"', type: 'Redis Credentials' },
    ],
    llmPacket: `[TRACE EXCEPTION CAPTURED]
Type: Rust Panic (Option::unwrap() on None)
Location: src/indexer/pipeline.rs:103:27
Thread: tokio-runtime-worker

Stack Backtrace:
   0: rust_begin_unwind
   1: core::panicking::panic_fmt
   2: core::panicking::panic
   3: indexer::pipeline::parse_token_chunk
      at src/indexer/pipeline.rs:103:27

Surrounding Source Code (src/indexer/pipeline.rs:102-105):
  102 | pub async fn parse_token_chunk(chunk: Option<Vec<u8>>) -> Result<TokenDoc> {
> 103 |     let raw_bytes = chunk.unwrap();
  104 |     let doc = TokenDoc::from_bytes(&raw_bytes)?;
  105 |     Ok(doc)

Agent Instruction:
Replace chunk.unwrap() with pattern matching or 'chunk.ok_or(IndexerError::EndOfStream)?' to gracefully handle EOF stream chunks.`,
  },
};
