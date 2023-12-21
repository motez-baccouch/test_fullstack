package com.finalgo.application.api;

import com.finalgo.application.bean.LoginBean;
import com.finalgo.application.bean.ProjectBean;
import com.finalgo.application.bean.RegisterBean;
import com.finalgo.application.dao.ProjectDao;
import com.finalgo.application.dao.UserDao;
import com.finalgo.application.entity.Project;
import com.finalgo.application.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/application")
@ControllerAdvice
public class ApplicationRouting {

    private final UserDao userDao;
    private final ProjectDao projectDao;
    private static final Logger logger = Logger.getLogger(ApplicationRouting.class.getName());


    public ApplicationRouting(UserDao userDao , ProjectDao projectdao) {
        this.userDao = userDao;
        this.projectDao = projectdao;
    }

    /**
     * Inscription d'un utilisateur
     * @param registerBean Objet contenant les informations envoyées par le front
     * @return User créé suite à l'inscription
     *
     * TODO : Empêcher l'ajout d'un utilisateur déjà existant :done!
     * -> doublon si l'username ou l'email est déjà existant
     * -> modifier la fonction pour ne pas avoir de doublon
     * -> renvoyer une erreur `HttpStatus.CONFLICT`
     */
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterBean registerBean) {

        if (userDao.existsByUsername(registerBean.getUsername()) || userDao.existsByEmail(registerBean.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        User user = new User();
        user.setUsername(registerBean.getUsername());
        user.setPassword(registerBean.getPassword());
        user.setEmail(registerBean.getEmail());
        userDao.create(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    /**
     * Connection d'un utilisateur
     * @param loginBean Objet contenant les informations envoyées par le front
     * @return User récupéré de la base de donnéees
     *
     * TODO : Implémenter la connection d'un utilisateur
     * -> Récupérer l'utilisateur dans la base de données avec le bon mot de passe
     * -> Si aucun utilisateur n'est trouvé, renvoyer une erreur `HttpStatus.NOT_FOUND`
     */
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginBean loginBean) {
        // TODO Implémenter la fonction `userDao.findWithCredentials` ci-dessous
        User user = userDao.findWithCredentials(loginBean.getUsername(), loginBean.getPassword());
        if (user != null) {
            // User found, return OK response with the user
            return ResponseEntity.ok(user);
        } else {
            // User not found, return NOT_FOUND response
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Sauvegarde d'un projet créé par l'utilisateur
     * @param projectBean Objet contenant les informations envoyées par le front
     * @return Projet créé
     *
     * TODO : Implémenter la sauvegarde d'un projet : done!
     * -> Créer un projet
     * -> Sauvegarder le projet dans dans la base de données
     * -> Prendre exemple sur UserDao pour implémenter la connection Hibernate 'ProjectDao'
     */

    @PostMapping("/saveProject")
    public ResponseEntity<Project> saveProject(@RequestBody ProjectBean projectBean) {
        Project project = new Project();
        project.setName(projectBean.getName());
        project.setAmount(projectBean.getAmount());
        project.setDescription(projectBean.getDescription());
        project.setOwnerUsername(projectBean.getOwnerUsername());

        projectDao.create(project);

        return ResponseEntity.status(HttpStatus.OK).body(project);
    }


    /*
      TODO : Implémenter la requête pour récupérer des projets créés par un utilisateur:done!
      Exemple de requête: GET -> localhost:8080/application/getProjects?ownerUsername=user1234
                              -> [{..}, {..}]
      Le seul paramètre sera un `ownerUsername`
      On veut une List<Project> récupérée de la table 'Project'
     */
    /**
     * retrieves projects created by a certain user
     * @param ownerUsername requestparam containing the username
     * @return list of projects
     **/

    @GetMapping("/getProjects")
    public ResponseEntity<List<Project>> getProjectsByOwner(@RequestParam String ownerUsername) {
        List<Project> projects = projectDao.getProjectsByOwner(ownerUsername);

        if (projects.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(projects);
        }
    }

    /**
     * TODO : Un ancien stagiaire a réalisé une API très instable en se basant sur du code
     *  obsolète, vous devez la moderniser en vous basant sur les API ci-dessus et la rendre stable : done!!
     * 1 : Refaire le mapping API/typage de façon à être le plus simple et précis possible
     * 2 : Identifier pourquoi l'API crash souvent et faire en sorte que ça n'arrive plus jamais,
     *     peut importe les paramètres envoyés et sans utiliser de try catch
     * 3 : Vous devez rendre le code de la fonction le plus propre et lisible possible
     * Quelques conseils :
     * - utiliser des variables (intermédiaires) correctement nommées
     * - faire des lignes simples et courtes (- de 80 caractères)
     * - éventuellement utiliser des formes ternaires pour des cas très simples
     *
     * Cet exemple est tirée de nos applications et est volontairement compliqué, faites ce que vous
     * pouvez sans y passer trop de temps (ce n'est pas le but)
     */


    /**
     * Saves information related to a project.
     *
     * @param attachedOc       Optional parameter attachedOc
     * @param attachedId       Optional parameter attachedId
     * @param attachedProject  Project information sent in the request body
     * @return ResponseEntity with the processed information
     */
    @PostMapping("/saveInformationTabObject")
    public ResponseEntity<String> saveInformationTabObject(
            @RequestParam(required = false) String attachedOc,
            @RequestParam(required = false) Integer attachedId,
            @RequestBody Project attachedProject) {

        // Create a log message
        String logMessage = String.format("Processing information for project %s owned by %s", attachedProject.getName(), attachedProject.getOwnerUsername());
        logger.log(Level.INFO, logMessage);

        // Process the information
        String projectInfo = String.format("%s, %s, %s", attachedProject.getName(), attachedProject.getDescription(), attachedProject.getOwnerUsername());
        String processedData = String.format("%s%d%s", attachedOc, 42 * attachedId, projectInfo.substring(12));

        // Return the processed data in the response body
        return ResponseEntity.ok(processedData);
    }




}
