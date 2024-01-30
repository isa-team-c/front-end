import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { forkJoin } from 'rxjs';
import { Company } from 'src/app/infrastructure/auth/model/company.model';
import { CompanyAdministratorService } from '../company-administrator.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-reservation-statistics',
  templateUrl: './reservation-statistics.component.html',
  styleUrls: ['./reservation-statistics.component.css']
})
export class ReservationStatisticsComponent {

  selectedYear: number | undefined;
  selectedMonth: number | undefined;
  filterForm: FormGroup;
  years: number[] = [];
  totalPrice: number | undefined;
  company: Company | undefined;
  administratorId : number | undefined;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  public totalAppointmentsChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [];
  public barChartLabels: string[] = []; 
  public monthlyChartData: ChartDataset[] = [];
  public monthlyChartLabels: string[] = [];
  public totalAppointmentsChartLegend = true;
  public totalAppointmentsChartData: ChartDataset[] = [];
  public totalAppointmentsChartLabels: string[] = [];
  public quarterlyChartData: ChartDataset[] = [];
  public quarterlyChartLabels: string[] = [];


  constructor(private fb: FormBuilder, private service: CompanyAdministratorService,  private authService: AuthService, private companyService: CompanyService) {
    this.filterForm = this.fb.group({
     
      selectedYear: [''],
      selectedMonth: [''],
    });
    this.years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  }

  ngOnInit(): void {
    // Uzmemo trenutnog korisnika kada komponenta inicijalizuje
    this.authService.user$.subscribe(user => {
      if (user.id) {
        this.administratorId = user.id;

        // Učitaj kompaniju i podatke kada se dohvate podaci o korisniku
        this.companyService.getCompanyForAdministrator(this.administratorId).subscribe(
          (company) => {
            this.company = company;

            // Ako imamo kompaniju, izvrši inicijalno učitavanje statistika
            if (this.company) {
              //this.onYearChange(); // Po potrebi dodaj dodatne inicijalne pozive
              this.showTotalReservationsForLastFiveYears();
            }
          },
          (error) => {
            console.error('Error loading company for administrator:', error);
          }
        );
      }
    });
  }

  private showMonthlyReservationsForSelectedYear(selectedYear: number): void {
    const monthlyCountsObservables = this.months.map((month) => {
      console.log(`Fetching data for ${this.getMonthName(month)}, ${selectedYear}`);
      return this.service.getReservationCountsByMonth(this.company?.id!, selectedYear, month);
    });
  
    // Use forkJoin to wait for all monthly observables to complete
    forkJoin(monthlyCountsObservables).subscribe(
      (monthlyCountsArray) => {
        console.log('All monthly requests completed successfully.');
        console.log('Counts for each month:', monthlyCountsArray);
  
        // Further processing logic can be added here
  
        // After fetching data, draw the monthly chart
        this.drawMonthlyReservationsChart(this.months, monthlyCountsArray);
      },
      (error) => {
        console.error('Error fetching monthly appointment counts:', error);
      }
    );
  }
  
  private drawMonthlyReservationsChart(months: number[], countsArray: number[][]): void {
    this.barChartLabels = months.map(month => this.getMonthName(month));
  
    const flattenedCountsArray: number[] = countsArray.reduce((acc, counts) => acc.concat(counts), []);
  
    const chartData: ChartDataset[] = [
      {
        data: flattenedCountsArray,
        label: 'Reservations by Month',
        backgroundColor: this.generateRandomColors(flattenedCountsArray.length)
      }
    ];
  
    this.barChartData = chartData;
  }
  
  
  
  
  private generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`);
    }
    return colors;
  }
  

  onYearChange(): void {
    this.selectedYear = this.filterForm.get('selectedYear')?.value;
    //this.selectedMonth = this.filterForm.get('selectedMonth')?.value;

    
   

    this.showMonthlyReservationsForSelectedYear(this.selectedYear!);
    this.showQuarterlyReservations(this.selectedYear!);

    this.service.getReservationPriceByYear(this.company?.id!, this.selectedYear!).subscribe((price) => {
       
      this.totalPrice = price;

      });
    

    
   
  }

  private showQuarterlyReservations(selectedYear: number): void {
    this.service.getReservationCountsByQuarter(this.company?.id!, selectedYear!).subscribe((counts) => {
      console.log('Quarterly counts:', counts);
  
      // Verify that you have valid data and adjust the mapping if needed
      this.quarterlyChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
      this.quarterlyChartData = [{ data: counts, label: 'Reservations by Quarter' }];
    });
  }

  
  
 /* onMonthChange(): void {
    this.selectedYear = this.filterForm.get('selectedYear')?.value;
    this.selectedMonth = this.filterForm.get('selectedMonth')?.value;

    // Prikazi mesečni grafikon
    this.service.getAppointmentCountsByMonth(this.company?.id!, this.selectedYear!, this.selectedMonth!).subscribe((counts) => {
      this.barChartLabels = [this.getMonthName(this.selectedMonth!)];
      this.barChartData = [{ data: counts, label: 'Appointments' }];
    });
  }*/

  private getMonthName(monthNumber: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber-1 ]; 
  }
  
  

  private showTotalReservationsForLastFiveYears(): void {
    const currentYear = new Date().getFullYear();
    const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  
    const observables = lastFiveYears.map(year => {
      console.log(`Fetching data for year: ${year}`);
      return this.service.getReservationCountByYear(this.company?.id!, year);
    });
  
    // Nakon što ste kreirali observables, možete koristiti forkJoin za čekanje na završetak svih observables
    forkJoin(observables).subscribe(
      (countsArray) => {
        console.log('All requests completed successfully.');
        console.log('Counts for each year:', countsArray);
  
        // Ovde možete dodati logiku za dalju obradu podataka
  
        // Nakon što dohvatite podatke, iscrtajte grafikon
        this.drawTotalReservationsChart(lastFiveYears, countsArray);
      },
      (error) => {
        console.error('Error fetching reservation counts:', error);
      }
    );
  }
  
  private drawTotalReservationsChart(years: number[], countsArray: number[]): void {
    countsArray.forEach((counts, index) => {
      const year = years[index];
      const chartLabel = `${year}`;
      const chartData = [{ data: [counts], label: `Reservations - ${year}` }];
      this.totalAppointmentsChartLabels.push(chartLabel);
      this.totalAppointmentsChartData.push(...chartData);
    });
  }
  

}
