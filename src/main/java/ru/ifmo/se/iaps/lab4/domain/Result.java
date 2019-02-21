package ru.ifmo.se.iaps.lab4.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
@Data
public class Result {

    @Id
    @GeneratedValue(generator = "resSeq")
    @SequenceGenerator(name = "resSeq", sequenceName = "resSeq", allocationSize = 1)
    private Integer id;

    @NotNull
    private String owner;

    @NotNull
    private Double x;

    @NotNull
    private Double y;

    @NotNull
    private Double r;

    @NotNull
    private Integer correct;

    @NotNull
    @Column(updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm:ss")
    private LocalDateTime checkDate;

}
