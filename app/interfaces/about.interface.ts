interface AboutPageData{
    aboutPage: {
        [id: string]: {
            title: string;
            subTitle: string;
            description: string;
            cv_link: string;
        }
    };
    stats: {
        [id: string]: {
            availability: string;
            client_count: number;
            contact: string;
            email: string;
            location: string;
            project_completed: number;
            work_stats: number;
        }
    };
    links: {
        [id: string]: {
            link: string;
            social: string;
        }
    };
}

export type { AboutPageData }; 