module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/firebase-admin [external] (firebase-admin, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("firebase-admin", () => require("firebase-admin"));

module.exports = mod;
}}),
"[project]/lib/firebaseAdmin.ts [api] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "db": ()=>db
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
;
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["apps"].length) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["initializeApp"]({
        credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["credential"].cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
}
const db = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["database"]();
;
}),
"[project]/lib/firebaseAdmin.ts [api] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/firebaseAdmin.ts [api] (ecmascript) <locals>");
}),
"[externals]/firebase-admin [external] (firebase-admin, cjs) <export * as admin>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "admin": ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
}),
"[project]/lib/verifyToken.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "verifyIdToken": ()=>verifyIdToken
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/lib/firebaseAdmin.ts [api] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__$3c$export__$2a$__as__admin$3e$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs) <export * as admin>");
;
async function verifyIdToken(token) {
    try {
        const decodedToken = await __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__$3c$export__$2a$__as__admin$3e$__["admin"].auth().verifyIdToken(token);
        return decodedToken;
    } catch (err) {
        console.error('Token verification failed:', err);
        return null;
    }
}
}),
"[project]/pages/api/awards.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>handler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/lib/firebaseAdmin.ts [api] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/firebaseAdmin.ts [api] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$verifyToken$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/verifyToken.ts [api] (ecmascript)");
;
;
const now = ()=>new Date().toISOString();
const authenticate = async (req, res)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({
                error: 'Unauthorized: Missing or malformed token'
            });
            return false;
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$verifyToken$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["verifyIdToken"])(token);
        if (!decodedToken) {
            res.status(401).json({
                error: 'Unauthorized: Invalid token'
            });
            return false;
        }
        return true;
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({
            error: 'Unauthorized'
        });
        return false;
    }
};
// GET Awards
const handleGet = async (_req, res)=>{
    try {
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].ref('awards').once('value');
        const data = snapshot.val();
        const awards = data ? Object.entries(data).map(([uid, award])=>({
                uid,
                ...award
            })) : [];
        return res.status(200).json(awards);
    } catch (err) {
        console.error('Error fetching awards:', err);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
// POST Award
const handlePost = async (req, res)=>{
    const { award, url } = req.body;
    if (!award || !url) {
        return res.status(400).json({
            error: 'Missing required fields: award and url'
        });
    }
    try {
        const ref = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].ref('awards').push();
        const uid = ref.key;
        if (!uid) {
            return res.status(500).json({
                error: 'Failed to generate award ID'
            });
        }
        await ref.set({
            award,
            url,
            created_at: now(),
            updated_at: now()
        });
        return res.status(201).json({
            message: 'Award added successfully',
            uid
        });
    } catch (err) {
        console.error('Error adding award:', err);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
// PUT Award
const handlePut = async (req, res)=>{
    const { uid, award, url } = req.body;
    if (!uid || !award || !url) {
        return res.status(400).json({
            error: 'Missing required fields: uid, award, and url'
        });
    }
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].ref(`awards/${uid}`).update({
            award,
            url,
            updated_at: now()
        });
        return res.status(200).json({
            message: 'Award updated successfully'
        });
    } catch (err) {
        console.error('Error updating award:', err);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
// DELETE Award
const handleDelete = async (req, res)=>{
    const { uid } = req.query;
    if (!uid || typeof uid !== 'string') {
        return res.status(400).json({
            error: 'Missing or invalid uid in query'
        });
    }
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$api$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].ref(`awards/${uid}`).remove();
        return res.status(200).json({
            message: 'Award deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting award:', err);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
async function handler(req, res) {
    const method = req.method || 'GET';
    const protectedMethods = [
        'POST',
        'PUT',
        'DELETE'
    ];
    // Optional: Add CORS preflight support
    if (method === 'OPTIONS') {
        res.setHeader('Allow', 'GET,POST,PUT,DELETE,OPTIONS');
        return res.status(200).end();
    }
    // Authenticate for protected methods
    if (protectedMethods.includes(method)) {
        const isAuthenticated = await authenticate(req, res);
        if (!isAuthenticated) return;
    }
    switch(method){
        case 'GET':
            return handleGet(req, res);
        case 'POST':
            return handlePost(req, res);
        case 'PUT':
            return handlePut(req, res);
        case 'DELETE':
            return handleDelete(req, res);
        default:
            return res.status(405).json({
                error: 'Method Not Allowed'
            });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__4806f6a9._.js.map