import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Mp } from '../models/mp';
import { MpStoreService } from '../state/mp-store.service';
import { PostcardStoreService } from '../state/postcard-store.service';

@Component({
  selector: 'app-pick-mp',
  templateUrl: './pick-mp.component.html',
  styleUrls: ['./pick-mp.component.scss']
})
export class PickMpComponent implements OnInit {

  selectedMp: Mp;

  results: Mp[];

  mpData: Mp[];

  constructor(private mpStore: MpStoreService, private postcardStore: PostcardStoreService, private router: Router) { }

  ngOnInit() {
    this.mpStore.mps
      .subscribe(mpData => this.mpData = mpData);

    this.postcardStore.postcard
      .subscribe(postcardData => this.selectedMp = postcardData.mp);
  }

  search(event) {
    let query = event.query;

    this.results = this.mpData.filter((mp: Mp) => {
      if (mp.constituency.toLowerCase().includes(query.toLowerCase()) ||
          mp.name.toLowerCase().includes(query.toLowerCase()) ||
          mp.email.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

  next() {
    this.postcardStore.addMp(this.selectedMp);
    this.router.navigate(['/write-card']);
  }
}