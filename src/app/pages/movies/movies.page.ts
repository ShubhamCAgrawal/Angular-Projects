import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { FilterPage } from 'src/app/filter/filter.page';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { environmentt } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  searching = false;
  term;
  modifiedData: any;
  roleMsg = '';

  imageBaseUrl = environmentt.images;
  constructor(private movieService: MoviesService, private loadingCtrl: LoadingController,
    private authservive: AuthService, private router: Router, public navCtrl: NavController, public popoverController: PopoverController,

  ) {
    this.modifiedData = this.movies;
    console.log(this.modifiedData);

  }
  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(res => {
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
    });
  }
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  async logout() {
    await this.authservive.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  toggleSearch() {
    this.searching = !this.searching;
  }

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: FilterPage,
      event: e,
    });
    await popover.present();
    popover.onDidDismiss()
      .then(data => {
        console.log(data);
        this.movies = this.modifiedData.filter((ratings) => {
          return ratings.vote_average >= data.data && ratings.vote_average < data.data + 1;
        });
        if (data.data === undefined) {
          this.movies = this.modifiedData;
        }

        // console.log(data);

      });
  };

  reset() {
    this.movies = this.modifiedData;
  }
}
