(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/components/ScrollAnimation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ScrollAnimation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ScrollAnimation({ children, className = '', delay = 0, useRandom = true, direction }) {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [animationDirection, setAnimationDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('up');
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollAnimation.useEffect": ()=>{
            // Set random animation direction on component mount
            if (useRandom && !direction) {
                const directions = [
                    'up',
                    'down',
                    'left',
                    'right',
                    'fade'
                ];
                const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                setAnimationDirection(randomDirection);
            } else if (direction) {
                setAnimationDirection(direction);
            }
        }
    }["ScrollAnimation.useEffect"], [
        useRandom,
        direction
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollAnimation.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "ScrollAnimation.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setTimeout({
                            "ScrollAnimation.useEffect": ()=>{
                                setIsVisible(true);
                            }
                        }["ScrollAnimation.useEffect"], delay * 1000);
                    }
                }
            }["ScrollAnimation.useEffect"], {
                threshold: 0.3,
                rootMargin: '-100px 0px'
            });
            if (elementRef.current) {
                observer.observe(elementRef.current);
            }
            return ({
                "ScrollAnimation.useEffect": ()=>{
                    if (elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                }
            })["ScrollAnimation.useEffect"];
        }
    }["ScrollAnimation.useEffect"], [
        delay
    ]);
    const getAnimationClasses = ()=>{
        const baseClasses = 'transition-all duration-[800ms] ease-out';
        if (!isVisible) {
            switch(animationDirection){
                case 'up':
                    return `${baseClasses} opacity-0 translate-y-[60px]`;
                case 'down':
                    return `${baseClasses} opacity-0 -translate-y-[60px]`;
                case 'left':
                    return `${baseClasses} opacity-0 translate-x-[60px]`;
                case 'right':
                    return `${baseClasses} opacity-0 -translate-x-[60px]`;
                case 'fade':
                    return `${baseClasses} opacity-0`;
                default:
                    return `${baseClasses} opacity-0 translate-y-[60px]`;
            }
        } else {
            return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: elementRef,
        className: `${getAnimationClasses()} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/components/ScrollAnimation.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(ScrollAnimation, "r2DQDZ9dRLg4W1HS2cyfOGmtBm4=");
_c = ScrollAnimation;
var _c;
__turbopack_context__.k.register(_c, "ScrollAnimation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/work.service.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WorkService": (()=>WorkService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
// Define the base URL for your backend API
const API_BASE_URL = ("TURBOPACK compile-time value", "https://portfolio-api-mu-pied.vercel.app");
class WorkService {
    static baseURL = `${API_BASE_URL}/work`;
    // Fetch all work data
    static async getWorkData() {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(this.baseURL);
            return response.data;
        } catch (error) {
            console.error('Error fetching work data:', error);
            throw error;
        }
    }
    // Create new work data
    static async createWork(data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(this.baseURL, data);
            return response.data;
        } catch (error) {
            console.error('Error creating work:', error);
            throw error;
        }
    }
    // Update work data
    static async updateWork(id, data) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`${this.baseURL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating work:', error);
            throw error;
        }
    }
    // Delete work data
    static async deleteWork(id) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`${this.baseURL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting work:', error);
            throw error;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/hooks/useWorkPage.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useWorkPage": (()=>useWorkPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$work$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/services/work.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const useWorkPage = ()=>{
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchWorkData = async ()=>{
        try {
            setLoading(true);
            setError(null);
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$work$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkService"].getWorkData();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch work data');
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkPage.useEffect": ()=>{
            fetchWorkData();
        }
    }["useWorkPage.useEffect"], []);
    return {
        data,
        loading,
        error,
        refetch: fetchWorkData
    };
};
_s(useWorkPage, "RiL7vLwmC7ZWXKL/bXt2EIBjBYk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/works/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>WorksPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ScrollAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ScrollAnimation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useWorkPage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/useWorkPage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function WorksPage() {
    _s();
    const { data, loading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useWorkPage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkPage"])();
    // Convert data to array and sort by most recent
    const workExperiences = data ? Object.entries(data).map(([id, work])=>({
            id,
            ...work
        })).sort((a, b)=>{
        // Prioritize current positions (end_date = "present") first
        if (a.end_date.toLowerCase() === 'present' && b.end_date.toLowerCase() !== 'present') {
            return -1;
        }
        if (b.end_date.toLowerCase() === 'present' && a.end_date.toLowerCase() !== 'present') {
            return 1;
        }
        // If both are current or both are past positions, sort by start_date
        const parseDate = (dateString)=>{
            const [month, year] = dateString.split(' ');
            const monthMap = {
                Jan: 0,
                Feb: 1,
                Mar: 2,
                Apr: 3,
                May: 4,
                Jun: 5,
                Jul: 6,
                Aug: 7,
                Sep: 8,
                Oct: 9,
                Nov: 10,
                Dec: 11
            };
            return new Date(parseInt(year), monthMap[month] || 0);
        };
        const dateA = parseDate(a.start_date);
        const dateB = parseDate(b.start_date);
        return dateB.getTime() - dateA.getTime();
    }) : [];
    // Responsive grid columns
    const gridCols = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12';
    // Color schemes for cards
    const colorSchemes = [
        'bg-teal-100 border-teal-300',
        'bg-red-100 border-red-300',
        'bg-yellow-100 border-yellow-300',
        'bg-blue-100 border-blue-300',
        'bg-purple-100 border-purple-300',
        'bg-orange-100 border-orange-300'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full bg-[#F5F5F5] py-16 md:py-24 lg:py-32 px-4 md:px-12 lg:px-32 xl:px-56",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-12 md:mb-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[#0A2F3B] text-[32px] md:text-[60px] lg:text-[80px] font-bold mb-4 md:mb-6",
                        children: "All Work Experiences"
                    }, void 0, false, {
                        fileName: "[project]/app/works/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-[16px] md:text-[20px] lg:text-[24px] max-w-3xl mx-auto",
                        children: "Explore my professional journey, roles, and key contributions in detail."
                    }, void 0, false, {
                        fileName: "[project]/app/works/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/works/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-[300px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-20 w-20 border-b-2 border-[#286F6E] mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/works/page.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-gray-600",
                        children: "Loading work experiences..."
                    }, void 0, false, {
                        fileName: "[project]/app/works/page.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/works/page.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-[300px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-red-500",
                    children: [
                        "Error loading work experiences: ",
                        error
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/works/page.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/works/page.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this),
            !loading && !error && workExperiences.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-[300px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-gray-500",
                    children: "No work experiences found."
                }, void 0, false, {
                    fileName: "[project]/app/works/page.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/works/page.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this),
            !loading && !error && workExperiences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: gridCols,
                children: workExperiences.map((work, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ScrollAnimation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        delay: idx * 0.1,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `relative group rounded-3xl border-2 shadow-lg p-8 md:p-10 transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-2xl ${colorSchemes[idx % colorSchemes.length]}`,
                            tabIndex: 0,
                            "aria-label": `Work at ${work.company}: ${work.title}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl md:text-3xl font-bold text-[#286F6E] group-hover:underline",
                                            children: work.company
                                        }, void 0, false, {
                                            fileName: "[project]/app/works/page.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg md:text-xl text-gray-700 mt-1 font-medium",
                                            children: work.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/works/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/works/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block px-3 py-1 rounded-full bg-white text-[#286F6E] text-xs font-semibold border border-[#286F6E]",
                                        children: [
                                            work.start_date,
                                            " - ",
                                            work.end_date
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/works/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/works/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 text-base md:text-lg mb-4 line-clamp-4 group-hover:line-clamp-none transition-all duration-300",
                                    children: work.description
                                }, void 0, false, {
                                    fileName: "[project]/app/works/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#286F6E] font-semibold text-sm bg-white px-4 py-2 rounded-full shadow-md border border-[#286F6E]",
                                        children: "See Details"
                                    }, void 0, false, {
                                        fileName: "[project]/app/works/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/works/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/works/page.tsx",
                            lineNumber: 95,
                            columnNumber: 15
                        }, this)
                    }, work.id, false, {
                        fileName: "[project]/app/works/page.tsx",
                        lineNumber: 94,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/works/page.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/works/page.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(WorksPage, "zVq8c0SFz5MuNpkb32IyTr0wlGg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useWorkPage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkPage"]
    ];
});
_c = WorksPage;
var _c;
__turbopack_context__.k.register(_c, "WorksPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_76c99428._.js.map