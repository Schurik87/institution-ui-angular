import {
    Action,
    createSelector,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SectionService } from '../../service/section.service';
import {
    AddSection,
    DeleteSection,
    GetSection,
    GetSections,
    GetSectionTree,
    UpdateSection,
} from '../actions/section.action';
import { Section, SectionTree } from '../../api/section';
import { Injectable } from '@angular/core';

export class SectionStateModel {
    sections: Section[] = [];
    sectionTrees: SectionTree[] = [];
    section?: Section;
}

@State<SectionStateModel>({
    name: 'sections',
    defaults: {
        sections: [],
        section: undefined,
        sectionTrees: [],
    },
})
@Injectable()
export class SectionState {
    constructor(private sectionService: SectionService) {}

    @Selector()
    static getSections(state: SectionStateModel) {
        return state.sections;
    }

    @Selector()
    static getSectionTree(state: SectionStateModel) {
        return state.sectionTrees;
    }

    @Selector()
    static countSections(state: SectionStateModel) {
        return state.sections.length;
    }

    @Selector()
    static getSection(state: SectionStateModel) {
        return (id: string) => {
            return state.sections?.find((section) => section.id === id);
        };
    }

    @Action(GetSections)
    getSections({ getState, setState }: StateContext<SectionStateModel>) {
        console.log('### GetSections');
        return this.sectionService.getSections().pipe(
            tap((sections) => {
                const state = getState();
                setState({
                    ...state,
                    sections: sections,
                });
            })
        );
    }

    @Action(GetSection)
    getSectionById(
        { getState, setState }: StateContext<SectionStateModel>,
        id: string
    ) {
        return this.sectionService.getSections().pipe(
            tap((sections) => {
                const state = getState();
                const sectionFound = sections.find(
                    (section) => section.id === id
                );
                setState({
                    ...state,
                    section: sectionFound,
                });
            })
        );
    }

    @Action(GetSectionTree)
    getSectionTreeByInstitution(
        { getState, setState }: StateContext<SectionStateModel>,
        payload: any
    ) {
        console.log('#### payload', payload);
        return this.sectionService.getSectionTree(payload.institutionId).pipe(
            tap((sectionTrees) => {
                const state = getState();
                setState({
                    ...state,
                    sectionTrees: sectionTrees,
                });
            })
        );
    }

    @Action(UpdateSection)
    updateSelectedSection(
        { getState, setState }: StateContext<SectionStateModel>,
        { section }: UpdateSection
    ) {
        return this.sectionService.updateSection(section).pipe(
            tap((result) => {
                const state = getState();
                const sectionList = [...state.sections];
                const sectionIndex = sectionList.findIndex(
                    (item) => item.id === section.id
                );
                console.log('###result', result);
                sectionList[sectionIndex] = result.data;
                setState({
                    ...state,
                    sections: sectionList,
                });
            })
        );
    }

    @Action(AddSection)
    adddSection(
        { getState, setState }: StateContext<SectionStateModel>,
        { section }: AddSection
    ) {
        return this.sectionService.addSection(section).pipe(
            tap((result) => {
                const state = getState();
                const sectionList = [...state.sections];
                const sectionIndex = sectionList.findIndex(
                    (item) => item.id === section.id
                );
                console.log('###result', result);
                sectionList[sectionIndex] = result.data;
                setState({
                    ...state,
                    sections: sectionList,
                });
            })
        );
    }

    @Action(DeleteSection)
    deletetSectionById(
        { getState, setState }: StateContext<SectionStateModel>,
        payload: any
    ) {
        return this.sectionService.deleteSection(payload.id).pipe(
            tap((sectionResult) => {
                const state = getState();
                const sectionList = [...state.sections];
                const sectionListNew = sectionList.filter(
                    (section) => section.id !== sectionResult.data.id
                );
                setState({
                    ...state,
                    sections: sectionListNew,
                });
            })
        );
    }
}
