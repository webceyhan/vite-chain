/**
 * SSE Middleware
 */
export const sse = () => (req: any, res: any, next: any) => {
    // set SSE headers
    res.header({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });

    // flush headers
    res.flushHeaders();

    // monkey patch res.write to send SSE data
    res.send = (data: any) => res.write(`data: ${JSON.stringify(data)}\n\n`);

    // call next
    next();

    // end response on client disconnect
    req.on('close', () => res.end());
};
