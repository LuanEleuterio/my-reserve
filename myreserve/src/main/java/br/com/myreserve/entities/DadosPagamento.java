package br.com.myreserve.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class DadosPagamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_pag;
	private String numero_cartao;
	private String data_validade;
	private String cvv;
	private String cpf;
	
	@OneToOne
	@JoinColumn(name = "fk_usuario")
	@JsonIgnoreProperties("DadosPagementos")
	private Usuario UsuarioPagamento;
	
	public DadosPagamento() {}

	public int getId_pag() {
		return id_pag;
	}

	public void setId_pag(int id_pag) {
		this.id_pag = id_pag;
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

	public Usuario getUsuarioPagamento() {
		return UsuarioPagamento;
	}

	public void setUsuarioPagamento(Usuario usuarioPagamento) {
		UsuarioPagamento = usuarioPagamento;
	}
	
	
}
