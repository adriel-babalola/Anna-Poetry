#!/usr/bin/env node

/**
 * CORS Implementation Test Script
 * 
 * This script tests the CORS restrictions on all API endpoints
 * Run with: node scripts/testCORS.js
 */

import http from 'http'
import { URL } from 'url'

const BASE_URL = 'http://localhost:3000';
const ALLOWED_ORIGIN = 'http://localhost:3000';
const DISALLOWED_ORIGIN = 'http://malicious-site.com';

// Test configuration
const tests = [
    {
        name: 'OPTIONS preflight request (allowed origin)',
        method: 'OPTIONS',
        path: '/api/blog',
        origin: ALLOWED_ORIGIN,
        expectedStatus: 200,
        expectsCORSHeaders: true
    },
    {
        name: 'GET request with allowed origin',
        method: 'GET',
        path: '/api/blog',
        origin: ALLOWED_ORIGIN,
        expectedStatus: 200,
        expectsCORSHeaders: true
    },
    {
        name: 'GET request with disallowed origin',
        method: 'GET',
        path: '/api/blog',
        origin: DISALLOWED_ORIGIN,
        expectedStatus: 403,
        expectsCORSHeaders: false,
        expectsErrorMessage: 'CORS policy violation'
    },
    {
        name: 'POST to email with allowed origin',
        method: 'POST',
        path: '/api/email',
        origin: ALLOWED_ORIGIN,
        expectedStatus: 200,
        expectsCORSHeaders: true,
        body: JSON.stringify({ email: 'test@example.com' })
    },
    {
        name: 'POST to email with disallowed origin',
        method: 'POST',
        path: '/api/email',
        origin: DISALLOWED_ORIGIN,
        expectedStatus: 403,
        expectsCORSHeaders: false,
        expectsErrorMessage: 'CORS policy violation',
        body: JSON.stringify({ email: 'test@example.com' })
    },
    {
        name: 'OPTIONS preflight on blog with allowed origin',
        method: 'OPTIONS',
        path: '/api/blog',
        origin: ALLOWED_ORIGIN,
        expectedStatus: 200,
        expectsCORSHeaders: true,
        headers: {
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
    }
];

// Helper function to make HTTP requests
function makeRequest(test) {
    return new Promise((resolve) => {
        const url = new URL(BASE_URL + test.path);
        const options = {
            hostname: url.hostname,
            port: url.port || 80,
            path: url.pathname + url.search,
            method: test.method,
            headers: {
                'Origin': test.origin,
                ...test.headers
            }
        };

        if (test.body) {
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(test.body);
        }

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: data,
                    test
                });
            });
        });

        req.on('error', (error) => {
            resolve({
                error: error.message,
                test
            });
        });

        if (test.body) {
            req.write(test.body);
        }

        req.end();
    });
}

// Test runner
async function runTests() {
    console.log('🔐 CORS Implementation Test Suite');
    console.log('================================\n');
    console.log(`Testing against: ${BASE_URL}\n`);

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        try {
            const result = await makeRequest(test);

            if (result.error) {
                console.log(`❌ ${test.name}`);
                console.log(`   Error: ${result.error}`);
                console.log(`   Make sure the development server is running on ${BASE_URL}\n`);
                failed++;
                continue;
            }

            // Check status code
            const statusMatch = result.status === test.expectedStatus;

            // Check CORS headers
            const corsHeader = result.headers['access-control-allow-origin'];
            const hasCORSHeaders = test.expectsCORSHeaders ? corsHeader === test.origin : !corsHeader;

            // Check error message if expected
            let messageMatch = true;
            if (test.expectsErrorMessage) {
                messageMatch = result.body.includes(test.expectsErrorMessage);
            }

            const testPassed = statusMatch && hasCORSHeaders && messageMatch;

            if (testPassed) {
                console.log(`✅ ${test.name}`);
                passed++;
            } else {
                console.log(`❌ ${test.name}`);
                if (!statusMatch) {
                    console.log(`   Expected status: ${test.expectedStatus}, got: ${result.status}`);
                }
                if (!hasCORSHeaders) {
                    console.log(`   CORS headers: ${corsHeader ? 'Present (unexpected)' : 'Missing'}`);
                }
                if (!messageMatch) {
                    console.log(`   Expected message containing: "${test.expectsErrorMessage}"`);
                    console.log(`   Got: ${result.body}`);
                }
                failed++;
            }
            console.log();
        } catch (error) {
            console.log(`❌ ${test.name}`);
            console.log(`   Error: ${error.message}\n`);
            failed++;
        }
    }

    console.log('================================');
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log('================================\n');

    if (failed === 0) {
        console.log('✨ All CORS tests passed! Your implementation is working correctly.');
    } else {
        console.log(`⚠️  ${failed} test(s) failed. Check the output above for details.`);
    }

    process.exit(failed > 0 ? 1 : 0);
}

// Run the tests
console.log('Starting tests...\n');
await runTests();
