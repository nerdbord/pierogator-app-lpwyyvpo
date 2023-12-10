import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { PierogatorApiService } from '../../services';
import { SectionHeaderComponent } from "../../ui/molecules/section-header/section-header.component";
import { DumplingItemComponent } from "../../ui/molecules/dumpling-item/dumpling-item.component";
import { DumplingRecipesResponseInterface } from '../../interfaces';
import { RoutesEnum } from '../../routes';

@Component({
  selector: 'page-dumplings-list',
  standalone: true,
  templateUrl: './dumplings-list.container.html',
  styleUrl: './dumplings-list.container.scss',
  imports: [JsonPipe, AsyncPipe, SectionHeaderComponent, DumplingItemComponent]
})
export class DumplingsListComponent {
  private readonly pierogatorApi = inject(PierogatorApiService)

  // BehaviourSubject that emits null when we want to refresh the list of dumplings 
  private _myDumplings$: BehaviorSubject<null> = new BehaviorSubject<null>(null)

  public myDumplings$: Observable<DumplingRecipesResponseInterface> = this._myDumplings$.pipe(
    switchMap(() => this.pierogatorApi.getMyDumplingRecipes())
  )

  public allDumplings$ = this.pierogatorApi.getDumplingRecipes()

  private _router = inject(Router)

  public deleteDumpling(dumplingId: string): void {
    this.pierogatorApi.deleteDumplingRecipeById(dumplingId)
    .subscribe(() => {
      this._myDumplings$.next(null)
    })
  }

  public async goToDumpling(dumplingId: string): Promise<void> {
    await this._router.navigate([RoutesEnum.DUMPLING_DETAILS, dumplingId])
  }

  public async goToNewDumpling(): Promise<void> {
    await this._router.navigate([RoutesEnum.DUMPLING_GENERATOR])
  }
}
