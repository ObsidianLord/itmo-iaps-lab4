package ru.ifmo.se.iaps.lab4.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ifmo.se.iaps.lab4.domain.Result;

import java.util.List;

public interface ResultRepo extends JpaRepository <Result, Integer> {
    List<Result> findByOwnerOrderByCheckDate(String owner);
}
