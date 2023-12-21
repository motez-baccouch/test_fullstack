import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../service/application.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// j'ai utliser des methods pour la validation et j'ai changer le html , j'ai utliser ngmodel pour le two way binding
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formIsValid: boolean;
  email: string;
  username: string;
  password: string;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  // TODO gérer les contraintes du formulaire
  // L'email doit être valide (à priori)
  // Le username doit être rempli
  // Le mot de passe doit :
  // - faire au moins 8 caractères
  // - contenir une ou plusieurs lettres majuscules,
  // - contenir un ou plusieurs chiffres
  // - contenir un ou plusieurs caractères spéciaux (caractère qui ne soit ni
  //   un chiffre ni une lettre de l'alphabet majuscule ou minuscule)
  onInputUpdate(value: string, field: string): void {
    this[field] = value;
    this.validateForm();
    console.log(this.validateEmail)
    console.log(this.username)
    console.log(this.email)
    console.log(this.password)

  }
  private validateForm(): void {
    const emailValid = this.validateEmail(this.email);
    const usernameFilled = !!this.username;
    const passwordValid = this.validatePassword(this.password);

    this.formIsValid = emailValid && usernameFilled && passwordValid;
  }

  // Valider le email
  private validateEmail(email: string): boolean {
    return email.includes('@');
  }

  // Valider le password
  private validatePassword(password: string): boolean {
    const minLength = 8;
    const containsUpperCase = /[A-Z]/.test(password);
    const containsNumber = /\d/.test(password);
    const containsSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    return password.length >= minLength && containsUpperCase && containsNumber && containsSpecialChar;
  }

  
   
    onSubmit(): void {
       // TODO Gérer les échecs d'inscription
    // Losqu'un utilisateur existe déjà, cette requête ne devrait pas fonctionner,:done!!
    // Il faut donc afficher le bon message d'erreur avec une alerte via `Swal`:done!!
    // Les contraintes du formulaire correspondent aussi à des messages d'erreur:done!!
      if (!this.formIsValid) {
        // Display an error message for invalid form
        Swal.fire({
          icon: 'error',
          title: 'Formulaire invalide',
          text: 'Veuillez remplir correctement tous les champs du formulaire.',
        });
        return;
      }
    
      const registrationParams = {
        username: this.username,
        password: this.password,
        email: this.email
      };

      this.applicationService.register(registrationParams).subscribe(
        (user) => {
          // Registration successful
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['home']);
          Swal.fire('Inscription réussie', 'Vous êtes à présent connecté', 'success');
        },
        (err) => {
          console.error(err);
    
          // Handle specific registration failure scenarios
          if (err.status === 409) {
            // User already exists
            Swal.fire({
              icon: 'error',
              title: 'Échec de l\'inscription',
              text: 'Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà. Veuillez choisir des informations différentes.',
            });
          } else {
            // General registration failure
            Swal.fire({
              icon: 'error',
              title: 'Échec de l\'inscription',
              text: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.',
            });
          }
        }
      );
    }
    
}

