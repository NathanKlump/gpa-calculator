package edu.oakland.gpacalculator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.dao.DataAccessException;

import edu.oakland.soffit.auth.SoffitAuthException;
import edu.oakland.soffit.auth.AuthService;
import edu.oakland.gpacalculator.model.CoursesInfo;
import edu.oakland.gpacalculator.dao.BannerDao; 

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class GpaCalculatorController {

    @Autowired private BannerDao bannerDao; 
    @Autowired private AuthService authorizer;
    private static final Logger log = LoggerFactory.getLogger("gpa-calculator");

    @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Invalid JWT")
    @ExceptionHandler(SoffitAuthException.class)
    public void soffitError(SoffitAuthException e) {
      log.error("Invalid JWT", e);
    }
  
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Unspecified exception")
    @ExceptionHandler(Exception.class)
    public void handleError(Exception e) {
        log.error("Unspecified exception", e);
    }

    @GetMapping("/courses")
    public List<CoursesInfo> getCoursesInfo(HttpServletRequest request) throws SoffitAuthException {
        String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();
        return bannerDao.getCoursesInfo(pidm);
    }
}