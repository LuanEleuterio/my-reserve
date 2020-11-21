package br.com.myreserve.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "dados_recebimento")
public class DadosRecebimento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String nome_beneficiario;
	private String cpf_cnpj;
	private String banco;
	private String agencia;
	private String conta;
	private Integer fk_estabelecimento;
	
	@OneToOne
	@JoinColumn(name = "fk_estabelecimento", insertable=false, updatable=false)
	@JsonIgnoreProperties("dadosRecebimento")
	private Estabelecimento dadosEstab;

	public DadosRecebimento() {}

	public DadosRecebimento(String nome_beneficiario, String cpf_cnpj, String banco, String agencia, String conta, Integer fk_estabelecimento) {
		this.nome_beneficiario = nome_beneficiario;
		this.cpf_cnpj = cpf_cnpj;
		this.banco = banco;
		this.agencia = agencia;
		this.conta = conta;
		this.fk_estabelecimento = fk_estabelecimento;
	}
	
	
	public Integer getId() {
		return id;
	}

	public String getNome_beneficiario() {
		return nome_beneficiario;
	}

	public void setNome_beneficiario(String nome_beneficiario) {
		this.nome_beneficiario = nome_beneficiario;
	}

	public String getCpf_cnpj() {
		return cpf_cnpj;
	}

	public void setCpf_cnpj(String cpf_cnpj) {
		this.cpf_cnpj = cpf_cnpj;
	}

	public String getBanco() {
		return banco;
	}

	public void setBanco(String banco) {
		this.banco = banco;
	}

	public String getAgencia() {
		return agencia;
	}

	public void setAgencia(String agencia) {
		this.agencia = agencia;
	}

	public String getConta() {
		return conta;
	}

	public void setConta(String conta) {
		this.conta = conta;
	}

	public Integer getFk_estabelecimento() {
		return fk_estabelecimento;
	}

	public void setFk_estabelecimento(Integer fk_estabelecimento) {
		this.fk_estabelecimento = fk_estabelecimento;
	}
	
	
}
