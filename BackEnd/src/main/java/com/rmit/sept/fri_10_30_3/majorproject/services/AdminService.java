package com.rmit.sept.fri_10_30_3.majorproject.services;

import com.rmit.sept.fri_10_30_3.majorproject.Repositories.AdminRepository;
import com.rmit.sept.fri_10_30_3.majorproject.execptions.UsernameAlreadyExistsException;
import com.rmit.sept.fri_10_30_3.majorproject.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Admin saveAdmin(Admin admin){
        try{
            admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
            admin.setUserName(admin.getUsername());
            admin.setConfirmPassword("");
            admin.setCompanyName(admin.getCompanyName());
            return adminRepository.save(admin);
        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+admin.getUsername()+"' already exists");
        }
    }

    public Admin saveOrUpdateAdmin(Admin admin){
        return adminRepository.save(admin);
    }

    public Iterable<Admin> findAll(){return adminRepository.findAll();}

    public Optional<Admin> findByID(long id){return adminRepository.findById(id);}
}
