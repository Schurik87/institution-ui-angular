import { Institution } from './institution';
import { User } from './user';

export interface Section {
    id?: string;
    name: string;
    image?: string;
    institution?: Institution;
    institutionId: string;
    parentSection?: string;
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

export interface SectionMember {
    id?: string;
    institutionId: string;
    employees: User[];
    clients: User[];
}

export interface SectionTree {
    id: string;
    name: string;
    parentId: string;
    institution: Institution;
    children: SectionTree[];
}

export interface SectionTreeResult {
    data: Section;
    message: string;
}