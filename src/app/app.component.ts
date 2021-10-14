import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'countriesList';
  allCountries : any[] = [];
  countriesSelect : any[] = [];
  countrisFav : any[] = [];
  allRegions = [
    {
      name : 'Africa',
      value: 'Africa',
    },
    {
      name : 'America',
      value: 'Americas',
    },
    {
      name : 'Asia',
      value: 'Asia',
    },
    {
      name : 'Europa',
      value: 'Europe',
    },
    {
      name : 'Oceania',
      value: 'Oceania',
    }
  ];
  regions: any[] = [];
  selectCountry = 'ShowAll';
  conuntriSelect: any;
  favSelect = false;
  iconFav = false;
  filterCountri: any;

  constructor(
    private countriesService: CountriesService,
    private readonly afs : AngularFirestore,
  ) {}

  ngOnInit() {
    console.log('consultar');
    this.regions = this.allRegions;
    this.getCountries();
    this.getFav();
  }

  getCountries(){
    this.countriesService.getAllCountries().subscribe( (response: any[]) => {
      this.allCountries = this.sortList(response);
      this.countriesSelect = this.allCountries;
      console.log(this.countriesSelect);
    },
    error => {
      this.allCountries= [];
      console.log(error)
    });
  }

  sortList(list: any[]){
    return list.sort(); 
  }

  changeCountry(){
    this.iconFav = false;
    if(this.selectCountry == 'ShowAll'){
      this.regions = this.allRegions;
      this.countriesSelect = this.allCountries;
    }else if(this.selectCountry == 'Favorites'){
      this.iconFav = true;
      this.regions = [];
      this.countriesSelect = this.countrisFav;
      this.countrisFav.forEach((element: any) => {
        if (this.regions.some(e => e.name === element.region)) {
          console.log('------esta-----');
        }else{
          const region = {name : element.region,value: element.region,};
          this.regions.push(region);
        }
      });
    }else{
      this.countriesSelect = [];
      this.regions = [{name : this.selectCountry,value: this.selectCountry,}];
      this.allCountries.filter( element => {
        element.region == this.selectCountry
        if(element.region == this.selectCountry){
          this.countriesSelect.push(element);
        }
      })
    }
  } 

  searchInput(event:any){
    console.log(event);
    console.log(event.target.value);
  }

  open(countri: any) {
    this.conuntriSelect = countri;
    const modal = document.getElementById('modal');
    if(modal != null){
      modal.style.display='flex';
    }
  }
  
  close() {
    const modal = document.getElementById('modal');
    if(modal != null){
      modal.style.display='none';
    }
    this.favSelect = !this.favSelect
  }

  getFav(){
    this.afs.collectionGroup('countries').valueChanges().subscribe(response => {
      this.countrisFav = response;
    });
  }

  fav(countri: any){
    this.favSelect = !this.favSelect
    this.afs.collection('countries').add(countri);
  }

  disfav(countri: any){
    this.favSelect = !this.favSelect;
  }


}
