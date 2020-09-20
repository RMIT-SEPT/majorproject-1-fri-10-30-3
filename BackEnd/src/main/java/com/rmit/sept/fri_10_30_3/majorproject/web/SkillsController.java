package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.model.Skills;
import com.rmit.sept.fri_10_30_3.majorproject.services.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
    @DeleteMapping("/delete/{id}")
    public Optional<Skills> deleteBySkillId(@PathVariable long id){
        return skillsService.deleteBySkillId(id);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<Skills> updateExistedSkill(@RequestBody Skills skill, @PathVariable long id){
        Optional<Skills> s = skillsService.findByID(id);
        if(s.isPresent()){
            s.get().setSkillId(id);
            s.get().setSkillsName(skill.getSkillsName());
            s.get().setCost(skill.getCost());
            s.get().setDescription(skill.getDescription());
            s.get().setImageSrc(skill.getImageSrc());
            s.get().setLength(skill.getLength());
            s.get().setTitle(skill.getTitle());
            skillsService.saveOrUpdateService(s.get());
            return new ResponseEntity<Skills>(skill,HttpStatus.CREATED);
        }else{
            return new ResponseEntity<Skills>(skill,HttpStatus.NO_CONTENT);
        }

    }

}
