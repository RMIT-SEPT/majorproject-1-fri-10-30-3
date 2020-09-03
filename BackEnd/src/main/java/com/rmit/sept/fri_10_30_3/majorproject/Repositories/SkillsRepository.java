package com.rmit.sept.fri_10_30_3.majorproject.Repositories;

import com.rmit.sept.fri_10_30_3.majorproject.model.Skills;
import org.springframework.data.repository.CrudRepository;

public interface SkillsRepository extends CrudRepository<Skills,Long> {
    @Override
    Iterable<Skills> findAllById(Iterable<Long> iterable);
}
