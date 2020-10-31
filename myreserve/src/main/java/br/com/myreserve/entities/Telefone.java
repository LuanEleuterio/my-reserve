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
	
	@ManyToOne
	@JoinColumn(name = "fk_estabelecimento")
	@JsonIgnoreProperties("telefone")
	private Estabelecimento estabTelefone;
	
	public Estabelecimento getEstabTelefone() {
		return estabTelefone;
	}
	
	public void setEstabTelefone(Estabelecimento estabTelefone) {
		this.estabTelefone = estabTelefone;
	}
	
	public Telefone() {}

	public Telefone(String ddd, String numero) {
		this.ddd = ddd;
		this.numero = numero;
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
	
	
}
