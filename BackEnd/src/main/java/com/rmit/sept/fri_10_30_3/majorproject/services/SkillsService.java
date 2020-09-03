package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.SkillsRepository;
import com.rmit.sept.fri_10_30_3.majorproject.model.Skills;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SkillsService {
    @Autowired
    private SkillsRepository skillsRepository;

    public Skills saveOrUpdateService(Skills skills){
        //skills.getSchedules().forEach(employee_schedule -> employee_schedule.setSkills(skills));
        return skillsRepository.save(skills);
    }

    public Iterable<Skills> findAll(){return skillsRepository.findAll();}

    public Optional<Skills> findByID(long id){return skillsRepository.findById(id);}
}
