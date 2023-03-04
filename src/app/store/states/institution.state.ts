import {
    Action,
    createSelector,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { InstitutionService } from '../../service/institution.service';
import {
    AddInstitution,
    DeleteInstitution,
    GetInstitution,
    GetInstitutions,
    UpdateInstitution,
} from '../actions/institution.action';
import { Institution } from '../../api/institution';
import { Injectable } from '@angular/core';

export class InstitutionStateModel {
    institutions: Institution[] = [];
    institution?: Institution;
}

@State<InstitutionStateModel>({
    name: 'institutions',
    defaults: {
        institutions: [],
        institution: undefined,
    },
})
@Injectable()
export class InstitutionState {
    constructor(private institutionService: InstitutionService) {}

    @Selector()
    static getInstitutions(state: InstitutionStateModel) {
        return state.institutions;
    }

    @Selector()
    static countInstitutions(state: InstitutionStateModel) {
        return state.institutions.length;
    }

    @Selector()
    static getInstitution(state: InstitutionStateModel) {
        return (id: string) => {
            return state.institutions?.find(
                (institution) => institution.id === id
            );
        };
    }

    @Action(GetInstitutions)
    getInstitutions({
        getState,
        setState,
    }: StateContext<InstitutionStateModel>) {
        console.log('### GetInstitutions');
        return this.institutionService.getInstitutions().pipe(
            tap((institutions) => {
                const state = getState();
                setState({
                    ...state,
                    institutions: institutions,
                });
            })
        );
    }

    @Action(GetInstitution)
    getInstitutionById(
        { getState, setState }: StateContext<InstitutionStateModel>,
        id: string
    ) {
        return this.institutionService.getInstitutions().pipe(
            tap((institutions) => {
                const state = getState();
                const institutionFound = institutions.find(
                    (institution) => institution.id === id
                );
                setState({
                    ...state,
                    institution: institutionFound,
                });
            })
        );
    }

    @Action(UpdateInstitution)
    updateSelectedInstitution(
        { getState, setState }: StateContext<InstitutionStateModel>,
        { institution }: UpdateInstitution
    ) {
        return this.institutionService.updateInstitution(institution).pipe(
            tap((result) => {
                const state = getState();
                const institutionList = [...state.institutions];
                const institutionIndex = institutionList.findIndex(
                    (item) => item.id === institution.id
                );
                console.log('###result', result);
                institutionList[institutionIndex] = result.data;
                setState({
                    ...state,
                    institutions: institutionList,
                });
            })
        );
    }

    @Action(AddInstitution)
    adddInstitution(
        { getState, setState }: StateContext<InstitutionStateModel>,
        { institution }: AddInstitution
    ) {
        return this.institutionService.addInstitution(institution).pipe(
            tap((result) => {
                const state = getState();
                const institutionList = [...state.institutions];
                const institutionIndex = institutionList.findIndex(
                    (item) => item.id === institution.id
                );
                console.log('###result', result);
                institutionList[institutionIndex] = result.data;
                setState({
                    ...state,
                    institutions: institutionList,
                });
            })
        );
    }

    @Action(DeleteInstitution)
    deletetInstitutionById(
        { getState, setState }: StateContext<InstitutionStateModel>,
        payload: any
    ) {
        return this.institutionService.deleteInstitution(payload.id).pipe(
            tap((institutionResult) => {
                const state = getState();
                const institutionList = [...state.institutions];
                const institutionListNew = institutionList.filter(
                    (institution) =>
                        institution.id !== institutionResult.data.id
                );
                setState({
                    ...state,
                    institutions: institutionListNew,
                });
            })
        );
    }
}
