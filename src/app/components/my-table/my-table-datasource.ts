import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { RsvpData } from '../../models/rsvp-data.model';
import { RsvpDataService } from '../../services/rsvp-data.service';

// TODO: replace this with real data from your application

const EXAMPLE_DATA: RsvpData[] = [
  { address: '', email: '1', name: 'Hydrogen' },
  { address: '', email: '2', name: 'Helium' },
  { address: '', email: '3', name: 'Lithium' },
  { address: '', email: '4', name: 'Beryllium' },
  { address: '', email: '5', name: 'Boron' },
  { address: '', email: '6', name: 'Carbon' },
  { address: '', email: '7', name: 'Nitrogen' },
  { address: '', email: '8', name: 'Oxygen' },
  { address: '', email: '9', name: 'Fluorine' },
  { address: '', email: '10', name: 'Neon' },
  { address: '', email: '11', name: 'Sodium' },
  { address: '', email: '12', name: 'Magnesium' },
  { address: '', email: '13', name: 'Aluminum' },
  { address: '', email: '14', name: 'Silicon' },
  { address: '', email: '15', name: 'Phosphorus' },
  { address: '', email: '16', name: 'Sulfur' },
  { address: '', email: '17', name: 'Chlorine' },
  { address: '', email: '18', name: 'Argon' },
  { address: '', email: '19', name: 'Potassium' },
  { address: '', email: '20', name: 'Calcium' }
];

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyTableDataSource extends DataSource<RsvpData> {
  data: RsvpData[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RsvpData[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-semaile). If you're using server-semaile pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: RsvpData[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-semaile). If you're using server-semaile sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RsvpData[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'email':
          return compare(+a.email, +b.email, isAsc);
        case 'address':
          return compare(+a.address, +b.address, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example email/Name columns (for client-semaile sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
