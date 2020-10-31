package br.com.myreserve.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Estabelecimento {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_estabelecimento;
	private String nome_estabelecimento;
	private String email;
	private String hora_funcionamento;
	private String cnpj;
	private String senha;
	private String img_estabelecimento;
	private Boolean estab_ativo;
	private String descricao;
	private Integer fk_categoria;
	
	@OneToOne(mappedBy="estabelecimento")
	private Set<Categoria> categoria;
	
	public Set<Categoria> getCategoria() {
		return categoria;
	}
	
	public void setCategoria(Set<Categoria> categoria) {
		this.categoria = categoria;
	}
	
	@OneToOne(mappedBy="estabelecimento")
	@JsonIgnoreProperties("estabelecimento")
	private Set<DadosRecebimento> dadosRecebimento;
	
	public Set<DadosRecebimento> getDadosRecebimento() {
		return dadosRecebimento;
	}
	
	public void setDadosRecebimento(Set<DadosRecebimento> dadosRecebimento) {
		this.dadosRecebimento = dadosRecebimento;
	}
		
	@OneToMany(mappedBy="estabelecimento")
	@JsonIgnoreProperties("estabTelefone")
	private Set<Telefone> telefone;
	
	public Set<Telefone> getTelefone() {
		return telefone;
	}
	
	public void setTelefone(Set<Telefone> telefone) {
		this.telefone = telefone;
	}
	
	public Estabelecimento() {}

	public Estabelecimento(String nome_estabelecimento, String email, String hora_funcionamento, String cnpj,
			String senha, String img_estabelecimento, Boolean estab_ativo, String descricao, Integer fk_categoria) {
		this.nome_estabelecimento = nome_estabelecimento;
		this.email = email;
		this.hora_funcionamento = hora_funcionamento;
		this.cnpj = cnpj;
		this.senha = senha;
		this.img_estabelecimento = img_estabelecimento;
		this.estab_ativo = estab_ativo;
		this.descricao = descricao;
		this.fk_categoria = fk_categoria;
	}
	

	public Integer getId_estabelecimento() {
		return id_estabelecimento;
	}

	public String getNome_estabelecimento() {
		return nome_estabelecimento;
	}

	public void setNome_estabelecimento(String nome_estabelecimento) {
		this.nome_estabelecimento = nome_estabelecimento;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHora_funcionamento() {
		return hora_funcionamento;
	}

	public void setHora_funcionamento(String hora_funcionamento) {
		this.hora_funcionamento = hora_funcionamento;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getImg_estabelecimento() {
		return img_estabelecimento;
	}

	public void setImg_estabelecimento(String img_estabelecimento) {
		this.img_estabelecimento = img_estabelecimento;
	}

	public Boolean getEstab_ativo() {
		return estab_ativo;
	}

	public void setEstab_ativo(Boolean estab_ativo) {
		this.estab_ativo = estab_ativo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Integer getFk_categoria() {
		return fk_categoria;
	}

	public void setFk_categoria(Integer fk_categoria) {
		this.fk_categoria = fk_categoria;
	}
}		
