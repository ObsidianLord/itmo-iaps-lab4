package ru.ifmo.se.iaps.lab4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.ifmo.se.iaps.lab4.repo.ResultRepo;

import java.util.HashMap;

@Controller
public class HomeController {

    private ResultRepo resultRepo;

    @Autowired
    public HomeController(ResultRepo resultRepo) {
        this.resultRepo = resultRepo;
    }

    @RequestMapping("/login")
    public String login(Model model,
                        @RequestParam(value = "error",required = false) String error,
                        @RequestParam(value = "logout",	required = false) String logout) {

        HashMap<Object, Object> data = new HashMap<>();
        data.put("error", error == null ? null : "Неверный логин или пароль");
        data.put("message", logout == null ? null :"Выход выполнен успешно");

        model.addAttribute("frontendData", data);
        return "login";

    }

    @RequestMapping("/")
    public String home(Model model) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        HashMap<Object, Object> data = new HashMap<>();

        data.put("username",  authentication.getName());
        data.put("results", resultRepo.findByOwnerOrderByCheckDate(authentication.getName()));

        model.addAttribute("frontendData", data);

        return "index";
    }

}
