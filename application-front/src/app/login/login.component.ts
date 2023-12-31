import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formIsValid = true;
  username: string;
  password: string;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit');
    // TODO : Gérer les échecs de connexion
    // Losque les informations ne sont pas bonnes et que le backend renvoie une erreur,
    // Il faut afficher le bon message d'erreur avec une alerte via `Swal` :done!!
    const loginParams = { username: this.username, password: this.password };
    this.applicationService.login(loginParams).subscribe((user) => {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/home']);
      Swal.fire({
        icon: 'success', 
        title: 'Connexion réussie',
        text: 'Vous êtes à présent connecté'});
    }, (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Échec de la connexion',
          text: 'Vos informations de connexion ne sont pas valides. Veuillez réessayer.',
        });
    });
  }

  // TODO : réaliser le binding entre les inputs et les attributs du component
  onInputUpdate(value: string, field: string): void {
    console.log(`value : ${value}; field : ${field}`);
  }
}
