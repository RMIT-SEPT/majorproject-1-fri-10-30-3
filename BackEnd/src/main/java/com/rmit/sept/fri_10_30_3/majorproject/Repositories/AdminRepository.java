package com.rmit.sept.fri_10_30_3.majorproject.Repositories;

import com.rmit.sept.fri_10_30_3.majorproject.model.Admin;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin,Long> {
    @Override
    Iterable<Admin> findAllById(Iterable<Long> iterable);
    //New methods after milestone2
    Admin findByUserName(String username);
    Admin getById(Long id);
}
