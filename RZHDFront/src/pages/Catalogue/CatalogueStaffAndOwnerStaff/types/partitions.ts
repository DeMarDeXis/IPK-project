export interface Part {
    id: number;
    name: string;
    ui_name: string;
    price: string;
    photo?: string;
    description?: string;
}

export type CatalogMode = "catalogue" | "private";