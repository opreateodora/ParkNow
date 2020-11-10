package com.saveaspot.parking.saveaspot;


import java.util.List;

import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
public class ControllerSpot {
    private final SpotService SpotService;

    public ControllerSpot(SpotService SpotService) {
        this.SpotService = SpotService;
    }

    @PostMapping("/AddSpot")
    @Procedure(MediaType.APPLICATION_JSON)
    public ResponseEntity<Void> register(@RequestBody Spot spot) {
        SpotService.saveSpot(spot);
        return new ResponseEntity<Void>(null, null,HttpStatus.OK);
    }


    @GetMapping("/getSpot")
    @Procedure(MediaType.APPLICATION_JSON)
    public ResponseEntity<?> getSpot() {
        return new ResponseEntity <List<Spot>> (this.SpotService.getAll(),HttpStatus.OK);
    }

}

