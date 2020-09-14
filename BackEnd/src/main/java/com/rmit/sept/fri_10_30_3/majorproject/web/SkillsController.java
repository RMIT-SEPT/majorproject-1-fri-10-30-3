package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Skills;
import com.rmit.sept.fri_10_30_3.majorproject.services.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillsController {
    @Autowired
    private SkillsService skillsService;

    @PostMapping("")
    public ResponseEntity<Skills> createNewSkill(@RequestBody Skills skills){
        Skills newSkill = skillsService.saveOrUpdateService(skills);
        return new ResponseEntity<Skills>(skills, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Skills> getAll() {
        return skillsService.findAll();
    }

    @GetMapping("{id}")
    public Optional<Skills> getByID(@PathVariable long id){
        return skillsService.findByID(id);
    }
}
