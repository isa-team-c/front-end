import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Registration } from './model/registration.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/feature-modules/user/user.service';
import { ApiService } from './service/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>({id: 0, email: "", name: "", password: "", surname : "", city : "", country : "", phoneNumber : "", 
  profession:"" , confirmationPassword: "", companyInformation:"", isVerified:true , role: { id: 0, name: '' }});
  //user$ = new BehaviorSubject<User>({email: "", id: 0 });
  private access_token: string | null = null; 

  constructor(private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService) { 
      const storedToken = localStorage.getItem('jwt');
      if (storedToken) {
        this.access_token = storedToken;
        this.setUser();
      }
    }

  register(user: User): Observable<any> {
    console.log('Registering user:', user);
    
    return this.http.post('http://localhost:8080/user/auth/register', user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError("Failed to register user");
        })
      );
  }

  /*verifyUser(id: number) {
    this.http.put(`http://localhost:8080/user/verify/${id}`, {})
      .subscribe(
        (response) => {
          console.log('Verification successful:', response);
          //this.router.navigate(['home']);
        },
        (error) => {
          console.error('Verification failed:', error);
        }
      );
  }*/
  async verifyUser(id: number): Promise<void> {
    try {
      const response = await this.http.put(`http://localhost:8080/user/verify/${id}`, {}).toPromise();
      console.log('Verification successful:', response);
       this.router.navigate(['home']);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }

  login(user:any) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    // const body = `username=${user.username}&password=${user.password}`;
    const body = {
      'username': user.email,
      'password': user.password
    };
    
    return this.apiService.post(`http://localhost:8080/auth/login`, JSON.stringify(body), loginHeaders)
      .pipe(map((res) => {
        console.log('Login success',res);
        this.access_token = res.body.accessToken;
        localStorage.setItem("jwt", res.body.accessToken)
        this.userService.getMyInfo(user.email);
        return res;
      }));
  }

  checkIfUserExists(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.getToken() || ""; 
  
    const decodedToken = jwtHelperService.decodeToken(accessToken);
    const user: User = {
      id: decodedToken.id,
      email: decodedToken.sub,
      name: decodedToken.name,
      surname: decodedToken.surname,
      password: decodedToken.password,
      city: decodedToken.city,
      country: decodedToken.country,
      phoneNumber: decodedToken.phoneNumber,
      confirmationPassword: decodedToken.confirmationPassword,
      isVerified: decodedToken.isVerified,
      profession: decodedToken.profession,
      companyInformation: decodedToken.companyInformation,
      role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    };
  
    this.user$.next(user);
  }
  

  logout() {
    this.userService.currentUser = null;
    localStorage.removeItem("jwt");
    this.access_token = null;
    this.router.navigate(['/login']);
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

}
