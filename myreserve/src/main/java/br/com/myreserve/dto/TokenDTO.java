package br.com.myreserve.dto;

import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenDTO {
	private String login;
	private String senha;
	
	@Transient
	private String isUserOrEstab;
	@Transient
	private Integer id;
}
