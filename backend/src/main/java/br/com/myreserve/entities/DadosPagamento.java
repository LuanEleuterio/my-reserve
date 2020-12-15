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
@Table(name = "dados_pagamento")
public class DadosPagamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_pag;
	private String numero_cartao;
	private String data_validade;
	private String cvv;
	private String cpf;
	private Integer fk_usuario;
	
	@OneToOne
	@JoinColumn(name = "fk_usuario",  insertable=false, updatable=false)
	@JsonIgnoreProperties("dadosPagamento")
	private Usuario usuarioPagamento;
	
	public Usuario getUsuarioPagamento() {
		return usuarioPagamento;
	}

	public void setUsuarioPagamento(Usuario usuarioPagamento) {
		this.usuarioPagamento = usuarioPagamento;
	}
	
	public DadosPagamento() {}

	public DadosPagamento(String numero_cartao, String data_validade, String cvv, String cpf, Integer fk_usuario) {
		this.numero_cartao = numero_cartao;
		this.data_validade = data_validade;
		this.cvv = cvv;
		this.cpf = cpf;
		this.fk_usuario = fk_usuario;
	}

	public int getId_pag() {
		return id_pag;
	}

	public String getNumero_cartao() {
		return numero_cartao;
	}

	public void setNumero_cartao(String numero_cartao) {
		this.numero_cartao = numero_cartao;
	}

	public String getData_validade() {
		return data_validade;
	}

	public void setData_validade(String data_validade) {
		this.data_validade = data_validade;
	}

	public String getCvv() {
		return cvv;
	}

	public void setCvv(String cvv) {
		this.cvv = cvv;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Integer getFk_usuario() {
		return fk_usuario;
	}

	public void setFk_usuario(Integer fk_usuario) {
		this.fk_usuario = fk_usuario;
	}
	
	


}
