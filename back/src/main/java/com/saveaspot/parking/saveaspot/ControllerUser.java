package com.saveaspot.parking.saveaspot;


import java.util.List;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
public class ControllerUser {
    private final UserService UserService;

    public ControllerUser(UserService UserService) {
        this.UserService = UserService;
    }

    @PostMapping("/AddUser")
    @Procedure(MediaType.APPLICATION_JSON)
    public ResponseEntity<Void> register(@RequestBody User user) {
        UserService.saveUser(user);
        return new ResponseEntity<Void>(null, null,HttpStatus.OK);
    }


    @GetMapping("/getUser")
    @Procedure(MediaType.APPLICATION_JSON)
    public ResponseEntity<?> getUser() {
        return new ResponseEntity <List<User>> (this.UserService.getAll(),HttpStatus.OK);
    }

}

