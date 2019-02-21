package ru.ifmo.se.iaps.lab4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.ifmo.se.iaps.lab4.domain.User;
import ru.ifmo.se.iaps.lab4.repo.UserRepo;

public class AppUserDetailsService implements UserDetailsService {

    private UserRepo userRepo;

    @Autowired
    public void setUserRepo(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        org.springframework.security.core.userdetails.User.UserBuilder builder;
        User user = userRepo.findById(username).orElse(null);

        builder = org.springframework.security.core.userdetails.User.withUsername(username);
        builder.password(user.getPassword());
        builder.roles("DEFAULT");

        return builder.build();
    }
}
