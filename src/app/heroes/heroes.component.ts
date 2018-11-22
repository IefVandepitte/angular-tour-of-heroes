import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

//The CSS element selector, 'app-heroes',
//matches the name of the HTML element that identifies this component within a parent component's template.

//The ngOnInit is a lifecycle hook.Angular calls ngOnInit shortly after creating a component.
//It's a good place to put initialization logic.

//Always export the component class so you can import it elsewhere
//...like in the AppModule

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //heroes = HEROES; => wordt vervangen door DI met de HeroService
  heroes: Hero[];

  //Inject the HeroService
  //Add a private heroService parameter of type HeroService to the constructor.

//  The parameter simultaneously defines a private heroService property
//  and identifies it as a HeroService injection site.

//When Angular creates a HeroesComponent,
//  the Dependency Injection system sets the heroService parameter to the singleton
//instance of HeroService.


  constructor(private heroService: HeroService) {
    //While you could call getHeroes() in the constructor, that's not the best practice.

    //Reserve the constructor for simple initialization such as
    //  wiring constructor parameters to properties.
    //The constructor shouldn't do anything. It certainly shouldn't
    //call a function that makes HTTP requests to a remote server as a real data service would.

    //  Instead, call getHeroes() inside the ngOnInit lifecycle hook and let
    //    Angular call ngOnInit at an appropriate time after constructing a HeroesComponent instance

  }

  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes(); // <-- synchrone call
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); //<-- abbonneer op de observable
  }

  ngOnInit() {
    this.getHeroes();
  }
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }

 //niet langer in gebruik
  //selectedHero: Hero;
  // //eventhandler voor het klikken op een hero item uit mijn helden
  //onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
  //}
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
 

}
