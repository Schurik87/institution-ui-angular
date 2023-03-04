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
    UpdateSection,
} from '../actions/section.action';
import { Section } from '../../api/section';
import { Injectable } from '@angular/core';

export class SectionStateModel {
    sections: Section[] = [];
    section?: Section;
}

@State<SectionStateModel>({
    name: 'sections',
    defaults: {
        sections: [],
        section: undefined,
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
