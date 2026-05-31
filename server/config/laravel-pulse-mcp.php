<?php

return [
    /*
     * Tools to register with the Pulse MCP server.
     * Comment out any tools you don't want to expose.
     */
    'tools' => [
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetSlowQueriesTool::class,
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetFailedJobsTool::class,
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetExceptionsTool::class,
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetServerStatsTool::class,
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetSlowRequestsTool::class,
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetTopUsersTool::class,
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetQueuesTool::class,
        \Sourcecodeguy1\LaravelPulseMcp\Tools\GetCacheStatsTool::class,
    ],
];
