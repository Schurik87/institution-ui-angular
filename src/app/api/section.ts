import { Institution } from './institution';

export interface Section {
    id?: string;
    name: string;
    image?: string;
    institution?: Institution;
    institutionId: string;
}

export interface UpdateSection {
    name: string;
    image?: string;
    institutionId: string;
}

export interface SectionResult {
    data: Section;
    message: string;
}
