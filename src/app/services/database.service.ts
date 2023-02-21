import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  readonly db_name: string = 'myDb.db';
  readonly db_table: string = 'userdatabase';
  USERS: Array<any>;
  private dbInstance: SQLiteObject;

  constructor(private platform: Platform,
    private sqlite: SQLite) {
    this.databaseConn();
  }
  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.db_name,
        location: 'default'
      }).then((sqLite: SQLiteObject) => {
        this.dbInstance = sqLite;
        sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                user_id INTEGER PRIMARY KEY, 
                name varchar(255),
                email varchar(255)
              )`, [])
          .then((res) => {
            // alert(JSON.stringify(res));
          })
          .catch((error) => alert(JSON.stringify(error)));
      })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }
  public addItem(n, e) {
    // validation
    if (!n.length || !e.length) {
      alert('Provide both email & name');
      return;
    }
    this.dbInstance.executeSql(`
    INSERT INTO ${this.db_table} (name, email) VALUES ('${n}', '${e}')`, [])
      .then(() => {
        alert('Success');
        this.getAllUsers();
      }, (error) => {
        alert(JSON.stringify(error.err));
      });
  }

  getAllUsers() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.USERS = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.USERS.push(res.rows.item(i));
        }
        return this.USERS;
      }
    }, (e) => {
      alert(JSON.stringify(e));
    });
  }
}
