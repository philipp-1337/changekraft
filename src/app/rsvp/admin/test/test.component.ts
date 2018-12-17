import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-test',
  template: `
    <ul>
      <li *ngFor="let item of (items | async)">
        <input type="text" #updatetext [value]="item.name" />
        <button (click)="updateItem(item.key, updatetext.value)">Update</button>
        <button (click)="deleteItem(item.key)">Delete</button>
      </li>
    </ul>
    <input type="text" #newitem />
    <button (click)="addItem(newitem.value)">Add</button>
    <button (click)="deleteEverything()">Delete All</button>
  `
})
export class AdminTestComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.itemsRef = this.db.list('rsvp');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  addItem(newName: string) {
    this.itemsRef.push({ name: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { name: newText });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
