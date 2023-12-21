package com.finalgo.application;

import com.finalgo.application.dao.UserDao;
import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class TestConfig {
    @Bean
    public UserDao userDao() {
        return Mockito.mock(UserDao.class);
    }
}
