import {
  Component,
  Injectable,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = 'Első oldal';
  itemsPerPageLabel = 'Elemek oldalanként:';
  lastPageLabel = 'Utolsó oldal';
  nextPageLabel = 'Következő oldal';
  previousPageLabel = 'Előző oldal';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Oldal: 1/1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Oldal: ${page + 1}/${amountPages}`;
  }
}

@Component({
  selector: 'custom-paginator',
  templateUrl: 'custom-paginator.html',
})
export class CustomPaginator {}

@NgModule({
  imports: [MatPaginatorModule],
  declarations: [CustomPaginator],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomPaginatorModule {}
