package com.finalgo.application.dao;

import com.finalgo.application.entity.Project;
import org.springframework.stereotype.Service;
import org.hibernate.query.Query;
import org.hibernate.Session;
import java.util.List;


@Service
public class ProjectDao extends AbstractGenericDao<Project> {

    public ProjectDao() {
        super(Project.class);
    }

    /** getProjectsByowner Returns a list of projects with given owner:
     *@param ownerUsername
     *@return list of Project
     *
     */

    public List<Project> getProjectsByOwner(String ownerUsername) {
        String hql = "FROM Project p WHERE p.ownerUsername = :ownerUsername";
        Query<Project> query = getCurrentSession().createQuery(hql, Project.class);
        query.setParameter("ownerUsername", ownerUsername);

        return query.getResultList();
    }

}
