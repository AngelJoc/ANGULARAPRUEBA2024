import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { MenuComponent } from "./menu/menu.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MaterialModule } from "../material-module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ProductosComponent } from './productos/productos.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        PagesRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatBadgeModule,
        MaterialModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PagesComponent,
        MenuComponent,
        ProductosComponent
    ]
})

export class PagesModule {
}
