package com.skattplan.backend;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/skatt")
@CrossOrigin(origins = "http://localhost:3000")
public class IncomeController {

    @GetMapping("/beräkna")
    public Map<String, Double> calculateTax(@RequestParam double inkomst) {
        double kommunalSkatt = inkomst * 0.2;
        double statligSkatt = inkomst > 540700 ? (inkomst - 540700) * 0.2 : 0;
        double totalSkatt = kommunalSkatt + statligSkatt;

        Map<String, Double> result = new HashMap<>();
        result.put("kommunalSkatt", kommunalSkatt);
        result.put("statligSkatt", statligSkatt);
        result.put("totalSkatt", totalSkatt);
        return result;
    }
}
