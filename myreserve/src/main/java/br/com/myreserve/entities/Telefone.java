package br.com.myreserve.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Telefone {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_telefone;
	private String ddd;
	private String numero;
	private Integer fk_estabelecimento;
	
	@ManyToOne
	@JoinColumn(name = "fk_estabelecimento", insertable=false, updatable=false)
	@JsonIgnoreProperties("telefone")
	private Estabelecimento estabTelefone;
	
	
	public Telefone() {}

	public Telefone(String ddd, String numero, Integer fk_estabelecimento) {
		this.ddd = ddd;
		this.numero = numero;
		this.fk_estabelecimento = fk_estabelecimento;
	}
	

	public Integer getId_telefone() {
		return id_telefone;
	}

	public String getDdd() {
		return ddd;
	}

	public void setDdd(String ddd) {
		this.ddd = ddd;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public Integer getFk_estabelecimento() {
		return fk_estabelecimento;
	}

	public void setFk_estabelecimento(Integer fk_estabelecimento) {
		this.fk_estabelecimento = fk_estabelecimento;
	}
	
	

}
