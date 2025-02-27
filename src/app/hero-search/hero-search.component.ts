import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) { }

  search(term : string){
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchTerm(term))
    )
  }

  
}
