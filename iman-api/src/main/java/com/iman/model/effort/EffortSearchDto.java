package com.iman.model.effort;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EffortSearchDto {
    
    @Length(max = 255)
    private String description;
    
    @PastOrPresent
    private Date startDate;
    
    @PastOrPresent
    private Date endDate;
    
    @Min(value = 0)
    private Long projectId;
    
    @Min(value = 0)
    private Long sprintId;
    
    @Min(value = 0)
    private Long columnId;
    
    @Min(value = 0)
    private Long taskId;
    
    @Length(max = 15)
    private String username;
    

}
