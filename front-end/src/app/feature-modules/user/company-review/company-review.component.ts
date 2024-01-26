import { Component } from '@angular/core';
import { CompanyReview } from '../model/company-review.model';
import { UserService } from '../user.service';
import {MatSliderModule, MatSliderThumb} from '@angular/material/slider';
import { Router } from '@angular/router';
import { Company } from 'src/app/infrastructure/auth/model/company.model';


@Component({
  selector: 'app-company-review',
  templateUrl: './company-review.component.html',
  styleUrls: ['./company-review.component.css'],
})
export class CompanyReviewComponent {
  companies: CompanyReview[] = [];
  searchTerm: string = "";
  minRating: number = 1;
  maxRating: number = 5;
  isFilterApplied: boolean = false;
  sortByColumn: 'name' | 'address' | 'averageRating' = 'name';
  sortByOrder: 'asc' | 'desc' = 'asc';



  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
      this.searchCompanies();
    
  }

  sortCompaniesByColumn(column: 'name' | 'address' | 'averageRating') {
    if (this.sortByColumn === column) {
      // Ako je trenutna sortirana kolona ista, promenite redosled sortiranja
      this.sortByOrder = (this.sortByOrder === 'asc') ? 'desc' : 'asc';
    } else {
      // Ako je korisnik kliknuo na drugu kolonu, postavite novu sortiranu kolonu i postavite redosled na uzlazan
      this.sortByColumn = column;
      this.sortByOrder = 'asc';
    }
  
    // Ponovo učitajte kompanije sa ažuriranim sortiranjem
    this.searchCompanies();
  }
  
  searchCompanies() {
    console.log('Search Term:', this.searchTerm);
  
    this.userService.searchCompanies(this.searchTerm)
      .subscribe((data) => {
        // Sortirajte kompanije pre nego što ih dodelite
        this.companies = this.sortCompanies(data);
      });
  }
  
  sortCompanies(companies: CompanyReview[]): CompanyReview[] {
    try {
      const compareFunctions = {
        name: (a: CompanyReview, b: CompanyReview) => a.name.localeCompare(b.name),
        address: (a: CompanyReview, b: CompanyReview) => a.address.localeCompare(b.address),
        averageRating: (a: CompanyReview, b: CompanyReview) => a.averageRating - b.averageRating
      };
  
      return companies.sort((a, b) => {
        const compareFunction = compareFunctions[this.sortByColumn];
        return (this.sortByOrder === 'asc') ? compareFunction(a, b) : compareFunction(b, a);
      });
    } catch (error) {
      console.error('Error sorting companies:', error);
      return companies;
    }
  }
  

  onSearchClick() {
   
      this.searchCompanies();
    
  }

  filterByRating(): void {
    if (this.minRating && this.maxRating) {
      this.companies = this.companies.filter(company =>
        company.averageRating >= this.minRating && company.averageRating <= this.maxRating
      );
      this.isFilterApplied = true;
    } else {
      this.searchCompanies();
      this.isFilterApplied = false;
    }
    
  }

 
  
  resetRatingFilters(): void {
    this.minRating = 1;
    this.maxRating = 5;
    this.isFilterApplied = false;
    this.searchCompanies();
  }

  onSeeMoreClicked(selectedCompany: CompanyReview) {
    console.log('Company id:', selectedCompany.id);
    this.router.navigate(['/company', selectedCompany.id]);
  }

}
