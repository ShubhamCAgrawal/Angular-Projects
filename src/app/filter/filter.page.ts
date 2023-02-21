import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  number = [5, 6, 7, 8, 9];
  constructor(public navCtrl: NavController, private popoverController: PopoverController) { };
  ngOnInit() {
  }
  dismiss(value) {
    this.popoverController.dismiss(value);
    console.log('hello', value);
  }
}
