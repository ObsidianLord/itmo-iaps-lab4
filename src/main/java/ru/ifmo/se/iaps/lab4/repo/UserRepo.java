package ru.ifmo.se.iaps.lab4.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ifmo.se.iaps.lab4.domain.User;

public interface UserRepo extends JpaRepository <User, String> {}
