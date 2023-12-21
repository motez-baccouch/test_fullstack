import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ApplicationService } from '../service/application.service';
import { Project } from '../model/project.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formIsValid = true;
  user: User;
  projects: Array<Project>=[];

  projectName: string;
  projectAmount: number;
  projectDescription: string;

  constructor(
    private router: Router,
    private applicationService: ApplicationService
  ) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getUserProjects();
  }

  getUser(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user === null) {
      this.router.navigate(['login']);
    }
  }

  // TODO : Récupérer la liste des projets lié à cette utilisateur
  // Cette fonction ne fait rien pour l'instant
  // -> Il faut remplir la liste de projet `this.projects`
  getUserProjects(): void {
    this.applicationService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // TODO : Sauvegarder les informations d'un projet grâce au formulaire: done!!
  // -> Appeler le backend pour créer le projet avec les bonnes informations : done!!
  // -> Ne pas oublier d'ajouter l'username de l'utilisateur : done!!
  // -> Après avoir sauvegarder le projet, l'ajouter  dans `this.projects` :done!!
  onSubmit(): void {
   
    if (!this.validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Formulaire invalide',
        text: 'Veuillez remplir correctement tous les champs du formulaire.',
      });
      return;
    }

    // Save project
    const newProject: Project = {
      name: this.projectName,
      amount: this.projectAmount,
      description: this.projectDescription,
      ownerUsername: this.user.username,
    };

    this.applicationService.saveProject(newProject).subscribe(
      (savedProject) => {
        this.projects.push(savedProject); // Add the saved project to the list
        this.clearForm(); 
        Swal.fire('Projet sauvegardé', 'Le projet a été sauvegardé avec succès', 'success');
      },
      (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Échec de la sauvegarde du projet',
          text: 'Une erreur s\'est produite lors de la sauvegarde du projet. Veuillez réessayer.',
        });
      }
    );
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    Swal.fire('Déconnexion réussie', 'Vous êtes à présent déconnecté', 'success');
  }

  validateForm(): boolean {
    return !!this.projectName && !!this.projectDescription && this.projectAmount > 0;
  }

  clearForm(): void {
    this.projectName = '';
    this.projectAmount = null;
    this.projectDescription = '';
  }

 
  // TODO : Validation du formulaire
  // -> Le nom et la description du projet doivent être rempli
  // -> Le montant du projet doit être un nombre positif
  // Attention au typage des valeurs
  //pas besoin de cela car je vais utiliser ngmodel
  onInputUpdate(value: string, field: string): void {
    this[field] = value;
    console.log(`value : ${value}; field : ${field}`);
  }
}
