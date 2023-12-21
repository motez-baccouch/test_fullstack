package com.finalgo.application.dao;

import com.finalgo.application.entity.User;
import org.springframework.stereotype.Service;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.mindrot.jbcrypt.BCrypt;


@Service
public class UserDao extends AbstractGenericDao<User> {



    public User create(User user) {
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
        return super.create(user);
    }
    /**
     * Récupèrer l'utilisateur correspondant aux paramètres suivant:
     * @param username
     * @param password
     * @return User
     *
     * TODO : Implémenter la requête Hibernate/SQL : done!!
     */
    public User findWithCredentials(String username, String password) {
        String hql = "FROM User u WHERE u.username = :username";
        Session session = getCurrentSession();
        Query<User> query = session.createQuery(hql, User.class);
        query.setParameter("username", username);
        User user = query.uniqueResult();

            if (user != null && BCrypt.checkpw(password, user.getPassword())) {
                // Passwords match
                return user;
            }


        return null;
    }


    /** existsByUsername Returns True if this username Exists:
     *@param username
     *@return boolean
     *
     */

    public boolean existsByUsername(String username) {
        String hql = "SELECT COUNT(*) FROM User u WHERE u.username = :username";
        Long count = (Long) getCurrentSession().createQuery(hql)
                .setParameter("username", username)
                .uniqueResult();
        return count != null && count > 0;
    }
    /** existsByEmail Returns True if this email Exists:
     *@param email
     *@return boolean
     *
     */
    public boolean existsByEmail(String email) {
        String hql = "SELECT COUNT(*) FROM User u WHERE u.email = :email";
        Long count = (Long) getCurrentSession().createQuery(hql)
                .setParameter("email", email)
                .uniqueResult();
        return count != null && count > 0;
    }


}
