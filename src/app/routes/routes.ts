import { Routes } from "@angular/router";

import { DumplingsListComponent } from "../pages/dumplings-list/dumplings-list.container";
import { DumplingDetailsComponent } from "../pages/dumpling-details/dumpling-details.container";
import { DumplingGeneratorComponent } from "../pages/dumpling-generator/dumpling-generator.container";

import { RoutesEnum } from "./routes.enum";

export const appRoutes: Routes = [
    {
        path: RoutesEnum.DUMPLINGS_LIST,
        component: DumplingsListComponent,
    },
    {
        path: `${RoutesEnum.DUMPLING_DETAILS}/:dumplingId`,
        component: DumplingDetailsComponent
    },
    {
        path: RoutesEnum.DUMPLING_GENERATOR,
        component: DumplingGeneratorComponent
    },
    {
        path: '**',
        redirectTo: RoutesEnum.DUMPLINGS_LIST
    }
]