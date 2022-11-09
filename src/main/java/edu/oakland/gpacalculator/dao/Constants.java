package edu.oakland.gpacalculator.dao;

public class Constants {
  public static final String GET_COURSES_INFO =
    "SELECT                                                                         "
      + "   sfrstcr.sfrstcr_term_code AS term_code,                                 "
      + "   shrtckn.shrtckn_crse_title AS course_title,                             "
      + "   shrtckn.shrtckn_subj_code AS subject_code,                              "
      + "   shrtckn.shrtckn_crse_numb AS course_number,                             "
      + "   NVL(TO_CHAR(sfrstcr.sfrstcr_credit_hr), 'N/A') AS crs_credits,          "
      + "   NVL(shrtckg.shrtckg_grde_code_final,'N/A') AS grade                     "
      + "FROM                                                                       "
      + "   saturn.sfrstcr sfrstcr,                                                 "
      + "   saturn.shrtckg shrtckg,                                                 "
      + "   saturn.shrtckn shrtckn                                                  "
      + "WHERE                                                                      "
      + "   shrtckn.shrtckn_pidm = sfrstcr.sfrstcr_pidm                             "
      + "   AND shrtckg.shrtckg_pidm = sfrstcr.sfrstcr_pidm                         "
      + "   AND shrtckn.shrtckn_term_code = sfrstcr.sfrstcr_term_code               "
      + "   AND shrtckg.shrtckg_term_code = sfrstcr.sfrstcr_term_code               "
      + "   AND shrtckg.shrtckg_tckn_seq_no = shrtckn.shrtckn_seq_no                "
      + "   AND shrtckn.shrtckn_crn = sfrstcr.sfrstcr_crn                           "
      + "   AND shrtckg.shrtckg_seq_no =  (                                         "
      + "   SELECT                                                                  "
      + "     MAX(shrtckg_b.shrtckg_seq_no)                                         "
      + "   FROM                                                                    "
      + "     shrtckg shrtckg_b                                                     "
      + "   WHERE                                                                   "
      + "     shrtckg_b.shrtckg_pidm = shrtckn.shrtckn_pidm                         "
      + "      AND shrtckg_b.shrtckg_term_code = shrtckn.shrtckn_term_code          "  
      + "      AND shrtckg_b.shrtckg_tckn_seq_no = shrtckn.shrtckn_seq_no)          "
      + "      AND sfrstcr.sfrstcr_pidm = ?                                         "
      + "ORDER BY term_code                                                         "
      .replaceAll("\\s+", " ");
}




