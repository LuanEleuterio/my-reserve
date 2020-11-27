package br.com.myreserve.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Logins {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String email;
	private String senha;
	
	@Column(name = "fk_estabelecimento")
	private Integer idEstabelecimento;
	
	@Column(name = "fk_usuario")
	private Integer idUsuario;
	
	@Builder.Default
	private Boolean ativo = true;
	
}
