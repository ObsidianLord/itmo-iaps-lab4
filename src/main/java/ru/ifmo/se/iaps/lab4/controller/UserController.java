package ru.ifmo.se.iaps.lab4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.iaps.lab4.domain.User;
import ru.ifmo.se.iaps.lab4.repo.UserRepo;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;

    @Autowired
    public UserController(PasswordEncoder passwordEncoder, UserRepo userRepo) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> list() {
        return userRepo.findAll();
    }

    @GetMapping("{username}")
    public User getOne(@PathVariable("username") String username) {
        return userRepo.findById(username).orElse(null);
    }

    @PostMapping
    @Transactional
    public User create(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @PutMapping("{username}")
    @Transactional
    public User update(@PathVariable("username") String username, @RequestBody User user) {
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @DeleteMapping("{username}")
    @Transactional
    public void delete(@PathVariable("username") String username) {
        userRepo.deleteById(username);
    }

}
