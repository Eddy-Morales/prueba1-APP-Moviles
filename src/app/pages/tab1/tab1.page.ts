import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  animes: any[] = [];
  searchText: string = '';

  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    this.animeService.getTopAnime().subscribe((response) => {
      this.animes = response.data;
    });
  }

  filteredAnimes() {
    if (!this.searchText) {
      return this.animes;
    }
    return this.animes.filter(anime =>
      anime.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  alertButtons = ['Action'];
}