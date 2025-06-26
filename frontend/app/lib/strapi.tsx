export interface StrapiItem{
    id: number;
    attributes: any;
    createdAt: string;
    updatedAt: string;
}

class StrapiAPI{
    private baseURL: string;
    private token: string;

    constructor(){
        this.baseURL = process.env.NEXT_PUBLIC_STRAPI_URL as string;
        this.token = process.env.STRAPI_API_TOKEN as string;

        if(!this.baseURL){
            throw new Error("The Strapi url is not set");
        }

        if(!this.token){
            throw new Error("The Strapi token is not set");
        }
        this.baseURL = this.baseURL.replace(/\/$/, "");
    }

    private async fetchAPI(endpoint: string, options: RequestInit = {}){
        const url = `${this.baseURL}${`/api${endpoint}`}`

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
                ...options.headers
            }
        });

        if(!res.ok){
            const errorText = await res.text();
            console.error('API Error Details: ', {
                status: res.status,
                statusText: res.statusText,
                url: url,
                error: errorText
            });
            throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorText}`)
        }
        return res.json()
    }

    // STRAPI COMPONENT LINKS

    async getProjects(){
        return this.fetchAPI(`/projects?populate=*`)
    }
    
    async getProject(slug: string){
        return this.fetchAPI(`/projects?filters[slug][$eq]=${slug}&populate=*`)
    }

    async getTestimonials(){
        return this.fetchAPI('/testimonials?populate=*')
    }

    async getHeroSection(){
        return this.fetchAPI('/hero-section?populate=*')
    }

    getMediaURL(media: any){
        if(!media) return null;
        const url = media.data?.attributes?.url || media.url;
        if(!url) return null;

        return url.startsWith('http') ? url : `${this.baseURL}${url}`
    }
}

export const strapiAPI = new StrapiAPI();