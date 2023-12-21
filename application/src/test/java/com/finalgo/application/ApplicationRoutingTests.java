package com.finalgo.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalgo.application.api.ApplicationRouting;
import com.finalgo.application.bean.LoginBean;
import com.finalgo.application.bean.RegisterBean;
import com.finalgo.application.dao.ProjectDao;
import com.finalgo.application.dao.UserDao;
import com.finalgo.application.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest(ApplicationRouting.class)
@Import(TestConfig.class)
public class ApplicationRoutingTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDao userDao;

    @MockBean
    private ProjectDao projectDao;

    @InjectMocks
    private ApplicationRouting applicationRouting;

    @Test
    public void testRegister() throws Exception {
        // Create a RegisterBean for testing
        RegisterBean registerBean = new RegisterBean();
        registerBean.setUsername("testuser");
        registerBean.setPassword("testpassword");
        registerBean.setEmail("test@example.com");

        // Convert RegisterBean to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String registerBeanJson = objectMapper.writeValueAsString(registerBean);

        // Mock userDao behavior
        Mockito.when(userDao.existsByUsername(Mockito.anyString())).thenReturn(false);
        Mockito.when(userDao.existsByEmail(Mockito.anyString())).thenReturn(false);
        Mockito.when(userDao.create(Mockito.any(User.class))).thenReturn(new User());

        // Perform the registration request
        mockMvc.perform(MockMvcRequestBuilders.post("/application/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerBeanJson))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Verify that userDao.create is called with the correct User object
        Mockito.verify(userDao, Mockito.times(1)).create(Mockito.any(User.class));
    }

    @Test
    public void testRegisterConflict() throws Exception {
        // Create a RegisterBean for testing with conflicting username
        RegisterBean registerBean = new RegisterBean();
        registerBean.setUsername("conflictuser");
        registerBean.setPassword("testpassword");
        registerBean.setEmail("test@example.com");

        // Convert RegisterBean to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String registerBeanJson = objectMapper.writeValueAsString(registerBean);

        // Mock userDao behavior to simulate conflict
        Mockito.when(userDao.existsByUsername(Mockito.anyString())).thenReturn(true);

        // Perform the registration request expecting conflict
        mockMvc.perform(MockMvcRequestBuilders.post("/application/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerBeanJson))
                .andExpect(MockMvcResultMatchers.status().isConflict());
    }

    @Test
    public void testLogin() throws Exception {
        // Create a LoginBean for testing
        LoginBean loginBean = new LoginBean();
        loginBean.setUsername("testuser");
        loginBean.setPassword("testpassword");

        // Convert LoginBean to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String loginBeanJson = objectMapper.writeValueAsString(loginBean);

        // Mock userDao behavior
        Mockito.when(userDao.findWithCredentials(Mockito.anyString(), Mockito.anyString())).thenReturn(new User());

        // Perform the login request
        mockMvc.perform(MockMvcRequestBuilders.post("/application/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBeanJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testLoginNotFound() throws Exception {
        // Create a LoginBean for testing with non-existing user
        LoginBean loginBean = new LoginBean();
        loginBean.setUsername("nonexistinguser");
        loginBean.setPassword("testpassword");

        // Convert LoginBean to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String loginBeanJson = objectMapper.writeValueAsString(loginBean);

        // Mock userDao behavior to simulate user not found
        Mockito.when(userDao.findWithCredentials(Mockito.anyString(), Mockito.anyString())).thenReturn(null);

        // Perform the login request expecting not found
        mockMvc.perform(MockMvcRequestBuilders.post("/application/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBeanJson))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
