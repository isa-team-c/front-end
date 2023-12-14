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


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
      this.searchCompanies();
    
  }
  searchCompanies() {
    console.log('Search Term:', this.searchTerm);
    this.userService.searchCompanies(this.searchTerm)
      .subscribe((data) => {
        this.companies = data;
      });
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
