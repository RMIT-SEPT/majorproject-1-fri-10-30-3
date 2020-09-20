package com.rmit.sept.fri_10_30_3.majorproject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.fri_10_30_3.majorproject.model.Employee;
import com.rmit.sept.fri_10_30_3.majorproject.services.EmployeeService;
import com.rmit.sept.fri_10_30_3.majorproject.web.EmployeeController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@RunWith(SpringRunner.class)
public class EmployeeControllerTests {

    private MockMvc mockMvc;

    @Autowired
    private EmployeeController employeeController;

    @MockBean
    private EmployeeService employeeService;

    private List<Employee> employees;

    @Before
    public void setup() throws Exception{
        this.mockMvc = standaloneSetup(this.employeeController).build();
        //Creating two mock objects
        Employee employee1 = new Employee();
        employee1.setId(1);
        employee1.setLname("Tester");
        employee1.setFname("Jennifer");
        Employee employee2 = new Employee();
        employee2.setId(2);
        employee2.setLname("Tester");
        employee2.setFname("Karen");
        employees = new ArrayList<>();
        employees.add(employee1);
        employees.add(employee2);
    }
    //Test the get all employee API
    @Test
    public void testGetAllEmployees() throws Exception{
        when(employeeController.getAll()).thenReturn(employees);

        mockMvc.perform(get("/api/employee").contentType(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fname", is("Jennifer")))
                .andExpect(jsonPath("$[1].fname", is("Karen")));

    }
    //Test the getById method
    @Test
    public void testGetById() throws  Exception{
        Employee e = new Employee();
        e.setId(3);
        e.setLname("Tester");
        e.setFname("Ruth");

        when(employeeController.getByID(3)).thenReturn(Optional.of(e));
        mockMvc.perform(MockMvcRequestBuilders.get("/api/employee/3")).andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.fname",is("Ruth")));
    }

    //Test the post API
    @Test
    public void testPost() throws Exception{
        //This object is using to test POST
        Employee e = new Employee();
        e.setId(3);
        e.setLname("Tester");
        e.setFname("Ruth");

        ObjectMapper mapper = new ObjectMapper();
        String jsonContent = mapper.writeValueAsString(e);

        mockMvc.perform(post("/api/employee/").contentType(MediaType.APPLICATION_JSON)
                .content(jsonContent)).andDo(print())
                .andExpect(status().isCreated());
    }
    //Test the delete API
    @Test
    public void testDelete() throws Exception{
        Employee e = new Employee();
        e.setId(4);
        e.setLname("Tester");
        e.setFname("Jimmy");
        e.setUserName("TestDel");

        when(employeeController.getByID(4)).thenReturn(Optional.of(e));
        //Changing the id to any number other than 3, the expected content need to be changed to "NOT FOUND" as well.
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/employee/delete/4")).andDo(print())
                //The delete API return the deleted username when success and return "NOT FOUND" when there is no such
                //user.
                .andExpect(MockMvcResultMatchers.content().string("TestDel"));
    }

}
