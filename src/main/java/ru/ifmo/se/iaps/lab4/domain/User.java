package ru.ifmo.se.iaps.lab4.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "usrs")
@Data
public class User {

    @Id
    private String username;

    @NotNull
    private String password;

}
