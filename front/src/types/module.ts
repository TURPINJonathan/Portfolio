export interface Module {
    id?: number;
    name: string;
    icon: string;
    options?: {
        [key: string]: string | undefined;
    };
    isAdminModule: boolean;
}