package ru.ifmo.se.iaps.lab4.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.iaps.lab4.domain.Result;
import ru.ifmo.se.iaps.lab4.repo.ResultRepo;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("result")
public class ResultController {

    private final ResultRepo resultRepo;

    @Autowired
    public ResultController (ResultRepo resultRepo) {
        this.resultRepo = resultRepo;
    }

    @GetMapping
    public List<Result> list() {
        return resultRepo.findAll();
    }

    @GetMapping("{id}")
    public Result getOne(@PathVariable("id") Integer id) { return resultRepo.findById(id).orElse(null); }

    @PostMapping
    @Transactional
    public Result check(@RequestBody Result result) {
        if (validate(result.getX(), result.getY(), result.getR())) {
            result.setCorrect(checkArea(result.getX(), result.getY(), result.getR()) ? 1 : 0);
            result.setCheckDate(LocalDateTime.now());
            return resultRepo.save(result);
        } else {
            Result invalidummy = new Result();
            invalidummy.setX(666.);
            return invalidummy;
        }
    }

    @PutMapping("{id}")
    @Transactional
    public Result update(@PathVariable("id") Integer id, @RequestBody Result result) {
        Result oldResult = resultRepo.findById(id).orElse(null);
        BeanUtils.copyProperties(result, oldResult, "id");
        return resultRepo.save(oldResult);
    }

    @DeleteMapping("{id}")
    @Transactional
    public void delete(@PathVariable("id") Integer id) {
        resultRepo.deleteById(id);
    }

    private boolean validate(double x, double y, double r) {
        return ((!(x < -5.)) && (!(x > 3.))) &&
                ((!(y < -3.)) && (!(y > 5.))) &&
                ((!(r < -5.)) && (!(r > 3.)));
    }

    private boolean checkArea(double x, double y, double r) {
        if (r <= 0) return false;
        if (x <= 0) {
            if ((x >= -r) && (y >= 0) && (y <= r/2.)) return true;
            return (y <= 0) && ((x * x + y * y) <= r * r / 4.);
        } else return (y >= 0) && (y <= r / 2. - x);
    }

}
