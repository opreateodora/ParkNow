package com.saveaspot.parking.saveaspot;

import javax.transaction.Transactional;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SpotService {
    private final SpotRepository spotRepository;

    public SpotService(SpotRepository spotRepository) {
        this.spotRepository=spotRepository;
    }

    public void saveSpot(Spot spot) {
        spotRepository.save(spot);
    }

    public List<Spot> getAll(){
        return spotRepository.findAll();
    }


}

