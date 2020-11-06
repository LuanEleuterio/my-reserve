package br.com.myreserve.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Endereco {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_endereco;
	private String estado;
	private String cidade;
	private String bairro;
	private String cep;
	private String logradouro;
	private String numero;
	private Integer fk_estabelecimento;
	
	@OneToOne
	@JoinColumn(name = "fk_estabelecimento", insertable=false, updatable=false)
	@JsonIgnoreProperties("endereco")
	private Estabelecimento dadosEndereco;
	
	public Endereco() {}

	public Endereco(String estado, String cidade, String bairro, String cep,
			String logradouro, String numero, Integer fk_estabelecimento) {
		this.estado = estado;
		this.cidade = cidade;
		this.bairro = bairro;
		this.cep = cep;
		this.logradouro = logradouro;
		this.numero = numero;
		this.fk_estabelecimento = fk_estabelecimento;
	}

	public Integer getId_endereco() {
		return id_endereco;
	}
	
	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
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
