package br.com.myreserve.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Estabelecimento {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_estabelecimento;
	
	@Column(name ="nome_estabelecimento")
	private String nome;
	
	private String email;
	private String hora_funcionamento;
	private String cnpj;
	private String senha;
	private String img_estabelecimento;
	private Boolean estab_ativo;
	private String descricao;
	private Integer max_pessoas;
	private Integer fk_categoria;

	@OneToOne
	@JoinColumn(name = "fk_categoria", insertable=false, updatable=false)
	private Categoria categoria;
	
	public Categoria getCategoria() {
		return categoria;
	}
	
	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}
	
	@OneToOne(mappedBy = "dadosEstab")
	@JsonIgnoreProperties("dadosEstab")
	private DadosRecebimento dadosRecebimento;
	
	public DadosRecebimento getDadosRecebimento() {
		return dadosRecebimento;
	}
	
	public void setDadosRecebimento(DadosRecebimento dadosRecebimento) {
		this.dadosRecebimento = dadosRecebimento;
	}
	
	@OneToMany
	@JoinColumn(name = "fk_estabelecimento")
	private Set<Horario> horario;
	
	public Set<Horario> getHorario() {
		return horario;
	}
	
	public void setHorario(Set<Horario> horario) {
		this.horario = horario;
	}
		
	@OneToMany(mappedBy="estabTelefone")
	@JsonIgnoreProperties("estabTelefone")
	private Set<Telefone> telefone;
	
	public Set<Telefone> getTelefone() {
		return telefone;
	}
	
	public void setTelefone(Set<Telefone> telefone) {
		this.telefone = telefone;
	}
	
	@OneToMany(mappedBy ="estabReserva")
	//@JoinColumn(name = "fk_estabelecimento")
	@JsonIgnoreProperties("estabReserva")
	private Set<Reserva> reservaUser;
	
	public Set<Reserva> getReserva() {
		return reservaUser;
	}
	
	public void setReserva(Set<Reserva> reservaUser) {
		this.reservaUser = reservaUser;
	}
	
	@OneToOne(mappedBy = "dadosEndereco")
	@JsonIgnoreProperties("dadosEndereco")
	private Endereco endereco;
	
	public Endereco getEndereco() {
		return endereco;
	}
	
	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Estabelecimento(String nome, String email, String hora_funcionamento, String cnpj,
			String senha, String img_estabelecimento, Boolean estab_ativo, String descricao, Integer max_pessoas, Integer fk_categoria) {
		this.nome = nome;
		this.email = email;
		this.hora_funcionamento = hora_funcionamento;
		this.cnpj = cnpj;
		this.senha = senha;
		this.img_estabelecimento = img_estabelecimento;
		this.estab_ativo = estab_ativo;
		this.descricao = descricao;
		this.max_pessoas = max_pessoas;
		this.fk_categoria = fk_categoria;
	}
	
	public Integer getId_estabelecimento() {
		return id_estabelecimento;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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
	
	public Integer getMax_pessoas() {
		return max_pessoas;
	}

	public void setMax_pessoas(Integer max_pessoas) {
		this.max_pessoas = max_pessoas;
	}

	public Integer getFk_categoria() {
		return fk_categoria;
	}

	public void setFk_categoria(Integer fk_categoria) {
		this.fk_categoria = fk_categoria;
	}

}		
