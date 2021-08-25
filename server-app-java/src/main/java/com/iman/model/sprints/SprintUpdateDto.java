package com.iman.model.sprints;

import java.time.LocalDate;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SprintUpdateDto {
	
	@NotNull
	private Long id;

	@NotBlank
	@Length(max = 15)
	private String title;
	
	@Length(max = 255)
	private String description;
	
	private LocalDate startDate;

	private LocalDate estimatedDate;
}
