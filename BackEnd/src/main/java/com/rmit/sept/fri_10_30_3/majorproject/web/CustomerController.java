package com.rmit.sept.fri_10_30_3.majorproject.web;

import com.rmit.sept.fri_10_30_3.majorproject.Validator.CustomerValidator;
import com.rmit.sept.fri_10_30_3.majorproject.Validator.MapValidationErrorService;
import com.rmit.sept.fri_10_30_3.majorproject.model.Customer;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import com.rmit.sept.fri_10_30_3.majorproject.payload.JWTLoginSucessReponse;
import com.rmit.sept.fri_10_30_3.majorproject.payload.LoginRequest;
import com.rmit.sept.fri_10_30_3.majorproject.security.JwtTokenProvider;
import com.rmit.sept.fri_10_30_3.majorproject.services.CustomerService;
import com.rmit.sept.fri_10_30_3.majorproject.services.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

import static com.rmit.sept.fri_10_30_3.majorproject.security.SecurityConstant.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerController {
    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private UserLoginService userLoginService;
    @Autowired
    private CustomerValidator customerValidator;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody Customer customer, BindingResult result){
        //Use validator to verify customer
        customerValidator.validate(customer, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        Customer newCustomer = customerService.saveCustomer(customer);

        return new ResponseEntity<Customer>(newCustomer,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUserName(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        String type = userLoginService.getUserType(loginRequest.getUserName());

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt, type));
    }

    @PostMapping("")
    public ResponseEntity<Customer> createNewCustomer(@RequestBody Customer customer){
        Customer newCustomer = customerService.saveOrUpdateCustomer(customer);
        return new ResponseEntity<Customer>(customer, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Customer> getAll() {
        return customerService.findAll();
    }

    @GetMapping("{id}")
    public Optional<Customer> getByID(@PathVariable long id){
        return customerService.findByID(id);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<Customer> updateExistedWorker(@RequestBody Customer customer, @PathVariable long id){
        Optional<Customer> e = customerService.findByID(id);
        //Check if the employee exists or not
        if(e.isPresent()){
            e.get().setId(id);
            e.get().setFname(customer.getFname());
            e.get().setLname(customer.getLname());
            e.get().setPhone(customer.getPhone());
            e.get().setAddress(customer.getAddress());
            customerService.saveOrUpdateCustomer(e.get());
            return new ResponseEntity<Customer>(e.get(), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<Customer>(customer, HttpStatus.NO_CONTENT);
        }
    }
}
