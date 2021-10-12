import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'countriesList';
  allCountries : any[] = [];
  countriesSelect : any[] = [];
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

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit() {
    console.log('consultar');
    this.regions = this.allRegions;
    this.getCountries();
  }

  getCountries(){
    console.log(this.allCountries);
    this.countriesService.getAllCountries().subscribe( (response: any[]) => {
      this.allCountries = this.sortList(response);
      this.countriesSelect = this.allCountries;
      console.log(this.allCountries);
    },
    error => {
      this.allCountries= [];
      console.log(this.allCountries);
      console.log(error)
    });
  }

  sortList(list: any[]){
    console.log(list.sort());
    return list.sort(); 
  }

  changeCountry(){
    if(this.selectCountry == 'ShowAll'){
      console.log('show all');
      this.regions = this.allRegions;
      this.countriesSelect = this.allCountries;
    }else if(this.selectCountry == 'Favorites'){
      console.log('favoritos');
    }else{
      this.countriesSelect = [];
      this.regions = [{name : this.selectCountry,value: this.selectCountry,},];
      this.allCountries.filter( element => {
        element.region == this.selectCountry
        if(element.region == this.selectCountry){
          this.countriesSelect.push(element);
        }
      })
    }
  } 
  
}
